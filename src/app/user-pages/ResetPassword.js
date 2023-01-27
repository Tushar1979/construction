import React from 'react'
import{resetpassword} from '../../api/resetPassword'
const ResetPassword = () => {


    const handlePostResetPassword=async(d)=>{
        const result = await resetpassword(d);

    }


  return (
    <div>
      <div className="d-flex align-items-center auth px-0">
        <div className="row w-100 mx-0">
          <div className="col-lg-4 mx-auto">
            <div className="auth-form-light text-left py-5 px-4 px-sm-5">
              <div className="brand-logo">

              </div>
              <h4>Hello! Set Your New Password </h4>
              <h6 className="font-weight-light">Enter New Password to continue.</h6>

              <Form className="pt-3"  >


                <Form.Group className="d-flex search-field">

                  <Form.Control
                    type="text"
                    name="passwors"
                    // {...register("email", {
                    //   required: true,

                    // })}

                    placeholder="Enter New Password"
                    size="lg"
                    className="h-auto" />

                </Form.Group>
                <Form.Group className="d-flex search-field">

                  <Form.Control
                    type="text"
                    name="passwors"
                    // {...register("email", {
                    //   required: true,

                    // })}

                    placeholder="Enter Confirm Password"
                    size="lg"
                    className="h-auto" />

                </Form.Group>






                <div className="mt-3">

                  <button className="btn btn-block btn-info btn-lg font-weight-medium auth-form-btn" type="submit" value="submit">Submit</button>
                  {/* <p className="errorMsg">{errorMessage}</p> */}

                </div>





              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ResetPassword