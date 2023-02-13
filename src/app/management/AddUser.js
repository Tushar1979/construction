import React, { useEffect, useState } from 'react'
import { Form } from 'react-bootstrap';
import { addUserApi } from '../../api/postAddUserApi';
import { getRolesApi } from '../../api/getRolesApi';
import { useSelector } from "react-redux";
import { Link, useHistory, useLocation } from 'react-router-dom';
import AddProjectPhase from '../projectPhase/AddProjectPhase';
const AddUser = (props) => {
  const history = useHistory();
  const initialValues = {
    "first_name": '',
    "last_name": '',
    "contact": '',
    "alternate_contact": '',
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
  const [display, setdisplay] = useState(false)

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
    formValues.level = data.level
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
  const location = useLocation()
  const fromNotifications = location?.state
  console.log(fromNotifications, " link props")
  // const  fromNotifications  =
  //   (props.location && props.location.state) || {};
  // console.log(props.location.state," link props")




  return (
    <div className='container'>
      <div className="col-12 grid-margin">
        <div className="card">
          <div className="card-body">
            <h4 className="card-title">Add User</h4>
            {
              fromNotifications ?
                <form className="form-sample" onSubmit={handleSubmit}>
                  {/* <p className="card-description"> Personal info </p> */}
                  <div className="row">
                    <div className="col-md-6">
                      <Form.Group>
                        <label className="col-form-label">First Name</label>
                        <div>
                          <Form.Control
                            type="text"
                            placeholder="Enter your First Name"
                            name="first_name"
                            value={formValues?.first_name}
                            onChange={handleChange}
                          />
                          <p className="errorMsg">{formErrors.first_name}</p>
                        </div>
                      </Form.Group>
                    </div>
                    <div className="col-md-6">
                      <Form.Group>
                        <label className="col-form-label">Last Name</label>
                        <div >
                          <Form.Control
                            type="text"
                            placeholder="Enter your Last Name"
                            name="name"
                            value={formValues?.last_name}
                            onChange={handleChange}
                          />
                          <p className="errorMsg">{formErrors.last_name}</p>
                        </div>
                      </Form.Group>
                    </div>
                    <div className="col-md-6">
                      <Form.Group>
                        <label className="col-form-label">Contact Number</label>
                        <div >
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
                    <div className="col-md-6">
                      <Form.Group>
                        <label className="col-form-label">Alternate Contact Number</label>
                        <div >
                          <Form.Control
                            type="text"
                            placeholder="Enter your Alternate Number"
                            name="contact"
                            value={formValues?.alternate_contact}
                            onChange={handleChange}

                          />
                          <p className="errorMsg">{formErrors.alternate_contact}</p>

                        </div>
                      </Form.Group>
                    </div>
                    <div className="col-md-6">
                      {/* <Form.Group>
                        <label className="col-form-label">Role</label>
                        <div className="col-sm-9 p-0">
                          <select className="form-control" name='designation' onChange={handleChange} >
                            <option>Select your option</option>
                            {userRolesData.map(function (value) {
                              return <option key={value.id}>{value.rolename}</option>
                            })}
                          </select>
                          <p className="errorMsg">{formErrors.designation}</p>
                        </div>
                      </Form.Group> */}
                      <Form.Group>
                        <label className="col-form-label">Email</label>
                        <div >
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
                      <Form.Group>
                        <label className="col-form-label">Password</label>
                        <div >
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
                      <Form.Group>
                        <label className="col-form-label">Role</label>
                        <div>
                          <Form.Control
                            type="text"
                            placeholder="Add Role"
                            name="designation"
                            value={formValues?.designation}
                            onChange={handleChange}
                          />
                          <p className="errorMsg">{formErrors.rolename}</p>
                        </div>
                      </Form.Group>
                    </div>
                    <div className="col-md-6">
                      <button className="btn btn-gradient-info btn-rounded btn-fw" type='submit' value='submit' >Add User</button>
                    </div>


                    <div className="col-md-12">
                      <Form.Group>
                        <label className="col-form-label">Address</label>
                        <div >
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

                  <div className="add-project-btns">
                    <button className="btn btn-gradient-info btn-rounded btn-fw" type='submit' value='submit' >Save</button>
                    <Link to="/addphase">
                    <button className="btn btn-gradient-info btn-rounded btn-fw" style={{ marginLeft: "50px" }}
                    //  onClick={() => setdisplay(true)}
                      type='submit' value='submit' >Next</button>
                    </Link>
                  </div>
                  {/* {display && <AddProjectPhase display={display} setdisplay={setdisplay} ></AddProjectPhase>} */}

                </form> :

                <form className="form-sample" onSubmit={handleSubmit}>
                  {/* <p className="card-description"> Personal info </p> */}
                  <div className="row">
                    <div className="col-md-6">
                      <Form.Group>
                        <label className="col-form-label">First Name</label>
                        <div>
                          <Form.Control
                            type="text"
                            placeholder="Enter your First Name"
                            name="first_name"
                            value={formValues?.first_name}
                            onChange={handleChange}
                          />
                          <p className="errorMsg">{formErrors.first_name}</p>
                        </div>
                      </Form.Group>
                    </div>
                    <div className="col-md-6">
                      <Form.Group>
                        <label className="col-form-label">Last Name</label>
                        <div >
                          <Form.Control
                            type="text"
                            placeholder="Enter your Last Name"
                            name="name"
                            value={formValues?.last_name}
                            onChange={handleChange}
                          />
                          <p className="errorMsg">{formErrors.last_name}</p>
                        </div>
                      </Form.Group>
                    </div>
                    <div className="col-md-6">
                      <Form.Group>
                        <label className="col-form-label">Contact Number</label>
                        <div >
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
                    <div className="col-md-6">
                      <Form.Group>
                        <label className="col-form-label">Alternate Contact Number</label>
                        <div >
                          <Form.Control
                            type="text"
                            placeholder="Enter your Alternate Number"
                            name="contact"
                            value={formValues?.alternate_contact}
                            onChange={handleChange}

                          />
                          <p className="errorMsg">{formErrors.alternate_contact}</p>

                        </div>
                      </Form.Group>
                    </div>
                    {/* <div className="col-md-6">
                      <Form.Group>
                        <label className="col-form-label">Role</label>
                        <div className="col-sm-9 p-0">
                          <select className="form-control" name='designation' onChange={handleChange} >
                            <option>Select your option</option>
                            {userRolesData.map(function (value) {
                              return <option key={value.id}>{value.rolename}</option>
                            })}
                          </select>
                          <p className="errorMsg">{formErrors.designation}</p>
                        </div>
                      </Form.Group>
                      <Form.Group>
                        <label className="col-form-label">Role</label>
                        <div className="col-sm-9 p-0">
                          <Form.Control
                            type="text"
                            placeholder="Add Role"
                            name="designation"
                            value={formValues?.designation}
                            onChange={handleChange}
                          />
                          <p className="errorMsg">{formErrors.rolename}</p>
                        </div>
                      </Form.Group>

                    </div> */}
                    <div className="col-md-6">
                      <Form.Group>
                        <label className="col-form-label">Email</label>
                        <div >
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
                      <Form.Group>
                        <label className="col-form-label">Password</label>
                        <div >
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
                    <div className="col-md-12">
                      <Form.Group>
                        <label className="col-form-label">Address</label>
                        <div >
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
            }

          </div>
        </div>
      </div>
    </div>
  )
}

export default AddUser