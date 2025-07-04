import React, { ReactElement, useEffect } from 'react';
import Head from 'next/head'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import dayjs from "dayjs";
import {useAppDispatch, useAppSelector} from "../../stores/hooks";
import {useRouter} from "next/router";
import { fetch } from '../../stores/employees/employeesSlice'
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

const EmployeesView = () => {
    const router = useRouter()
    const dispatch = useAppDispatch()
    const { employees } = useAppSelector((state) => state.employees)

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
              <title>{getPageTitle('View employees')}</title>
          </Head>
          <SectionMain>
            <SectionTitleLineWithButton icon={mdiChartTimelineVariant} title={removeLastCharacter('View employees')} main>
                <BaseButton
                  color='info'
                  label='Edit'
                  href={`/employees/employees-edit/?id=${id}`}
                />
            </SectionTitleLineWithButton>
            <CardBox>

                <div className={'mb-4'}>
                    <p className={'block font-bold mb-2'}>FirstName</p>
                    <p>{employees?.first_name}</p>
                </div>

                <div className={'mb-4'}>
                    <p className={'block font-bold mb-2'}>LastName</p>
                    <p>{employees?.last_name}</p>
                </div>

                <div className={'mb-4'}>
                    <p className={'block font-bold mb-2'}>Email</p>
                    <p>{employees?.email}</p>
                </div>

                <div className={'mb-4'}>
                    <p className={'block font-bold mb-2'}>Company</p>

                        <p>{employees?.company?.name ?? 'No data'}</p>

                </div>

                <>
                    <p className={'block font-bold mb-2'}>Attendances Employee</p>
                    <CardBox
                      className='mb-6 border border-gray-300 rounded overflow-hidden'
                      hasTable
                    >
                        <div className='overflow-x-auto'>
                            <table>
                            <thead>
                            <tr>

                                <th>WorkInTime</th>

                                <th>WorkInLatitude</th>

                                <th>WorkInLongitude</th>

                                <th>WorkOutTime</th>

                                <th>WorkOutLatitude</th>

                                <th>WorkOutLongitude</th>

                            </tr>
                            </thead>
                            <tbody>
                            {employees.attendances_employee && Array.isArray(employees.attendances_employee) &&
                              employees.attendances_employee.map((item: any) => (
                                <tr key={item.id} onClick={() => router.push(`/attendances/attendances-view/?id=${item.id}`)}>

                                    <td data-label="work_in_time">
                                        { dataFormatter.dateTimeFormatter(item.work_in_time) }
                                    </td>

                                    <td data-label="work_in_latitude">
                                        { item.work_in_latitude }
                                    </td>

                                    <td data-label="work_in_longitude">
                                        { item.work_in_longitude }
                                    </td>

                                    <td data-label="work_out_time">
                                        { dataFormatter.dateTimeFormatter(item.work_out_time) }
                                    </td>

                                    <td data-label="work_out_latitude">
                                        { item.work_out_latitude }
                                    </td>

                                    <td data-label="work_out_longitude">
                                        { item.work_out_longitude }
                                    </td>

                                </tr>
                              ))}
                            </tbody>
                        </table>
                        </div>
                        {!employees?.attendances_employee?.length && <div className={'text-center py-4'}>No data</div>}
                    </CardBox>
                </>

                <BaseDivider />

                <BaseButton
                    color='info'
                    label='Back'
                    onClick={() => router.push('/employees/employees-list')}
                />
              </CardBox>
          </SectionMain>
      </>
    );
};

EmployeesView.getLayout = function getLayout(page: ReactElement) {
    return (
      <LayoutAuthenticated>
          {page}
      </LayoutAuthenticated>
    )
}

export default EmployeesView;
