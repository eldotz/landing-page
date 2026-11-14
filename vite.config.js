import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const devBlogRoutes = {
  name: "dev-blog-routes",
  configureServer(server) {
    server.middlewares.use((request, _response, next) => {
      if (request.url?.startsWith("/blog") && !request.url.includes(".")) {
        request.url = "/index.html";
      }
      next();
    });
  },
};

export default defineConfig({
  plugins: [react(), devBlogRoutes],
  appType: "mpa",
  server: { headers: { "X-Robots-Tag": "noindex, nofollow" } },
  preview: { headers: {} },
});
