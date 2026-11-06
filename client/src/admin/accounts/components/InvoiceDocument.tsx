import { useRef } from "react";
import {
  Mail,
  Phone,
  MapPin,
  User,
  Landmark,
  Printer,
  Download,
} from "lucide-react";
import type {
  AccountClient,
  AccountInvoice,
  AccountInvoiceItem,
  AccountSettings,
} from "../types/accounts";
import { formatPdfAmount, numberToWordsIndian } from "../utils/money";
import { formatDate } from "../utils/dates";

interface InvoiceDocumentProps {
  invoice: AccountInvoice;
  items: AccountInvoiceItem[];
  client: AccountClient | null;
  settings: AccountSettings;
  onDownloadPdf?: () => void;
}

/**
 * Signature repeating badge: Dark navy box with attached top-right orange triangle
 */
const SlantedBadge = ({ label }: { label: string }) => (
  <div className="inline-flex items-stretch overflow-hidden select-none shadow-2xs">
    <span className="bg-[#0B192C] text-white text-[11px] font-black tracking-widest uppercase px-3 py-1 flex items-center leading-none">
      {label}
    </span>
    <span
      className="w-3.5 bg-[#FF7A00]"
      style={{ clipPath: "polygon(0 0, 100% 0, 0 100%)" }}
    />
  </div>
);

/**
 * 3-coin stack icon matching mockup
 */
const CoinsIcon = () => (
  <svg
    viewBox="0 0 24 24"
    className="w-5 h-5 text-[#FF7A00] shrink-0"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <ellipse cx="12" cy="6" rx="8" ry="3" />
    <path d="M4 6v6c0 1.66 3.58 3 8 3s8-1.34 8-3V6" />
    <path d="M4 12v6c0 1.66 3.58 3 8 3v-6" />
  </svg>
);

