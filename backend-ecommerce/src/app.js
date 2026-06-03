import express from "express"
import userRouter from "./routes/user.routes.js"
import productRouter from "./routes/product.routes.js"
import cartRouter from "./routes/cart.routes.js"
import orderRouter from "./routes/order.routes.js"
import paymentRouter from "./routes/payment.routes.js"
import cors from "cors";
const app = express()

app.use(express.json())

app.use(cors());

app.use("/api/v1/users",userRouter)

app.use("/api/v1/products",productRouter)

app.use("/api/v1/cart", cartRouter);

app.use("/api/v1/orders",orderRouter);

app.use("/api/v1/payment", paymentRouter);

app.get("/",(req,res)=>{
    res.send("Backend is running")
})


export{app}