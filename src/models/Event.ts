import mongoose, { Schema } from "mongoose";

const EventSchema = new mongoose.Schema(
  {
    UserID: { type: Schema.Types.ObjectId, ref: "UserEvent" },
    Date: { type: String },
    Data: { type: String },
  },
  { timestamps: true }
);

const Event = mongoose.models.Event || mongoose.model("Event", EventSchema);
export default Event;
