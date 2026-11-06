"use strict";
/**
 * Public surface of the admin-only Accounting module.
 *
 * Import from "../../accounts" (client) or "./accounts" (server) instead of
 * reaching into individual files, so the module stays swappable in one place.
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.toNumber = exports.round3 = exports.round2 = exports.deriveInvoiceStatus = exports.computeInvoiceTotals = exports.accountsRoutes = void 0;
var accountsRoutes_1 = require("./accountsRoutes");
Object.defineProperty(exports, "accountsRoutes", { enumerable: true, get: function () { return __importDefault(accountsRoutes_1).default; } });
__exportStar(require("./types"), exports);
var accountsService_1 = require("./accountsService");
Object.defineProperty(exports, "computeInvoiceTotals", { enumerable: true, get: function () { return accountsService_1.computeInvoiceTotals; } });
Object.defineProperty(exports, "deriveInvoiceStatus", { enumerable: true, get: function () { return accountsService_1.deriveInvoiceStatus; } });
Object.defineProperty(exports, "round2", { enumerable: true, get: function () { return accountsService_1.round2; } });
Object.defineProperty(exports, "round3", { enumerable: true, get: function () { return accountsService_1.round3; } });
Object.defineProperty(exports, "toNumber", { enumerable: true, get: function () { return accountsService_1.toNumber; } });
