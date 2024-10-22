import Event from "@/models/Event";
import UserEvent from "@/models/eventUser";
import dbConnect from "@/utils/dbConnect";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  await dbConnect();
  try {

console.log("connected");

    const url = new URL(req.url);
    const UserID = url.searchParams.get("UserId");
    // Check if any required fields are missing
    
    if (!UserID) {
      return NextResponse.json(
        { message: "Please provide  UserID" },
        { status: 400 }
      );
    }

    // Create the event
    const createEvent = await UserEvent.findById(UserID)
    
    if (!createEvent) {
      return NextResponse.json({ message: "Data not saved" }, { status: 400 });
    }

    const documents = await Event.find({ _id: { $in: createEvent.events } });

    // Successfully created the event
    return NextResponse.json(
      { message: "Data Received successfully", Event: documents },
      { status: 200 }
    );
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    // Handle any unexpected errors
    return NextResponse.json(
      { message: "Server error", error: error.message },
      { status: 500 }
    );
  }
}
