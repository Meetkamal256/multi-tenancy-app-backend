"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var cors_1 = require("cors");
var tenant_routes_1 = require("./routes/tenant.routes");
var auth_routes_1 = require("./routes/auth.routes");
var app = (0, express_1.default)();
// Middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Routes
app.use("/tenants", tenant_routes_1.default);
app.use("/auth", auth_routes_1.default);
var PORT = process.env.PORT || 5000;
app.listen(PORT, function () {
    console.log("Server is running on port ".concat(PORT));
});
