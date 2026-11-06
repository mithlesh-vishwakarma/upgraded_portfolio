import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import type {
  AccountClient,
  AccountInvoice,
  AccountInvoiceItem,
  AccountSettings,
} from "../types/accounts";
import { formatPdfAmount, numberToWordsIndian } from "../utils/money";
import { formatDatePdf } from "../utils/dates";

/**
 * Modern Branded A4 invoice PDF generator.
 * Matches the reference mockup pixel-perfect:
 * - Asymmetric Navy Header (#0B192C) with diagonal orange band (#FF7A00)
 * - Deeper left navy block (37.3mm) with OC Monogram & business details
 * - Shorter right navy block (28mm) with vibrant orange INVOICE title
 * - Horizontal orange bar (4.8mm) joining the diagonal band on the left
 * - Soft peach accent fold (#FED7AA) under the right navy block
 * - Right metadata table starting at 36.8mm (below right navy)
 * - Left contact info starting at 47mm with amber vertical accent bar (#F59E0B)
 * - Full-width divider line at 65mm
 * - Slanted dark badges with orange diagonal accents (FROM, BILL TO, NOTES, TERMS, BANK)
 * - Solid orange line items table header
 * - Parallel two-column layout below table:
 *   Left: Amount in words -> Notes -> Terms & Conditions -> Bank Details card
 *   Right: Financial breakdown (Subtotal, Total peach box, Balance Due orange banner) -> Authorised Signature
 * - Increased font size across all body elements for optimal legibility
 * - Reduced gap and tight, compact Authorised Signature block
 * - Signatory name explicitly formatted as Mithlesh Vishwakarma (OC)
 * - Dual-tone footer ribbon with 10px white diagonal gap ("Thank you for your business" / "Page X of Y")
 */

type Rgb = [number, number, number];

const INK: Rgb = [11, 25, 44]; // Deep navy #0B192C
const MUTED: Rgb = [100, 116, 139]; // Muted slate #64748B
const LINE: Rgb = [226, 232, 240]; // Divider gray #E2E8F0
const SOFT: Rgb = [241, 245, 249]; // Soft light gray #F1F5F9
const ACCENT: Rgb = [255, 122, 0]; // Vibrant orange #FF7A00
const PEACH: Rgb = [254, 215, 170]; // Soft peach #FED7AA
const AMBER: Rgb = [245, 158, 11]; // Amber accent #F59E0B
const WHITE: Rgb = [255, 255, 255];
const DARK_SLATE: Rgb = [30, 41, 59]; // Text dark #1E293B

const PAGE_WIDTH = 210;
const PAGE_HEIGHT = 297;
const MARGIN = 10; // Exactly matching 33px / 698px * 210mm = 9.93mm

export interface InvoicePdfData {
  invoice: AccountInvoice;
  items: AccountInvoiceItem[];
  client: AccountClient | null;
  settings: AccountSettings;
}

interface JsPdfWithAutoTable extends jsPDF {
  lastAutoTable?: { finalY?: number };
}

const TRANSLITERATE: Record<string, string> = {
  "\u2014": "-",
  "\u2013": "-",
  "\u2018": "'",
  "\u2019": "'",
  "\u201C": '"',
  "\u201D": '"',
  "\u2026": "...",
  "\u20B9": "Rs.",
  "\u2022": "-",
  "\u2192": "->",
  "\u00A0": " ",
};

const safeText = (value: string | null | undefined): string => {
  if (!value) return "";
  let text = String(value).replace(/\r\n/g, "\n").replace(/\r/g, "\n");
  Object.entries(TRANSLITERATE).forEach(([from, to]) => {
    text = text.split(from).join(to);
  });
  return text.replace(/[^\n\u0020-\u007E\u00A0-\u00FF]/g, "");
};

interface LoadedPdfImage {
  data: string | HTMLImageElement;
  format: "PNG" | "JPEG";
  width: number;
  height: number;
}

