
import { NextResponse } from 'next/server';
import ConnectMongoDB from '../Utils/ConnectMongoDB';
import User from '../Utils/Schema';

export async function POST(req) {

  try {
    const { email } = await req.json();
    console.log(email, "new emial exist");
    await ConnectMongoDB();
   const user= await User.findOne({email}).select("_id");
   console.log(" this is user id :",user)
    return NextResponse.json({user});
  } catch (e) {
    console.log(e)
    return NextResponse.json({ message: " not success" }, { status: 500 });
  }
}
