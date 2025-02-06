import dbConnect from "@/lib/dbConnect";
import { getServerSession } from "next-auth";
import UserModel from "@/model/User";
import { authOptions } from "../../auth/[...nextauth]/options";
import { User } from "next-auth";
import mongoose from "mongoose";

export async function DELETE(
    request: Request, 
    { params }: { params: { messageid: string } }
) {
    try {
        await dbConnect();
        
        // Get and validate user session first
        const session = await getServerSession(authOptions);
        const user: User = session?.user as User;
        
        if (!user._id) {
            return Response.json({
                success: false,
                message: "Not Authenticated",
            }, { status: 401 });
        }

        // Convert IDs to ObjectId
        const messageObjectId = new mongoose.Types.ObjectId(params.messageid);
        const userObjectId = new mongoose.Types.ObjectId(user._id);

        // Using the correct field name 'message' instead of 'messages'
        const result = await UserModel.updateOne(
            { _id: userObjectId },
            {
                $pull: {
                    message: { _id: messageObjectId }
                }
            }
        );

        console.log("Delete operation result:", result);

        if (!result.acknowledged) {
            return Response.json({
                success: false,
                message: "Database operation failed",
                result: result
            }, { status: 500 });
        }

        if (result.matchedCount === 0) {
            return Response.json({
                success: false,
                message: "User not found",
            }, { status: 404 });
        }

        if (result.modifiedCount === 0) {
            return Response.json({
                success: false,
                message: "Message not found or already deleted",
            }, { status: 404 });
        }

        return Response.json({
            success: true,
            message: "Message deleted successfully",
            result: result
        }, { status: 200 });

    } catch (error) {
        console.error("Error in deleting message:", error);
        return Response.json({
            success: false,
            message: "Error in deleting message",
            error: error instanceof Error ? error.message : "Unknown error"
        }, { status: 500 });
    }
}