const loadPdfImage = async (
  src: string | null | undefined,
  maxWidthMm: number,
  maxHeightMm: number
): Promise<LoadedPdfImage | null> => {
  if (!src || !src.trim()) return null;
  if (typeof Image === "undefined") return null;

  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.onload = () => {
      try {
        const naturalW = img.naturalWidth || img.width || 100;
        const naturalH = img.naturalHeight || img.height || 100;
        const aspect = naturalW / naturalH;

        let width = maxWidthMm;
        let height = width / aspect;
        if (height > maxHeightMm) {
          height = maxHeightMm;
          width = height * aspect;
        }

        let format: "PNG" | "JPEG" = "PNG";
        if (
          src.startsWith("data:image/jpeg") ||
          src.startsWith("data:image/jpg") ||
          src.includes(".jpg") ||
          src.includes(".jpeg")
        ) {
          format = "JPEG";
        }

        resolve({ data: img, format, width, height });
      } catch {
        resolve(null);
      }
    };
    img.onerror = () => resolve(null);
    img.src = src;
  });
};

export const generateInvoicePdf = async (
  data: InvoicePdfData
): Promise<jsPDF> => {
  const { invoice, items, client, settings } = data;
  const currency = invoice.currency || settings.currency || "INR";

  const businessName = settings.business_name || "Mithlesh Vishwakarma (OC)";
  const businessEmail = settings.business_email || "mithlesh.workplace@gmail.com";
  const businessPhone = settings.business_phone || "+91 9327832747";
  const businessAddress = settings.business_address || "Surat, Gujarat";

  // Dynamic signatory information
  const signatoryTitle = safeText(settings.signatory_title || "Authorised Signature");
  const signatoryName = safeText(
    settings.signatory_name ||
      (settings.business_name?.includes("Mithlesh")
        ? settings.business_name
        : "Mithlesh Vishwakarma (OC)")
  );
  const signatoryCursive = safeText(settings.signatory_name || "M. Vishwakarma");

  // Load dynamic branding images asynchronously
  const [logoImg, sigImg] = await Promise.all([
    loadPdfImage(settings.logo_url, 110.0, 30.0),
    loadPdfImage(settings.signature_url, 46.0, 9.0),
  ]);

  const doc = new jsPDF({ unit: "mm", format: "a4", orientation: "portrait" });
  doc.setProperties({
    title: `Invoice ${invoice.invoice_number}`,
    subject: `Invoice for ${client?.company || client?.name || "Client"}`,
    author: businessName,
    creator: "OrdinaryCoder Accounting",
  });

  const money = (value: number) => formatPdfAmount(value, currency);

  const setText = (color: Rgb) => doc.setTextColor(color[0], color[1], color[2]);
  const setFill = (color: Rgb) => doc.setFillColor(color[0], color[1], color[2]);
  const setDraw = (color: Rgb) => doc.setDrawColor(color[0], color[1], color[2]);

  /* ---------------------------------------------------------------------- */
  /* Slanted badge helper (increased font size 8.2pt)                       */
  /* ---------------------------------------------------------------------- */
  const drawSlantedBadge = (label: string, x: number, y: number): number => {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8.2);
    const textWidth = doc.getTextWidth(label);
    const badgeWidth = textWidth + 6.5;
    const badgeHeight = 5.2;

    setFill(INK);
    doc.rect(x, y, badgeWidth, badgeHeight, "F");

    setFill(ACCENT);
    doc.triangle(
      x + badgeWidth,
      y,
      x + badgeWidth + 3.4,
      y,
      x + badgeWidth,
      y + badgeHeight,
      "F"
    );

    setText(WHITE);
    doc.text(label, x + 3.2, y + 3.7);

    return badgeHeight;
  };

  /* ---------------------------------------------------------------------- */
  /* Header: Asymmetric Header with exact vector geometry matching mockup   */
  /* ---------------------------------------------------------------------- */
  const drawHeader = () => {
    // 1. Left Navy Block: height 37.3mm
    setFill(INK);
    doc.rect(0, 0, 87.5, 37.3, "F");
    doc.triangle(87.5, 0, 113.1, 0, 87.5, 37.3, "F");

    // 2. Right Navy Block: height 28.0mm
    setFill(INK);
    doc.rect(102.6, 0, PAGE_WIDTH - 102.6, 28.0, "F");
    doc.triangle(102.6, 28.0, 121.5, 0, 102.6, 0, "F");

    // 3. Diagonal Orange Stripe
    setFill(ACCENT);
    doc.triangle(113.1, 0, 121.5, 0, 84.8, 42.1, "F");
    doc.triangle(121.5, 0, 93.3, 42.1, 84.8, 42.1, "F");

    // 4. Soft Peach Accent Fold under Right Navy Block
    setFill(PEACH);
    doc.triangle(102.6, 28.0, 112.8, 28.0, 93.3, 42.1, "F");
    doc.triangle(112.8, 28.0, 100.8, 42.1, 93.3, 42.1, "F");

    // 5. Left Horizontal Orange Bar under Left Navy
    setFill(ACCENT);
    doc.rect(0, 37.3, 84.8, 4.8, "F");
    doc.triangle(84.8, 37.3, 87.5, 37.3, 84.8, 42.1, "F");

    // 6. Dynamic Logo (or fallback to Monogram OC Vector Logo)
    if (logoImg) {
      doc.addImage(logoImg.data, logoImg.format, 4.5, 0.6, logoImg.width, logoImg.height);
    } else {
      setFill(WHITE);
      doc.triangle(32.2, 7.2, 40.3, 7.2, 43.3, 12.6, "F");
      doc.triangle(32.2, 7.2, 43.3, 12.6, 29.2, 12.6, "F");
      doc.triangle(29.2, 12.6, 43.3, 12.6, 40.3, 18.0, "F");
      doc.triangle(29.2, 12.6, 40.3, 18.0, 32.2, 18.0, "F");

      setFill(INK);
      doc.triangle(34.3, 9.9, 38.2, 9.9, 39.7, 12.6, "F");
      doc.triangle(34.3, 9.9, 39.7, 12.6, 32.8, 12.6, "F");
      doc.triangle(32.8, 12.6, 39.7, 12.6, 38.2, 15.3, "F");
      doc.triangle(32.8, 12.6, 38.2, 15.3, 34.3, 15.3, "F");

      setFill(ACCENT);
      doc.triangle(43.6, 7.2, 52.3, 7.2, 42.4, 9.9, "F");
      doc.triangle(52.3, 7.2, 50.8, 9.9, 42.4, 9.9, "F");
      doc.triangle(42.4, 15.3, 50.8, 15.3, 43.6, 18.0, "F");
      doc.triangle(50.8, 15.3, 52.3, 18.0, 43.6, 18.0, "F");
    }

    // Subtitle in Left Navy (matching y=90, fontSize=6.5 in InvoiceDocument.tsx)
    doc.setFont("helvetica", "normal");
    doc.setFontSize(5.5);
    setText([203, 213, 225]);
    doc.text("WEB   SOFTWARE   DIGITAL SOLUTIONS", 13.0, 27.0);

    // Business title in header was commented out in InvoiceDocument.tsx by user
    // doc.setFontSize(11.5);
    // setText(WHITE);
    // doc.text(safeText(businessName), 13.0, 31.9);

    // Right Side: INVOICE Title inside 28mm right navy block
    doc.setFont("helvetica", "bold");
    doc.setFontSize(26);
    setText(ACCENT);
    doc.text("INVOICE", PAGE_WIDTH - MARGIN, 18.5, { align: "right" });
  };

  /* ---------------------------------------------------------------------- */
  /* Contact Strip & Invoice Metadata (increased font size 8.8pt)           */
  /* ---------------------------------------------------------------------- */
  const drawContactAndMeta = (): number => {
    // 1. Right Metadata Table
    const metaX = PAGE_WIDTH - MARGIN;
    const metaLabelX = 136.0;
    const colonX = 162.0;

    const metaItems: [string, string][] = [
      ["Invoice No", invoice.invoice_number],
      ["Issue Date", formatDatePdf(invoice.issue_date)],
      ["Due Date", formatDatePdf(invoice.due_date)],
      ["Status", invoice.status.toUpperCase()],
    ];

    let rowY = 36.8;
    metaItems.forEach(([label, value]) => {
      doc.setFont("helvetica", "bold");
      doc.setFontSize(8.8);
      setText(DARK_SLATE);
      doc.text(label, metaLabelX, rowY);
      doc.text(":", colonX, rowY);

      if (label === "Status") {
        setFill(PEACH);
        const valWidth = doc.getTextWidth(value) + 5.5;
        doc.roundedRect(metaX - valWidth, rowY - 3.5, valWidth, 4.8, 1, 1, "F");
        setText([154, 52, 18]);
        doc.text(value, metaX - valWidth / 2, rowY, { align: "center" });
      } else {
        doc.setFont("helvetica", label === "Invoice No" ? "bold" : "normal");
        setText(INK);
        doc.text(value, metaX, rowY, { align: "right" });
      }

      rowY += 6.0;
    });

    // 2. Left Contact info (increased font size 8.8pt)
    const contactStartY = 47.0;
    setFill(AMBER);
    doc.rect(MARGIN, contactStartY, 0.8, 14.0, "F");

    doc.setFont("helvetica", "bold");
    doc.setFontSize(8.8);
    setText(DARK_SLATE);
    doc.text(safeText(businessEmail), MARGIN + 3.5, contactStartY + 3.3);
    doc.text(safeText(businessPhone), MARGIN + 3.5, contactStartY + 8.5);
    doc.text(safeText(businessAddress), MARGIN + 3.5, contactStartY + 13.7);

    // 3. Full-width horizontal divider line across the page
    const dividerY = 65.0;
    setDraw(LINE);
    doc.setLineWidth(0.25);
    doc.line(MARGIN, dividerY, PAGE_WIDTH - MARGIN, dividerY);

    return dividerY;
  };

  /* ---------------------------------------------------------------------- */
  /* FROM & BILL TO Section (increased font sizes: 10.2pt & 8.8pt)          */
  /* ---------------------------------------------------------------------- */
  const drawParties = (top: number): number => {
    const rightX = 116.5;

    drawSlantedBadge("FROM", MARGIN, top);
    drawSlantedBadge("BILL TO", rightX, top);

    let y = top + 9.2;

    // Business Name (text-lg font-black: 12.5pt bold INK matching InvoiceDocument.tsx)
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12.5);
    setText(INK);
    doc.text(safeText(businessName), MARGIN, y);

    // Client Name / Company (text-lg font-black: 12.5pt bold INK matching InvoiceDocument.tsx)
    const clientTitle = client?.company || client?.name || "Bastion Research";
    doc.text(safeText(clientTitle), rightX, y);
    y += 5.2;

    // Contact details (text-[13.5px]: 9.2pt normal DARK_SLATE matching InvoiceDocument.tsx)
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9.2);
    setText(DARK_SLATE);

    const leftLines = [businessEmail, businessPhone, businessAddress];
    const rightLines: string[] = [];
    if (client?.company && client?.name) rightLines.push(safeText(client.name));
    rightLines.push(safeText(client?.email || "connectt@bastionresearch.in"));
    rightLines.push(safeText(client?.phone || "9876543120"));
    rightLines.push(safeText(client?.address || "Vesu, Surat, Gujarat"));

    const maxLines = Math.max(leftLines.length, rightLines.length);
    for (let i = 0; i < maxLines; i += 1) {
      if (leftLines[i]) doc.text(leftLines[i], MARGIN, y);
      if (rightLines[i]) doc.text(rightLines[i], rightX, y);
      y += 4.8;
    }

    return y + 3;
  };

  /* ---------------------------------------------------------------------- */
  /* Footer: Dual-tone ribbon with 3.5mm white diagonal gap                 */
  /* ---------------------------------------------------------------------- */
  const drawFooter = (pageNumber: number, totalPages: number) => {
    const footerY = PAGE_HEIGHT - 11;
    const footerHeight = 8.5;

    // Left orange banner (slants from 106mm to 97.5mm)
    setFill(ACCENT);
    doc.triangle(0, footerY, 106, footerY, 0, footerY + footerHeight, "F");
    doc.triangle(106, footerY, 97.5, footerY + footerHeight, 0, footerY + footerHeight, "F");

    doc.setFont("helvetica", "bolditalic");
    doc.setFontSize(8.8);
    setText(INK);
    doc.text("Thank you for your business", MARGIN, footerY + 5.5);

    // Right navy banner (slants from 109.5mm to 101mm to PAGE_WIDTH)
    setFill(INK);
    doc.triangle(109.5, footerY, PAGE_WIDTH, footerY, PAGE_WIDTH, footerY + footerHeight, "F");
    doc.triangle(109.5, footerY, PAGE_WIDTH, footerY + footerHeight, 101, footerY + footerHeight, "F");

    doc.setFont("helvetica", "bold");
    doc.setFontSize(8.5);
    setText(WHITE);
    doc.text(`Page ${pageNumber} of ${totalPages}`, PAGE_WIDTH - MARGIN, footerY + 5.5, {
      align: "right",
    });
  };

  const drawContinuationHeader = () => {
    setFill(INK);
    doc.rect(0, 0, PAGE_WIDTH, 14, "F");
    setFill(ACCENT);
    doc.rect(0, 14, PAGE_WIDTH, 1.5, "F");

    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    setText(WHITE);
    doc.text("INVOICE", MARGIN, 9.5);

    doc.setFontSize(8.5);
    setText(ACCENT);
    doc.text(
      `${invoice.invoice_number}  |  ${safeText(client?.name) || "Walk-in / No client"}`,
      PAGE_WIDTH - MARGIN,
      9.5,
      { align: "right" }
    );
  };

  /* ---------------------------------------------------------------------- */
  /* Render Document Content                                                */
  /* ---------------------------------------------------------------------- */
  drawHeader();
  const dividerY = drawContactAndMeta();
  const partiesEndY = drawParties(dividerY + 5.5);

  const tableTop = partiesEndY + 7.0;

  autoTable(doc, {
    startY: tableTop,
    margin: { left: MARGIN, right: MARGIN, top: 18 },
    head: [["#", "Description", "Qty", "Rate", "Amount"]],
    body: items.map((item, index) => [
      String(index + 1),
      safeText(item.description),
      String(item.quantity),
      money(item.rate),
      money(item.amount),
    ]),
    theme: "plain",
    styles: {
      font: "helvetica",
      fontSize: 9.2,
      cellPadding: 3.4,
      textColor: DARK_SLATE,
      lineColor: LINE,
      lineWidth: 0.1,
    },
    headStyles: {
      fillColor: ACCENT,
      textColor: WHITE,
      fontStyle: "bold",
      fontSize: 9.0,
      cellPadding: 3.4,
    },
    alternateRowStyles: { fillColor: [255, 255, 255] },
    columnStyles: {
      0: { cellWidth: 10, halign: "center" },
      1: { cellWidth: "auto", halign: "left" },
      2: { cellWidth: 16, halign: "center" },
      3: { cellWidth: 30, halign: "right" },
      4: { cellWidth: 34, halign: "right", fontStyle: "bold" },
    },
    willDrawPage: (hook) => {
      if (hook.pageNumber > 1) drawContinuationHeader();
    },
  });

  const tableEndY = (doc as JsPdfWithAutoTable).lastAutoTable?.finalY ?? tableTop + 20;

  /* ---------------------------------------------------------------------- */
  /* PARALLEL TWO-COLUMN LOWER SECTION (INCREASED FONT SIZES & TIGHTER SIG) */
  /* ---------------------------------------------------------------------- */
  const balanceDue = Math.max(0, invoice.total - invoice.amount_paid);

  const totalRows: [string, string][] = [
    ["Subtotal", money(invoice.subtotal)],
    ...(invoice.discount > 0 ? ([["Discount", `- ${money(invoice.discount)}`]] as [string, string][]) : []),
    ...(invoice.tax_rate > 0
      ? ([["Tax", `${money(invoice.tax_amount)} (${invoice.tax_rate}%)`]] as [string, string][])
      : []),
    ["Total", money(invoice.total)],
    ["Amount Paid", money(invoice.amount_paid)],
    ["Balance Due", money(balanceDue)],
  ];

  const totalsWidth = 78;
  const totalsX = PAGE_WIDTH - MARGIN - totalsWidth;
  const rowHeight = 6.6;

  const leftWidth = 100;
  const sectionStartY = Math.max(tableEndY + 9.0, 150.0);

  // Left Column: 1. Amount in Words Card (increased font size 9.0pt)
  let leftY = sectionStartY;
  setFill(SOFT);
  doc.roundedRect(MARGIN, leftY, leftWidth, 14.5, 1.5, 1.5, "F");
  setFill(ACCENT);
  doc.rect(MARGIN + 3, leftY + 2.5, 0.8, 9.5, "F");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(8.2);
  setText(INK);
  doc.text("AMOUNT IN WORDS", MARGIN + 6, leftY + 4.8);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(9.0);
  setText(DARK_SLATE);
  const wordsText = doc.splitTextToSize(numberToWordsIndian(invoice.total), leftWidth - 10);
  doc.text(wordsText, MARGIN + 6, leftY + 9.8);

  leftY += 14.5 + 6.5;

  // Left Column: 2. Notes (increased font size 8.6pt)
  const notesStr =
    invoice.notes ||
    "Ponytail is an open-source AI coding skill and plugin created by Dietrich Gebert that forces AI agents (such as Claude Code, Codex, and Cursor) to behave like a pragmatic, minimalist \"lazy senior developer\"";
  if (notesStr) {
    drawSlantedBadge("NOTES", MARGIN, leftY);
    leftY += 7.5;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8.6);
    setText(DARK_SLATE);
    const notesWrapped = doc.splitTextToSize(safeText(notesStr), leftWidth);
    doc.text(notesWrapped, MARGIN, leftY);
    leftY += notesWrapped.length * 4.0 + 6.5;
  }

  // Left Column: 3. Terms & Conditions (increased font size 8.6pt)
  const termsText =
    invoice.terms ||
    settings.payment_terms ||
    "Ponytail is an open-source AI coding skill and plugin created by Dietrich Gebert that forces AI agents (such as Claude Code, Codex, and Cursor) to behave like a pragmatic, minimalist \"lazy senior developer\"";
  if (termsText) {
    drawSlantedBadge("TERMS & CONDITIONS", MARGIN, leftY);
    leftY += 7.5;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8.6);
    setText(DARK_SLATE);
    const termsWrapped = doc.splitTextToSize(safeText(termsText), leftWidth);
    doc.text(termsWrapped, MARGIN, leftY);
    leftY += termsWrapped.length * 4.0 + 7.5;
  }

  // Left Column: 4. Bank Details Card (increased font size 8.6pt)
  let bankCardBottomY = leftY + 24;
  const rawBank =
    settings.bank_details ||
    `A/C HOLDER NAME: VISHWAKARMA MITHLESH SHRI VIJAY\nBANK NAME: KOTAK MAHINDRA BANK\nIFSC CODE: KKBK0002852\nA/C NUMBER: 7512318326`;
  if (rawBank) {
    drawSlantedBadge("BANK DETAILS", MARGIN, leftY);
    leftY += 7.5;

    const bankLines = safeText(rawBank)
      .split("\n")
      .map((l) => l.trim())
      .filter(Boolean);

    setFill(SOFT);
    const cardHeight = Math.max(18, bankLines.length * 4.3 + 5.5);
    doc.roundedRect(MARGIN, leftY, leftWidth, cardHeight, 1.5, 1.5, "F");
    setFill(ACCENT);
    doc.rect(MARGIN + 3, leftY + 2.5, 0.8, cardHeight - 5, "F");

    let bankY = leftY + 4.8;
    doc.setFontSize(8.6);
    bankLines.forEach((line) => {
      const colonIdx = line.indexOf(":");
      if (colonIdx !== -1) {
        doc.setFont("helvetica", "bold");
        setText(INK);
        doc.text(line.slice(0, colonIdx + 1), MARGIN + 6, bankY);

        doc.setFont("helvetica", "normal");
        setText(DARK_SLATE);
        doc.text(line.slice(colonIdx + 1).trim(), MARGIN + 42, bankY);
      } else {
        doc.setFont("helvetica", "normal");
        setText(DARK_SLATE);
        doc.text(line, MARGIN + 6, bankY);
      }
      bankY += 4.3;
    });

    bankCardBottomY = leftY + cardHeight;
  }

  // Right Column: 1. Financial Breakdown (font sizes 9.2pt to 10.0pt)
  let tRowY = sectionStartY + 4.5;
  totalRows.forEach(([label, value]) => {
    const isTotal = label === "Total";
    const isBalance = label === "Balance Due";

    if (isTotal) {
      setFill(PEACH);
      doc.roundedRect(totalsX, tRowY - 4.4, totalsWidth, rowHeight, 1.2, 1.2, "F");
    } else if (isBalance) {
      setFill(ACCENT);
      const slant = 2.4;
      doc.triangle(totalsX + slant, tRowY - 4.4, PAGE_WIDTH - MARGIN, tRowY - 4.4, totalsX, tRowY - 4.4 + rowHeight, "F");
      doc.triangle(PAGE_WIDTH - MARGIN, tRowY - 4.4, PAGE_WIDTH - MARGIN, tRowY - 4.4 + rowHeight, totalsX, tRowY - 4.4 + rowHeight, "F");
    }

    doc.setFont("helvetica", isTotal || isBalance ? "bold" : "normal");
    doc.setFontSize(isTotal || isBalance ? 10.0 : 9.2);
    setText(isBalance ? INK : isTotal ? INK : DARK_SLATE);
    doc.text(label, totalsX + (isBalance ? 4 : 3), tRowY);

    doc.text(":", totalsX + 30, tRowY);

    doc.setFont("helvetica", "bold");
    doc.text(value, totalsX + totalsWidth - 3, tRowY, { align: "right" });

    tRowY += rowHeight;
  });

  const totalsBottomY = tRowY;

  // Right Column: 2. Authorised Signature
  // PINNED AT THE BOTTOM, level with Bank Details card, but guaranteed safe clearance above footer (never hides in footer)
  const footerY = PAGE_HEIGHT - 11; // 286.0mm
  const sigTotalHeight = 9.2;
  const safeMaxBottom = footerY - 11.0; // 275.0mm (guarantees 11mm clearance above footer ribbon)
  const targetBottom = Math.min(safeMaxBottom, Math.max(totalsBottomY + 22.0, bankCardBottomY));
  const sigY = targetBottom - sigTotalHeight;

  if (sigImg) {
    const sigX = PAGE_WIDTH - MARGIN - 48 + (48 - sigImg.width) / 2;
    const sigImgY = sigY + 1.8 - sigImg.height - 0.5;
    doc.addImage(sigImg.data, sigImg.format, sigX, sigImgY, sigImg.width, sigImg.height);
  } else {
    // Dynamic cursive font size scaled so the entire word fits in one single line
    let sigFontSize = 13.0;
    doc.setFont("helvetica", "bolditalic");
    doc.setFontSize(sigFontSize);
    while (sigFontSize > 7.5 && doc.getTextWidth(signatoryCursive) > 46) {
      sigFontSize -= 0.5;
      doc.setFontSize(sigFontSize);
    }
    setText(INK);
    doc.text(signatoryCursive, PAGE_WIDTH - MARGIN - 24, sigY, { align: "center" });
  }

  setDraw(DARK_SLATE);
  doc.setLineWidth(0.35);
  // Tighter gap from signature to line (1.8mm)
  doc.line(PAGE_WIDTH - MARGIN - 48, sigY + 1.8, PAGE_WIDTH - MARGIN, sigY + 1.8);

  // Dynamic Authorised Signature title (8.8pt)
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8.8);
  setText(INK);
  doc.text(signatoryTitle.toUpperCase(), PAGE_WIDTH - MARGIN - 24, sigY + 5.5, { align: "center" });

  // Dynamic Signatory Name (8.8pt)
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8.8);
  setText(DARK_SLATE);
  doc.text(signatoryName, PAGE_WIDTH - MARGIN - 24, sigY + 9.0, { align: "center" });

  /* ---------------------------------------------------------------------- */
  /* Draw Footers on every page                                             */
  /* ---------------------------------------------------------------------- */
  const totalPages = doc.getNumberOfPages();
  for (let page = 1; page <= totalPages; page += 1) {
    doc.setPage(page);
    drawFooter(page, totalPages);
  }

  return doc;
};

/** Build and download the invoice PDF. */
export const downloadInvoicePdf = async (
  data: InvoicePdfData,
  fileName?: string
): Promise<void> => {
  const doc = await generateInvoicePdf(data);
  const safeName = (fileName || `Invoice-${data.invoice.invoice_number}`).replace(
    /[^\w\-.]+/g,
    "-"
  );
  doc.save(`${safeName}.pdf`);
};

export default downloadInvoicePdf;
