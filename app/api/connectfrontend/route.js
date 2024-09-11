import ConnectMongoDB from "../Utils/ConnectMongoDB";
import User from "../Utils/Schema";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req) {
  const { email, password, name } = await req.json();
  await ConnectMongoDB();
  const newpassword = await bcrypt.hash(password, 10);
  try {
    const existEmail = await User.findOne({ email });
    console.log(existEmail)
    if (existEmail) {
      return NextResponse.json({ message: "Email already exists" }, { status: 400 });
    }
    else{
      const data = await User.create({ name, email, password:newpassword });
      return NextResponse.json({ message: "success" }, { status: 200 });

    }
    




  } catch (error) {
    console.log(error, "error===>>>");

    return NextResponse.json({ message: "error" }, { status: 500 });
  }
}
