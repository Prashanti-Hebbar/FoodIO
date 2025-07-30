import jwt  from "jsonwebtoken";
const verifyIdToken = (req,res,next) =>
    {

        try {
            const token = req.cookies.token;
                        if(!token)
                {
                    console.log('Token not found');
                    res.status(401).json({ msg: "Unauthorized" });
                    return;
                }
            let decoded = jwt.verify(token,process.env.JWT_SECRET);
            req.user = decoded;
            next();
        } catch (err)  {
            console.log('theres an error',err)
        }
    }
export default verifyIdToken;