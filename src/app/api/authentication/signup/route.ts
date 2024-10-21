// app/api/authentication/signup/route.js (for Next.js 13 with App Router)
import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/utils/dbConnect"; // adjust the path if needed
import UserEvent from "@/models/eventUser"; // adjust the path if needed

export async function POST(request: NextRequest) {
    console.log( await connectDB()); // Connect to the database

    const {Name, Email, Password } = await request.json();
console.log(Name, Email, Password);

    // Check if email already exists
    const existingUser = await UserEvent.findOne({ email: Email });
    if (existingUser) {
        console.log("Email already exists");
        return NextResponse.json({ message: "Email already exists" }, { status: 400 });
    }

    // Create a new user
    const newUser = new UserEvent({name: Name, email: Email, password: Password }); // Consider hashing the password before saving
  const data =   await newUser.save();
console.log(data);
    return NextResponse.json({ message: "User signed up successfully" }, { status: 201 });
}
