import { useState, useEffect } from "react";

const useToaster = (url) => {
  const [Text, setText] = useState(null);
  const [Type, setType] = useState(null);
  const [Visible, setTVisible] = useState(null);

  useEffect(() => {
    //redux 
    // redux(Visible)
    // redux me dalna ( text)
  },[Visible])


  return [setText,setType,setTVisible];
};

export default useToaster;

// component 
// portal 








// import React from 'react'
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// // const modalRoot = document.getElementById('modal-root');

// function usePortal(id) {
//     const rootElemRef = React.useRef(document.createElement('div'));
//   }
//Toastify app.js
// const Toastify = () => {
    

// //    const showToastMessage=()=>{

// redux selector visible = redux state ;
// redux selector text = redux state ;
// //     toast(text);
// //    } 
//   return ReactDOM.createPortal(
//     <div  className='modal'>
//     {/* <button onClick={onclick}>{props.Action}</button> */}
// visible ? 
//     <ToastContainer visible={visible} /> : ""
//     </div>
//   )
// }

// export default Toastify