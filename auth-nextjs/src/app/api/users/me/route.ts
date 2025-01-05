import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from 'next/server'
import { getDataFromToken } from "@/helper/getDataFromToken"
import User from "@/models/userModel";

connect()

export async function POST(request: NextRequest){
   const userData = await getDataFromToken(request)
   const user = await User.findOne({_id: userData}).select("-password")
   return NextResponse.json({message: "user found" , data : user });

}