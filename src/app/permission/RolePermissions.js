import React, { useState } from 'react'
import "rsuite/dist/rsuite.min.css";
import { Checkbox, CheckboxGroup } from "rsuite";
import { Link } from 'react-router-dom';
const RolePermissions = () => {




  const checkboxes = [1, 2, 3, 4, 5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25 ];
  const [checked, setChecked] = React.useState([]);

  
  function handleCheckboxesCheckAll(checked, isChecked) {
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
          <div className="card card_size">
            <div className="card-body card_padding ">
            
              <div className='heading_permission '>
                <p className='heading_card'>User</p>
              </div>

              <div class="input-group  Search_permission  ">
                <input type="text" class="form-control border-0" placeholder="Search" />
                <div class="input-group-append ">

                  <i class="mdi mdi-magnify m-2 icon_size"></i>

                </div>
              </div>

              <div className='heading_checkbox '>
             

                <Checkbox
                  indeterminate={checked.length > 0 &&
                  checked.length < checkboxes.length}
                  checked={checked.length === checkboxes.length}
                  onChange={handleCheckboxesCheckAll}
                  className='checkboxesDesign'
                  style={{ display: "block",backgroundColor:"#F3F3F9" }}
                >
                  Create User
                </Checkbox>

                {/* Checkbox Group with three checkboxes */}
                <CheckboxGroup  name="checkboxGroup"
                  value={checked}
                  onChange={handleCheckboxChange} >
           
                  <Checkbox key={1} value={1} className="ml-4 subchk">
                  Read OneUser
                  </Checkbox>

                  <Checkbox key={2} value={2} className="ml-4 subchk">
                  Delete OneUser
                  </Checkbox>

                  <Checkbox key={3} value={3} className="ml-4 subchk">
                  Update OneUser
                  </Checkbox>

                  <Checkbox key={4} value={4} className="ml-4 subchk">
                  Login User
                  </Checkbox>

                  <Checkbox key={5} value={5} className="ml-4 subchk">
                  Get Role
                  </Checkbox>
             
                </CheckboxGroup>
             

              </div>
            </div>


          </div></div>
        <div className="col-lg-4  grid-margin">
        <div className="card card_size">
            <div className="card-body card_padding ">
            
              <div className='heading_permission '>
                <p className='heading_card'>Project</p>
              </div>

              <div class="input-group  Search_permission  ">
                <input type="text" class="form-control border-0" placeholder="Search" />
                <div class="input-group-append ">

                  <i class="mdi mdi-magnify m-2 icon_size"></i>

                </div>
              </div>

              <div className='heading_checkbox '>
             

                <Checkbox
                  indeterminate={checked.length > 0 &&
                  checked.length < checkboxes.length}
                  checked={checked.length === checkboxes.length}
                  onChange={handleCheckboxesCheckAll}
                  className='checkboxesDesign'
                  style={{ display: "block",backgroundColor:"#F3F3F9" }}
                >
                   Create Project
                </Checkbox>

                {/* Checkbox Group with three checkboxes */}
                <CheckboxGroup  name="checkboxGroup"
                  value={checked}
                  onChange={handleCheckboxChange} >
           
                  <Checkbox key={6} value={6} className="ml-4 subchk">
                  Get all Projects
                  </Checkbox>

                  <Checkbox key={7} value={7} className="ml-4 subchk">
                  Get Specific Project
                  </Checkbox>

                  <Checkbox key={8} value={8} className="ml-4 subchk">
                  Update OneUser
                  </Checkbox>

                  <Checkbox key={9} value={9} className="ml-4 subchk">
                  Update Project
                  </Checkbox>

                  <Checkbox key={10} value={10} className="ml-4 subchk">
                  Delete Project
                  </Checkbox>
             
                </CheckboxGroup>
             

              </div>
            </div>


          </div>
          </div>
        <div className="col-lg-4 grid-margin">
        <div className="card card_size">
            <div className="card-body card_padding ">
            
              <div className='heading_permission '>
                <p className='heading_card'>Phase</p>
              </div>

              <div class="input-group  Search_permission  ">
                <input type="text" class="form-control border-0" placeholder="Search" />
                <div class="input-group-append ">

                  <i class="mdi mdi-magnify m-2 icon_size"></i>

                </div>
              </div>

              <div className='heading_checkbox '>
             

                <Checkbox
                  indeterminate={checked.length > 0 &&
                  checked.length < checkboxes.length}
                  checked={checked.length === checkboxes.length}
                  onChange={handleCheckboxesCheckAll}
                  className='checkboxesDesign'
                  style={{ display: "block",backgroundColor:"#F3F3F9" }}
                >
                 Create Phase
                </Checkbox>

                {/* Checkbox Group with three checkboxes */}
                <CheckboxGroup  name="checkboxGroup"
                  value={checked}
                  onChange={handleCheckboxChange} >
           
                  <Checkbox key={11} value={11} className="ml-4 subchk">
                  GetPhasebybld
                  </Checkbox>

                  <Checkbox key={12} value={12} className="ml-4 subchk">
                  UpdateOnePhase
                  </Checkbox>

                  <Checkbox key={13} value={13} className="ml-4 subchk">
                  Assing User On Phase
                  </Checkbox>

                  <Checkbox key={14} value={14} className="ml-4 subchk">
                  DeleteEmployeeonPhase
                  </Checkbox>

                  <Checkbox key={15} value={15} className="ml-4 subchk">
                  GetAllPhasesOfProject
                  </Checkbox>
             
                </CheckboxGroup>
             

              </div>
            </div>


          </div></div>
        <div className="col-lg-4  grid-margin">
          <div className="card">
          <div className="card card_size">
            <div className="card-body card_padding ">
            
              <div className='heading_permission '>
                <p className='heading_card'>Task</p>
              </div>

              <div class="input-group  Search_permission  ">
                <input type="text" class="form-control border-0" placeholder="Search" />
                <div class="input-group-append ">

                  <i class="mdi mdi-magnify m-2 icon_size"></i>

                </div>
              </div>

              <div className='heading_checkbox '>
             

                <Checkbox
                  indeterminate={checked.length > 0 &&
                  checked.length < checkboxes.length}
                  checked={checked.length === checkboxes.length}
                  onChange={handleCheckboxesCheckAll}
                  className='checkboxesDesign'
                  style={{ display: "block",backgroundColor:"#F3F3F9" }}
                >
                  Create Task
                </Checkbox>

                {/* Checkbox Group with three checkboxes */}
                <CheckboxGroup  name="checkboxGroup"
                  value={checked}
                  onChange={handleCheckboxChange} >
           
                  <Checkbox key={16} value={16} className="ml-4 subchk">
                  GetOneTask
                  </Checkbox>

                  <Checkbox key={17} value={17} className="ml-4 subchk">
                  Update TaskProgress
                  </Checkbox>

                  <Checkbox key={18} value={18} className="ml-4 subchk">
                  UpdateTask
                  </Checkbox>

                  <Checkbox key={19} value={19} className="ml-4 subchk">
                  DeleteTask
                  </Checkbox>

                  <Checkbox key={20} value={20} className="ml-4 subchk">
                  Remove User from Task
                  </Checkbox>
             
                </CheckboxGroup>
             

              </div>
            </div>


          </div>
          </div></div>
        <div className="col-lg-4  grid-margin">
          <div className="card">
          <div className="card card_size">
            <div className="card-body card_padding ">
            
              <div className='heading_permission '>
                <p className='heading_card'>Role</p>
              </div>

              <div class="input-group  Search_permission  ">
                <input type="text" class="form-control border-0" placeholder="Search" />
                <div class="input-group-append ">

                  <i class="mdi mdi-magnify m-2 icon_size"></i>

                </div>
              </div>

              <div className='heading_checkbox '>
             

                <Checkbox
                  indeterminate={checked.length > 0 &&
                  checked.length < checkboxes.length}
                  checked={checked.length === checkboxes.length}
                  onChange={handleCheckboxesCheckAll}
                  className='checkboxesDesign'
                  style={{ display: "block",backgroundColor:"#F3F3F9" }}
                >
                 Create Role
                </Checkbox>

                {/* Checkbox Group with three checkboxes */}
                <CheckboxGroup  name="checkboxGroup"
                  value={checked}
                  onChange={handleCheckboxChange} >
           
                  <Checkbox key={21} value={21} className="ml-4 subchk">
                  Read Role
                  </Checkbox>

                  <Checkbox key={22} value={22} className="ml-4 subchk">
                  Update Role Premissions
                  </Checkbox>

                  <Checkbox key={23} value={23} className="ml-4 subchk">
                  Delete Role
                  </Checkbox>

                  <Checkbox key={24} value={24} className="ml-4 subchk">
                  Login User
                  </Checkbox>

                  <Checkbox key={25} value={25} className="ml-4 subchk">
                  Get Role
                  </Checkbox>
             
                </CheckboxGroup>
             

              </div>
            </div>


          </div>
          </div></div>
          
      </div>
      <div className="add-project-btns ">
     

    
      <Link
                  to={{
                    pathname: "/management/AddUser",
                    state: {
                      fromNotifications: true,
                    },
                  }}
                >

                   <button className="btn btn-gradient-info btn-rounded btn-fw m-2" style={{ marginLeft: "50px" }} onClick={() => setdisplay(true)} type='submit' value='submit' >Cancel</button>
                </Link>

                <button className="btn btn-gradient-info btn-rounded btn-fw" type='submit' value='submit' >Save</button>
    
      </div>
    </>
  )
}

export default RolePermissions