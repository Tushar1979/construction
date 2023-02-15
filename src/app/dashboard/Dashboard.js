import React from 'react'
import { Link } from 'react-router-dom'; 
import AllProject from '../projectlist/AllProject';
import { Doughnut} from 'react-chartjs-2';
const Dashboard = () => {


  const Data = {
    labels: [],
    datasets: [
      {
        label: '# of Votes',
        data: [12, 19, 2],
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
                 
                 <AllProject/>
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
                      <span className="float-right">30%</span>
                     </li>
                     <li>
                       <span className="legend-dots bg-success"></span>On Progress
                       <span className="float-right">30%</span>
                     </li>
                     <li>
                       <span className="legend-dots bg-danger"></span>Total Project
                       <span className="float-right">40%</span>
                     </li>
                   </ul>
                 </div>
               
              </div>
           </div>
          </div></div></div>
  )
}

export default Dashboard