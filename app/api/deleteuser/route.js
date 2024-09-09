import { NextResponse } from "next/server";
import User from "../Utils/Schema";
import ConnectMongoDB from "../Utils/ConnectMongoDB";

export async function DELETE(req) {
  try {
    const { email } = await req.json();
    await ConnectMongoDB();
    const userid = await User.findOneAndDelete({ email });


    if (userid) {
      console.log("user delete :", userid);
      return NextResponse.json({ message: "Success" }, { status: 200 });
    } else {
      console.log("user is not available ", userid);
      return NextResponse.json({ message: "Not Success" }, { status: 404 });
    }


  } catch (error) {
    return NextResponse.json(
      { message: "Failed to delete user", error },
      { status: 500 }
    );
  }
}
