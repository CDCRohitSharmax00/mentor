/* eslint-disable no-unused-vars */
import React from 'react'
import LOGO from "../../assets/inspiration-logo-transparent.png";

const Loader = () => {
    return (
        <div className='flex flex-col justify-center items-center  h-screen w-screen'>
            <img src={LOGO} className='w-[150px] animate-[wiggle_1s_ease-in-out_infinite]' alt="loader...." /> 
            <h1 className='text-center mt-3 font-poppins text-[24px] font-bold' >Inspiration App </h1>
        </div>
    )
}

export default Loader