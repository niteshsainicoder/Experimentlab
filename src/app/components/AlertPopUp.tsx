import React, { useEffect } from 'react'

function AlertPopUp({ Data }: { Data: string }) {

    const [show, setShow] = React.useState(true);
    
    useEffect(()=>{
        setTimeout(()=>{
           setShow(false) 
        },1000)
    },[])
    return (
        <div onClick={()=> setShow(!show)} className={`w-full  absolute top-85 ${show?'translate-y-72':' translate-y-96'} h-16 min-w-[200px] max-w-[350px] rounded-3xl  transition-all duration-300 bg-gradient-to-r from-neutral-600 via-stone-500  to-neutral-800 border-2 border-cyan-600  text-white flex justify-center font-semibold antialiased items-center text-[20px]`}>
            <h1>
                {Data}
                <span className='text-green-500 font-bold p-2 -rotate-90 bg-clip-content'>✓</span>
            </h1>
        </div>
    )
}

export default AlertPopUp
