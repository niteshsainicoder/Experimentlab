import UserEvent from "@/models/eventUser";
import dbConnect from "@/utils/dbConnect";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await dbConnect();

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
    const createEvent = await UserEvent.findById(UserID )?.populate(
      "events"
    );

    console.log(createEvent);
    
    if (!createEvent) {
      return NextResponse.json({ message: "Data not saved" }, { status: 400 });
    }

    // Successfully created the event
    return NextResponse.json(
      { message: "Data saved successfully", Event: createEvent.events },
      { status: 201 }
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
