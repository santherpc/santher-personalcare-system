import express from "express";
import fs from "fs";
import path from "path";
import { nanoid } from "nanoid";
export function log(message, source = "express") {
    const formattedTime = new Date().toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
    });
    console.log(`${formattedTime} [${source}] ${message}`);
}
export async function setupVite(app, server) {
    const { createServer: createViteServer } = await import("vite");
    const serverOptions = {
        middlewareMode: true,
        hmr: { server },
        allowedHosts: true,
    };
    const vite = await createViteServer({
        configFile: path.resolve(import.meta.dirname, "..", "frontend", "vite.config.ts"),
        server: serverOptions,
        appType: "custom",
    });
    app.use(vite.middlewares);
    app.use("*", async (req, res, next) => {
        const url = req.originalUrl;
        try {
            const clientTemplate = path.resolve(import.meta.dirname, "..", "frontend", "index.html");
            // always reload the index.html file from disk incase it changes
            let template = await fs.promises.readFile(clientTemplate, "utf-8");
            template = template.replace(`src="/src/main.tsx"`, `src="/src/main.tsx?v=${nanoid()}"`);
            const page = await vite.transformIndexHtml(url, template);
            res.status(200).set({ "Content-Type": "text/html" }).end(page);
        }
        catch (e) {
            vite.ssrFixStacktrace(e);
            next(e);
        }
    });
}
export function serveStatic(app) {
    const distPath = path.resolve(import.meta.dirname, "public");
    if (!fs.existsSync(distPath)) {
        throw new Error(`Could not find the build directory: ${distPath}, make sure to build the frontend first`);
    }
    app.use(express.static(distPath));
    // fall through to index.html if the file doesn't exist
    app.use("*", (_req, res) => {
        res.sendFile(path.resolve(distPath, "index.html"));
    });
}
