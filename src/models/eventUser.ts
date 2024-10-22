import mongoose, { Schema } from 'mongoose';

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    events:[{type:Schema.Types.ObjectId,ref:"Event"}]
});

const UserEvent = mongoose.models.UserEvent || mongoose.model('UserEvent', UserSchema);
export default UserEvent;
