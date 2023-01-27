import React, { useState, useEffect } from 'react'
import EditableModal from '../component/EditableModal';
// import { useForm } from "react-hook-form";
import { Form } from 'react-bootstrap';

import { editProjectApi } from '../../api/putProjectApi';


const EditProject = (props) => {

    const { projectonedata, handleGetProjectApiCall, projectid } = props;


    // console.log(props)


    const initialValues = {
        owneremail: projectonedata.owneremail,
        ownercontact: projectonedata.ownercontact,
        startdate: projectonedata.startdate,
        enddate: projectonedata.enddate,
        estimatedcost: projectonedata.estimatedcost
    }

    const [formValues, setFormValues] = useState(initialValues || {})
    const [formErrors, setFormErrors] = useState({})
    const [isSubmit, setIsSubmit] = useState(false)

    useEffect(() => {
        if (Object.keys(formErrors).length === 0 && isSubmit) {
            console.log(formValues)
            const dataSubmit = async () => {
                const result = await editProjectApi(projectid, formValues)
                if (result?.status) {
        
                    console.log(result)
                    props.setdisplay(false)
              
                    handleGetProjectApiCall()
             
        
                  // history.push("/");
        
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

    const handleChange = (e) => {

        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });

    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log(formValues)
        setFormErrors(validate(formValues))
        setIsSubmit(true)
   
    }

    const validate = (values) => {
        const errors = {}
        const regex = /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/;
        const Mregex = /^[6-9][0-9]{9}$/;
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

    return (
        <>
            <EditableModal
                show={props.display}
                handleClose={() => props.setdisplay(false)}
            // handleShow={() => props.setdisplay(true)}
            // onClick={() => handleEditProjectApiCall(projectid)}
            // Action="Save"
            >
                <div className='add-project'>
                    <div className="col-12 grid-margin">
                        <div className="card">
                            <div className="card-body">
                                <h4 className="card-title">Edit Project</h4>
                                <form className="form-sample" onSubmit={handleSubmit}>
                                    {/* <p className="card-description"> Personal info </p> */}
                                    <div className="row">
                                        <div className="col-md-6">
                                            <Form.Group className="row">
                                                <label className="col-sm-3 col-form-label">Owner Email</label>
                                                <div className="col-sm-9">
                                                    <Form.Control
                                                        type="text"
                                                        placeholder="Enter your email"
                                                        name="owneremail"
                                                        value={formValues?.owneremail}
                                                        onChange={handleChange}
                                                    />
                                                    <p className="errorMsg">{formErrors.owneremail}</p>
                                                </div>
                                            </Form.Group>
                                        </div>

                                        <div className="col-md-6">
                                            <Form.Group className="row">
                                                <label className="col-sm-3 col-form-label">Owner Contact No.</label>
                                                <div className="col-sm-9">
                                                    <Form.Control
                                                        placeholder="Enter Owner Mobile Number"
                                                        type="text"
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
                                            <Form.Group className="row">
                                                <label className="col-sm-3 col-form-label">Start Date</label>
                                                <div className="col-sm-9">
                                                    <Form.Control
                                                        placeholder="Name"
                                                        type="date"
                                                        name='startdate'
                                                        max={formValues?.enddate}
                                                        value={formValues?.startdate}
                                                        onChange={handleChange}
                                                    />
                                                    <p className="errorMsg">{formErrors.startdate}</p>
                                                </div>
                                            </Form.Group>
                                        </div>
                                        <div className="col-md-6">
                                            <Form.Group className="row">
                                                <label className="col-sm-3 col-form-label">End Date</label>
                                                <div className="col-sm-9">
                                                    <Form.Control
                                                        placeholder="Name"
                                                        type="date"
                                                        name='enddate'
                                                        min={formValues?.startdate}
                                                        value={formValues?.enddate}
                                                        onChange={handleChange}
                                                    />
                                                    <p className="errorMsg">{formErrors.enddate}</p>
                                                </div>
                                            </Form.Group>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <Form.Group className="row">
                                                <label className="col-sm-3 col-form-label">Estimated Cost</label>
                                                <div className="col-sm-9">
                                                    <Form.Control
                                                        placeholder="Enter Estimated Cost"
                                                        type="text"
                                                        name='estimatedcost'
                                                        value={formValues?.estimatedcost}
                                                        onChange={handleChange}
                                                    />
                                                    <p className="errorMsg">{formErrors.estimatedcost}</p>
                                                </div>
                                            </Form.Group>
                                        </div>
                                    </div>

                                    <button className="btn btn-gradient-info btn-rounded btn-fw" type='submit' value='submit' >Edit Project</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </EditableModal>
        </>
    )
}

export default EditProject