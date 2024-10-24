import React, { useEffect, useState } from 'react'
import Event from './Event'
import CreateEvent from './CreateEvent';
import { useCalendar } from './ContextApi';


interface Event {
  Date: string;
  Data: string;
  _id: string,
}

function Eventlist({ Hoverdate, ClickDate }: { Hoverdate: string, ClickDate: string }) {
  const { Authentication, setAuthentication } = useCalendar();
  const [Events, setEvents] = useState<Event[]>([]);
  const PresentDate: Date = new Date();
  const [Createevent, setCreateevent] = useState(false);
  const formateDate = (newValue: Date) => {
    const formattedDate = new Intl.DateTimeFormat('en-GB').format(newValue);
    return formattedDate;
  };

  const fetchEvents = async () => {
    await fetch(`/api/Data/getrecents?UserId=${Authentication.ProfileData._id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },

    }).then((res) => res.json()).then((res) => {
      console.log(res);

      setEvents(res.Event?.map((val: { _id: string, Date: string, Data: string }) => ({ _id: val._id, Date: val.Date, Data: val.Data })))
      setAuthentication({ logedin: true, ProfileData: { _id: Authentication.ProfileData._id, name: Authentication.ProfileData.name, email: Authentication.ProfileData.email, events: res.Event?.map((val: { _id: string, Date: string, Data: string }) => ({ _id: val._id, Date: val.Date, Data: val.Data })) } })

    })

  }

  
  const sortedEvents =Authentication.ProfileData?.events.sort((a, b) => {
    const dateA = a.Date.split('/').reverse().join('-');  // Convert 'DD/MM/YYYY' to 'YYYY-MM-DD'
    const dateB = b.Date.split('/').reverse().join('-');
    return new Date(dateA).getTime() - new Date(dateB).getTime();  // Compare the date objects
  });
  useEffect(() => {
    if (Authentication.ProfileData._id !== ' ' && Authentication.logedin) {

      setTimeout(() => {

        fetchEvents();
      }, 1500);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Authentication.logedin, Authentication.ProfileData._id])

  useEffect(() => {

    const ProfileData = localStorage.getItem('ProfileData');

    if (ProfileData && JSON.parse(ProfileData).logedin) {
      setAuthentication(JSON.parse(ProfileData));

    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (

    <div className='bg-gray-200 border-gray-300  caret-transparent rounded-md border-2 min-h-[315px] p-[2px] min-w-[300px] sm:max-w-[500px]'>
      <div className='flex justify-between h-fit max-h-[40px] p-1'>
        <h1 className='w-full text-center font-semibold text-xl antialiased pb-4 text-gray-600 '>Eventlist</h1>
        <button type='button' onClick={() => setCreateevent(true)} className=' px-3 rounded-md max-h-7 bg-blue-800 text-white hover:bg-blue-600 border border-gray-800'>Add</button>
      </div>
      <div className=' flex flex-col gap-[2px] w-full h-full'>
        {Authentication.ProfileData.events ? sortedEvents?.map((val, key) => (<Event key={key} _id={val._id} date={val.Date} ClickDate={ClickDate} Hoverdate={Hoverdate} PresentDate={formateDate(PresentDate)} title={val.Data} />
        )) : Events?.map((val, key) => (<Event key={key} _id={val._id} date={val.Date} ClickDate={ClickDate} Hoverdate={Hoverdate} PresentDate={formateDate(PresentDate)} title={val.Data} />))}
      </div>
      {Createevent && <CreateEvent Date={formateDate(PresentDate)} ClickDate={ClickDate} setCreateEvent={setCreateevent} />}
    </div>
  )
}


export default Eventlist;
