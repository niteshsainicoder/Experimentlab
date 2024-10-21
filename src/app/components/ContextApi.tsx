'use client';
import { createContext, useContext, useEffect, useState } from "react";
 interface CalendarContextType {
    Authentication: {
        logedin: boolean; // Auth status
        ProfileData: {
            _id: string,
            name: string,
            email: string,
            events: {
                _id: string,
                Date: string,
                Data: string    
            }[],
        }; // User profile data
    };
    setAuthentication: (data: { logedin: boolean; ProfileData: { _id: string; name: string; email: string;  events: {_id:string,Date:string,Data:string}[]; }; }) => void;
}

// Create context with default values
const Calendar = createContext<CalendarContextType>({
    Authentication: {
        logedin: false,
        ProfileData: {
            _id: '',
            name: '',
            email: '',
            events: [{
                _id: '',
                Date: '',
                Data: '',}],
        },
    },
    setAuthentication: () => {}, // No-op function
});

// Provider component
export function CalendarProvider({ children }: { children: React.ReactNode }) {
;

    const [Authentication, setAuthentication] = useState({
        logedin: false,
        ProfileData: {
            _id: '',
            name: '',
            email: '',
            events: [{
                _id: '',
                Date: '',
                Data: '',
            }],
        },
    });


    useEffect(()=>{console.log(Authentication);
    },[Authentication])
    return (
        <Calendar.Provider value={{  Authentication, setAuthentication }}>
            {children}
        </Calendar.Provider>
    );
}

// Custom hook to use the Calendar context
export const useCalendar = () => {
    return useContext(Calendar);
};
