import React, { Component, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Form } from 'react-bootstrap';
import axios from 'axios'
import { loginApi } from '../../api/loginApi';
import {  useDispatch } from 'react-redux'
import { getUserDetail } from '../../redux/slices/HomeSlice'
import { useForm } from "react-hook-form";
import { Link } from 'react-router-dom';


export default function Login(props) {

  const dispatch = useDispatch();
  const history = useHistory();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const [isLoggedin, setIsLoggedin] = useState(false);
  const [errorMessage, setErrorMessage] = useState('')

  const onSubmit = (d) => { handleLoginApiCall(d) }

  const handleLoginApiCall = async (d) => {

    const result = await loginApi(d);
    if (result?.status) {
      const token = result.data.token;
      localStorage.setItem('token', token);
      console.log(result)
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      dispatch(getUserDetail(result.data.user))
      history.push("/");
    }
    else {
      setErrorMessage(result.data.message)
    }
  }

  return (
    <div>
      <div className="d-flex align-items-center auth px-0">
        <div className="row w-100 mx-0">
          <div className="col-lg-4 mx-auto">
            <div className="auth-form-light text-left py-5 px-4 px-sm-5">
              <div className="brand-logo">
                {/* <img src={require("../../assets/images/logo.png")} alt="logo" /> */}
              </div>
              <h4>Hello! let's get started  </h4>
              <h6 className="font-weight-light">Sign in to continue.</h6>
              {/* <Form className="pt-3" > */}
              <Form className="pt-3" onSubmit={handleSubmit(onSubmit)}>
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
                <Form.Group className="d-flex search-field">
                  <Form.Control
                    {...register("password", {
                      required: true
                    })}
                    type="password"
                    placeholder="Password"
                    size="lg"
                    className="h-auto" />
                </Form.Group>
                {errors.password && errors.password.type === "required" && (
                  <p className="errorMsg">Password is required.</p>
                )}
                <div className="mt-3">

                  <button className="btn btn-block btn-info btn-lg font-weight-medium auth-form-btn" type="submit" value="submit">SIGN IN</button>
                  <p className="errorMsg">{errorMessage}</p>
                </div>
                <div className="my-2 d-flex justify-content-between align-items-center">
                  {/* <div className="form-check">
                    <label className="form-check-label text-muted">
                      <input type="checkbox" className="form-check-input" />
                      <i className="input-helper"></i>
                      Keep me signed in
                    </label>
                  </div> */}
                  <Link to={'/forgetpassword'} className="auth-link text-black">Forgot password?</Link>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

