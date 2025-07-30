import mongoose from "mongoose"
const connectDB = async () =>
{
    try
    {
        const conn  = await mongoose.connect(process.env.MONGO_URI);
        console.log('Atlas connected');
    }catch(err)
    {
        console.log("there's some error with mogno atlas ",err);
        process.exit(1);
    }
} 
export default connectDB;