/**
 * Public surface of the admin-only Accounting module.
 *
 * Import from "../../accounts" (client) or "./accounts" (server) instead of
 * reaching into individual files, so the module stays swappable in one place.
 */

export { default as accountsRoutes } from "./accountsRoutes";
export * from "./types";
export {
  computeInvoiceTotals,
  deriveInvoiceStatus,
  round2,
  round3,
  toNumber,
} from "./accountsService";
