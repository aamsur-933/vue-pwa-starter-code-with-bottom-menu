import React, { ReactElement, useEffect } from 'react';
import Head from 'next/head'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import dayjs from "dayjs";
import {useAppDispatch, useAppSelector} from "../../stores/hooks";
import {useRouter} from "next/router";
import { fetch } from '../../stores/companies/companiesSlice'
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

const CompaniesView = () => {
    const router = useRouter()
    const dispatch = useAppDispatch()
    const { companies } = useAppSelector((state) => state.companies)

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
              <title>{getPageTitle('View companies')}</title>
          </Head>
          <SectionMain>
            <SectionTitleLineWithButton icon={mdiChartTimelineVariant} title={removeLastCharacter('View companies')} main>
                <BaseButton
                  color='info'
                  label='Edit'
                  href={`/companies/companies-edit/?id=${id}`}
                />
            </SectionTitleLineWithButton>
            <CardBox>

                <div className={'mb-4'}>
                    <p className={'block font-bold mb-2'}>Name</p>
                    <p>{companies?.name}</p>
                </div>

                <div className={'mb-4'}>
                    <p className={'block font-bold mb-2'}>Address</p>
                    <p>{companies?.address}</p>
                </div>

                <div className={'mb-4'}>
                    <p className={'block font-bold mb-2'}>company</p>

                        <p>{companies?.company?.name ?? 'No data'}</p>

                </div>

                <>
                    <p className={'block font-bold mb-2'}>Employees Company</p>
                    <CardBox
                      className='mb-6 border border-gray-300 rounded overflow-hidden'
                      hasTable
                    >
                        <div className='overflow-x-auto'>
                            <table>
                            <thead>
                            <tr>

                                <th>FirstName</th>

                                <th>LastName</th>

                                <th>Email</th>

                            </tr>
                            </thead>
                            <tbody>
                            {companies.employees_company && Array.isArray(companies.employees_company) &&
                              companies.employees_company.map((item: any) => (
                                <tr key={item.id} onClick={() => router.push(`/employees/employees-view/?id=${item.id}`)}>

                                    <td data-label="first_name">
                                        { item.first_name }
                                    </td>

                                    <td data-label="last_name">
                                        { item.last_name }
                                    </td>

                                    <td data-label="email">
                                        { item.email }
                                    </td>

                                </tr>
                              ))}
                            </tbody>
                        </table>
                        </div>
                        {!companies?.employees_company?.length && <div className={'text-center py-4'}>No data</div>}
                    </CardBox>
                </>

                <BaseDivider />

                <BaseButton
                    color='info'
                    label='Back'
                    onClick={() => router.push('/companies/companies-list')}
                />
              </CardBox>
          </SectionMain>
      </>
    );
};

CompaniesView.getLayout = function getLayout(page: ReactElement) {
    return (
      <LayoutAuthenticated>
          {page}
      </LayoutAuthenticated>
    )
}

export default CompaniesView;
