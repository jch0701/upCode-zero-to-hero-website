import express from "express";
import cors from 'cors';
// Import your routes here
// Example: import exampleRoutes from './routes/exampleRoutes.js';

import { initDB } from './config.js';
const app = express();
app.use(cors());
app.use(express.json());

(async () => {
  try {
    // ensure DB + tables exist before loading controllers that create pools
    await initDB();

    // import routes AFTER DB init so controllers can create pools safely
    // format: const { default: <routeName> } = await import('<path-to-route>');
    // Example: const { default: exampleRoutes } = await import('./routes/exampleRoutes.js');

    // Now do: app.use("/api", <routeName>);
    // app.use("/api", exampleRoutes);

    // Starts the server
    app.listen(5000, () => console.log("server started on port 5000"));
  } catch (err) {
    console.error("Failed to init DB, not starting server", err);
    process.exit(1);
  }
})();

