import { createProxyMiddleware } from "http-proxy-middleware";

export default function (app) {
    app.use(
        createProxyMiddleware("/api", {
            target: "https://api.vworld.kr/ned/data",
            pathRewrite: {
                rewrite: (path) => path.replace(/^\/api/, ""),
            },
            changeOrigin: true,
        }),
    );
}
