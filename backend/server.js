import express from "express";
const app = express();
import cors from "cors";
import { config } from "dotenv";
import connectDB from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";
import { errorHandler } from "./middleware/errorMidleware.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import { createServer } from "http";
import { Server } from "socket.io";

app.use(express.static("public"));
config();
app.use(cors());
connectDB();
app.use(express.json());
app.use("/api/products", productRoutes);
app.use("/api/user", userRoutes);
app.use("/api/orders", orderRoutes);

app.get("/", (req, res) => {
  res.send("app is runnin");
});
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`server is runnin on ${process.env.PORT}`));

const httpServer = createServer(app);
httpServer.listen(9000);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  io.on("msg", (data) => {
    console.log(`new client ${data}`);
  });
});
