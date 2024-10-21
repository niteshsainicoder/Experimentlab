import Event from "@/models/Event";
import UserEvent from "@/models/eventUser";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {
  const url = new URL(req.url);
  const _id = url.searchParams.get("_id");
  const UserID = url.searchParams.get("UserID");
  if (!_id || !UserID) {
    return NextResponse.json(
      { message: "Please provide _id and UserID" },
      { status: 400 }
    );
  }

  const deleteEvent = await Event.findByIdAndDelete(_id);
  if (!deleteEvent) {
    return NextResponse.json({ message: "Event not found" }, { status: 404 });
  }
  const updateUser = await UserEvent.findByIdAndUpdate(
    UserID,
    { $pull: { events: _id } },
    { new: true }
  );
  if (!updateUser) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }
  return NextResponse.json(
    { message: "Event deleted successfully" },
    { status: 200 }
  );
}
