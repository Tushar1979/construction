import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Form } from 'react-bootstrap'
import { getOneUserApi } from '../../api/getOneUserApi';
const ViewUserDetailPage = () => {

  let { id } = useParams();
  const [userOneData, setUserOneData] = useState({})
  //const[userid,setUserId]=useState('');

  useEffect(() => {
    // setUserId(id)
    handleGetOneUserApiCall()
  }, [])

  const handleGetOneUserApiCall = async (userid) => {
    const result = await getOneUserApi(id);
    setUserOneData(result.data)
  }
  
  console.log(userOneData)


  return (<>
    <div className="col-12 grid-margin">
      <div className="card pd-box">
        <div className="card-body">
          <h4 className="card-title mb-4">User Detail </h4>
          <form className="form-sample  ml-2">
            {/* <p className="card-description"> Personal info </p> */}
            <div className="row">
              <div className="col-md-6">
    

              <Form.Group className="row">
                    <div className='col-sm-4 disp-text'>
                        <label className=" col-form-label">Name</label>
                        <span>:</span>
                    </div>
                   
                    <div className="col-sm-8">
                    {userOneData.name} 
                    </div>
                  </Form.Group>


              </div>
              <div className="col-md-6">

              <Form.Group className="row">
                    <div className='col-sm-4 disp-text'>
                        <label className=" col-form-label">Contact Number</label>
                        <span>:</span>
                    </div>
                   
                    <div className="col-sm-8">
                    {userOneData.contact} 
                    </div>
                  </Form.Group>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
              <Form.Group className="row">
                    <div className='col-sm-4 disp-text'>
                        <label className=" col-form-label">Email </label>
                        <span>:</span>
                    </div>
                   
                    <div className="col-sm-8">
                    {userOneData.email} 
                    </div>
                  </Form.Group>

              </div>
              <div className="col-md-6">

              <Form.Group className="row">
                    <div className='col-sm-4 disp-text'>
                        <label className=" col-form-label">Role </label>
                        <span>:</span>
                    </div>
                   
                    <div className="col-sm-8">
                    {userOneData.designation}
                    </div>
                  </Form.Group>

              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
              <Form.Group className="row">
                    <div className='col-sm-4 disp-text'>
                        <label className=" col-form-label">Address </label>
                        <span>:</span>
                    </div>
                   
                    <div className="col-sm-8">
                    {userOneData.address}
                    </div>
                  </Form.Group>
              </div>
            </div>
            {/* <button type="button" className="btn btn-gradient-info btn-rounded btn-fw  text-white text-decoration-none" onClick={handleAddUserApiCall}>  Add User</button> */}
          </form>
        </div>
      </div>
    </div>

  </>
  )
}

export default ViewUserDetailPage