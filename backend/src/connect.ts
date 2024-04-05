import mongoose from "mongoose";
const connectToMongoDB = async()=>{
    try{
        await mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string);

        console.log("connected to database: ", process.env.MONGODB_CONNECTION_STRING);


    }catch(err){
        console.log(err);
    }
}

export default connectToMongoDB;