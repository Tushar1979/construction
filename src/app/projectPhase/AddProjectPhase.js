import React,{useEffect,useState} from 'react'
import EditableModal from '../component/EditableModal';
// import { editUserApi } from '../../api/putUserApi';

import { Form } from 'react-bootstrap';
import { useSelector } from "react-redux";
import AddProjectPhaseTask from '../projectPhaseTask/AddProjectPhaseTask'

const AddProjectPhase = (props) => {

   const{addProjectPhaseApi,handleGetProjectPhaseApiCall,ProjectName}=props
  const userDetail = useSelector((state)=>state.home.userDetail);


    // const { userOneData, handleGetUserApiCall,userRolesData } = props;
    // const{ProjectName}=props;
    // console.log(ProjectName)
    const initialValues = {
        "phasename": "",
        "phaseweightage": "",
        "phasestartdate":"",
        "phaseenddate":"",
        "createdbyadmin":userDetail?.id ||userDetail?.userid,
      
    }

    const [formValues, setFormValues] = useState(initialValues || {})
    const [formErrors, setFormErrors] = useState({})
    const [isSubmit, setIsSubmit] = useState(false)
    const[display,setdisplay]=useState(false)

    useEffect(() => {

        if (Object.keys(formErrors).length === 0 && isSubmit) {
            console.log(formValues)
            const dataSubmit = async () => {
                const result = await addProjectPhaseApi(ProjectName, formValues)
                if (result?.status) {
        
                    console.log(result)
                    // props.setdisplay(false)
              
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

        if(!values.phasename){
            errors.phasename = "Phase Name is Required"
        }
        if (!values.phaseweightage) {
            errors.phaseweightage = "Phase weightage is Required"
        }
        if(!values.phasestartdate){
            errors.phasestartdate="Phase Start Date is Required"
        }
        if(!values.phaseenddate){
          errors.phaseenddate="User End Date  is Required"
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
      



                 <div>
                    <div className="col-12 grid-margin">
                        <div className="card">
                            <div className="card-body">
                                <h4 className="card-title">Add Phase</h4>
                                <form className="form-sample" onSubmit={handleSubmit}>

                                    <div className="row">
                                        <div className="col-md-6">
                                            <Form.Group >
                                                <label className=" col-form-label">Phase Name</label>
                                                <div >
                                                    <Form.Control
                                                        type="text"
                                                        placeholder="Enter your Phase Name"
                                                        name="phasename"
                                                        value={formValues?.phasename}
                                                        onChange={handleChange}
                                                    />
                                                    <p className="errorMsg">{formErrors.phasename}</p>
                                                </div>
                                            </Form.Group>
                                        </div>
                                        <div className="col-md-6">
                                            <Form.Group >
                                                <label className=" col-form-label">Phase Weightage</label>
                                                <div >
                                                    <Form.Control
                                                        type="text"
                                                        placeholder="Enter your Phase Weightage"
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
                                            <Form.Group >
                                                <label className="col-form-label">Phase Start Date</label>
                                                <div >
                                                <Form.Control
                                                        placeholder="Enter Phase Start Date"
                                                        type="date"
                                                        name='phasestartdate'
                                                        
                                                        value={formValues?.phasestartdate}
                                                        max={formValues?.phaseenddate}
                                                        onChange={handleChange}
                                                    />
                                                     <p className="errorMsg">{formErrors.phasestartdate}</p>
                                                </div>
                                            </Form.Group>
                                        </div>
                                        <div className="col-md-6">
                                            <Form.Group >
                                                <label className="col-form-label">Phase End Date</label>
                                                <div >
                                                <Form.Control
                                                        placeholder="Enter Phase End Date"
                                                        type="date"
                                                        name='phaseenddate'
                                                       
                                                        value={formValues?.phaseenddate}
                                                        min={formValues?.phasestartdate}
                                                        onChange={handleChange}
                                                    />
                                                     <p className="errorMsg">{formErrors.phaseenddate}</p>
                                                </div>
                                            </Form.Group>      
                                        </div>

                                      
                                    </div>

                                    <button className="btn btn-gradient-info btn-rounded btn-fw" type='submit' value='submit' >Submit</button>
                                    <button className="btn btn-gradient-info btn-rounded btn-fw" style={{ marginLeft: "50px" }} type='submit' value='submit' onClick={()=>{setdisplay(true)}} >Next</button>

                                </form>
                            </div>
                        </div>
                    </div>
                
                </div> 
                {display && <AddProjectPhaseTask  display={display} setdisplay={setdisplay}  ></AddProjectPhaseTask>}
            </>
    )
}

export default AddProjectPhase

