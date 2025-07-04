import { mdiChartTimelineVariant, mdiUpload } from '@mdi/js'
import Head from 'next/head'
import React, { ReactElement, useEffect, useState } from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import dayjs from "dayjs";

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
import { SelectField } from "../../components/SelectField";
import { SelectFieldMany } from "../../components/SelectFieldMany";
import { SwitchField } from '../../components/SwitchField'
import {RichTextField} from "../../components/RichTextField";

import { update, fetch } from '../../stores/attendances/attendancesSlice'
import { useAppDispatch, useAppSelector } from '../../stores/hooks'
import { useRouter } from 'next/router'
import dataFormatter from '../../helpers/dataFormatter';

const EditAttendancesPage = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const initVals = {

    employee: null,

    work_in_time: new Date(),

    'work_in_latitude': '',

    'work_in_longitude': '',

    work_out_time: new Date(),

    'work_out_latitude': '',

    'work_out_longitude': '',

    company: null,

  }
  const [initialValues, setInitialValues] = useState(initVals)

  const { attendances } = useAppSelector((state) => state.attendances)

  const { id } = router.query

  useEffect(() => {
    dispatch(fetch({ id: id }))
  }, [id])

  useEffect(() => {
    if (typeof attendances === 'object') {
      setInitialValues(attendances)
    }
  }, [attendances])

  useEffect(() => {
      if (typeof attendances === 'object') {
          const newInitialVal = {...initVals};
          Object.keys(initVals).forEach(el => newInitialVal[el] = (attendances)[el])
          setInitialValues(newInitialVal);
      }
  }, [attendances])

  const handleSubmit = async (data) => {
    await dispatch(update({ id: id, data }))
    await router.push('/attendances/attendances-list')
  }

  return (
    <>
      <Head>
        <title>{getPageTitle('Edit attendances')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton icon={mdiChartTimelineVariant} title={'Edit attendances'} main>
        {''}
        </SectionTitleLineWithButton>
        <CardBox>
          <Formik
            enableReinitialize
            initialValues={initialValues}
            onSubmit={(values) => handleSubmit(values)}
          >
            <Form>

  <FormField label='Employee' labelFor='employee'>
        <Field
            name='employee'
            id='employee'
            component={SelectField}
            options={initialValues.employee}
            itemRef={'employees'}

            showField={'first_name'}

        ></Field>
    </FormField>

      <FormField
          label="WorkInTime"
      >
          <DatePicker
              dateFormat="yyyy-MM-dd hh:mm"
              showTimeSelect
              selected={initialValues.work_in_time ?
                  new Date(
                      dayjs(initialValues.work_in_time).format('YYYY-MM-DD hh:mm'),
                  ) : null
              }
              onChange={(date) => setInitialValues({...initialValues, 'work_in_time': date})}
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
          <DatePicker
              dateFormat="yyyy-MM-dd hh:mm"
              showTimeSelect
              selected={initialValues.work_out_time ?
                  new Date(
                      dayjs(initialValues.work_out_time).format('YYYY-MM-DD hh:mm'),
                  ) : null
              }
              onChange={(date) => setInitialValues({...initialValues, 'work_out_time': date})}
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

  <FormField label='company' labelFor='company'>
        <Field
            name='company'
            id='company'
            component={SelectField}
            options={initialValues.company}
            itemRef={'company'}

            showField={'name'}

        ></Field>
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

EditAttendancesPage.getLayout = function getLayout(page: ReactElement) {
  return (
      <LayoutAuthenticated>
          {page}
      </LayoutAuthenticated>
  )
}

export default EditAttendancesPage