export const InvoiceDocument = ({
  invoice,
  items,
  client,
  settings,
  onDownloadPdf,
}: InvoiceDocumentProps) => {
  const printRef = useRef<HTMLDivElement>(null);

  const currency = invoice.currency || settings.currency || "INR";
  const balanceDue = Math.max(0, invoice.total - invoice.amount_paid);

  // Business fallback metadata matching mockup
  const businessName = settings.business_name || "Mithlesh Vishwakarma (OC)";
  const businessEmail = settings.business_email || "mithlesh.workplace@gmail.com";
  const businessPhone = settings.business_phone || "+91 9327832747";
  const businessAddress = settings.business_address || "Surat, Gujarat";

  // Dynamic signatory information
  const signatoryTitle = settings.signatory_title || "Authorised Signature";
  const signatoryName =
    settings.signatory_name ||
    (settings.business_name?.includes("Mithlesh")
      ? settings.business_name
      : "Mithlesh Vishwakarma (OC)");
  const signatoryCursive = settings.signatory_name || "M. Vishwakarma";

  // Client info fallback matching mockup
  const clientCompany = client?.company || (client?.name ? "" : "Bastion Research");
  const clientPerson = client?.name || (client?.company ? "" : "Parth Aggarwal");
  const clientEmail = client?.email || "connectt@bastionresearch.in";
  const clientPhone = client?.phone || "9876543120";
  const clientAddress = client?.address || "Vesu, Surat, Gujarat";

  // Bank details lines
  const rawBankDetails =
    settings.bank_details ||
    `A/C HOLDER NAME: VISHWAKARMA MITHLESH SHRI VIJAY\nBANK NAME: KOTAK MAHINDRA BANK\nIFSC CODE: KKBK0002852\nA/C NUMBER: 7512318326`;

  const bankLines = rawBankDetails
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);

  const notesText =
    invoice.notes ||
    "Ponytail is an open-source AI coding skill and plugin created by Dietrich Gebert that forces AI agents (such as Claude Code, Codex, and Cursor) to behave like a pragmatic, minimalist \"lazy senior developer\"";

  const termsText =
    invoice.terms ||
    settings.payment_terms ||
    "Ponytail is an open-source AI coding skill and plugin created by Dietrich Gebert that forces AI agents (such as Claude Code, Codex, and Cursor) to behave like a pragmatic, minimalist \"lazy senior developer\"";

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-4">
      {/* Top Action Toolbar */}
      <div className="flex items-center justify-end gap-2.5 print:hidden">
        <button
          type="button"
          onClick={handlePrint}
          className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-bold text-slate-700 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors shadow-2xs cursor-pointer"
        >
          <Printer className="w-4 h-4 text-slate-600" />
          <span>Print</span>
        </button>
        {onDownloadPdf && (
          <button
            type="button"
            onClick={onDownloadPdf}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold text-white bg-[#FF7A00] hover:bg-[#ea6c00] rounded-xl transition-colors shadow-2xs cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Download PDF</span>
          </button>
        )}
      </div>

      {/* Embedded print & dark-mode immunity styles */}
      <style>{`
        @media print {
          @page {
            size: A4 portrait;
            margin: 0;
          }
          html, body {
            background-color: #ffffff !important;
            background: #ffffff !important;
            color: #0b192c !important;
            margin: 0 !important;
            padding: 0 !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
            color-scheme: light !important;
          }
          body:has(#invoice-printable) * {
            visibility: hidden !important;
          }
          #invoice-printable,
          #invoice-printable * {
            visibility: visible !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
            color-scheme: light !important;
          }
          #invoice-printable {
            position: fixed !important;
            left: 0 !important;
            top: 0 !important;
            width: 210mm !important;
            min-width: 210mm !important;
            max-width: 210mm !important;
            height: 297mm !important;
            min-height: 297mm !important;
            max-height: 297mm !important;
            margin: 0 !important;
            padding: 0 !important;
            border: none !important;
            box-shadow: none !important;
            border-radius: 0 !important;
            background-color: #ffffff !important;
            background: #ffffff !important;
            color: #0b192c !important;
            z-index: 9999999 !important;
            box-sizing: border-box !important;
            overflow: hidden !important;
            page-break-after: avoid !important;
            page-break-inside: avoid !important;
            break-inside: avoid !important;
          }
        }
        /* Absolute immunity for invoice preview in dark mode */
        .admin-root.dark #invoice-printable,
        .dark #invoice-printable {
          background-color: #ffffff !important;
          color: #0b192c !important;
          color-scheme: light !important;
        }
        .admin-root.dark #invoice-printable .bg-white,
        .dark #invoice-printable .bg-white {
          background-color: #ffffff !important;
        }
        .admin-root.dark #invoice-printable .text-slate-900,
        .dark #invoice-printable .text-slate-900 {
          color: #0f172a !important;
        }
        .admin-root.dark #invoice-printable .text-slate-800,
        .dark #invoice-printable .text-slate-800 {
          color: #1e293b !important;
        }
        .admin-root.dark #invoice-printable .text-slate-700,
        .dark #invoice-printable .text-slate-700 {
          color: #334155 !important;
        }
      `}</style>

      {/* Modern A4 Invoice Sheet Container */}
      <div className="flex justify-center bg-[#E5E9F0] p-2 sm:p-6 rounded-2xl print:p-0 print:m-0 print:bg-white print:rounded-none">
        <div
          ref={printRef}
          id="invoice-printable"
          className="w-full max-w-[780px] bg-white text-slate-900 shadow-2xl border border-gray-200/80 rounded-none text-left flex flex-col justify-between invoice-paper print:shadow-none print:border-none print:max-w-none print:w-full print:m-0"
          style={{
            minHeight: "1050px",
            backgroundColor: "#ffffff",
            color: "#0B192C",
            colorScheme: "light",
          }}
        >
          {/* =============================================================== */}
          {/* 1. TOP HEADER & METADATA SECTION (ASYMMETRIC BRANDED HEADER)      */}
          {/* =============================================================== */}
          <div className="relative w-full overflow-hidden select-none bg-white">
            <svg
              viewBox="0 0 698 216"
              className="w-full h-auto block"
              preserveAspectRatio="xMidYMid meet"
            >
              {/* Left Navy Block (Height = 124px) */}
              <polygon points="0,0 376,0 291,124 0,124" fill="#0B192C" />

              {/* Right Navy Block (Height = 93px) */}
              <polygon points="404,0 698,0 698,93 341,93" fill="#0B192C" />

              {/* Diagonal Orange Stripe */}
              <polygon points="376,0 404,0 310,140 282,140" fill="#FF7A00" />

              {/* Soft Peach Accent Fold under right navy */}
              <polygon points="341,93 375,93 335,140 310,140" fill="#FED7AA" />

              {/* Left Horizontal Orange Bar under left navy */}
              <polygon points="0,124 291,124 282,140 0,140" fill="#FF7A00" />

              {/* Dynamic Logo (or fallback to OC Monogram Vector Logo) */}
              {settings.logo_url ? (
                <image
                  href={settings.logo_url}
                  x="15"
                  y="2"
                  width="400"
                  height="100"
                  preserveAspectRatio="xMinYMid meet"
                />
              ) : (
                <g>
                  {/* OC Monogram Vector Logo */}
                  {/* White Stylized 'O' */}
                  <path
                    d="M 107 24 L 134 24 L 144 42 L 134 60 L 107 60 L 97 42 Z M 114 33 L 127 33 L 132 42 L 127 51 L 114 51 L 109 42 Z"
                    fill="#FFFFFF"
                    fillRule="evenodd"
                  />
                  {/* Orange Stylized 'C' */}
                  <polygon points="145,24 174,24 169,33 141,33" fill="#FF7A00" />
                  <polygon points="141,51 169,51 174,60 145,60" fill="#FF7A00" />
                </g>
              )}

              {/* Tagline Subtitle */}
              <text
                x="43"
                y="90"
                fill="#CBD5E1"
                fontSize="6.5"
                fontWeight="300"
                letterSpacing="2.6"
                fontFamily="system-ui, -apple-system, sans-serif"
              >
                WEB <tspan fill="#FF7A00">•</tspan> SOFTWARE <tspan fill="#FF7A00">•</tspan> DIGITAL SOLUTIONS
              </text>

              {/* Business Name */}
              {/* <text
                x="43"
                y="110"
                fill="#FFFFFF"
                fontSize="18"
                fontWeight="800"
                letterSpacing="0.3"
                fontFamily="system-ui, -apple-system, sans-serif"
              >
                {businessName}
              </text> */}

              {/* Right INVOICE Title (Inside 93px Right Navy Block) */}
              <text
                x="669"
                y="67"
                fill="#FF7A00"
                fontSize="32"
                fontWeight="900"
                textAnchor="end"
                letterSpacing="1.5"
                fontFamily="system-ui, -apple-system, sans-serif"
              >
                INVOICE
              </text>

              {/* Right Metadata Table (Below 93px right navy block on white paper) */}
              {/* Row 1: Invoice No */}
              <text x="452" y="122" fill="#1E293B" fontSize="11.5" fontWeight="700" fontFamily="system-ui, sans-serif">
                Invoice No
              </text>
              <text x="532" y="122" fill="#1E293B" fontSize="11.5" fontWeight="700" fontFamily="system-ui, sans-serif">
                :
              </text>
              <text x="552" y="122" fill="#0F172A" fontSize="12" fontWeight="800" letterSpacing="0.5" fontFamily="system-ui, sans-serif">
                {invoice.invoice_number}
              </text>

              {/* Row 2: Issue Date */}
              <text x="452" y="143" fill="#1E293B" fontSize="11.5" fontWeight="700" fontFamily="system-ui, sans-serif">
                Issue Date
              </text>
              <text x="532" y="143" fill="#1E293B" fontSize="11.5" fontWeight="700" fontFamily="system-ui, sans-serif">
                :
              </text>
              <text x="552" y="143" fill="#1E293B" fontSize="11.5" fontWeight="600" fontFamily="system-ui, sans-serif">
                {formatDate(invoice.issue_date)}
              </text>

              {/* Row 3: Due Date */}
              <text x="452" y="164" fill="#1E293B" fontSize="11.5" fontWeight="700" fontFamily="system-ui, sans-serif">
                Due Date
              </text>
              <text x="532" y="164" fill="#1E293B" fontSize="11.5" fontWeight="700" fontFamily="system-ui, sans-serif">
                :
              </text>
              <text x="552" y="164" fill="#1E293B" fontSize="11.5" fontWeight="600" fontFamily="system-ui, sans-serif">
                {formatDate(invoice.due_date)}
              </text>

              {/* Row 4: Status */}
              <text x="452" y="186" fill="#1E293B" fontSize="11.5" fontWeight="700" fontFamily="system-ui, sans-serif">
                Status
              </text>
              <text x="532" y="186" fill="#1E293B" fontSize="11.5" fontWeight="700" fontFamily="system-ui, sans-serif">
                :
              </text>
              <g transform="translate(552, 172)">
                <rect width="58" height="21" rx="3.5" fill="#FED7AA" />
                <text
                  x="29"
                  y="14.5"
                  fill="#9A3412"
                  fontSize="11"
                  fontWeight="800"
                  textAnchor="middle"
                  letterSpacing="0.4"
                  fontFamily="system-ui, sans-serif"
                >
                  {invoice.status.toUpperCase()}
                </text>
              </g>

              {/* Left Contact Info (Below 140px orange bar on white paper) */}
              <rect x="33" y="156" width="2.5" height="47" rx="1" fill="#F59E0B" />

              {/* Email */}
              <g transform="translate(46, 160)">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#1E293B" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="16" x="2" y="4" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
                <text x="22" y="11.5" fill="#1E293B" fontSize="11.5" fontWeight="600" fontFamily="system-ui, sans-serif">
                  {businessEmail}
                </text>
              </g>

              {/* Phone */}
              <g transform="translate(46, 178)">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#1E293B" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                <text x="22" y="11.5" fill="#1E293B" fontSize="11.5" fontWeight="600" fontFamily="system-ui, sans-serif">
                  {businessPhone}
                </text>
              </g>

              {/* Address */}
              <g transform="translate(46, 196)">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#1E293B" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <text x="22" y="11.5" fill="#1E293B" fontSize="11.5" fontWeight="600" fontFamily="system-ui, sans-serif">
                  {businessAddress}
                </text>
              </g>

              {/* Full-width Divider Line across paper */}
              <line x1="33" y1="216" x2="665" y2="216" stroke="#E2E8F0" strokeWidth="1" />
            </svg>
          </div>

          {/* =============================================================== */}
          {/* 2. BODY CONTENT AREA (INCREASED FONT SIZES & TIGHTER SIGNATURE)  */}
          {/* =============================================================== */}
          <div className="px-[33px] pt-4 pb-8 sm:pb-10 flex-1 flex flex-col justify-between">
            {/* UPPER CONTENT: Parties + Line Items */}
            <div className="space-y-6">
              {/* FROM & BILL TO Section with increased font sizes */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 items-start">
                {/* FROM Column */}
                <div>
                  <SlantedBadge label="FROM" />
                  <div className="mt-2.5 space-y-1.5 text-[13.5px]">
                    <p className="text-lg font-black text-slate-900 pb-0.5 tracking-normal">
                      {businessName}
                    </p>
                    <div className="flex items-center gap-2 text-slate-700 font-medium">
                      <Mail className="w-4 h-4 text-[#0B192C] shrink-0" />
                      <span className="truncate">{businessEmail}</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-700 font-medium">
                      <Phone className="w-4 h-4 text-[#0B192C] shrink-0" />
                      <span>{businessPhone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-700 font-medium">
                      <MapPin className="w-4 h-4 text-[#0B192C] shrink-0" />
                      <span>{businessAddress}</span>
                    </div>
                  </div>
                </div>

                {/* BILL TO Column with increased font sizes */}
                <div className="sm:pl-4">
                  <SlantedBadge label="BILL TO" />
                  <div className="mt-2.5 space-y-1.5 text-[13.5px]">
                    <p className="text-lg font-black text-slate-900 pb-0.5 tracking-normal">
                      {clientCompany || clientPerson}
                    </p>
                    {clientPerson && clientCompany && (
                      <div className="flex items-center gap-2 text-slate-700 font-medium">
                        <User className="w-4 h-4 text-[#0B192C] shrink-0" />
                        <span>{clientPerson}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-2 text-slate-700 font-medium">
                      <Mail className="w-4 h-4 text-[#0B192C] shrink-0" />
                      <span className="truncate">{clientEmail}</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-700 font-medium">
                      <Phone className="w-4 h-4 text-[#0B192C] shrink-0" />
                      <span>{clientPhone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-700 font-medium">
                      <MapPin className="w-4 h-4 text-[#0B192C] shrink-0" />
                      <span>{clientAddress}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Items Table (increased font sizes) */}
              <div>
                {/* Solid Orange Table Header Bar */}
                <div className="bg-[#FF7A00] text-white text-xs font-bold uppercase tracking-wider rounded-[3px] py-2.5 px-4 grid grid-cols-12 items-center">
                  <span className="col-span-1 text-center font-bold">#</span>
                  <span className="col-span-5 text-left font-bold pl-2">Description</span>
                  <span className="col-span-2 text-center font-bold">Qty</span>
                  <span className="col-span-2 text-right font-bold pr-2">Rate</span>
                  <span className="col-span-2 text-right font-bold">Amount</span>
                </div>

                {/* Table Body Rows */}
                <div className="divide-y divide-gray-200">
                  {items.map((item, index) => (
                    <div
                      key={item.id || index}
                      className="py-3 px-4 grid grid-cols-12 text-[13px] text-slate-800 items-center font-medium"
                    >
                      <span className="col-span-1 text-center text-slate-700">
                        {index + 1}
                      </span>
                      <span className="col-span-5 text-left pl-2 font-bold text-slate-900 pr-2">
                        {item.description}
                      </span>
                      <span className="col-span-2 text-center text-slate-700">
                        {item.quantity}
                      </span>
                      <span className="col-span-2 text-right pr-2 text-slate-800">
                        {formatPdfAmount(item.rate, currency)}
                      </span>
                      <span className="col-span-2 text-right text-slate-900 font-bold">
                        {formatPdfAmount(item.amount, currency)}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="border-b border-gray-200" />
              </div>
            </div>

            {/* =============================================================== */}
            {/* PARALLEL TWO-COLUMN LOWER SECTION WITH INCREASED FONT SIZES     */}
            {/* AND REDUCED AUTHORISED SIGNATORY GAP                            */}
            {/* =============================================================== */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-8 items-stretch pt-4">
              {/* Left Column (58% width): Amount in Words, Notes, Terms, Bank Details */}
              <div className="sm:col-span-7 flex flex-col space-y-4">
                {/* 1. Amount in words Card (increased font size) */}
                <div className="bg-[#F1F5F9] rounded-md p-3.5 flex items-center gap-3.5 border border-slate-200/50">
                  <CoinsIcon />
                  <div className="w-[2px] h-7 bg-[#FF7A00] shrink-0" />
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-slate-900 mb-0.5">
                      Amount in words
                    </p>
                    <p className="text-[13px] text-slate-800 font-bold leading-snug">
                      {numberToWordsIndian(invoice.total)}
                    </p>
                  </div>
                </div>

                {/* 2. NOTES (increased font size: text-xs 12px) */}
                {notesText && (
                  <div>
                    <SlantedBadge label="NOTES" />
                    <p className="mt-2 text-xs text-slate-700 leading-relaxed font-normal">
                      {notesText}
                    </p>
                  </div>
                )}

                {/* 3. TERMS & CONDITIONS (increased font size: text-xs 12px) */}
                {termsText && (
                  <div>
                    <SlantedBadge label="TERMS & CONDITIONS" />
                    <p className="mt-2 text-xs text-slate-700 leading-relaxed font-normal">
                      {termsText}
                    </p>
                  </div>
                )}

                {/* 4. BANK DETAILS Card (increased font size: text-[11.5px]) */}
                <div>
                  <SlantedBadge label="BANK DETAILS" />
                  <div className="mt-2 bg-[#F1F5F9] rounded-md p-3.5 flex items-center gap-3.5 border border-slate-200/50">
                    <Landmark className="w-6 h-6 text-[#0B192C] shrink-0" />
                    <div className="w-[2px] h-12 bg-[#FF7A00] shrink-0" />
                    <div className="text-[11px] sm:text-[11.5px] space-y-0.5 leading-snug">
                      {bankLines.map((line, idx) => {
                        const colonIdx = line.indexOf(":");
                        if (colonIdx !== -1) {
                          return (
                            <div key={idx} className="flex gap-2">
                              <span className="font-bold text-slate-900 uppercase min-w-[130px]">
                                {line.slice(0, colonIdx + 1)}
                              </span>
                              <span className="text-slate-800 font-semibold uppercase">
                                {line.slice(colonIdx + 1).trim()}
                              </span>
                            </div>
                          );
                        }
                        return <div key={idx}>{line}</div>;
                      })}
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column (42% width): Totals at top + Authorised Signature pinned at bottom */}
              <div className="sm:col-span-5 flex flex-col justify-between">
                {/* Financial Breakdown Table (increased font sizes) */}
                <div className="space-y-1.5 text-[13px]">
                  <div className="grid grid-cols-[95px_14px_1fr] items-center py-0.5">
                    <span className="font-bold text-slate-800">Subtotal</span>
                    <span className="text-center font-bold text-slate-800">:</span>
                    <span className="font-semibold text-slate-900 text-right">
                      {formatPdfAmount(invoice.subtotal, currency)}
                    </span>
                  </div>

                  {invoice.discount > 0 && (
                    <div className="grid grid-cols-[95px_14px_1fr] items-center py-0.5">
                      <span className="font-bold text-slate-800">Discount</span>
                      <span className="text-center font-bold text-slate-800">:</span>
                      <span className="font-semibold text-slate-900 text-right">
                        - {formatPdfAmount(invoice.discount, currency)}
                      </span>
                    </div>
                  )}

                  <div className="grid grid-cols-[95px_14px_1fr] items-center py-0.5">
                    <span className="font-bold text-slate-800">Tax</span>
                    <span className="text-center font-bold text-slate-800">:</span>
                    <span className="font-semibold text-slate-900 text-right">
                      {formatPdfAmount(invoice.tax_amount, currency)}{" "}
                      {invoice.tax_rate > 0 ? `(${invoice.tax_rate}%)` : ""}
                    </span>
                  </div>

                  {/* Total Row (Soft Peach Rounded Box, increased font size text-sm 14px) */}
                  <div className="bg-[#FED7AA] rounded-[3px] px-3.5 py-1.5 my-1 grid grid-cols-[95px_14px_1fr] items-center font-black text-slate-900 text-sm">
                    <span>Total</span>
                    <span className="text-center">:</span>
                    <span className="font-black text-right">
                      {formatPdfAmount(invoice.total, currency)}
                    </span>
                  </div>

                  <div className="grid grid-cols-[95px_14px_1fr] items-center py-0.5">
                    <span className="font-bold text-slate-800">Amount Paid</span>
                    <span className="text-center font-bold text-slate-800">:</span>
                    <span className="font-semibold text-slate-900 text-right">
                      {formatPdfAmount(invoice.amount_paid, currency)}
                    </span>
                  </div>

                  {/* Balance Due Banner (Slanted Vibrant Orange Banner, text-sm 14px) */}
                  <div
                    className="bg-[#FF7A00] text-slate-900 rounded-r-[3px] px-3.5 py-2 mt-2 grid grid-cols-[95px_14px_1fr] items-center font-black text-sm shadow-2xs"
                    style={{ clipPath: "polygon(10px 0, 100% 0, 100% 100%, 0 100%)" }}
                  >
                    <span className="pl-2">Balance Due</span>
                    <span className="text-center">:</span>
                    <span className="font-black text-right">
                      {formatPdfAmount(balanceDue, currency)}
                    </span>
                  </div>
                </div>

                {/* Authorised Signature Block pinned at the bottom, perfectly clear of footer */}
                <div className="flex flex-col items-end pt-6 pb-2">
                  <div className="text-center w-56">
                    {/* Dynamic Signature: Image if provided, else handwritten cursive signature */}
                    <div className="h-8 flex items-end justify-center mb-0.5 overflow-hidden">
                      {settings.signature_url ? (
                        <img
                          src={settings.signature_url}
                          alt="Signature"
                          className="max-h-8 max-w-[210px] object-contain select-none"
                        />
                      ) : (
                        <span
                          className="text-[18px] sm:text-[19px] text-slate-900 select-none tracking-tight leading-none whitespace-nowrap"
                          style={{
                            fontFamily: "'Brush Script MT', 'Great Vibes', 'Caveat', cursive, sans-serif",
                            fontStyle: "italic",
                          }}
                        >
                          {signatoryCursive}
                        </span>
                      )}
                    </div>
                    {/* Single crisp signature underline */}
                    <div className="border-b-2 border-slate-900 w-full mb-1" />
                    {/* Dynamic Authorised Signature label with reduced gap */}
                    <p className="text-xs font-black text-slate-900 tracking-wider uppercase leading-tight">
                      {signatoryTitle}
                    </p>
                    {/* Signatory Name */}
                    <p className="text-xs font-bold text-slate-800 tracking-wide mt-1 truncate">
                      {signatoryName}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* =============================================================== */}
          {/* 3. BOTTOM FOOTER RIBBON (EDGE TO EDGE WITH WHITE DIAGONAL GAP)   */}
          {/* =============================================================== */}
          <div className="relative w-full overflow-hidden select-none bg-white">
            <svg
              viewBox="0 0 698 38"
              className="w-full h-auto block"
              preserveAspectRatio="none"
            >
              {/* Left Orange Banner */}
              <polygon points="0,0 354,0 325,38 0,38" fill="#FF7A00" />
              <text
                x="33"
                y="24"
                fill="#0B192C"
                fontSize="12.5"
                fontWeight="bold"
                fontStyle="italic"
                fontFamily="system-ui, -apple-system, sans-serif"
              >
                Thank you for your business
              </text>

              {/* 10px White Diagonal Gap */}

              {/* Right Navy Banner */}
              <polygon points="365,0 698,0 698,38 336,38" fill="#0B192C" />
              <text
                x="665"
                y="24"
                fill="#FFFFFF"
                fontSize="11"
                fontWeight="600"
                textAnchor="end"
                fontFamily="system-ui, -apple-system, sans-serif"
              >
                Page 1 of 1
              </text>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceDocument;
