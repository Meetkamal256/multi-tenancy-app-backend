"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateUser = void 0;
var jsonwebtoken_1 = require("jsonwebtoken");
var JWT_SECRET = process.env.JWT_SECRET || "your_secret_key";
var authenticateUser = function (req, res, next) {
    var _a;
    var token = (_a = req.header("Authorization")) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
    if (!token) {
        res.status(401).json({ error: "Access denied, no token provided" });
        return;
    }
    try {
        var decoded = jsonwebtoken_1.default.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    }
    catch (error) {
        res.status(400).json({ error: "Invalid token" });
    }
};
exports.authenticateUser = authenticateUser;
