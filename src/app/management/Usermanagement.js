import { Link, useHistory } from 'react-router-dom';
import React, { useMemo, useState, useEffect } from 'react';
import { render } from 'react-dom';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import CustomizeModal from '../component/CustomizeModal';
import EditUser from './EditUser'
import { getUserApi } from '../../api/getUserApi';
import { deleteUserApi } from '../../api/deleteUserApi';
//import { deleteUserApi } from '../../api/deleteUserApi';
import { getOneUserApi } from '../../api/getOneUserApi';
import { getRolesApi } from '../../api/getRolesApi';


const Usermanagement = () => {
 
  const history = useHistory(); 
  
  const [userData, setUserData] = useState([]);
  const [userOneData, setUserOneData] = useState({})
  const [show, setShow] = useState(false);
  const [display, setdisplay] = useState(false)
  const [userid, setUserid] = useState()
  const [userRolesData, setUserRolesData] = useState()

  const [data, setData] = useState('')

  const [Name, setName] = useState();
  const [Mnumber, setMnumber] = useState();
  const [Email, setEmail] = useState();
  const [designationlevel, setDesignationlevel] = useState();
  
  const[gridColumnApi,setGridColumnApi]=useState(null)
  const[gridApi,setGridApi]=useState(null)
  const[rowData,setRowData]=useState()
 
 

  useEffect(() => {
    handleGetUserApiCall()
   
  }, []);

  useEffect(() => {
    setName(userOneData?.name)
    setMnumber(userOneData?.contact)
    setEmail(userOneData?.email)
    setDesignationlevel(userOneData?.designation)
  }, [userOneData])


  useEffect(() => {
    handleGetRolesApiCall()
    
  }, [])

  // useEffect(()=>{
  //   setData(userRolesData.find(data=> data.id+"" === designationlevel))
  // },[designationlevel])

  const handleGetUserApiCall = async () => {
    const result = await getUserApi();
    if (result?.data?.message) {
      setRowData([])
    } else {
      setRowData(result.data || [])
    }
  }

  const handleDeleteUserApiCall = async (id) => {
    const result = await deleteUserApi(id);
    // setUserData(result.data)
    handleGetUserApiCall()
  }

  const handleGetOneUserApiCall = async (id) => {
    const result = await getOneUserApi(id);
    if (result) { setdisplay(true) }
    setUserOneData(result.data)
  }

  const handleGetRolesApiCall = async () => {
    const result = await getRolesApi();
    setUserRolesData(result.data)
  };


  
  // const ViewUserDetailPage = p => <><Link to={`/UserDetailPage/${p.data.userid}`}  >View User Detail  Page </Link></>;

  const DeleteAction = () => { handleDeleteUserApiCall(userid); setShow(false); console.log('delete') }

  const TabelAction = p => <>
    <div className='cursor-pointer'>
      <svg onClick={(() => { setdisplay(true); setUserOneData(p.data) })} fill="#000000" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30" width="20px" height="20px">    <path d="M 22.828125 3 C 22.316375 3 21.804562 3.1954375 21.414062 3.5859375 L 19 6 L 24 11 L 26.414062 8.5859375 C 27.195062 7.8049375 27.195062 6.5388125 26.414062 5.7578125 L 24.242188 3.5859375 C 23.851688 3.1954375 23.339875 3 22.828125 3 z M 17 8 L 5.2597656 19.740234 C 5.2597656 19.740234 6.1775313 19.658 6.5195312 20 C 6.8615312 20.342 6.58 22.58 7 23 C 7.42 23.42 9.6438906 23.124359 9.9628906 23.443359 C 10.281891 23.762359 10.259766 24.740234 10.259766 24.740234 L 22 13 L 17 8 z M 4 23 L 3.0566406 25.671875 A 1 1 0 0 0 3 26 A 1 1 0 0 0 4 27 A 1 1 0 0 0 4.328125 26.943359 A 1 1 0 0 0 4.3378906 26.939453 L 4.3632812 26.931641 A 1 1 0 0 0 4.3691406 26.927734 L 7 26 L 5.5 24.5 L 4 23 z" /></svg>
      &nbsp; &nbsp;
      <svg onClick={(() => { setShow(true); setUserid(p.data.userid) })} fill="#000000" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30" width="20px" height="20px">    <path d="M 14.984375 2.4863281 A 1.0001 1.0001 0 0 0 14 3.5 L 14 4 L 8.5 4 A 1.0001 1.0001 0 0 0 7.4863281 5 L 6 5 A 1.0001 1.0001 0 1 0 6 7 L 24 7 A 1.0001 1.0001 0 1 0 24 5 L 22.513672 5 A 1.0001 1.0001 0 0 0 21.5 4 L 16 4 L 16 3.5 A 1.0001 1.0001 0 0 0 14.984375 2.4863281 z M 6 9 L 7.7929688 24.234375 C 7.9109687 25.241375 8.7633438 26 9.7773438 26 L 20.222656 26 C 21.236656 26 22.088031 25.241375 22.207031 24.234375 L 24 9 L 6 9 z" /></svg>
    </div></>

  const [columnDefs] = useState([
  
    { headerName: 'User Id', field: 'userid', width: 100 },
    { headerName: 'User Name', field: 'name' },
    { headerName: 'User Role', field: 'designation' },
    { headerName: 'User Email', field: 'email', width: 250 },
    { headerName: 'isActive', field: 'isactive', width: 120 },
    { headerName: 'Actions', field: 'Actions', cellRenderer: TabelAction, filter: false },

  ]);

  function onGridReady(Params){
    setGridApi(Params.api)
    setGridColumnApi(Params.columnApi);
  }

  const defaultColDef = useMemo(() => ({
    sortable: true,
    filter: true,
   
  }))
  
  const onRowClicked=(p)=>{

    if(p.value !== undefined){
      history.push(`/UserDetailPage/${p.data.userid}`)
     
    }
  
  }

  return (<>
 
    <div className='user-module'>
      <div className="row">
        <div className='col-12 '>
          <Link to="/management/AddUser" className=' text-white text-decoration-none '>
            <button type="button" className="btn btn-gradient-info btn-rounded btn-fw  m-4 float-left ">  Add User</button></Link>
        </div>

        <div className="col-12 grid-margin">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">All User</h4>
              <div className="ag-theme-alpine" style={{ height: 500, }}>
                <AgGridReact
                  onGridReady={onGridReady}
                  rowData={rowData || []}
                  columnDefs={columnDefs}
                  defaultColDef={defaultColDef}
                  paginationAutoPageSize={true}
                  pagination={true}
                  onCellClicked={onRowClicked}

                />
              </div>
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

    {display && <EditUser display={display} userid={userid} setdisplay={setdisplay} userOneData={userOneData} handleGetUserApiCall={handleGetUserApiCall} userRolesData={userRolesData}></EditUser>}
  </>
  )
}

export default Usermanagement