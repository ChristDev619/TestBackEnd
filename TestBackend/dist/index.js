"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var dotenv_1 = require("dotenv");
var cors_1 = require("cors");
var base_routes_1 = require("./routes/base.routes");
var admin_routes_1 = require("./routes/admin.routes");
var auth_routes_1 = require("./routes/auth.routes");
dotenv_1.default.config();
// Port validation and initialization
if (!process.env.PORT) {
    process.exit(1);
}
var port = parseInt(process.env.PORT, 10) || 8000;
// Initialize Express Server App
var app = (0, express_1.default)();
app.use(express_1.default.static("./public"));
// Middleware
app.use((0, cors_1.default)({
    origin: ["https://sportsrankings.world", "http://localhost:3000"],
}));
app.use(express_1.default.json({
    limit: "50mb",
}));
app.get("/1234", function (req, res) {
    return res.status(200).json("WELCOME 1234");
});
app.get("/", function (req, res) {
    return res.status(200).json();
});
app.use("/api/admin", admin_routes_1.adminRouter);
app.use("/api/", base_routes_1.baseRouter);
app.use("/api/auth", auth_routes_1.authRouter);
app.listen(port, function () {
    console.log("server on ".concat(port));
});
//# sourceMappingURL=index.js.map