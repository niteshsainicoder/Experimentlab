"use client";

import { useEffect, useState } from "react";
import MyCalendar from "./components/Calendra";
import Nav from "./components/navBar";
import Eventlist from "./components/Eventlist";
import { useCalendar } from "./components/ContextApi";
import Form from "./components/Form";




export default function Home() {

  const [auth, setauth] = useState(false);
  const [HoverDate, setHoverdate] = useState<string>('');
  const [ClickDate, setClickdate] = useState<string>('');
  const { Authentication } = useCalendar();
  useEffect(() => {
    console.log(HoverDate, auth, ClickDate, 'changed');
  }, [HoverDate, ClickDate, auth])


  return (
    <div className="p-4 w-screen h-screen max-h-fit flex bg-gray-200   justify-center  relative">
      <Nav logedin={Authentication.logedin} setauth={setauth} />
      <div className="w-full min-h-full max-h- flex p-4 items-center   justify-center">
        <div className="w-1/2 flex  justify-center h-fit">
          <MyCalendar setHoverdate={setHoverdate} ClickDate={ClickDate} setClickdate={setClickdate} />
        </div>
        <div className="w-1/2 min-h-fit ">
          <Eventlist Hoverdate={HoverDate} ClickDate={ClickDate} />
        </div>
        {auth && <Form setauth={setauth} />}
      </div>
    </div>
  );
}
