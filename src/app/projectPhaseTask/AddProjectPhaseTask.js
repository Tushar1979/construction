import React,{useEffect,useState} from 'react'
import EditableModal from '../component/EditableModal';
// import { editUserApi } from '../../api/putUserApi';

import { Form } from 'react-bootstrap';
import { useSelector } from "react-redux";


const AddProjectPhaseTask = (props) => {

//    const{addProjectPhaseApi,handleGetProjectPhaseApiCall,ProjectName}=props
  const userDetail = useSelector((state)=>state.home.userDetail);


    
    const initialValues = {
    "startdate":"2022-02-30",
    "description":"this is the description of the task assigned to the user.",
    "enddate":"2022-02-31",
    "taskassignedto":"3",
    "taskname":"newtask3"
    }

    const [formValues, setFormValues] = useState(initialValues || {})
    const [formErrors, setFormErrors] = useState({})
    const [isSubmit, setIsSubmit] = useState(false)

    useEffect(() => {

        if (Object.keys(formErrors).length === 0 && isSubmit) {
            console.log(formValues)
            const dataSubmit = async () => {
                const result = await addProjectPhaseApi(ProjectName, formValues)
                if (result?.status) {
        
                    console.log(result)
                    props.setdisplay(false)
              
                    // handleGetUserApiCall()
             
        
                  // history.push("/");
               handleGetProjectPhaseApiCall(ProjectName)
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

    const validate = (values) => {
        const errors = {}

        if(!values.taskname){
            errors.taskname = "Task Name is Required"
        }
        if (!values.phaseweightage) {
            errors.phaseweightage = "Phase weightage is Required"
        }
        if(!values.startdate){
            errors.startdate="Task Start Date is Required"
        }
        if(!values.enddate){
          errors.enddate="User End Date  is Required"
        }
        return errors;
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

 
    return (
        <>
            <EditableModal
                show={props.display}
                handleClose={() => props.setdisplay(false)}
                handleShow={() => props.setdisplay(true)}
            //   onClick={()=>handleEditUserApiCall(userid)}
            //   Action="Save"
            >
                 <div>
                    <div className="col-12 grid-margin">
                        <div className="card">
                            <div className="card-body">
                                <h4 className="card-title">Add Task</h4>
                                <form className="form-sample" onSubmit={handleSubmit}>

                                    <div className="row">
                                        <div className="col-md-6">
                                            <Form.Group className="row">
                                                <label className="col-sm-3 col-form-label">Task Name</label>
                                                <div className="col-sm-9">
                                                    <Form.Control
                                                        type="text"
                                                        placeholder="Enter your Phase Name"
                                                        name="taskname"
                                                        value={formValues?.taskname}
                                                        onChange={handleChange}
                                                    />
                                                    <p className="errorMsg">{formErrors.taskname}</p>
                                                </div>
                                            </Form.Group>
                                        </div>
                                        <div className="col-md-6">
                                            <Form.Group className="row">
                                                <label className="col-sm-3 col-form-label">Task Description</label>
                                                <div className="col-sm-9">
                                                    <Form.Control
                                                        type="text"
                                                        placeholder="Enter your Task Description"
                                                        name="phaseweightage"
                                                        value={formValues?.phaseweightage}
                                                        onChange={handleChange}
                                                    />
                                                     <p className="errorMsg">{formErrors.phaseweightage}</p>
                                                </div>
                                            </Form.Group>      
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <Form.Group className="row">
                                                <label className="col-sm-3 col-form-label">Task Start Date</label>
                                                <div className="col-sm-9">
                                                <Form.Control
                                                        placeholder="Enter Phase Start Date"
                                                        type="date"
                                                        name='phasestartdate'
                                                        
                                                        value={formValues?.startdate}
                                                        max={formValues?.enddate}
                                                        onChange={handleChange}
                                                    />
                                                     <p className="errorMsg">{formErrors.startdate}</p>
                                                </div>
                                            </Form.Group>
                                        </div>
                                        <div className="col-md-6">
                                            <Form.Group className="row">
                                                <label className="col-sm-3 col-form-label">Task End Date</label>
                                                <div className="col-sm-9">
                                                <Form.Control
                                                        placeholder="Enter Phase End Date"
                                                        type="date"
                                                        name='enddate'
                                                       
                                                        value={formValues?.enddate}
                                                        min={formValues?.startdate}
                                                        onChange={handleChange}
                                                    />
                                                     <p className="errorMsg">{formErrors.enddate}</p>
                                                </div>
                                            </Form.Group>      
                                        </div>

                                      
                                    </div>

                                    <button className="btn btn-gradient-info btn-rounded btn-fw" type='submit' value='submit' >Submit</button>
                                </form>
                            </div>
                        </div>
                    </div>

                </div> 
            </EditableModal>
        </>
    )
}

export default AddProjectPhaseTask

