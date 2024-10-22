"use client";

import { useState } from "react";
import MyCalendar from "./components/Calendra";
import Nav from "./components/navBar";
import Eventlist from "./components/Eventlist";
import { useCalendar } from "./components/ContextApi";
import Form from "./components/Form";
import AlertPopUp from "./components/AlertPopUp";




export default function Home() {

  const [auth, setauth] = useState(false);
  const [HoverDate, setHoverdate] = useState<string>('');
  const [ClickDate, setClickdate] = useState<string>('');
  const { Authentication } = useCalendar();



  return (
    <div className=" w-full  sm:w-screen h-full sm:h-screen max-h-full overflow-hidden flex bg-gray-200    justify-center  relative">
      <Nav logedin={Authentication.logedin} setauth={setauth} />
      <div className="w-full min-h-screen max-h-full mt-32 sm:mt-0 gap-2 flex flex-col sm:flex-row px-4 items-center   justify-center">
        <div className=" w-full sm:w-1/2 flex  justify-center h-fit">
          <MyCalendar setHoverdate={setHoverdate} ClickDate={ClickDate} setClickdate={setClickdate} />
        </div>
        <div className=" w-full sm:w-1/2 sm:min-w-[500px] flex justify-center sm:flex-none  ">
          <Eventlist Hoverdate={HoverDate} ClickDate={ClickDate} />
        </div>
        {auth && <Form setauth={setauth} />}
        <AlertPopUp Data={'created suceefull'}/>
      </div>
    </div>
  );
}
