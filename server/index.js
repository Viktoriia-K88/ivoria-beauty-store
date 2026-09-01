import path from "node:path";
import { fileURLToPath } from "node:url";

import cors from "cors";
import dotenv from "dotenv";
import express from "express";

import productRoutes from "./routes/productRoutes.js";

import { isChannel3FetchEnabled } from "./services/channel3Service.js";

import { loadPersistentCache } from "./services/cacheService.js";

const currentFilePath = fileURLToPath(import.meta.url);

const currentDirectory = path.dirname(currentFilePath);

dotenv.config({
  path: path.join(currentDirectory, ".env"),
});

const app = express();

const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.use("/api", productRoutes);

await loadPersistentCache();

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on port ${PORT}`);

  console.log(
    `Channel3 fetching: ${isChannel3FetchEnabled() ? "ENABLED" : "DISABLED"}`,
  );
});
