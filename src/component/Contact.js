import React from 'react'
import Footer from '../Layout/Footer'
import Header from '../Layout/Header'
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EmailIcon from '@mui/icons-material/Email';

export default function Contact() {
    return (
      <>
      <Header/>
        <div className='flex flex-col gap-1 justify-center items-center  p-10'>
            <p className='font-bold'> 
             <LocationOnIcon fontSize="small" color="primary" />  Address</p>
            <p className='pb-5'>Meta Prime, 1010 Market Street, San Francisco, CA 94103, USA</p>
            <p className='font-bold'><EmailIcon fontSize="small" color="primary" /> Email</p>
            <p >contact@metaprime.com</p>
            <p>For customer inquiries</p>
        </div>
        <Footer/>
      </>
    )
}
