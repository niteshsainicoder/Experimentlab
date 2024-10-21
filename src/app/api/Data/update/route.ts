import Event from "@/models/Event";
import UserEvent from "@/models/eventUser";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
  const url = new URL(req.url);
  const _id = url.searchParams.get("_id");
  const UserID = url.searchParams.get("UserID");
  const Data = url.searchParams.get("Data");
  console.log(_id, UserID);
  if (!_id || !UserID || !Data) {
    return NextResponse.json(
      { message: "Please provide _id and UserID" },
      { status: 400 }
    );
  }
  const updateEvent = await Event.findByIdAndUpdate(
    _id,
    { $set: { Data: Data } },
    { new: true }
  );
  if (!updateEvent) {
    return NextResponse.json({ message: "Event not found" }, { status: 404 });
  }
  const updateUser = await UserEvent.findById(UserID);
  if (!updateUser.events.includes(_id)) {
    return NextResponse.json(
      { message: "User not found or id not found" },
      { status: 404 }
    );
  }
  return NextResponse.json(
    { message: "Event updated successfully", Event: updateEvent },
    { status: 200 }
  );
}
