import React from 'react'
import { useBg } from '../context/bg'

const BgComponent = () => {
    const [bg] = useBg();
  return (
    bg?.darkBg ? (
    <div className= 'bg-slate-600 w-full h-[100vh] fixed top-0 left-0 flex justify-center items-center opacity-40 z-10'>
    </div>
    ):
    (<></>)
  )
}

export default BgComponent