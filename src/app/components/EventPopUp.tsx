'use client';
import React, { useState } from 'react'
import { useCalendar } from './ContextApi'

function EventPopUp({ data, setopen,_id , date }: { data: string, _id: string, date: string,setopen: (arg0: boolean) => void }) {
  const [update,setupdate] = useState<string>('');
const {Authentication,setAuthentication} = useCalendar();
  const deleteEvent = async() => {
    if (Authentication.ProfileData._id === '' && !Authentication.ProfileData.events.includes({_id: _id, Data: data, Date: date})) {
      alert('Event cannot be deleted')
      return;
    }
    await fetch(`/api/Data/delete?_id=${_id}&UserID=${Authentication.ProfileData._id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((res) => res.json()).then((res) => {
      if (res.message === 'Event deleted successfully') {
        setopen(false);
        setAuthentication({
          logedin: Authentication.logedin,
          ProfileData: {
            ...Authentication.ProfileData,
            events: Authentication.ProfileData.events.filter((val) => val._id !== _id),
          },
        })
      }
    })
  }

  const updateEvent = async() => {
    if (update === '' || Authentication.ProfileData._id === '' || _id === '') {
      alert('Event cannot be empty')
      return;
    }
    await fetch(`/api/Data/update?_id=${_id}&UserID=${Authentication.ProfileData._id}&Data=${update}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((res) => res.json()).then((res) => {
      if (res.message === 'Event updated successfully') {
        setopen(false);
        setAuthentication({
          logedin: Authentication.logedin,
          ProfileData: {
            ...Authentication.ProfileData,
            events: Authentication.ProfileData.events.map((val) => val._id === _id ? { ...val, Data: update } : val),
          },
        })
        alert('Event updated successfully');
      }
    })
  }
  return (
    <div className='absolute top-0 right-0 w-screen h-screen flex justify-center backdrop-blur-[2px] opacity-100  items-center'>
      <div className='w-[400px] min-w-[400px] min-h-[250px] max-h-[450px] bg-neutral-300 rounded-lg flex flex-col items-center justify-center opacity-95 backdrop-blur-lg  '>
        <div className='w-full flex justify-between items-center h-1/6 p-1 px-6'>   <h1 className='font-bold text-neutral-700 text-lg'>Event</h1> <span onClick={() => setopen(false)} className='text-2xl text-red-500 font-bold hover:scale-105 cursor-pointer  hover:z-30 p-1 '>×</span></div>
        <textarea placeholder={data}  onChange={(e) => setupdate(e.target.value)} className='w-11/12 h-5/6 min-h-[200px] max-h-[400px] p-2 rounded-md text-justify font-semibold text-xl antialiased bg-neutral-200 '>
         
        </textarea>
        <div className='w-full flex justify-around h-1/6 p-1 gap-4'>
          <button type='button' onClick={deleteEvent} className='p-1 px-3 rounded-md bg-red-700 text-white hover:bg-red-00'>Delete </button>
          <button type='button' onClick={updateEvent} className='p-1 px-3 rounded-md bg-neutral-900 text-white hover:bg-neutral-800'>Update </button>
        </div>
      </div>
    </div>
  )
}

export default EventPopUp
