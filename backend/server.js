import express from "express";
import cors from 'cors';
import { initDB } from "./config.js";

const app = express();
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

(async () => {
  try {
    await initDB();
    // format: const { default: <routeName> } = await import('<path-to-route>');
    // Example: const { default: exampleRoutes } = await import('./routes/exampleRoutes.js');
    const { default: projectRoutes } = await import('./routes/projectRoutes.js');
    const { default: roadmapRoutes } = await import('./routes/roadmapRoutes.js');
    const { default: userRoutes } = await import('./routes/userRoutes.js');
    const { default: careerRoutes } = await import('./routes/careerRoutes.js');
    const { default: adminRoutes } = await import('./routes/adminRoutes.js');
    const { default: applicationRoutes } = await import('./routes/applicationRoutes.js');

    // Now do: app.use("/api", <routeName>);
    // app.use("/api", exampleRoutes);

    app.use("/api", projectRoutes);
    app.use("/api", roadmapRoutes);
    app.use("/api", userRoutes);
    app.use("/api", careerRoutes);
    app.use("/api", applicationRoutes);
    app.use("/api/admin", adminRoutes);
    
    console.log("Registered profile routes");

    // Starts the server
    app.listen(5000, () => console.log("server started on port 5000"));
  } catch (err) {
    console.error("Server startup error: ", err);
    process.exit(1);
  }
})();

