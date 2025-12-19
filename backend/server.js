import express from "express";
import cors from 'cors';
import { initDB } from "./config.js";

const app = express();
app.use(cors());
app.use(express.json());

(async () => {
  try {
    await initDB();
    // format: const { default: <routeName> } = await import('<path-to-route>');
    // Example: const { default: exampleRoutes } = await import('./routes/exampleRoutes.js');
    const { default: projectRoutes } = await import('./routes/projectRoutes.js');
<<<<<<< HEAD
    const { default: roadmapRoutes } = await import('./routes/roadmapRoutes.js');
    const { default: userRoutes } = await import('./routes/userRoutes.js');
    
=======
    const { default: roadmapRoutes } = await import('./routes/roadmapRoutes.js')
    const { default: careerRoutes } = await import('./routes/careerRoutes.js');

>>>>>>> 327b126b19bebdc4646c4be5b95fcedcc4aa5568
    // Now do: app.use("/api", <routeName>);
    // app.use("/api", exampleRoutes);

    app.use("/api", projectRoutes);
    app.use("/api", roadmapRoutes);
<<<<<<< HEAD
    app.use("/api", userRoutes);
=======
    app.use("/api", careerRoutes);
>>>>>>> 327b126b19bebdc4646c4be5b95fcedcc4aa5568

    // Starts the server
    app.listen(5000, () => console.log("server started on port 5000"));
  } catch (err) {
    console.error("Server startup error: ", err);
    process.exit(1);
  }
})();

