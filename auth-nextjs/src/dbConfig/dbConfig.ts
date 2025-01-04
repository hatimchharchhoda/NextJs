import mongoose from "mongoose";

export async function connect() {
   try {
      mongoose.connect(process.env.MONGO_URI!);
      const connection = mongoose.connection

      connection.on('connected', () => {
         console.log("mongoDB connected");
      })

      connection.on('error', (err) => {
         console.log("monogoDB connection error please check mongo up and running : ", err);
         process.exit()
      })

   } catch (error) {
      console.log("database connection failed: ",error);
   }
}