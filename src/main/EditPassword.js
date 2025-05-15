import React from 'react';
import Navbar from '../dashboard/Navbar';
import crypto from "../images/crypto.jpg"
import { apiConnectorPost } from '../utils/APIConnector';
import { endpoint } from '../utils/APIRoutes';
import toast from 'react-hot-toast';
import { useFormik } from 'formik';
import ButtomNavigation from '../Layout/ButtomNaviagatoin';

function EditPassword() {

const initialValues={
  pass : "",
  confirm_pass:""
}
const fk = useFormik({
  initialValues: initialValues,
  enableReinitialize:true,
  onSubmit:()=>{
    const reqbody ={
      pass : fk.values.pass,
      confirm_pass:fk.values.confirm_pass
    }
    changeFn(reqbody)
  }
})

const changeFn = async (reqbody)=>{

 try{
  const res = await apiConnectorPost(endpoint?.change_password_api , reqbody)
  toast(res?.data?.message)
 }
 catch(e){
  console.log(e)
 }
}

  return (

   <>
   <Navbar/>
    <div className="p-6 h-screen overflow-y-scroll  bg-custom-gradient flex flex-col items-center"
    
    //  style={{ backgroundImage: `url(${crypto})` }}
     
     >
      <h2 className="text-xl text-white font-bold mt-20 mb-10">Edit  </h2>
      <form  className='px-10 py-5 w-fit !mb-10   border border-yellow-400 rounded'>
        <div className="grid  grid-cols-1 gap-4  ">
          
        <div className=' flex lg:flex-row flex-col justify-between lg:items-center '>
            <label htmlFor="applicantName" className="block text-sm font-medium text-yellow-700">
              New Password *
            </label>
            <input
              type="text"
              id="pass"
              name="pass"
              value={fk.values.pass}
              onChange={fk.handleChange}
              className="mt-1 p-2 lg:w-[60%] w-full border border-yellow-500 rounded focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
         <div className=' flex lg:flex-row flex-col justify-between lg:items-center '>
            <label htmlFor="mobile" className="block text-sm font-medium text-yellow-700">
            Confirm Password *
            </label>
            <input
              type="text"
              id="confirm_pass" 
              name="confirm_pass"
              value={fk.values.confirm_pass}
              onChange={fk.handleChange}
              className="mt-1 p-2 lg:w-[60%] w-full border border-yellow-500 rounded focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
       
        <button
          className="mt-4 bg-yellow-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full"
        onClick={fk.handleSubmit}>
          Submit
        </button>
      </form>
    </div>
    <ButtomNavigation/>
    </>
  );
}

export default EditPassword;