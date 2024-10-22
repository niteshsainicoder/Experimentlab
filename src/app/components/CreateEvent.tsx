import React, { useEffect, useState } from 'react'
import { useCalendar } from './ContextApi';

function CreateEvent({ Date, setCreateEvent, ClickDate }: { Date: string, ClickDate: string, setCreateEvent: (arg0: boolean) => void }) {
    const [data, setdata] = useState({ Date: Date, Data: '' });
    const { Authentication, setAuthentication } = useCalendar();
    const addEvent = async () => {
        if (data.Data === '' || data.Date === '' || Authentication.ProfileData._id === '') {
            alert('Event cannot be empty');
            return
        }
        await fetch(`/api/Data/save`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ...data, UserID: Authentication.ProfileData._id }),
        }).then((res) => res.json()).then(res => {
            console.log(res,);

            if (res.message === 'Data saved successfully') {
                setAuthentication({ logedin: true, ProfileData: { _id: Authentication.ProfileData._id, name: Authentication.ProfileData.name, email: Authentication.ProfileData.email, events: [...Authentication.ProfileData?.events, { _id: res.Event._id, Date: res.Event.Date, Data: res.Event.Data }] } })
                setCreateEvent(false);
            }
        })
    }
    useEffect(() => {
        if (ClickDate == '') {

            setdata(prev => ({ ...prev, Date: Date })) }
     else {
                setdata(prev => ({ ...prev, Date: ClickDate }))
            }

        }, [ClickDate,Date])

    return (
        <div className='absolute top-0 right-0 w-screen h-screen flex justify-center backdrop-blur-[2px] opacity-100  items-center'>
            <div className='w-[400px] relative min-w-[400px] min-h-[250px] max-h-[450px] bg-neutral-300 rounded-lg flex flex-col items-center justify-center opacity-95 backdrop-blur-lg  '>
                <div className='w-full flex justify-between items-center h-1/6 p-1 px-6'>
                    <h1 className='font-bold text-neutral-700 text-lg'>Create Event</h1>
                    <span onClick={() => setCreateEvent(false)} className='text-2xl text-red-500 font-bold hover:scale-105 cursor-pointer  hover:z-30 p-1 '>×</span>
                </div>
                <textarea placeholder={`write your event... for ${ClickDate == '' ? Date : ClickDate} `} onChange={(e) => setdata(prev => ({ ...prev, Data: e.target.value }))} className='w-11/12  h-5/6 min-h-[200px] max-h-[400px] p-2 rounded-md text-justify  antialiased bg-neutral-200 '>

                </textarea>

                <div className='w-full flex justify-around h-1/6 p-1 gap-4'>

                    <button type='button' onClick={addEvent} className='p-1 px-3 rounded-md bg-blue-500 text-white hover:bg-blue-400'>Create </button>
                </div>
            </div>
        </div>
    )
}

export default CreateEvent
