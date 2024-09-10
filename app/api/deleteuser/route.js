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
      return NextResponse.json({ message: "Delete Success" }, { status: 200 });

    } else {
      console.log("user is not available ", userid);
      return NextResponse.json({ message: "User Not Found!" }, { status: 400 });
    }

  } catch (error) {
    return NextResponse.json(
      { message: "Failed to delete user", error },
      { status: 500 }
    );
  }
}
