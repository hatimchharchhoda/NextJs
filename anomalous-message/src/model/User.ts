import mongoose, {Schema, Document} from "mongoose";

export interface Message extends Document {
   content: string;
   createdAt: Date
}

const MessageSchema: Schema<Message> = new Schema({
   content: {
      type: String,
      required: true
   },
   createdAt: {
      type: Date,
      default: Date.now(),
      required: true
   }
})

export interface User extends Document {
   username: string;
   email: string;
   password: string;
   verifiedCode: string;
   verifiedCodeExpiry: Date;
   isVerified: boolean;
   isAcceptingMessage: boolean;
   message: Message[]
}

const UserSchema: Schema<User> = new Schema({
   username: {
      type: String,
      required: [true,"Username is required"],
      unique: true,
      trim: true
   },
   email: {
      type: String,
      unique: true,
      required: [true,"Email is required"],
      match: [/.+\@.+\..+/, 'Please use a valid email address']
   },
   password: {
      type: String,
      required: [true, "Password is required"],
   },
   verifiedCode: {
      type: String,
      required: [true, "Verify code is required"],
   },
   verifiedCodeExpiry: {
      type: Date,
      required: [true, "Verify code expiry is required"],
   },
   isVerified: {
      type: Boolean,
      default: false
   },
   isAcceptingMessage: {
      type: Boolean,
      default: true
   },
   message: [MessageSchema]
})

const UserModel = (mongoose.models.User as mongoose.Model<User>) || (mongoose.model<User>("User", UserSchema));

export default UserModel;