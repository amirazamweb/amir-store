import React from 'react'

const ForgotPassword = () => {
  return (
    <section>
        <div className='container mx-auto p-4 pt-[100px]'>
           
        <div className='bg-white w-full max-w-sm mx-auto small-dev-p p-5 shadow-md'>
        <div className='text-xl font-semibold text-center'>Change your password</div>
          <form className='mt-3'>
            <div>
                <label>Email:</label>
                <div className='bg-slate-100 p-2'>
                <input type='text' placeholder='enter email' maxLength='6' required className='w-full outline-none bg-transparent text-slate-500'/>
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