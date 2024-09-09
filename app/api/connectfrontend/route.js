import ConnectMongoDB from "../Utils/ConnectMongoDB";
import User from "../Utils/Schema";
import { NextResponse } from 'next/server';

export async function POST(req) {
  // console.log(req, 'req')
  try {
    const { email, password, name } = await req.json(); 
    // console.log(email, password,name, 'checkig')
    await ConnectMongoDB();
    // console.log('here',"here====?>");
    
   const data = await User.create({ name,email,password }); 
    // console.log(data,'data');

    return NextResponse.json({ message: "success" }, { status: 200 });
  } catch (error) {
    console.log(error , "error===>>>");
    
    return NextResponse.json({ message: "error" }, { status: 500 }); 
  }
}
