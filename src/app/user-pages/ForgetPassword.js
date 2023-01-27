import React from 'react'
import { Form } from 'react-bootstrap'
import { useForm } from "react-hook-form";
import { Link } from 'react-router-dom';
import { forgetpassword } from '../../api/forgetPassword';

import { useHistory } from 'react-router-dom';


const ForgetPassword = () => {

  const history = useHistory();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (d) => { handleForgetPasswordApiCallasync(d) }
  const handleForgetPasswordApiCallasync = async (d) => {

    const data = { ...d, port: window.location.origin }
    console.log(data)
    const result = await forgetpassword(data);
    if (result?.status) {
      console.log(result)
      history.push("/login");

    }
    else {


      // setErrorMessage(result.data.message)
    }
  }

  return (
    <div>
      <div className="d-flex align-items-center auth px-0">
        <div className="row w-100 mx-0">
          <div className="col-lg-4 mx-auto">
            <div className="auth-form-light text-left py-5 px-4 px-sm-5">
              <div className="brand-logo">
              </div>
              <h4>Hello! Forget Password </h4>
              <h6 className="font-weight-light">Enter Email to continue.</h6>
              <Form className="pt-3" onSubmit={handleSubmit(onSubmit)} >
                <Form.Group className="d-flex search-field">
                  <Form.Control
                    type="text"
                    name="email"
                    {...register("email", {
                      required: true,
                      pattern: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/
                    })}
                    placeholder="Email"
                    size="lg"
                    className="h-auto" />
                </Form.Group>
                {errors.email && errors.email.type === "required" && (
                  <p className="errorMsg">Email is required.</p>
                )}
                {errors.email && errors.email.type === "pattern" && (
                  <p className="errorMsg">Email is not valid.</p>
                )}
                <div className="mt-3">
                  <button className="btn btn-block btn-info btn-lg font-weight-medium auth-form-btn" type="submit" value="submit">Send Reset Link</button>
                  {/* <p className="errorMsg">{errorMessage}</p> */}
                  <Link to={'/login'} className="auth-link text-black">Rememeber password?</Link>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ForgetPassword