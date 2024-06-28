import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";



import electionRoutes from "./routes/elections.js"; // Example route file for elections CRUD
import userRoutes from "./routes/users.js"; // Example route file for user management
import candidateRoutes from "./routes/candidates.js"; // Example route file for candidates import
import resultRoutes from "./routes/results.js"; // Example route file for results view
import adminRoutes from "./routes/admin.js"; // Example route file for results view

dotenv.config();
const app = express();

app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


mongoose.set('strictQuery', true);




// Routes setup
app.use("/api/elections", electionRoutes);
app.use("/api/users", userRoutes);
app.use("/api/candidates", candidateRoutes);
app.use("/api/results", resultRoutes);
app.use("/api/admin", adminRoutes);

// MongoDB connection setup
const PORT = process.env.PORT || 9000;
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  app.listen(PORT, () =>
    console.log(`Server Running on Port: http://localhost:${PORT}`)
  );
})
.catch((error) => console.log(`${error} did not connect`));

