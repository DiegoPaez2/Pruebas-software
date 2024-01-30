import express from "express";
import authRoutes from "./routes/auth.js"
import adminRoutes from "./routes/admins.js"
import productRoutes from "./routes/products.js"
import cookieParser from "cookie-parser";
import multer from "multer";

const app = express()

app.use(express.json())
app.use(cookieParser())

const storage = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null, '../client/public/upload')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now()+file.originalname)
    }
})

const upload = multer({ storage });

app.post('/backend/upload', upload.single('file'), function (req, res){
const file = req.file;    
res.status(200).json(file.filename)
})

app.use("/backend/auth", authRoutes)
app.use("/backend/admins", adminRoutes)
app.use("/backend/products", productRoutes)

app.listen(8800,()=>{
    console.log("Connected!")
})
