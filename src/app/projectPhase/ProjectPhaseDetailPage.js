import React, { useState, useEffect } from 'react'
import { Form } from 'react-bootstrap';
import { useParams,useLocation } from 'react-router-dom'
import { getProjectOnePhase } from '../../api/getProjectOnePhase'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { getRolesApi } from '../../api/getRolesApi';

import ProjectPhaseTask from '../projectPhaseTask/ProjectPhaseTask';
import { useHistory } from 'react-router-dom';
import { useSelector } from "react-redux";
import {getDesignatedUsersOnPhaseApi} from '../../api/getDesignatedUsersOnPhase'
import { assignUserToProjectPhaseApi } from '../../api/postAssignUserToProjectPhaseApi.js'
import{getOneProjectPhaseAssignUsersApi} from '../../api/getOneProjectPhaseAssignUsersApi'
import CustomizeModal from '../component/CustomizeModal';
import {deleteUserOnProjectPhase} from '../../api/putdeleteUserOnProjectPhase'

const ProjectPhaseDetailPage = () => {
  let { id } = useParams();
  // const location =useLocation()
  const Project = useSelector((state) => state.project.ProjectDetail);
  const UserDetail = useSelector((state) => state.home.userDetail);

  const history = useHistory();
  const [key, setKey] = useState('home');
  const [projectOnePhase, setProjectOnePhase] = useState([]);
  const [designation, setDesignation] = useState()
  const [userRolesData, setUserRolesData] = useState([])
  const [userName, setUserName] = useState([])
  const [designationUserName, setDesignationUserName] = useState([])
  const [designatedUser, setDesignatedUser] = useState()
  const[phaseId,setphaseId]=useState()
 const[projectOnePhaseUsersData,setProjectOnePhaseUsersData] =useState([])
 const [show, setShow] = useState(false);
 const [userId, setUserId] = useState();
  // useEffect(()=>{
  //   const queryParam = new URLSearchParams(location.search())
  //   const singleValue = queryParam.get('key')

  // })



  useEffect(() => {
    handleGetOneProjectPhaseApiCall()
    handleGetRolesApiCall()
   
  }, [])

  useEffect(() => {
    handleGetDesignatedProjectUserApiCall()
  }, [designation])

  useEffect(()=>{
    phaseId && handleGetOneProjectPhaseUsersApiCall()
  },[phaseId])

  const handleGetOneProjectPhaseApiCall = async () => {
    const result = await getProjectOnePhase(id);
    setProjectOnePhase(result.data)
  
    setphaseId(result.data.id)

  }

  const handleGetRolesApiCall = async () => {
    const result = await getRolesApi();
    setUserRolesData(result.data)
  };

  const handleGetDesignatedProjectUserApiCall = async () => {
    const obj ={'projectname':Project.projectname,"designation":designation,}

    const result = await getDesignatedUsersOnPhaseApi(obj);
    setUserName(result.data)
   
  }

  const BackToPage=()=>{
    // history.push("/ProjectDetailPage/{id}");
  }


  const handlePostAssignUserToProjectPhase = async () => {
    const requestBody = {
      "userid":designatedUser,
      "projectname":Project.projectname,
      "assignedonphaseby":UserDetail?.id
    }
    console.log(requestBody)
    const result = await assignUserToProjectPhaseApi(phaseId, requestBody);
    handleGetOneProjectPhaseUsersApiCall(phaseId)
  }
 
  const handleGetOneProjectPhaseUsersApiCall = async (data) => {
    const result = await getOneProjectPhaseAssignUsersApi(phaseId);
    console.log(result)
    setProjectOnePhaseUsersData(result.data)
  }

  const handleDeleteUserFromPhase=async()=>{
    const obj ={
      userid :userId
    }
    const result=await deleteUserOnProjectPhase(phaseId,obj)
    // console.log(result)
    handleGetOneProjectPhaseUsersApiCall()  
  } 



  const DeleteAction = () => { setShow(false); handleDeleteUserFromPhase() }
  
  const TabelAction = (p) => <><div className='cursor-pointer'>
    
    <svg onClick={(() => { setShow(true); setUserId(p.data.userid); })} fill="#000000" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30" width="20px" height="20px">    <path d="M 14.984375 2.4863281 A 1.0001 1.0001 0 0 0 14 3.5 L 14 4 L 8.5 4 A 1.0001 1.0001 0 0 0 7.4863281 5 L 6 5 A 1.0001 1.0001 0 1 0 6 7 L 24 7 A 1.0001 1.0001 0 1 0 24 5 L 22.513672 5 A 1.0001 1.0001 0 0 0 21.5 4 L 16 4 L 16 3.5 A 1.0001 1.0001 0 0 0 14.984375 2.4863281 z M 6 9 L 7.7929688 24.234375 C 7.9109687 25.241375 8.7633438 26 9.7773438 26 L 20.222656 26 C 21.236656 26 22.088031 25.241375 22.207031 24.234375 L 24 9 L 6 9 z" /></svg>
    
  </div></>

  // const defaultColDef = useMemo(() => ({
  //   sortable: true,
  //   filter: true
  // }))

  const [columnDefs] = useState([
    { headerName: 'Actions', field: 'Actions', cellRenderer: TabelAction, filter: false },
    { headerName: 'Id', field: 'id' },
    { headerName: 'Name', field: 'nameofuser' },
    { headerName: 'Desgination', field: 'designation' },
    { headerName: 'Status', field: 'employeestatusphase' },
  
    // { headerName: 'Detail' ,field: 'Detail' ,cellRenderer:ViewDetailProjectPage,filter:false }   ,
  ]);

  return (
    <>

      <div className='add-project'>

        <div className='row'>
          <div className="col-12 ">
            <div className='w-30 p-4' >
              <i onClick={ BackToPage} className="mdi mdi-arrow-left-bold-circle-outline  back-icon "></i>
            </div>
          </div>
          <div className="col-12 grid-margin">
            <div className="card pd-box">
              <div className="card-body">

                <h4 className="card-title mb-4">Phase Detail </h4>
                <form className="form-sample ml-2">
                  {/* <p className="card-description"> Personal info </p> */}
                  <div className="row">
                    <div className="col-md-6">
                      <Form.Group className="row">
                        <div className='col-sm-4 disp-text'>
                          <label className=" col-form-label">Name</label>
                          <span>:</span>
                        </div>

                        <div className="col-sm-8">
                          {projectOnePhase.phasename}
                        </div>
                      </Form.Group>
                    </div>
                    <div className="col-md-6">
                      <Form.Group className="row">
                        <div className='col-sm-4 disp-text'>
                          <label className=" col-form-label">Weightage</label>
                          <span>:</span>
                        </div>

                        <div className="col-sm-8">
                          {projectOnePhase.phaseweightage}
                        </div>
                      </Form.Group>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      <Form.Group className="row">
                        <div className='col-sm-4 disp-text'>
                          <label className=" col-form-label">Start Date</label>
                          <span>:</span>
                        </div>

                        <div className="col-sm-8">
                          {projectOnePhase.phasestartdate}
                        </div>
                      </Form.Group>
                    </div>
                    <div className="col-md-6">
                      <Form.Group className="row">
                        <div className='col-sm-4 disp-text'>
                          <label className=" col-form-label">End Date</label>
                          <span>:</span>
                        </div>

                        <div className="col-sm-8">
                          {projectOnePhase.phaseenddate}
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
                  <Tab eventKey="home" title="User Deployed On Phase ">


                    <div className="col-12 grid-margin">
                      <div className="card">
                        <div className="card-body">
                          <h4 className="card-title">Assign User  </h4>
                          <div className='row'>
                            <div className="col-md-3">
                              <Form.Group className="row">
                                <label className="col-sm-3 col-form-label">Role</label>
                                <div className="col-sm-9">
                                  <select className="form-control" onChange={(e) => setDesignation(e.target.value)}>
                                    <option value="" disabled selected>Select your option</option>
                                    {userRolesData.map(function (value) {
                                      return <option value={value.rolename}>{value.rolename}</option>
                                    })}
                                  </select>
                                </div>
                              </Form.Group>
                            </div>
                            <div className="col-md-3">
                              <Form.Group className="row">
                                <label className="col-sm-3 col-form-label">Name</label>
                                <div className="col-sm-9">
                                  <select className="form-control"
                                    onChange={(e) => {
                                      const val = (e.target.value).split("___")
                                      
                                        setDesignatedUser(val[0])
                                        setDesignationUserName(val[1])
                                    }} >
                                    <option  selected>Select your User</option>
                                    {userName.map(function (value) {
                                      return <option value={`${value.userid}___${value.name}`}  >{value.name}</option>
                                    })}
                                  </select>
                                </div>
                              </Form.Group>
                            </div>
                            <div className="col-md-3">
                              <button type="button" className="btn btn-gradient-info  btn-fw  text-white text-decoration-none" onClick={() => handlePostAssignUserToProjectPhase()}> Assign User </button>
                            </div>
                          </div>
                          <h4 className="card-title">User Deployed</h4>
                          <div className="ag-theme-alpine" style={{ height: 400, }}>
                            {/* {projectoneUsersdata ? */}

                            <AgGridReact
                              rowData={projectOnePhaseUsersData || []}
                              columnDefs={columnDefs}
                              // defaultColDef={defaultColDef}
                              pagination={true}
                            />
                            {/* :
                            "Loading"
                          } */}
                          </div>
                        </div>
                      </div>
                    </div>

                  </Tab>
                  <Tab eventKey="profile" title="Task">
                    <ProjectPhaseTask  />
                    {/* <ProjectPhase ProjectName={ProjectName} projectPhase={projectPhase} handleGetProjectPhaseApiCall={handleGetProjectPhaseApiCall} /> */}
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

export default ProjectPhaseDetailPage