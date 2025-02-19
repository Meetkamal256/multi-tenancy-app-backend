"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var client_1 = require("@prisma/client");
var bcryptjs_1 = require("bcryptjs");
var jsonwebtoken_1 = require("jsonwebtoken");
var authMiddleware_1 = require("../middleware/authMiddleware");
var router = (0, express_1.Router)();
var prisma = new client_1.PrismaClient();
var JWT_SECRET = process.env.JWT_SECRET || "your_secret_key";
// 🟢 Register User
var registerUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, name_1, email, password, existingUser, hashedPassword, newUser, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 4, , 5]);
                _a = req.body, name_1 = _a.name, email = _a.email, password = _a.password;
                if (!name_1 || !email || !password) {
                    res.status(400).json({ error: "All fields are required" });
                    return [2 /*return*/];
                }
                return [4 /*yield*/, prisma.user.findUnique({ where: { email: email } })];
            case 1:
                existingUser = _b.sent();
                if (existingUser) {
                    res.status(400).json({ error: "Email already registered" });
                    return [2 /*return*/];
                }
                return [4 /*yield*/, bcryptjs_1.default.hash(password, 10)];
            case 2:
                hashedPassword = _b.sent();
                return [4 /*yield*/, prisma.user.create({
                        data: { name: name_1, email: email, password: hashedPassword },
                    })];
            case 3:
                newUser = _b.sent();
                res
                    .status(201)
                    .json({ message: "User registered successfully", user: newUser });
                return [3 /*break*/, 5];
            case 4:
                error_1 = _b.sent();
                console.error("Error registering user:", error_1);
                res.status(500).json({ error: "Internal Server Error" });
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
// 🔵 Login User
var loginUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, password, user, isMatch, token, error_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 3, , 4]);
                _a = req.body, email = _a.email, password = _a.password;
                if (!email || !password) {
                    res.status(400).json({ error: "Email and password are required" });
                    return [2 /*return*/];
                }
                return [4 /*yield*/, prisma.user.findUnique({ where: { email: email } })];
            case 1:
                user = _b.sent();
                if (!user) {
                    res.status(401).json({ error: "Invalid email or password" });
                    return [2 /*return*/];
                }
                return [4 /*yield*/, bcryptjs_1.default.compare(password, user.password)];
            case 2:
                isMatch = _b.sent();
                if (!isMatch) {
                    res.status(401).json({ error: "Invalid email or password" });
                    return [2 /*return*/];
                }
                token = jsonwebtoken_1.default.sign({ userId: user.id, email: user.email }, JWT_SECRET, {
                    expiresIn: "1h",
                });
                res.json({ message: "Login successful", token: token });
                return [3 /*break*/, 4];
            case 3:
                error_2 = _b.sent();
                console.error("Error logging in:", error_2);
                res.status(500).json({ error: "Internal Server Error" });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
router.get("/profile", authMiddleware_1.authenticateUser, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                if (!req.user) {
                    res.status(401).json({ message: "Unauthorized" });
                    return [2 /*return*/];
                }
                return [4 /*yield*/, prisma.user.findUnique({
                        where: { id: req.user.userId },
                        select: { id: true, name: true, email: true },
                    })];
            case 1:
                user = _a.sent();
                if (!user) {
                    res.status(404).json({ message: "User not found" });
                    return [2 /*return*/];
                }
                res.json(user);
                return [3 /*break*/, 3];
            case 2:
                error_3 = _a.sent();
                console.error("Error fetching profile:", error_3);
                res.status(500).json({ message: "Internal Server Error" });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
// Register authentication routes
router.post("/register", registerUser);
router.post("/login", loginUser);
exports.default = router;
