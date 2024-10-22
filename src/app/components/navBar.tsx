'use client';
import React from 'react'
import { useCalendar } from './ContextApi';

function Nav({logedin,setauth}:{logedin:boolean,setauth:(arg0:boolean)=>void}) {
  const {setAuthentication} = useCalendar();
const handleauth=()=>{
  if(logedin){
    setauth(false)
    setAuthentication({logedin:false,ProfileData:{_id:'',name:'',email:'',events:[{_id:'',Date:'',Data:''}]}});
    localStorage.removeItem('ProfileData');
  }else{
    setauth(true)
  }
}

  return (
  <div className="bg-gray-300 z-50  caret-transparent  border-[1px] shadow-xl border-gray-400 rounded-3xl p-2 flex justify-between items-center px-7 sm:px-14  w-10/12 sm:w-7/12 absolute top-7">
   <span className='text-gray-600 font-semibold text-lg sm:text-3xl antialiased '>
   Calendra
   </span>
   <div>
    <span onClick={()=>handleauth()} className=' text-gray-400 hover:text-gray-500 hover:scale-110 font-semibold cursor-pointer text-xl'> {!logedin  ?'login':'Logout'}</span>
  </div>
  </div>
  )
}

export default Nav
