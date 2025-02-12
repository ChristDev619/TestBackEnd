"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const base_routes_1 = require("./routes/base.routes");
const admin_routes_1 = require("./routes/admin.routes");
const auth_routes_1 = require("./routes/auth.routes");
dotenv_1.default.config();
// Port validation and initialization
if (!process.env.PORT) {
    process.exit(1);
}
const port = parseInt(process.env.PORT, 10) || 8000;
// Initialize Express Server App
const app = (0, express_1.default)();
app.use(express_1.default.static("./public"));
// Middleware
app.use((0, cors_1.default)({
    origin: ["https://sportsrankings.world", "http://localhost:3000"],
}));
app.use(express_1.default.json({
    limit: "50mb",
}));
app.get("/1234", (req, res) => {
    return res.status(200).json("WELCOME 1234");
});
app.get("/", (req, res) => {
    return res.status(200).json();
});
app.use("/api/admin", admin_routes_1.adminRouter);
app.use("/api/", base_routes_1.baseRouter);
app.use("/api/auth", auth_routes_1.authRouter);
app.listen(port, () => {
    console.log(`server on ${port}`);
});
//# sourceMappingURL=index.js.map