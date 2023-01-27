import React, { useState, useEffect } from 'react'
import EditableModal from '../component/EditableModal';
// import { useForm } from "react-hook-form";
import { Form } from 'react-bootstrap';

import { editProjectPhaseApi } from '../../api/putUpdateProjectPhaseApi';


const EditProjectPhase = (props) => {

    const { projectOnePhase, handleGetProjectPhaseApiCall,ProjectName } = props;

    console.log(projectOnePhase)


    const initialValues = {
        "phaseweightage": projectOnePhase.phaseweightage,
        "phasestartdate":projectOnePhase.phasestartdate,
        "phaseenddate":projectOnePhase.phaseenddate,

        // owneremail: projectonedata.owneremail,
        // ownercontact: projectonedata.ownercontact,
        // startdate: projectonedata.startdate,
        // enddate: projectonedata.enddate,
        // estimatedcost: projectonedata.estimatedcost
    }

    const [formValues, setFormValues] = useState(initialValues || {})
    const [formErrors, setFormErrors] = useState({})
    const [isSubmit, setIsSubmit] = useState(false)

    useEffect(() => {
        if (Object.keys(formErrors).length === 0 && isSubmit) {
            console.log(formValues)
            const dataSubmit = async () => {
                const result = await editProjectPhaseApi(projectOnePhase.id, formValues)
                if (result?.status) {
        
                    console.log(result)
                    props.setview(false)
              
                     handleGetProjectPhaseApiCall(ProjectName)
             
        
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
  
        if (!values.phaseweightage) {
            errors.phaseweightage = "phaseweightage is Required"
        } 
        if (!values.phasestartdate) {
            errors.phasestartdate = "Phase Start Date is Required"
        }
        if (!values.phaseenddate) {
            errors.phaseenddate = "Phase End Date is Required"
        }
        return errors;
    }

    return (
        <>
            <EditableModal
                show={props.view}
                handleClose={() => props.setview(false)}
            // handleShow={() => props.setdisplay(true)}
            // onClick={() => handleEditProjectApiCall(projectid)}
            // Action="Save"
            >
                <div className='add-project'>
                    <div className="col-12 grid-margin">
                        <div className="card">
                            <div className="card-body">
                                <h4 className="card-title">Edit Phase</h4>
                                <form className="form-sample" onSubmit={handleSubmit}>
                                    {/* <p className="card-description"> Personal info </p> */}
                                
                                    <div className="row">
                                        <div className="col-md-6">
                                            <Form.Group className="row">
                                                <label className="col-sm-3 col-form-label">Start Date</label>
                                                <div className="col-sm-9">
                                                    <Form.Control
                                                        placeholder="Name"
                                                        type="date"
                                                        name='phasestartdate'
                                                        max={formValues?.phaseenddate}
                                                        value={formValues?.phasestartdate}
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
                                                        name='phaseenddate'
                                                        min={formValues?.phasestartdate}
                                                        value={formValues?.phaseenddate}
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
                                                <label className="col-sm-3 col-form-label">Phase Weightage</label>
                                                <div className="col-sm-9">
                                                    <Form.Control
                                                        placeholder="Enter phaseweightage"
                                                        type="text"
                                                        name='phaseweightage'
                                                        value={formValues?.phaseweightage}
                                                        onChange={handleChange}
                                                    />
                                                    <p className="errorMsg">{formErrors.estimatedcost}</p>
                                                </div>
                                            </Form.Group>
                                        </div>
                                    </div>

                                    <button className="btn btn-gradient-info btn-rounded btn-fw" type='submit' value='submit' >Edit Phase</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </EditableModal>
        </>
    )
}

export default EditProjectPhase