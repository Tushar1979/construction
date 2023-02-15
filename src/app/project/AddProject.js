import React, { useState, useEffect } from 'react'
import { Form } from 'react-bootstrap';
// import DatePicker from "react-datepicker";
import { Link } from 'react-router-dom';
import useAuth from '../component/hooks/useAuth';
import { addProjectApi } from '../../api/postAddProjectApi'
import { useHistory } from 'react-router-dom';
import Select from "react-select";


const AddProject = () => {

  const history = useHistory();
  const initialValues = {
    "projectname": '',
    "projectaddress": '',
    "owner": '',
    "ownercontact": '',
    "city": '',
    "owneremail": '',
    "startdate": '',
    "enddate": '',
    "estimatedcost": ''
  }

  const State = [
    { value: "Madhya Pradesh", label: "Madhya Pradesh" },
    { value: "Maharastra", label: "Maharastra" },
    { value: "Gujrat", label: "Gujrat" },
    { value: "Uttar Pradesh", label: "Uttar Pradesh" }
  ];

  const city = [
    { value: "Indore", label: "Indore" },
    { value: "Mumbai", label: "Mumbai" },
    { value: "Ahamdabad", label: "Ahamdabad" },
    { value: "kanpur", label: "kanpur" }
  ];

  const pincode =[
    { value: 400001, label: 400001},
    { value: 487770, label: 487770 }
  ]


  const [formValues, setFormValues] = useState(initialValues || {})
  const [formErrors, setFormErrors] = useState({})
  const [isSubmit, setIsSubmit] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [errorMessage1, setErrorMessage1] = useState('')

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(formValues)
      const dataSubmit = async () => {
        const result = await addProjectApi(formValues)
        if (result?.status) {
          console.log(result), "yess"

          history.push("/");
        }
        else {

          console.log(result, "nooo")

          if (result?.data?.message == "projectname must be unique") {
            setErrorMessage("projectname must be unique")
          }
          if (result?.data?.message == "projectaddress must be unique") {
            setErrorMessage1("projectaddress must be unique")
            setErrorMessage('')
          }


        }
      }
      dataSubmit();
    }
  }, [formErrors])

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormErrors(Formvalidate(formValues))
    setIsSubmit(true)
  }

  const Formvalidate = (values) => {
    const errors = {}
    const regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    const Mregex = /^[6-9][0-9]{9}$/;
    if (!values.projectname) {
      errors.projectname = "Project Name is Required"
    }
    if (!values.projectaddress) {
      errors.projectaddress = "Project Address is Required"
    }
    if (!values.owner) {
      errors.owner = "Owner Name is Required"
    }
    if (!values.city) {
      errors.city = "City is Required"
    }

    if (!values.owneremail) {
      errors.owneremail = "Owner Email is Required"
    } else if (!regex.test(values.owneremail)) {
      errors.owneremail = "Owner Email is not valid"
    }

    if (!values.ownercontact) {
      errors.ownercontact = "Owner Contact is Required"
    } else if (!Mregex.test(values.ownercontact)) {
      errors.ownercontact = "Owner Contact is not valid and should be 10 digit"
    }


    if (!values.startdate) {
      errors.startdate = "Start Date is Required"
    }
    if (!values.enddate) {
      errors.enddate = "End Date is Required"
    }
    if (!values.estimatedcost) {
      errors.estimatedcost = "Estimated Cost is Required"
    }
    return errors;
  }
  // const onNextpage = () => {
  //   history.push("/management/AddUser", {state: {item: "yes"}})
  // }

  return (<>
    <div className='add-project'>
      <div className="col-12 grid-margin">
        <div className="card">
          <div className="card-body">
            <h4 className="card-title">Add Project</h4>
            <Form className="form-sample" onSubmit={handleSubmit}>
              <p className="card-description">  </p>
              <div className="row">
                <div className="col-md-6">
                  <Form.Group>
                    <label className=" col-form-label">Project Name</label>
                    <div className="col-sm-9 p-0">
                      <Form.Control
                        type="text"
                        placeholder="Enter Project Name"
                        name="projectname"
                        value={formValues?.projectname}
                        onChange={handleChange}
                      />
                      <p className="errorMsg">{formErrors.projectname}</p>
                    </div>
                  </Form.Group>
                </div>
                <div className="col-md-6">
                  <Form.Group >
                    <label className="col-form-label">Project Address</label>
                    <div className="col-sm-9 p-0">
                      <Form.Control
                        type="text"
                        placeholder="Enter Project Address"
                        name="projectaddress"
                        value={formValues?.projectaddress}
                        onChange={handleChange}
                      />
                      <p className="errorMsg">{formErrors.projectaddress}</p>

                    </div>
                  </Form.Group>
                </div>
              </div>

              <div className="row">
                <div className="col-md-6">
                  <Form.Group>
                    <label className="col-form-label">Owner Name</label>
                    <div className="col-sm-9 p-0">
                      <Form.Control
                        type="text"
                        placeholder="Enter Owner Name"
                        name="owner"
                        value={formValues?.owner}
                        onChange={handleChange}
                      />
                      <p className="errorMsg">{formErrors.owner}</p>
                    </div>
                  </Form.Group>
                </div>
                <div className="col-md-6">
                  <Form.Group>
                    <label className="col-form-label">Owner Contact </label>
                    <div className="col-sm-9 p-0">
                      <Form.Control
                        type="text"
                        placeholder="Enter Owner Mobile Number"
                        name="ownercontact"
                        value={formValues?.ownercontact}
                        onChange={handleChange}
                      />
                      <p className="errorMsg">{formErrors.ownercontact}</p>
                    </div>
                  </Form.Group>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <Form.Group>
                    <label className="col-form-label"> Email</label>
                    <div className="col-sm-9 p-0">
                      <Form.Control
                        type="text"
                        placeholder="Enter Owner Name"
                        name="owneremail"
                        value={formValues?.owneremail}
                        onChange={handleChange}
                      />
                      <p className="errorMsg">{formErrors.owneremail}</p>
                    </div>
                  </Form.Group>
                </div>
                <div className="col-md-6">
                <Form.Group>
                    <label className="col-form-label">Estimated Cost</label>
                    <div className="col-sm-9 p-0">
                      <Form.Control
                        type="text"
                        placeholder="Enter Estimated Cost"
                        name="estimatedcost"
                        value={formValues?.estimatedcost}
                        onChange={handleChange}
                      />
                      <p className="errorMsg">{formErrors.estimatedcost}</p>
                    </div>
                  </Form.Group>


                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <Form.Group>
                    <label className="col-form-label">Start Date</label>
                    <div className="col-sm-9 p-0">
                      <Form.Control
                        type="date"
                        placeholder="Enter startdate"
                        name="startdate"
                        value={formValues?.startdate}
                        max={formValues?.enddate}
                        onChange={handleChange}
                      // onChange={handleChange}
                      />
                      <p className="errorMsg">{formErrors.startdate}</p>
                    </div>
                  </Form.Group>
                </div>
                <div className="col-md-6">
                  <Form.Group>
                    <label className="col-form-label">End Date</label>
                    <div className="col-sm-9 p-0">
                      <Form.Control
                        type="date"
                        placeholder="Enter enddate"
                        name="enddate"
                        value={formValues?.enddate}
                        min={formValues?.startdate}
                        onChange={handleChange}
                      // onChange={handleChange}
                      />
                      <p className="errorMsg">{formErrors.enddate}</p>
                    </div>
                  </Form.Group>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                 
                  <Form.Group >
                    <label className=" col-form-label">City</label>
                    <div className="col-sm-9 p-0">
                    <Select options={city} />
                      {/* <p className="errorMsg">{formErrors.city}</p> */}
                    </div>
                  </Form.Group>
                </div>
                <div className="col-md-6">
                <Form.Group >
                    <label className=" col-form-label">State</label>
                    <div className="col-sm-9 p-0">
                    <Select options={State} />
                      {/* <p className="errorMsg">{formErrors.city}</p> */}
                    </div>
                  </Form.Group>
                </div>
                <div className="col-md-6">
                <Form.Group >
                    <label className=" col-form-label">Pincode</label>
                    <div className="col-sm-9 p-0">
                    <Select options={pincode} />
                      {/* <p className="errorMsg">{formErrors.city}</p> */}
                    </div>
                  </Form.Group>
                </div>
              </div>
              <div className="add-project-btns">
                <button className="btn btn-gradient-info btn-rounded btn-fw" type="submit" value="submit">Save</button>
                <button className="btn btn-gradient-info btn-rounded btn-fw" style={{ marginLeft: "50px" }} type="submit" value="submit">Submit Draft</button>
                <Link
                  to={{
                    pathname: "/management/AddUser",
                    state: {
                      fromNotifications: true,
                    },
                  }}
                >
                  <button className="btn btn-gradient-info btn-rounded btn-fw" style={{ marginLeft: "50px" }} type="submit" value="submit">Next</button>
                </Link>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>

  </>
  )
}

export default AddProject