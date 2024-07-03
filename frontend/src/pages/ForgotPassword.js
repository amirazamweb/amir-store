import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast'


const ForgotPassword = () => {
  const [email, setEmail] = useState('');

  // submitHandler
  const submitHandler = async(e)=>{
      e.preventDefault();
      const generateOTP = Math.floor((Math.random()*900000)+100000);
      try {
        const {data} = await axios.post(`${process.env.REACT_APP_SERVER_DOMAIN}/api/v1/auth/reset-password-otp`,{email, generateOTP});
  
       if(data?.success){
          toast.success(data?.message)
       }

       else{
        toast.error(data?.message)
       }


      } catch (error) {
        console.log(error);
      }
  }


  return (
    <section>
        <div className='container mx-auto p-4 pt-[100px]'>
           
        <div className='bg-white w-full max-w-sm mx-auto small-dev-p p-5 shadow-md'>
        <div className='text-xl font-semibold text-center'>Change your password</div>
          <form className='mt-3' onSubmit={submitHandler}>
            <div>
                <label>Email:</label>
                <div className='bg-slate-100 p-2'>
                <input type='email' placeholder='enter email' required className='w-full outline-none bg-transparent text-slate-500' defaultValue={email} onChange={(e)=>setEmail(e.target.value)}/>
                </div>

                <div>
                    <input type='submit' value='Send email' className='w-fit bg-[#FE4938] text-white px-[22px] py-[7px] mt-3 hover:bg-red-700 cursor-pointer mx-auto block rounded-full'/>
                </div>
            </div>
          </form>
        </div>
           
        </div>
    </section>
  )
}

export default ForgotPassword