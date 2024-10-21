import { useEffect, useState } from "react";
import 'react-calendar/dist/Calendar.css';
import Calendar from "react-calendar";

interface MyCalendarProps {
    setHoverdate: (value: string) => void;
    setClickdate: (value: string) => void;
    ClickDate: string; // Expect this to be in a valid date string format
}

export default function MyCalendar({ setHoverdate, setClickdate, ClickDate }: MyCalendarProps) {
    const [calendarDate, setCalendarDate] = useState<Date | null>(new Date(ClickDate||'October 21 2024')); // Convert ClickDate string to Date

    // Utility function to format date to DD/MM/YYYY
    const formatDateToDDMMYYYY = (date: Date) => {
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    const handleTileClick = (date: Date) => {
        const formattedDate = formatDateToDDMMYYYY(date);        
        setClickdate(formattedDate); // Save formatted date
        setCalendarDate(date); // Update local state with selected date
    };

    useEffect(() => {
        const tiles = document.querySelectorAll(".react-calendar__tile");

        const handleMouseOver = (tile: Element) => {
            const abbrElement = tile.querySelector("abbr");
            if (abbrElement) {
                const hoveredDate = abbrElement.getAttribute("aria-label");
                if (hoveredDate) {
                    const parsedDate = new Date(hoveredDate);
                    setHoverdate(formatDateToDDMMYYYY(parsedDate)); // Format hovered date
                }
            }
        };

        // Add mouseover and click event listeners to each tile
        tiles.forEach(tile => {
            tile.addEventListener("mouseover", () => handleMouseOver(tile));
            tile.addEventListener("click", () => {
                const abbrElement = tile.querySelector("abbr");
                if (abbrElement) {
                    const clickedDate = new Date(abbrElement.getAttribute("aria-label")!);
                    handleTileClick(clickedDate); // Handle tile click
                }
            });
        });

        // Cleanup event listener on component unmount
        return () => {
            tiles.forEach(tile => {
                tile.removeEventListener("mouseover", () => handleMouseOver(tile));
                tile.removeEventListener("click", () => {
                    const abbrElement = tile.querySelector("abbr");
                    if (abbrElement) {
                        const clickedDate = new Date(abbrElement.getAttribute("aria-label")!);
                        handleTileClick(clickedDate); // Handle tile click
                    }
                });
            });
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [setHoverdate ]);

    return (
        <div className="flex gap-4 flex-col">
            <h1 className="text-xl font-semibold text-stone-600 antialiased">Selected Date for Event: <span className="font-medium font-stone-500">{ClickDate || formatDateToDDMMYYYY(calendarDate as Date)}</span></h1>
            <div>
                <Calendar
                    value={calendarDate} // Ensure value is a Date object
                    className="border-0 rounded-lg p-4 bg-gray-400"
                />
            </div>
        </div>
    );
}
