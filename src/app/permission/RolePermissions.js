import React, { useState } from 'react'
import "rsuite/dist/rsuite.min.css";
import { Checkbox, CheckboxGroup } from "rsuite";
const RolePermissions = () => {




  const checkboxes = [1, 2, 3, 4, 5];
  const [checked, setChecked] = React.useState([]);

  // Function to handle all checkbox check
  function handleCheckboxesCheckAll(checked, isChecked) {

    // if "isChecked" is "true" set "setChecked" 
    // to checkboxes array or set it to empty array.

    setChecked(isChecked ? checkboxes : []);
  }

  function handleCheckboxChange(checked) {
    setChecked(checked);
  }

  console.log(checked)

  return (
    <>

      <div className='row'>
        <div className="col-lg-4 grid-margin">
          <div className="card">
            <div className="card-body p-3  ">
            
              <div className='heading_permission'>
                <h3 className='p-2'>User</h3>
              </div>

              <div class="input-group  heading_permission  ">
                <input type="text" class="form-control border-0" placeholder="Search" />
                <div class="input-group-append ">

                  <i class="mdi mdi-magnify m-2 icon_size"></i>

                </div>
              </div>

              <div className='heading_permission p-2 mt-2'>
                {/* <div className='checkboxs_border form-check '>

                  <label htmlFor="" className="form-check-label">
                  <input className="checkbox" type="checkbox" />
                  abc <i className="input-helper"></i>
                </label>

              

                </div> */}

                <Checkbox
                  indeterminate={checked.length > 0 &&
                  checked.length < checkboxes.length}
                  checked={checked.length === checkboxes.length}
                  onChange={handleCheckboxesCheckAll}
                  style={{ display: "block" }}
                >
                  Create User
                </Checkbox>

                {/* Checkbox Group with three checkboxes */}
                <CheckboxGroup  name="checkboxGroup"
                  value={checked}
                  onChange={handleCheckboxChange}>
           
                  <Checkbox key={1} value={1} className="ml-4">
                  Read OneUser
                  </Checkbox>

                  <Checkbox key={2} value={2} className="ml-4">
                  DeleteOneUser
                  </Checkbox>

                  <Checkbox key={3} value={3} className="ml-4">
                  Update OneUser
                  </Checkbox>

                  <Checkbox key={4} value={4} className="ml-4">
                  Login User
                  </Checkbox>

                  <Checkbox key={5} value={5} className="ml-4">
                  Get Role
                  </Checkbox>
             
                </CheckboxGroup>
             

              </div>
            </div>


          </div></div>
        <div className="col-lg-4  grid-margin">
          <div className="card">
            <div className="card-body">
              abc
            </div>
          </div></div>
        <div className="col-lg-4 grid-margin">
          <div className="card">
            <div className="card-body">

              abc


            </div>
          </div></div>
        <div className="col-lg-4  grid-margin">
          <div className="card">
            <div className="card-body">
              abc
            </div>
          </div></div>
        <div className="col-lg-4  grid-margin">
          <div className="card">
            <div className="card-body">
              abc
            </div>
          </div></div>
      </div>

    </>
  )
}

export default RolePermissions