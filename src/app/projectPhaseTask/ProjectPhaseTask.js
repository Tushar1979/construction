import React,{useState,useEffect} from 'react'
import { useSelector } from "react-redux";
import AddProjectPhaseTask from '../projectPhaseTask/AddProjectPhaseTask';
import EditProjectPhase from '../projectPhase/EditProjectPhase'
import CustomizeModal from '../component/CustomizeModal';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import{addProjectPhaseApi} from '../../api/postAddProjectPhase'
import{deleteProjectPhaseApi} from '../../api/deleteProjectPhase'
import { Link, useHistory } from 'react-router-dom';

const ProjectPhaseTask = (props) => {
    
    const{ProjectName,projectPhase,handleGetProjectPhaseApiCall}=props

    const history = useHistory();

    const userDetail = useSelector((state) => state.home.userDetail);
    const [display, setdisplay] = useState(false);
    const [view, setview] = useState(false)
    const [show, setShow] = useState(false);
    const [phaseId, setPhaseId] = useState();
  
    const [projectOnePhase, setProjectOnePhase] = useState([])

  
    


    const handleDeleteProjectPhaseApiCall = async () => {
            const result = await deleteProjectPhaseApi(phaseId);
            handleGetProjectPhaseApiCall(ProjectName)
    }
    
    

    const TabelAction1 = (p) => <><div className='cursor-pointer' >
    <svg onClick={(() => {setview(true);setProjectOnePhase(p.data) })} fill="#000000" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30" width="20px" height="20px">    <path d="M 22.828125 3 C 22.316375 3 21.804562 3.1954375 21.414062 3.5859375 L 19 6 L 24 11 L 26.414062 8.5859375 C 27.195062 7.8049375 27.195062 6.5388125 26.414062 5.7578125 L 24.242188 3.5859375 C 23.851688 3.1954375 23.339875 3 22.828125 3 z M 17 8 L 5.2597656 19.740234 C 5.2597656 19.740234 6.1775313 19.658 6.5195312 20 C 6.8615312 20.342 6.58 22.58 7 23 C 7.42 23.42 9.6438906 23.124359 9.9628906 23.443359 C 10.281891 23.762359 10.259766 24.740234 10.259766 24.740234 L 22 13 L 17 8 z M 4 23 L 3.0566406 25.671875 A 1 1 0 0 0 3 26 A 1 1 0 0 0 4 27 A 1 1 0 0 0 4.328125 26.943359 A 1 1 0 0 0 4.3378906 26.939453 L 4.3632812 26.931641 A 1 1 0 0 0 4.3691406 26.927734 L 7 26 L 5.5 24.5 L 4 23 z" /></svg>
    &nbsp; &nbsp;

    <svg onClick={(() => { setShow(true);setPhaseId(p.data.id); })} fill="#000000" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30" width="20px" height="20px">    <path d="M 14.984375 2.4863281 A 1.0001 1.0001 0 0 0 14 3.5 L 14 4 L 8.5 4 A 1.0001 1.0001 0 0 0 7.4863281 5 L 6 5 A 1.0001 1.0001 0 1 0 6 7 L 24 7 A 1.0001 1.0001 0 1 0 24 5 L 22.513672 5 A 1.0001 1.0001 0 0 0 21.5 4 L 16 4 L 16 3.5 A 1.0001 1.0001 0 0 0 14.984375 2.4863281 z M 6 9 L 7.7929688 24.234375 C 7.9109687 25.241375 8.7633438 26 9.7773438 26 L 20.222656 26 C 21.236656 26 22.088031 25.241375 22.207031 24.234375 L 24 9 L 6 9 z" /></svg>
    </div></>
  
   
    const DeleteAction1 = () => { console.log("delete now"); setShow(false); handleDeleteProjectPhaseApiCall(ProjectName) }

    const [columnDefs1] = useState([
      { headerName: 'Actions', field: 'Actions',cellRenderer: TabelAction1, filter: false },
      { headerName: 'Id', field: 'id' },
      { headerName: 'Phase name', field: 'phasename' },
      { headerName: 'Phase weightage', field: 'phaseweightage' },
      { headerName: 'phase start date', field: 'phasestartdate' },
      { headerName: 'Phase End date', field: 'phaseenddate' },
     
   
    ]);

    const onRowClicked=(p)=>{
    
        if(p.value !== undefined){
          history.push(`/ProjectPhaseDetailPage/${p.data.id}`)

        }
      
      }
    return (
        <div className="col-12 grid-margin">
        <div className="card">
          <div className="card-body">
        <div>
            <div className='m-3 text-right'>

                {userDetail?.designation === "Admin" || userDetail?.designation === "Superadmin" ? <button type="button" className="btn btn-gradient-info  btn-fw  text-white text-decoration-none" onClick={() => setdisplay(true)}> Add Task </button> : ""}

            </div>

            <h4 className="card-title">Phases</h4>
            <div className="ag-theme-alpine" style={{ height: 400, }}>
                
                {projectPhase ?
                    
                    <AgGridReact
                        // rowData={projectPhase || []}
                        // columnDefs={columnDefs1}
                        // defaultColDef={defaultColDef}
                        pagination={true}
                        onCellClicked={onRowClicked}
                    />
                   :
                    "Loading"
                } 
            </div>
            </div>
            </div>
            </div>
            <CustomizeModal
                show={show}
                handleClose={() => setShow(false)}
                handleShow={() => setShow(true)}
                modalTitle="Confirmation!"
                // onClick={DeleteAction1}
                // Action="Delete"
            >
                Are you want to Delete?
            </CustomizeModal>
            {display && <AddProjectPhaseTask addProjectPhaseApi={addProjectPhaseApi} display={display} setdisplay={setdisplay} ProjectName={ProjectName} handleGetProjectPhaseApiCall={handleGetProjectPhaseApiCall}></AddProjectPhaseTask>}
             {/* { view && <EditProjectPhase projectOnePhase={projectOnePhase} view={view} setview={setview} handleGetProjectPhaseApiCall={handleGetProjectPhaseApiCall} ProjectName={ProjectName}/>     } */}
        </div>
    )
}

export default ProjectPhaseTask