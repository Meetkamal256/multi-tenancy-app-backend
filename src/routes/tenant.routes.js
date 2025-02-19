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
var router = (0, express_1.Router)();
var prisma = new client_1.PrismaClient();
// Create a new tenant
var createTenant = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, name_1, email, _b, isActive, tenant, error_1;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _c.trys.push([0, 2, , 3]);
                _a = req.body, name_1 = _a.name, email = _a.email, _b = _a.isActive, isActive = _b === void 0 ? true : _b;
                if (!name_1 || !email) {
                    res.status(400).json({ error: "Name and email are required" });
                    return [2 /*return*/];
                }
                return [4 /*yield*/, prisma.tenant.create({
                        data: { name: name_1, email: email, isActive: isActive },
                    })];
            case 1:
                tenant = _c.sent();
                res.status(201).json(tenant);
                return [3 /*break*/, 3];
            case 2:
                error_1 = _c.sent();
                console.error("Error creating tenant:", error_1);
                res.status(500).json({ error: "Internal Server Error" });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
// Get all tenants
var getAllTenants = function (_req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var tenants, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, prisma.tenant.findMany()];
            case 1:
                tenants = _a.sent();
                res.json(tenants);
                return [3 /*break*/, 3];
            case 2:
                error_2 = _a.sent();
                console.error("Error fetching tenants:", error_2);
                res.status(500).json({ error: "Internal Server Error" });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
// Get a single tenant by ID
var getTenantById = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, tenant, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                id = req.params.id;
                return [4 /*yield*/, prisma.tenant.findUnique({ where: { id: id } })];
            case 1:
                tenant = _a.sent();
                if (!tenant) {
                    res.status(404).json({ error: "Tenant not found" });
                    return [2 /*return*/];
                }
                res.json(tenant);
                return [3 /*break*/, 3];
            case 2:
                error_3 = _a.sent();
                console.error("Error fetching tenant:", error_3);
                res.status(500).json({ error: "Internal Server Error" });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
// Update a tenant
var updateTenant = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, _a, name_2, email, isActive, updatedTenant, error_4;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                id = req.params.id;
                _a = req.body, name_2 = _a.name, email = _a.email, isActive = _a.isActive;
                return [4 /*yield*/, prisma.tenant.update({
                        where: { id: id },
                        data: { name: name_2, email: email, isActive: isActive },
                    })];
            case 1:
                updatedTenant = _b.sent();
                res.json(updatedTenant);
                return [3 /*break*/, 3];
            case 2:
                error_4 = _b.sent();
                console.error("Error updating tenant:", error_4);
                res.status(500).json({ error: "Internal Server Error" });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
// Delete a tenant
var deleteTenant = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                id = req.params.id;
                return [4 /*yield*/, prisma.tenant.delete({ where: { id: id } })];
            case 1:
                _a.sent();
                res.status(204).send();
                return [3 /*break*/, 3];
            case 2:
                error_5 = _a.sent();
                console.error("Error deleting tenant:", error_5);
                res.status(500).json({ error: "Internal Server Error" });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
// Register the routes
router.post("/", createTenant);
router.get("/", getAllTenants);
router.get("/:id", getTenantById);
router.put("/:id", updateTenant);
router.delete("/:id", deleteTenant);
exports.default = router;
