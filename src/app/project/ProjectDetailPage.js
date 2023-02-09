import React, { useState, useEffect, useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from "react-redux";
import { Form } from "react-bootstrap";
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import CustomizeModal from '../component/CustomizeModal';
import { getRolesApi } from '../../api/getRolesApi';
import { getDesignatedUsersApi } from '../../api/getDesignatedUsers';
import { assignUserToProjectApi } from '../../api/postAssignUserToProjectApi'
import { getOneProjectApi } from '../../api/getOneProjectApi';
import { getOneProjecAssignUsersApi } from '../../api/getOneProjectAssignUsersApi';
import { deleteUserOnProjectApi } from '../../api/deleteUserOnProject';
import { getProjectPhaseApi } from '../../api/getProjectPhaseApi';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

import {  useDispatch } from 'react-redux'
import { getProjectDetail } from '../../redux/slices/ProjectNameSlice'

import ProjectPhase from '../projectPhase/ProjectPhase';

const ProjectDetailPage = () => {
  const dispatch = useDispatch();
  let { id } = useParams();
  const userDetail = useSelector((state) => state.home.userDetail);

  const [projectonedata, setProjectOneData] = useState({});
  //const[projectid,setProjectId]=useState('')
  const [projectoneUsersdata, setProjectOneUsersData] = useState([]);
  const [ProjectName, setProjectName] = useState()
  const [show, setShow] = useState(false);
  const [userId, setUserId] = useState();
  const [designation, setDesignation] = useState()
 
  const [userName, setUserName] = useState([])
  const [userRolesData, setUserRolesData] = useState([])
  const [designationUserName, setDesignationUserName] = useState([])
  const [designatedUser, setDesignatedUser] = useState()
  const [key, setKey] = useState('home');
  const [projectPhase, setProjectPhase] = useState([])


  useEffect(() => {
    handleGetOneProjectApiCall(id)
  }, [])

  useEffect(() => {
    handleGetDesignatedUserApiCall()
  }, [designation])
  


  const handleGetOneProjectApiCall = async (projectid) => {
    const result = await getOneProjectApi(id);
    setProjectOneData(result.data)
    dispatch(getProjectDetail(result.data))
    const ProjectName = result.data.projectname
   
    
    handleGetOneProjectUsersApiCall(ProjectName)
    handleGetProjectPhaseApiCall(ProjectName)
    setProjectName(ProjectName)
    handleGetRolesApiCall()
  }

  const handleGetOneProjectUsersApiCall = async (data) => {
    const result = await getOneProjecAssignUsersApi(data);
    // console.log(result)
    setProjectOneUsersData(result.data)
  }
  const handleGetProjectPhaseApiCall = async (data) => {
    const result = await getProjectPhaseApi(data);
    
    
    if(result?.status){
      setProjectPhase(result.data)
     
    }else{
      
      console.log(result?.data?.message);
    }
   

    // if(result.data){
    //   setProjectPhase(result.data)
    // }else{
    //   setProjectPhase([])
    // }
  }



  const handleDeleteUseronProjectApiCall = async () => {
    const requestBody = {
      "userid": userId
    }
    const result = await deleteUserOnProjectApi(ProjectName, requestBody);
    handleGetOneProjectUsersApiCall(ProjectName)
    // handleGetProjectPhaseApiCall(ProjectName)
  }




  const handleGetRolesApiCall = async () => {
    const result = await getRolesApi();
    setUserRolesData(result.data)
  };

  const handleGetDesignatedUserApiCall = async () => {
    const result = await getDesignatedUsersApi(designation);
   
    setUserName(result.data)
  }

  const handlePostAssignUserToProject = async () => {
    const requestBody = {
      "userid": designatedUser,
      "designation": designation,
      "nameofuser": designationUserName,
      "assignedby": userDetail.userid,
      "employeestatus": "deployed"
    }
    console.log(requestBody)
    const result = await assignUserToProjectApi(ProjectName, requestBody);
    handleGetOneProjectUsersApiCall(ProjectName)


  }

  const DeleteAction = () => { console.log("delete now"); setShow(false); handleDeleteUseronProjectApiCall(ProjectName) }
  const TabelAction = (p) => <><div className='cursor-pointer'>
    
    <svg onClick={(() => { setShow(true); setUserId(p.data.userid); })} fill="#000000" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30" width="20px" height="20px">    <path d="M 14.984375 2.4863281 A 1.0001 1.0001 0 0 0 14 3.5 L 14 4 L 8.5 4 A 1.0001 1.0001 0 0 0 7.4863281 5 L 6 5 A 1.0001 1.0001 0 1 0 6 7 L 24 7 A 1.0001 1.0001 0 1 0 24 5 L 22.513672 5 A 1.0001 1.0001 0 0 0 21.5 4 L 16 4 L 16 3.5 A 1.0001 1.0001 0 0 0 14.984375 2.4863281 z M 6 9 L 7.7929688 24.234375 C 7.9109687 25.241375 8.7633438 26 9.7773438 26 L 20.222656 26 C 21.236656 26 22.088031 25.241375 22.207031 24.234375 L 24 9 L 6 9 z" /></svg>
    
  </div></>

  const defaultColDef = useMemo(() => ({
    sortable: true,
    filter: true
  }))

  const [columnDefs] = useState([
    { headerName: 'Actions', field: 'Actions', cellRenderer: TabelAction, filter: false },
    { headerName: 'Id', field: 'userid' },
    { headerName: 'Name', field: 'nameofuser' },
    { headerName: 'Desgination', field: 'userdesignation' },
    { headerName: 'Status', field: 'employeestatus' },
  
    // { headerName: 'Detail' ,field: 'Detail' ,cellRenderer:ViewDetailProjectPage,filter:false }   ,
  ]);



  return (<>
  
    <div className='add-project'>
      <div className='row'>
        <div className="col-12 grid-margin">
          <div className="card pd-box">
            <div className="card-body">
              <h4 className="card-title mb-4">Project Detail </h4>
              <form className="form-sample ml-2">
                {/* <p className="card-description"> Personal info </p> */}
                <div className="row">
                  <div className="col-md-6">
                    <Form.Group className="row">
                      <div className='col-sm-4 disp-text'>
                        <label className=" col-form-label">Project Name </label>
                        {/* <span>:</span> */}
                      </div>

                      <div className="col-sm-8">
                        {projectonedata.projectname}
                      </div>
                    </Form.Group>
                  </div>
                  <div className="col-md-6">
                    <Form.Group className="row">
                      <div className='col-sm-4 disp-text'>
                        <label className=" col-form-label">Project Address</label>
                        {/* <span>:</span> */}
                      </div>
                      <div className="col-sm-8">
                        {projectonedata.projectaddress}
                      </div>
                    </Form.Group>
                  </div>
                </div>
                {userDetail?.designation === "Admin" || userDetail?.designation === "Superadmin" ?
                  <div className="row">
                    <div className="col-md-6">
                      <Form.Group className="row">
                        <div className='col-sm-4 disp-text'>
                          <label className=" col-form-label">Owner Name</label>
                          {/* <span>:</span> */}
                        </div>
                        <div className="col-sm-8">
                          {projectonedata.owner}
                        </div>
                      </Form.Group>
                    </div>
                    <div className="col-md-6">
                      <Form.Group className="row">
                        <div className='col-sm-4 '>
                          <label className=" col-form-label">Owner Contact No.</label>
                          {/* <span>:</span> */}
                        </div>
                        <div className="col-sm-8">
                          {projectonedata.ownercontact}
                        </div>
                      </Form.Group>
                    </div>
                  </div> : ""}
                {userDetail?.designation === "Admin" || userDetail?.designation === "Superadmin" ?
                  <div className="row">
                    <div className="col-md-6">
                      <Form.Group className="row">
                        <div className='col-sm-4 disp-text'>
                          <label className=" col-form-label">Owner Email </label>
                          {/* <span>:</span> */}
                        </div>
                        <div className="col-sm-8">
                          {projectonedata.owneremail}
                        </div>
                      </Form.Group>
                    </div>
                    <div className="col-md-6">
                      <Form.Group className="row">
                        <div className='col-sm-4 disp-text'>
                          <label className=" col-form-label">Estimated Cost</label>
                          {/* <span>:</span> */}
                        </div>
                        <div className="col-sm-8">
                          {projectonedata.estimatedcost}
                        </div>
                      </Form.Group>
                    </div>
                  </div> : ""}
                <div className="row">
                  <div className="col-md-6">
                    <Form.Group className="row">
                      <div className='col-sm-4 disp-text'>
                        <label className=" col-form-label">Start Date </label>
                        {/* <span>:</span> */}
                      </div>
                      <div className="col-sm-8">
                        {projectonedata.startdate}
                      </div>
                    </Form.Group>
                  </div>
                  <div className="col-md-6">
                    <Form.Group className="row">
                      <div className='col-sm-4 disp-text'>
                        <label className=" col-form-label">End Date </label>
                        {/* <span>:</span> */}
                      </div>
                      <div className="col-sm-8">
                        {projectonedata.enddate}
                      </div>
                    </Form.Group>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <Form.Group className="row">
                      <div className='col-sm-4 disp-text'>
                        <label className=" col-form-label">Principal Arcitect </label>
                        {/* <span>:</span> */}
                      </div>
                      <div className="col-sm-8">
                        {projectonedata.principalarchitect}
                      </div>
                    </Form.Group>
                  </div>
                  <div className="col-md-6">
                    <Form.Group className="row">
                      <div className='col-sm-4 disp-text'>
                        <label className=" col-form-label">Project Manager </label>
                        {/* <span>:</span> */}
                      </div>
                      <div className="col-sm-8">
                        {projectonedata.projectmanager}
                      </div>
                    </Form.Group>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <Form.Group className="row">
                      <div className='col-sm-4 disp-text'>
                        <label className=" col-form-label">City </label>
                        {/* <span>:</span> */}
                      </div>
                      <div className="col-sm-8">
                        {projectonedata.city}
                      </div>
                    </Form.Group>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>





        <div className="col-12 grid-margin">
          <div className="card">
            <div className="card-body">
              <Tabs
                id="controlled-tab-example"
                activeKey={key}
                onSelect={(k) => setKey(k)}
                className="mb-3"
              >
                <Tab eventKey="home" title="User Deployed">


                  <div className="col-12 grid-margin">
                    <div className="card">
                      <div className="card-body">
                        <h4 className="card-title">Assign User  </h4>
                        <div className='row'>
                          <div className="col-md-4">
                            <Form.Group className='form-box'>
                              <label className=" col-form-label">Role</label>
                              <div>
                                <select className="form-control" onChange={(e) => setDesignation(e.target.value)}>
                                  <option value="" disabled selected>Select your option</option>
                                  {userRolesData.map(function (value) {
                                    return <option value={value.rolename}>{value.rolename}</option>
                                  })}
                                </select>
                              </div>
                            </Form.Group>
                          </div>
                          <div className="col-md-4">
                            <Form.Group className='form-box'>
                              <label className=" col-form-label">Name</label>
                              <div>
                                <select className="form-control"
                                  onChange={(e) => {
                                    const val = (e.target.value).split("___")
                                    console.log(val)
                                    setDesignatedUser(val[0])
                                    setDesignationUserName(val[1])
                                  }} >
                                  <option value="" disabled selected>Select your User</option>
                                  {userName.map(function (value) {
                                    return <option value={`${value.userid}___${value.name}`}  >{value.name}</option>
                                  })}
                                </select>
                              </div>
                            </Form.Group>
                          </div>
                          <div className="col-md-4">
                            <button type="button" className="btn btn-gradient-info  btn-fw  text-white text-decoration-none" onClick={() => handlePostAssignUserToProject(ProjectName)}> Assign User </button>
                          </div>
                        </div>
                        <h4 className="card-title">User Deployed</h4>
                        <div className="ag-theme-alpine" style={{ height: 400, }}>
                          {projectoneUsersdata ?
                            // <></>
                            <AgGridReact
                              rowData={projectoneUsersdata || []}
                              columnDefs={columnDefs}
                              defaultColDef={defaultColDef}
                              pagination={true}
                            />
                            :
                            "Loading"
                          }
                        </div>
                      </div>
                    </div>
                  </div>

                </Tab>
                <Tab eventKey="profile" title="Phase">
                  <ProjectPhase ProjectName={ProjectName} projectPhase={projectPhase} handleGetProjectPhaseApiCall={handleGetProjectPhaseApiCall}  />
                </Tab>
            
              </Tabs>

            </div>
          </div>
        </div>
      </div>
    </div>
    <CustomizeModal
      show={show}
      handleClose={() => setShow(false)}
      handleShow={() => setShow(true)}
      modalTitle="Confirmation!"
      onClick={DeleteAction}
      Action="Delete"
    >
      Are you want to Delete?
    </CustomizeModal>



  </>
  )
}

export default ProjectDetailPage