import React, { ReactElement, useEffect } from 'react';
import Head from 'next/head'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import dayjs from "dayjs";
import {useAppDispatch, useAppSelector} from "../../stores/hooks";
import {useRouter} from "next/router";
import { fetch } from '../../stores/attendances/attendancesSlice'
import dataFormatter from '../../helpers/dataFormatter';
import LayoutAuthenticated from "../../layouts/Authenticated";
import {getPageTitle} from "../../config";
import SectionTitleLineWithButton from "../../components/SectionTitleLineWithButton";
import SectionMain from "../../components/SectionMain";
import CardBox from "../../components/CardBox";
import BaseButton from "../../components/BaseButton";
import BaseDivider from "../../components/BaseDivider";
import {mdiChartTimelineVariant} from "@mdi/js";
import {SwitchField} from "../../components/SwitchField";
import FormField from "../../components/FormField";

const AttendancesView = () => {
    const router = useRouter()
    const dispatch = useAppDispatch()
    const { attendances } = useAppSelector((state) => state.attendances)

    const { id } = router.query;

    function removeLastCharacter(str) {
      console.log(str,`str`)
      return str.slice(0, -1);
    }

    useEffect(() => {
        dispatch(fetch({ id }));
    }, [dispatch, id]);

    return (
      <>
          <Head>
              <title>{getPageTitle('View attendances')}</title>
          </Head>
          <SectionMain>
            <SectionTitleLineWithButton icon={mdiChartTimelineVariant} title={removeLastCharacter('View attendances')} main>
                <BaseButton
                  color='info'
                  label='Edit'
                  href={`/attendances/attendances-edit/?id=${id}`}
                />
            </SectionTitleLineWithButton>
            <CardBox>

                <div className={'mb-4'}>
                    <p className={'block font-bold mb-2'}>Employee</p>

                        <p>{attendances?.employee?.first_name ?? 'No data'}</p>

                </div>

                <FormField label='WorkInTime'>
                    {attendances.work_in_time ? <DatePicker
                      dateFormat="yyyy-MM-dd hh:mm"
                      showTimeSelect
                      selected={attendances.work_in_time ?
                        new Date(
                          dayjs(attendances.work_in_time).format('YYYY-MM-DD hh:mm'),
                        ) : null
                      }
                      disabled
                    /> : <p>No WorkInTime</p>}
                </FormField>

                <div className={'mb-4'}>
                  <p className={'block font-bold mb-2'}>WorkInLatitude</p>
                  <p>{attendances?.work_in_latitude || 'No data'}</p>
                </div>

                <div className={'mb-4'}>
                  <p className={'block font-bold mb-2'}>WorkInLongitude</p>
                  <p>{attendances?.work_in_longitude || 'No data'}</p>
                </div>

                <FormField label='WorkOutTime'>
                    {attendances.work_out_time ? <DatePicker
                      dateFormat="yyyy-MM-dd hh:mm"
                      showTimeSelect
                      selected={attendances.work_out_time ?
                        new Date(
                          dayjs(attendances.work_out_time).format('YYYY-MM-DD hh:mm'),
                        ) : null
                      }
                      disabled
                    /> : <p>No WorkOutTime</p>}
                </FormField>

                <div className={'mb-4'}>
                  <p className={'block font-bold mb-2'}>WorkOutLatitude</p>
                  <p>{attendances?.work_out_latitude || 'No data'}</p>
                </div>

                <div className={'mb-4'}>
                  <p className={'block font-bold mb-2'}>WorkOutLongitude</p>
                  <p>{attendances?.work_out_longitude || 'No data'}</p>
                </div>

                <div className={'mb-4'}>
                    <p className={'block font-bold mb-2'}>company</p>

                        <p>{attendances?.company?.name ?? 'No data'}</p>

                </div>

                <BaseDivider />

                <BaseButton
                    color='info'
                    label='Back'
                    onClick={() => router.push('/attendances/attendances-list')}
                />
              </CardBox>
          </SectionMain>
      </>
    );
};

AttendancesView.getLayout = function getLayout(page: ReactElement) {
    return (
      <LayoutAuthenticated>
          {page}
      </LayoutAuthenticated>
    )
}

export default AttendancesView;
