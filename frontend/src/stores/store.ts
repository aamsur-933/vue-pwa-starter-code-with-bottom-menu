import { configureStore } from '@reduxjs/toolkit';
import styleReducer from './styleSlice';
import mainReducer from './mainSlice';
import authSlice from './authSlice';

import usersSlice from "./users/usersSlice";
import attendancesSlice from "./attendances/attendancesSlice";
import companiesSlice from "./companies/companiesSlice";
import employeesSlice from "./employees/employeesSlice";
import rolesSlice from "./roles/rolesSlice";
import permissionsSlice from "./permissions/permissionsSlice";
import companySlice from "./company/companySlice";

export const store = configureStore({
  reducer: {
    style: styleReducer,
    main: mainReducer,
    auth: authSlice,

users: usersSlice,
attendances: attendancesSlice,
companies: companiesSlice,
employees: employeesSlice,
roles: rolesSlice,
permissions: permissionsSlice,
company: companySlice,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
