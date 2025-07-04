import React, { ReactElement, useEffect } from 'react';
import Head from 'next/head'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import dayjs from "dayjs";
import {useAppDispatch, useAppSelector} from "../../stores/hooks";
import {useRouter} from "next/router";
import { fetch } from '../../stores/company/companySlice'
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

const CompanyView = () => {
    const router = useRouter()
    const dispatch = useAppDispatch()
    const { company } = useAppSelector((state) => state.company)

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
              <title>{getPageTitle('View company')}</title>
          </Head>
          <SectionMain>
            <SectionTitleLineWithButton icon={mdiChartTimelineVariant} title={removeLastCharacter('View company')} main>
                <BaseButton
                  color='info'
                  label='Edit'
                  href={`/company/company-edit/?id=${id}`}
                />
            </SectionTitleLineWithButton>
            <CardBox>

                <div className={'mb-4'}>
                    <p className={'block font-bold mb-2'}>Name</p>
                    <p>{company?.name}</p>
                </div>

                <>
                    <p className={'block font-bold mb-2'}>Users Company</p>
                    <CardBox
                      className='mb-6 border border-gray-300 rounded overflow-hidden'
                      hasTable
                    >
                        <div className='overflow-x-auto'>
                            <table>
                            <thead>
                            <tr>

                                <th>First Name</th>

                                <th>Last Name</th>

                                <th>Phone Number</th>

                                <th>E-Mail</th>

                                <th>Disabled</th>

                            </tr>
                            </thead>
                            <tbody>
                            {company.users_company && Array.isArray(company.users_company) &&
                              company.users_company.map((item: any) => (
                                <tr key={item.id} onClick={() => router.push(`/users/users-view/?id=${item.id}`)}>

                                    <td data-label="firstName">
                                        { item.firstName }
                                    </td>

                                    <td data-label="lastName">
                                        { item.lastName }
                                    </td>

                                    <td data-label="phoneNumber">
                                        { item.phoneNumber }
                                    </td>

                                    <td data-label="email">
                                        { item.email }
                                    </td>

                                    <td data-label="disabled">
                                        { dataFormatter.booleanFormatter(item.disabled) }
                                    </td>

                                </tr>
                              ))}
                            </tbody>
                        </table>
                        </div>
                        {!company?.users_company?.length && <div className={'text-center py-4'}>No data</div>}
                    </CardBox>
                </>

                <>
                    <p className={'block font-bold mb-2'}>Attendances company</p>
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
                            {company.attendances_company && Array.isArray(company.attendances_company) &&
                              company.attendances_company.map((item: any) => (
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
                        {!company?.attendances_company?.length && <div className={'text-center py-4'}>No data</div>}
                    </CardBox>
                </>

                <>
                    <p className={'block font-bold mb-2'}>Companies company</p>
                    <CardBox
                      className='mb-6 border border-gray-300 rounded overflow-hidden'
                      hasTable
                    >
                        <div className='overflow-x-auto'>
                            <table>
                            <thead>
                            <tr>

                                <th>Name</th>

                                <th>Address</th>

                            </tr>
                            </thead>
                            <tbody>
                            {company.companies_company && Array.isArray(company.companies_company) &&
                              company.companies_company.map((item: any) => (
                                <tr key={item.id} onClick={() => router.push(`/companies/companies-view/?id=${item.id}`)}>

                                    <td data-label="name">
                                        { item.name }
                                    </td>

                                    <td data-label="address">
                                        { item.address }
                                    </td>

                                </tr>
                              ))}
                            </tbody>
                        </table>
                        </div>
                        {!company?.companies_company?.length && <div className={'text-center py-4'}>No data</div>}
                    </CardBox>
                </>

                <BaseDivider />

                <BaseButton
                    color='info'
                    label='Back'
                    onClick={() => router.push('/company/company-list')}
                />
              </CardBox>
          </SectionMain>
      </>
    );
};

CompanyView.getLayout = function getLayout(page: ReactElement) {
    return (
      <LayoutAuthenticated>
          {page}
      </LayoutAuthenticated>
    )
}

export default CompanyView;
