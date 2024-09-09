import { NextResponse } from "next/server";
import ConnectMongoDB from "../Utils/ConnectMongoDB";
import User from "../Utils/Schema";

export async function GET(req) {
  const email = req.nextUrl.searchParams.get("email"); 
  await ConnectMongoDB();
  
  try {
    const user = await User.findOne({ email });
    console.log(user);

    if (user) {
      return NextResponse.json(user, { status: 200 });
    } else {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
  } catch (error) {
    return NextResponse.json({ message: "Failed to retrieve user", error }, { status: 500 });
  }
}
