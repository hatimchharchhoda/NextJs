import mongoose from "mongoose";

type ConnectionObject = { 
   isConnected?: number
}

const connection: ConnectionObject = {}

async function dbConnect(): Promise<void> {
   if(connection.isConnected) {
      console.log("Database already connected");
      return
   }

   try {
      const db = await mongoose.connect(process.env.MONGODB_URI || '', {})
      connection.isConnected = db.connections[0].readyState
      console.log("consoling db: ",db," and this is db.connections[0]: ",db.connections[0]);
      console.log("Database connected");
      
   } catch (error) {
      console.log("Database connection failed: ", error);
      process.exit(0)
   }
}

export default dbConnect;