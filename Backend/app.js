import express from "express";
import cors from "cors";
import routes from "./routes/index.js";
import cookieParser from "cookie-parser";

const app = express();

// ✅ Show on server start
console.log("✅ Server is running...");

// ✅ CORS Configuration for your frontend
const corsOptions = {
  origin: "https://trustshare-a5u3.onrender.com", // ✅ Exact frontend origin
  credentials: true, // ✅ Allows cookies to be sent
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

// ✅ Apply CORS Middleware
app.use(cors(corsOptions));
app.options("*", cors(corsOptions)); // ✅ Handle preflight requests

// ✅ Debug: Force CORS headers for extra safety (optional)
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "https://trustshare-a5u3.onrender.com");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

// ✅ Core Middleware
app.use(express.json()); // Parse JSON request bodies
app.use(express.urlencoded({ extended: true })); // Parse form data
app.use(cookieParser()); // Parse cookies from requests

// ✅ Route Handling
app.use("/api/v1", routes);

// ✅ Global Error Handler
app.use((err, req, res, next) => {
  console.error("🔥 Server Error:", err);
  res.status(500).json({ error: "Internal Server Error" });
});

export default app;
