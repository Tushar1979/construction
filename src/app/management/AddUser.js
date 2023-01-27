import React, { useEffect, useState } from 'react'
import { Form } from 'react-bootstrap';
import { addUserApi } from '../../api/postAddUserApi';
import { getRolesApi } from '../../api/getRolesApi';
import { useSelector } from "react-redux";
import { useHistory } from 'react-router-dom';
const AddUser = () => {
  const history = useHistory();
  const initialValues = {
    "name": '',
    "contact": '',
    "email": '',
    "password": '',
    "designation": "",
    "level": "",
    "address": '',
    

  }

  const [userRolesData, setUserRolesData] = useState([])
  const [data, setData] = useState({})
  const [formValues, setFormValues] = useState(initialValues || {})
  const [formErrors, setFormErrors] = useState({})
  const [isSubmit, setIsSubmit] = useState(false)
  const [flag, setFlag] = useState(false)

  const userDetail = useSelector((state) => state.home.userDetail);
  // console.log(count.userid)

  useEffect(() => {
    handleGetRolesApiCall()

  }, []);

  useEffect(() => {
    console.log(userRolesData.find(data => data.rolename + "" === formValues.designation))
    setData(userRolesData.find(data => data.rolename + "" === formValues.designation))
  }, [formValues])

  const handleGetRolesApiCall = async () => {
    const result = await getRolesApi();
    // console.log(result.data)
    if (result?.status) {
      setUserRolesData(result.data)
    } else {
      setUserRolesData([])
    }
  };

  useEffect(() => {

    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(formValues)
      
      
    }
  }, [formErrors])


  const dataSubmit = async () => {
    console.log(data.level)
    formValues.level=data.level
    const result = await addUserApi(formValues)
    if (result?.status) {

      console.log(result), "yess"

     
      setFlag(true)

    }
    else {

      console.log(result)

      // if (result?.data?.message == "projectname must be unique") {
      //   setErrorMessage("projectname must be unique")
      // }
      // if (result?.data?.message == "projectaddress must be unique") {
      //   setErrorMessage1("projectaddress must be unique")
      //   setErrorMessage('')
      // }


    }
  }

  function handleChange(e) {
    console.log(data)
    // formValues.level=data.level
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  }



  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormErrors(Formvalidate(formValues))
    setIsSubmit(true)
    // console.log(formValues)
    dataSubmit();
  }




  const Formvalidate = (values) => {
    const errors = {}
    const regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    const Mregex = /^[6-9][0-9]{9}$/;
    if (!values.name) {
      errors.name = "User Name is Required"
    }
    if (!values.email) {
      errors.email = "Owner Email is Required"
    } else if (!regex.test(values.email)) {
      errors.email = "Owner Email is not valid"
    }
    if (!values.contact) {
      errors.contact = "User Contact is Required"
    } else if (!Mregex.test(values.contact)) {
      errors.contact = "Owner Contact is not valid and should be 10 digit"
    }
    if (!values.designation) {
      errors.designation = "User Designation is Required"
    }
    if (!values.password) {
      errors.password = "User Password is Required"
    }
    if (!values.address) {
      errors.address = "User Address is Required"
    }

    return errors;
  }


  return (
    <div>
      <div className="col-12 grid-margin">
        <div className="card">
          <div className="card-body">
            <h4 className="card-title">Add User</h4>
            <form className="form-sample" onSubmit={handleSubmit}>
              {/* <p className="card-description"> Personal info </p> */}
              <div className="row">
                <div className="col-md-6">
                  <Form.Group className="row">
                    <label className="col-sm-3 col-form-label">Name</label>
                    <div className="col-sm-9">
                      <Form.Control
                        type="text"
                        placeholder="Enter your User Name"
                        name="name"
                        value={formValues?.name}
                        onChange={handleChange}
                      />
                      <p className="errorMsg">{formErrors.name}</p>
                    </div>
                  </Form.Group>
                </div>
                <div className="col-md-6">
                  <Form.Group className="row">
                    <label className="col-sm-3 col-form-label">Contact Number</label>
                    <div className="col-sm-9">
                      <Form.Control
                        type="text"
                        placeholder="Enter your User Number"
                        name="contact"
                        value={formValues?.contact}
                        onChange={handleChange}

                      />
                      <p className="errorMsg">{formErrors.contact}</p>

                    </div>
                  </Form.Group>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <Form.Group className="row">
                    <label className="col-sm-3 col-form-label">Email</label>
                    <div className="col-sm-9">
                      <Form.Control
                        type="text"
                        placeholder="Enter your User Email"
                        name="email"
                        value={formValues?.email}
                        onChange={handleChange}
                      />
                      <p className="errorMsg">{formErrors.email}</p>
                    </div>
                  </Form.Group>
                </div>
                <div className="col-md-6">
                  <Form.Group className="row">
                    <label className="col-sm-3 col-form-label">Role</label>
                    <div className="col-sm-9">
                      <select className="form-control" name='designation' onChange={handleChange} >
                        <option>Select your option</option>
                        {userRolesData.map(function (value) {
                          return <option key={value.id}>{value.rolename}</option>
                        })}
                      </select>
                      <p className="errorMsg">{formErrors.designation}</p>
                    </div>
                  </Form.Group>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <Form.Group className="row">
                    <label className="col-sm-3 col-form-label">Password</label>
                    <div className="col-sm-9">
                      <Form.Control
                        type="password"
                        placeholder="Enter your User Password"
                        name="password"
                        value={formValues?.password}
                        onChange={handleChange}
                      />
                      <p className="errorMsg">{formErrors.password}</p>
                    </div>
                  </Form.Group>
                </div>
                <div className="col-md-6">
                  <Form.Group className="row">
                    <label className="col-sm-3 col-form-label">Address</label>
                    <div className="col-sm-9">
                      <Form.Control
                        type="text"
                        placeholder="Enter your User Address"
                        name="address"
                        value={formValues?.address}
                        onChange={handleChange}
                      />
                      <p className="errorMsg">{formErrors.address}</p>
                    </div>
                  </Form.Group>
                </div>
              </div>
              <button className="btn btn-gradient-info btn-rounded btn-fw" type='submit' value='submit' >Add User</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddUser