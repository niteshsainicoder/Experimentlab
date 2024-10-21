import Event from "@/models/Event";
import UserEvent from "@/models/eventUser"; // Assuming this is your User model
import dbConnect from "@/utils/dbConnect";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
     await dbConnect();
    const { Data, UserID, Date } = await req.json();
    console.log(Data, UserID, Date);

    // Check if any required fields are missing
    if (!Data || !UserID || !Date) {
      
      return NextResponse.json({ message: "Please provide Data, UserID, and Date" }, { status: 400 });
    }

    // Create the event
    const createEvent = await Event.create({ Data, UserID, Date });

    if (!createEvent) {
      return NextResponse.json({ message: "Data not saved" }, { status: 400 });
    }

    // Find the user by ID and push the created event's _id into their events array
    const updateUser = await UserEvent.findByIdAndUpdate(
      UserID,
      { $push: { events: createEvent._id } }, // Add the event's ObjectId to the user's events array
      { new: true } // Return the updated document
    );

    if (!updateUser) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Successfully created the event and linked it to the user
    return NextResponse.json({ message: "Data saved successfully", Event: createEvent, User: updateUser }, { status: 201 });
    
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error:any) {
    // Handle any unexpected errors
    return NextResponse.json({ message: "Server error", error: error.message }, { status: 500 });
  }
}
