"use strict";
/**
 * Shared types for the admin-only Accounting module.
 *
 * The module is intentionally self-contained: every table it touches is prefixed
 * with `acc_` and every route lives under /accounts, so nothing here can leak
 * into the public site.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.INVOICE_STATUSES = void 0;
exports.INVOICE_STATUSES = [
    "draft",
    "sent",
    "partial",
    "paid",
    "overdue",
];
