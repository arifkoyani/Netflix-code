import { NextResponse } from "next/server";
import ConnectMongoDB from "../Utils/ConnectMongoDB";
import User from "../Utils/Schema";

export async function PUT(req) {
    try {
      const { NewEmail, CurrentEmail } = await req.json();
      console.log(NewEmail, CurrentEmail);
      await ConnectMongoDB();
      const updateduser=await User.findOneAndUpdate(
        {email:CurrentEmail},
        {email:NewEmail},
        {new:true}
    )
    console.log("delete user id:",updateduser._id)
    if(updateduser){
        console.log("update user :",updateduser);

        return NextResponse.json({ message: 'Email updated successfully' }, { status: 200 });

    }

    else{
        console.log("update user :",updateduser);
        return NextResponse.json({ message: 'Email Not updated successfully' }, { status: 404 });
    }

    } catch (error) {
      console.error('Error parsing request:', error);
      return NextResponse.json({ message: 'Failed to update email'}, { status: 500 });
    }
  }
  