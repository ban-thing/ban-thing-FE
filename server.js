const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");
const path = require("path");

const app = express();

// 정적 파일 제공
app.use(express.static(path.join(__dirname, "dist")));

// 프록시 설정
app.use(
    "/api",
    createProxyMiddleware({
        target: "https://api.vworld.kr/ned/data",
        changeOrigin: true,
        pathRewrite: { "^/api": "" },
    }),
);

// Catch-all route for SPA (Single Page Application)
// React의 라우팅을 지원하기 위해 추가
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "dist", "index.html"));
});

// 서버 시작
const PORT = process.env.PORT || 3000;
app.listen(PORT, "0.0.0.0", () => {
    // console.log(`Server running on http://localhost:${PORT}`);
});
