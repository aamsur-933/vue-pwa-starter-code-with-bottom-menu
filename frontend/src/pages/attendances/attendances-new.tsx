import { mdiChartTimelineVariant } from '@mdi/js'
import Head from 'next/head'
import React, { ReactElement } from 'react'
import CardBox from '../../components/CardBox'
import LayoutAuthenticated from '../../layouts/Authenticated'
import SectionMain from '../../components/SectionMain'
import SectionTitleLineWithButton from '../../components/SectionTitleLineWithButton'
import { getPageTitle } from '../../config'

import { Field, Form, Formik } from 'formik'
import FormField from '../../components/FormField'
import BaseDivider from '../../components/BaseDivider'
import BaseButtons from '../../components/BaseButtons'
import BaseButton from '../../components/BaseButton'
import FormCheckRadio from '../../components/FormCheckRadio'
import FormCheckRadioGroup from '../../components/FormCheckRadioGroup'
import { SwitchField } from '../../components/SwitchField'

import { SelectField } from '../../components/SelectField'
import {RichTextField} from "../../components/RichTextField";

import { create } from '../../stores/attendances/attendancesSlice'
import { useAppDispatch } from '../../stores/hooks'
import { useRouter } from 'next/router'

const initialValues = {

    employee: '',

    work_in_time: '',

    work_in_latitude: '',

    work_in_longitude: '',

    work_out_time: '',

    work_out_latitude: '',

    work_out_longitude: '',

    company: '',

}

const AttendancesNew = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()

  const handleSubmit = async (data) => {
    await dispatch(create(data))
    await router.push('/attendances/attendances-list')
  }
  return (
    <>
      <Head>
        <title>{getPageTitle('New Item')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton icon={mdiChartTimelineVariant} title="New Item" main>
        {''}
        </SectionTitleLineWithButton>
        <CardBox>
          <Formik
            initialValues={
                initialValues
            }
            onSubmit={(values) => handleSubmit(values)}
          >
            <Form>

  <FormField label="Employee" labelFor="employee">
      <Field name="employee" id="employee" component={SelectField} options={[]} itemRef={'employees'}></Field>
  </FormField>

  <FormField
      label="WorkInTime"
  >
      <Field
          type="datetime-local"
          name="work_in_time"
          placeholder="WorkInTime"
      />
  </FormField>

    <FormField
        label="WorkInLatitude"
    >
        <Field
            type="number"
            name="work_in_latitude"
            placeholder="WorkInLatitude"
        />
    </FormField>

    <FormField
        label="WorkInLongitude"
    >
        <Field
            type="number"
            name="work_in_longitude"
            placeholder="WorkInLongitude"
        />
    </FormField>

  <FormField
      label="WorkOutTime"
  >
      <Field
          type="datetime-local"
          name="work_out_time"
          placeholder="WorkOutTime"
      />
  </FormField>

    <FormField
        label="WorkOutLatitude"
    >
        <Field
            type="number"
            name="work_out_latitude"
            placeholder="WorkOutLatitude"
        />
    </FormField>

    <FormField
        label="WorkOutLongitude"
    >
        <Field
            type="number"
            name="work_out_longitude"
            placeholder="WorkOutLongitude"
        />
    </FormField>

  <FormField label="company" labelFor="company">
      <Field name="company" id="company" component={SelectField} options={[]} itemRef={'company'}></Field>
  </FormField>

              <BaseDivider />
              <BaseButtons>
                <BaseButton type="submit" color="info" label="Submit" />
                <BaseButton type="reset" color="info" outline label="Reset" />
                <BaseButton type='reset' color='danger' outline label='Cancel' onClick={() => router.push('/attendances/attendances-list')}/>
              </BaseButtons>
            </Form>
          </Formik>
        </CardBox>
      </SectionMain>
    </>
  )
}

AttendancesNew.getLayout = function getLayout(page: ReactElement) {
  return (
      <LayoutAuthenticated>
          {page}
      </LayoutAuthenticated>
  )
}

export default AttendancesNew
