import React, { useEffect, useState } from 'react'
import EventPopUp from './EventPopUp'
function Event({ date, title, _id, Hoverdate, PresentDate , ClickDate }: { date: string, title: string,  Hoverdate: string,  _id: string,  PresentDate: string, ClickDate: string }) {
  useEffect(() => {
    // console.log(PresentDate, Hoverdate, date, ClickDate,  'PresentDate')
  }, [Hoverdate, PresentDate, date , ClickDate])
const [open,setopen] = useState(false)
  return (<>
    <div onClick={() => setopen(true)} className={`flex border-[1px] hover:bg-stone-200 rounded-md border-gray-400  cursor-pointer ${Hoverdate == date || PresentDate == date || ClickDate == date ? 'bg-stone-200 font-medium text-neutral-700border-cyan-600 rounded-lg   ' : 'bg-stone-100'}`} >
      <h1 className={` min-w-40 text-center w-fit max-w-40   px-2`}>
        {date.toString()}
      </h1>
      {title && <span className='w-full text-ellipsis'> {title} </span>}


    </div>
  { open &&  <EventPopUp data={ title} _id={_id} date={date} setopen={setopen}  />}
    </>
  )
}

export default Event
