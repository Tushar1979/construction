import React, { useState, useEffect } from 'react'
import { Form } from 'react-bootstrap'
import { useSelector } from "react-redux";
import { editOwnProfileApi } from "../../api/putUpdateOwnProfile"

import { useHistory } from 'react-router-dom';

import { getOneUserApi } from '../../api/getOneUserApi';

const Profile = () => {
  let history = useHistory()
  const userDetail = useSelector((state) => state.home.userDetail);
  

  // const initialValues = {
  //   "address": userDetail.address,
  //   "contact": userDetail.contact,
  // }
  const [user,setUser]=useState(userDetail)
  const [userOneData, setUserOneData] = useState()
  const [formValues, setFormValues] = useState( )
  const [formErrors, setFormErrors] = useState({})
  const [isSubmit, setIsSubmit] = useState(false)

 
  useEffect(() => {
    handleGetOneUserApiCall()
  }, [])

  useEffect(()=>{
    setFormValues(userOneData)
    console.log(user)
  },[userOneData])

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(formValues)

      const dataSubmit = async () => {
        const result = await editOwnProfileApi(user?.id, formValues)
        if (result?.status) {
          console.log(result)
          history.push("/");

        }
        else {

          console.log(result, "nooo")

          // if (result?.data?.message == "projectname must be unique") {
          //   setErrorMessage("projectname must be unique")
          // }
          // if (result?.data?.message == "projectaddress must be unique") {
          //   setErrorMessage1("projectaddress must be unique")
          //   setErrorMessage('')
          // }


        }
      }
      dataSubmit();
    }
  }, [formErrors])

  const handleGetOneUserApiCall = async () => {
    const result = await getOneUserApi(user?.id || user?.userid);

    setUserOneData(result.data)
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues))
    setIsSubmit(true)
    console.log(formValues)
  }

  const validate = (values) => {
    const errors = {}
    const Mregex = /^[6-9][0-9]{9}$/;
    if (!values.contact) {
      errors.contact = "Contact is Required !"
    } else if (!Mregex.test(values.contact)) {
      errors.contact = "Contact is not valid and should be 10 digit"
    }
    if (!values.address) {
      errors.address = "address is Required !"
    }
    return errors;
  }

 

 console.log(user?.id,user?.userid)

  return (
    <>
      <div className='add-project'>
        <div className="col-12 grid-margin">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Update Profile</h4>
              <Form className="form-sample" onSubmit={handleSubmit}>
                <p className="card-description">  </p>
                <div className="row">
                  <div className="col-md-6">
                    <Form.Group className="row">
                      <label className="col-sm-3 col-form-label">Contact Number</label>
                      <div className="col-sm-9">
                        <Form.Control
                          type="text"
                          placeholder="Enter your Mobile Number"
                          name="contact"
                          value={formValues?.contact}
                          onChange={handleChange}
                        />
                        <p className="errorMsg">{formErrors.contact}</p>
                      </div>
                    </Form.Group>
                  </div>
                  <div className="col-md-6">
                    <Form.Group className="row">
                      <label className="col-sm-3 col-form-label"> Address</label>
                      <div className="col-sm-9">
                        <Form.Control
                          type="text"
                          placeholder="Enter Your Address"
                          name="address"
                          value={formValues?.address}
                          onChange={handleChange}
                        />
                        <p className="errorMsg">{formErrors.address}</p>
                      </div>
                    </Form.Group>
                  </div>
                </div>
                <button className="btn btn-gradient-info btn-rounded btn-fw" type="submit" value="submit">   Edit Profile</button>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Profile