import React, { Component, Suspense, lazy } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Spinner from '../app/shared/Spinner';
import Layout from './component/Layout/layout';

const AllProject = lazy(() => import('./projectlist/AllProject'));
const BehindSchedule = lazy(() => import('./projectlist/BehindSchedule'));
const Completed = lazy(() => import('./projectlist/Completed'));
const OnHold = lazy(() => import('./projectlist/OnHold'));
const OnTrack = lazy(() => import('./projectlist/OnTrack'))
const InTrouble = lazy(() => import('./projectlist/InTrouble'))
const Dashboard = lazy(() => import('./dashboard/Dashboard'));
const AddProject = lazy(() => import('./project/AddProject'));
const Usermanagement = lazy(() => import('./management/Usermanagement'));
const AddUser = lazy(() => import('./management/AddUser'))
const ProjectDetailPage = lazy(() => import('./project/ProjectDetailPage'))
const ProjectPhaseDetailPage = lazy(() => import('./projectPhase/ProjectPhaseDetailPage'))
const Profile = lazy(() => import('./user-pages/Profile'))
const ViewUserDetailPage = lazy(() => import('./management/ViewUserDetailPage'))
const Login = lazy(() => import('./user-pages/Login'))
const ForgetPassword = lazy(() => import('./user-pages/ForgetPassword'))
const ResetPassword = lazy(() => import('./user-pages/ResetPassword'))
const RolePermissions =lazy(()=>import('./permission/RolePermissions'))


function AppRoutes() {

  return (
    <Suspense fallback={<Spinner />}>
      <Switch>
        <Route path='/login' component={Login} />
        <Route path='/forgetpassword' component={ForgetPassword} />
        <Route path='/resetpassword' component={ResetPassword} />
        <Route exact path="/"  ><Layout><Dashboard /></Layout></Route>
        <Route path="/addproject" ><Layout><AddProject /></Layout></Route>
        <Route path="/profile" ><Layout><Profile /></Layout></Route>
        <Route path="/management/usermanagement"><Layout><Usermanagement /></Layout></Route>
        <Route path="/ProjectDetailPage/:id" children={<Layout><ProjectDetailPage /></Layout>}></Route>
        <Route path="/UserDetailPage/:id" children={<Layout><ViewUserDetailPage /></Layout>}></Route>
        <Route path="/ProjectPhaseDetailPage/:id" children={<Layout><ProjectPhaseDetailPage /></Layout>}></Route>
        <Route path="/management/AddUser"><Layout><AddUser /></Layout></Route>
        <Route path="/projectlist/allproject"><Layout><AllProject /></Layout></Route>
        <Route path="/projectlist/behindschedule"><Layout><BehindSchedule /></Layout></Route>
        <Route path="/projectlist/completed"><Layout><Completed /></Layout></Route>
        <Route path="/projectlist/introuble"><Layout><InTrouble /></Layout></Route>
        <Route path="/projectlist/onhold"><Layout><OnHold /></Layout></Route>
        <Route path="/projectlist/ontrack"><Layout><OnTrack /></Layout></Route>
        <Route path="/RolePermissions" ><Layout><RolePermissions/></Layout></Route>
        {/* <Redirect to="/dashboard" /> */}
      </Switch>
    </Suspense>
  );
}

export default AppRoutes;