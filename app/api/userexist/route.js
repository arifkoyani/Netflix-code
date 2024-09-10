import { NextResponse } from 'next/server';
import ConnectMongoDB from '../Utils/ConnectMongoDB';
import User from '../Utils/Schema';
import bcrypt from "bcryptjs"
export async function POST(req) {
  try {
    const { email,password } = await req.json();
    await ConnectMongoDB();
   const user= await User.findOne({email}).select("_id")
   const userpassword= await User.findOne({email}).select("password");
    if(!user){
    return NextResponse.json({message:"User is Not Exist"},{status:404});
    }

    const isPasswordValid = await bcrypt.compare(password, userpassword.password);
    console.log(isPasswordValid)
    if(!isPasswordValid){
      return NextResponse.json({message:"Wrong password"},{status:401});
      }
else{
    return NextResponse.json({message:"Login Successfull",login:true},{status:200});
}

// <-------------->>

  } catch (e) {
    console.log(e)
    return NextResponse.json({ message: " Not success" }, { status: 500 });
  }
}
