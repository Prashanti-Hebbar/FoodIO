import jwt from "jsonwebtoken";
const tokenGenerator = (email,id,res) =>
    {
      try
      {
              const token = jwt.sign(                       // generating new cookie
            { email,id},
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );
     res.cookie("token", token, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
       });
      }catch(err)
      {
        console.log(err);
      }
    }
export default tokenGenerator;