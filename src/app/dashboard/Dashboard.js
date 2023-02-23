import React, { useState, useEffect,useMemo } from 'react'
import { Link,useHistory } from 'react-router-dom';

import { Doughnut } from 'react-chartjs-2';
import Aggridtable from '../component/Aggridtable'
import { getProjectApi } from '../../api/getProjectApi';
import { useSelector } from "react-redux";

const Dashboard = (props) => {
  const userDetail = useSelector((state) => state.home.userDetail);
  const history = useHistory();

  const [ProjectData, setProjectData] = useState([])


  useEffect(() => {
    handleGetProjectApiCall();
  }, []);

  const handleGetProjectApiCall = async () => {
    const result = await getProjectApi();
    const filteredData = result.data.filter((item) => { return item["isactive"] != false });
    setProjectData(filteredData)
  }

  const Data = {
    labels: [],
    datasets: [
      {
        label: 'completed',
        data: [25, 48, 28],
        backgroundColor: [
          'rgba(255, 99, 132 )',
          'rgba(54, 162, 255,3)',

          'rgba(75, 192, 192)',

        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };
  const TabelAction = (p) => <><div className='cursor-pointer'>
    <svg onClick={(() => { setdisplay(true); setProjectid(p?.data?.id); setProjectOneData(p.data) })} fill="#000000" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30" width="20px" height="20px">    <path d="M 22.828125 3 C 22.316375 3 21.804562 3.1954375 21.414062 3.5859375 L 19 6 L 24 11 L 26.414062 8.5859375 C 27.195062 7.8049375 27.195062 6.5388125 26.414062 5.7578125 L 24.242188 3.5859375 C 23.851688 3.1954375 23.339875 3 22.828125 3 z M 17 8 L 5.2597656 19.740234 C 5.2597656 19.740234 6.1775313 19.658 6.5195312 20 C 6.8615312 20.342 6.58 22.58 7 23 C 7.42 23.42 9.6438906 23.124359 9.9628906 23.443359 C 10.281891 23.762359 10.259766 24.740234 10.259766 24.740234 L 22 13 L 17 8 z M 4 23 L 3.0566406 25.671875 A 1 1 0 0 0 3 26 A 1 1 0 0 0 4 27 A 1 1 0 0 0 4.328125 26.943359 A 1 1 0 0 0 4.3378906 26.939453 L 4.3632812 26.931641 A 1 1 0 0 0 4.3691406 26.927734 L 7 26 L 5.5 24.5 L 4 23 z" /></svg>
    &nbsp; &nbsp;
    <svg onClick={(() => { setShow(true); setProjectid(p?.data?.id) })} fill="#000000" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30" width="20px" height="20px">    <path d="M 14.984375 2.4863281 A 1.0001 1.0001 0 0 0 14 3.5 L 14 4 L 8.5 4 A 1.0001 1.0001 0 0 0 7.4863281 5 L 6 5 A 1.0001 1.0001 0 1 0 6 7 L 24 7 A 1.0001 1.0001 0 1 0 24 5 L 22.513672 5 A 1.0001 1.0001 0 0 0 21.5 4 L 16 4 L 16 3.5 A 1.0001 1.0001 0 0 0 14.984375 2.4863281 z M 6 9 L 7.7929688 24.234375 C 7.9109687 25.241375 8.7633438 26 9.7773438 26 L 20.222656 26 C 21.236656 26 22.088031 25.241375 22.207031 24.234375 L 24 9 L 6 9 z" /></svg>
  </div></>

  const [columnDefs] = useState([
    // { headerName: 'Detail', field: 'Detail', cellRenderer: ViewDetailProjectPage, filter: false },
    { headerName: 'Project Id', field: 'id', width: 120, resizable: true, filter: false, width: 110 },
    { headerName: 'Project Name', field: 'projectname', resizable: true, width: 165 },
    { headerName: 'Estimated Cost', field: 'estimatedcost', hide: hideCol(), resizable: true, width: 155 },
    { headerName: 'Start Date', field: 'startdate', resizable: true, width: 155 },
    { headerName: 'End Date', field: 'enddate', resizable: true, width: 155 },

    { headerName: 'Project Manager', field: 'projectmanager', width: 160 },
    { headerName: 'Principal Arcitect', field: 'principalarchitect', width: 165 },
    { headerName: 'Project Address', field: 'projectaddress', width: 165 },
    { headerName: 'Project Owner', field: 'owner', hide: hideCol(), width: 155 },
    { headerName: 'Owner Contact Number', field: 'ownercontact', hide: hideCol(), width: 165 },
    { headerName: 'Owner Email', field: 'owneremail', hide: hideCol(), width: 200 },
    { headerName: 'Actions', field: 'Actions', cellRenderer: TabelAction, filter: false, width: 100 },


  ]);

  const defaultColDef = useMemo(() => ({
    sortable: true,
    filter: true,
    cellStyle: () => ({
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    })
  }))


  function hideCol() {
    var x
    (userDetail?.designation === "Admin" || userDetail?.designation === "Superadmin") ? x = false : x = true

    return x;
  }

  const onRowClicked = (p) => {

    if (p.value !== undefined) {
      history.push(`/ProjectDetailPage/${p.data.id}`)

    }

  }



  return (
    <div>

      <div className="row">

        <div className="col-md-4 stretch-card grid-margin ">
          <div className="card bg-gradient-danger card-img-holder text-white">
            <div className="card-body ">
              <Link to="/projectlist/InTrouble" className='text-decoration-none text-white'>
                <img src={require("../../assets/images/dashboard/circle.png")} className="card-img-absolute " alt="circle" />
                <h4 className="font-weight-normal mb-3">In Trouble<i className="mdi mdi-chart-line mdi-24px float-right"></i>
                </h4>
                <h2 className="mb-5">20%</h2>
                <h6 className="card-text">Increased by 60%</h6>
              </Link>
            </div>
          </div>
        </div>
        <div className="col-md-4 stretch-card grid-margin">
          <div className="card bg-gradient-info card-img-holder text-white">
            <div className="card-body">
              <Link to="/projectlist/BehindSchedule" className='text-decoration-none text-white'>
                <img src={require("../../assets/images/dashboard/circle.png")} className="card-img-absolute" alt="circle" />
                <h4 className="font-weight-normal mb-3">Behind Schedule<i className="mdi mdi-bookmark-outline mdi-24px float-right"></i>
                </h4>
                <h2 className="mb-5">20%</h2>
                <h6 className="card-text">Decreased by 10%</h6>
              </Link>
            </div>
          </div>
        </div>
        <div className="col-md-4 stretch-card grid-margin">
          <div className="card bg-gradient-success card-img-holder text-white">
            <div className="card-body">
              <Link to="/projectlist/ontrack" className='text-decoration-none text-white'>
                <img src={require("../../assets/images/dashboard/circle.png")} className="card-img-absolute" alt="circle" />
                <h4 className="font-weight-normal mb-3">On Track<i className="mdi mdi-diamond mdi-24px float-right"></i>
                </h4>
                <h2 className="mb-5">60%</h2>
                <h6 className="card-text">Increased by 5%</h6>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-7 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <div className="clearfix mb-4">

                <Aggridtable
                  title='All Project'
                  columnDefs={columnDefs}
                  rowData={ProjectData}
                  defaultColDef={defaultColDef}
                
                  onCellClicked={onRowClicked}
                />

              </div>

            </div>
          </div>
        </div>
        <div className="col-md-5 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title ">Traffic Sources</h4>
              <Doughnut data={Data} />
              <div id="traffic-chart-legend" className="rounded-legend legend-vertical legend-bottom-left pt-4">
                <ul>
                  <li>
                    <span className="legend-dots bg-info"></span>completed
                    <span className="float-right">60%</span>
                  </li>
                  <li>
                    <span className="legend-dots bg-success"></span>On Progress
                    <span className="float-right">23%</span>
                  </li>
                  <li>
                    <span className="legend-dots bg-danger"></span>Total Project
                    <span className="float-right">20%</span>
                  </li>
                </ul>
              </div>

            </div>
          </div>
        </div></div></div>
  )
}

export default Dashboard