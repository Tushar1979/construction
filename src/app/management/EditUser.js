import React, { useState, useEffect } from 'react'
import EditableModal from '../component/EditableModal';
import { editUserApi } from '../../api/putUserApi';
import { Form } from 'react-bootstrap';

const EditUser = (props) => {
  

    const { userOneData, handleGetUserApiCall,userRolesData } = props;

    const initialValues = {
        name: userOneData?.name,
        contact: userOneData?.contact,
        email: userOneData?.email,
        designation: userOneData?.designation,
        // address:userOneData.addresss
     
    }
   

    const [formValues, setFormValues] = useState(initialValues || {})
    const [formErrors, setFormErrors] = useState({})
    const [isSubmit, setIsSubmit] = useState(false)

    useEffect(() => {

        if (Object.keys(formErrors).length === 0 && isSubmit) {
            console.log(formValues)
            const dataSubmit = async () => {
                const result = await editUserApi(userOneData?.userid, formValues)
                if (result?.status) {
        
                    console.log(result)
                    props.setdisplay(false)
              
                    handleGetUserApiCall()
             
        
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

    const validate = (values) => {
        const errors = {}
        const regex = /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/;
        if(!values.name){
            errors.name = "User Name is Required"
        }
        if (!values.email) {
            errors.email = "Owner Email is Required"
        } else if (!regex.test(values?.email)) {
            errors.email = "Owner Email is not valid"
        }
        if (!values.contact) {
            errors.contact = "User Contact is Required"
        }
        if(!values.designation){
            errors.designation="User Designation is Required"
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
                                <h4 className="card-title">Edit User</h4>
                                <form className="form-sample" onSubmit={handleSubmit}>

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
                                                    
                                                    {/* <select className="form-control" onChange={(e) => setDesignationlevel(e.target.value)} >
                                                    {userRolesData.map(function (value) {
                                                    if (value.rolename === userOneData.designation) {
                                                    return <option value={value.id} selected>{value.rolename}</option>
                                                  } else

                                                 return <option value={value.id}>{value.rolename}</option>
                                                  })} </select> */}


                                                <select className="form-control" name='designation' onChange={handleChange} >
                                                    {userRolesData.map(function (value) {
                                                    if (value.rolename === userOneData.designation) {
                                                    return <option key={value.rolename} value={value.id} selected>{value.rolename}</option>
                                                  } else

                                                 return <option >{value.rolename}</option>
                                                  })} </select> 

                                                </div>
                                            </Form.Group>
                                        </div>
                                    </div>
                                    {/* <div className="row">
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
                                                     <p className="errorMsg">{formErrors.email}</p>
                                                </div>
                                            </Form.Group>
                                        </div>

                                    
                                    </div> */}

                                    <button className="btn btn-gradient-info btn-rounded btn-fw" type='submit' value='submit' >Edit User</button>
                                </form>
                            </div>
                        </div>
                    </div>

                </div>
            </EditableModal>
        </>
    )
}

export default EditUser