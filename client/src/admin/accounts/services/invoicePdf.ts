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
 * A4 invoice PDF generator.
 *
 * Page setup is 210 x 297 mm (ISO A4) with millimetre units, so every
 * coordinate below maps directly to a real A4 sheet.
 *
 * Font note: jsPDF's built-in fonts use WinAnsi encoding, which has no
 * rupee-sign glyph — writing "₹" there renders as a stray "¹". Amounts are
 * therefore printed as "INR 1,234.00" (ISO code + grouped number), which is
 * unambiguous on paper and safe in any PDF reader.
 */

type Rgb = [number, number, number];

const INK: Rgb = [15, 23, 42];
const MUTED: Rgb = [100, 116, 139];
const LINE: Rgb = [226, 232, 240];
const SOFT: Rgb = [248, 250, 252];
const ACCENT: Rgb = [234, 179, 8];
const WHITE: Rgb = [255, 255, 255];
const DANGER: Rgb = [220, 38, 38];

const PAGE_WIDTH = 210;
const PAGE_HEIGHT = 297;
const MARGIN = 15;
const CONTENT_WIDTH = PAGE_WIDTH - MARGIN * 2;

export interface InvoicePdfData {
  invoice: AccountInvoice;
  items: AccountInvoiceItem[];
  client: AccountClient | null;
  settings: AccountSettings;
}

/** Load a remote logo into a data URL so it can be embedded in the PDF. */
const loadLogoAsDataUrl = async (url: string | null): Promise<string | null> => {
  if (!url || !/^https?:\/\//i.test(url)) return null;
  try {
    const response = await fetch(url);
    if (!response.ok) return null;
    const blob = await response.blob();
    if (!blob.type.startsWith("image/")) return null;
    return await new Promise<string | null>((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(typeof reader.result === "string" ? reader.result : null);
      reader.onerror = () => resolve(null);
      reader.readAsDataURL(blob);
    });
  } catch {
    return null;
  }
};

/**
 * jsPDF's built-in fonts use WinAnsi encoding. Printable ASCII and Latin-1
 * render correctly; anything else (curly quotes, em dashes, the rupee sign,
 * non-Latin scripts) has no glyph and would come out garbled.
 *
 * Common typographic characters are transliterated to safe ASCII so nothing
 * is silently dropped, and the remainder is filtered out.
 */
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
  // Keep newlines, printable ASCII and Latin-1; drop control characters.
  return text.replace(/[^\n\u0020-\u007E\u00A0-\u00FF]/g, "");
};

export const generateInvoicePdf = async (
  data: InvoicePdfData
): Promise<jsPDF> => {
  const { invoice, items, client, settings } = data;
  const currency = invoice.currency || settings.currency || "INR";

  const doc = new jsPDF({ unit: "mm", format: "a4", orientation: "portrait" });
  doc.setProperties({
    title: `Invoice ${invoice.invoice_number}`,
    subject: `Invoice for ${client?.name || "Client"}`,
    author: settings.business_name || "OrdinaryCoder",
    creator: "OrdinaryCoder Accounting",
  });

  const money = (value: number) => formatPdfAmount(value, currency);
  const logoDataUrl = await loadLogoAsDataUrl(settings.logo_url);

  // jsPDF's colour setters take positional RGB arguments, so unwrap the tuples.
  const setText = (color: Rgb) => doc.setTextColor(color[0], color[1], color[2]);
  const setFill = (color: Rgb) => doc.setFillColor(color[0], color[1], color[2]);
  const setDraw = (color: Rgb) => doc.setDrawColor(color[0], color[1], color[2]);

  /* ---------------------------------------------------------------------- */
  /* Header                                                                  */
  /* ---------------------------------------------------------------------- */
  const drawHeader = () => {
    setFill(INK);
    doc.rect(0, 0, PAGE_WIDTH, 3.2, "F");
    setFill(ACCENT);
    doc.rect(0, 0, 46, 3.2, "F");

    let leftY = 12;

    if (logoDataUrl) {
      try {
        const properties = doc.getImageProperties(logoDataUrl);
        const maxHeight = 11;
        const ratio = properties.width > 0 ? properties.height / properties.width : 0.42;
        const height = Math.min(maxHeight, 26 * ratio);
        doc.addImage(logoDataUrl, "PNG", MARGIN, leftY, 26, height);
        leftY += height + 3;
      } catch {
        /* fall through to the text-only header */
      }
    }

    setText(INK);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(15);
    doc.text(safeText(settings.business_name) || "OrdinaryCoder", MARGIN, leftY);
    leftY += 5;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(8.4);
    setText(MUTED);
    const contact: string[] = [];
    if (settings.business_email) contact.push(safeText(settings.business_email));
    if (settings.business_phone) contact.push(safeText(settings.business_phone));
    if (settings.business_address) contact.push(safeText(settings.business_address));
    if (settings.tax_id) contact.push(`Tax ID: ${safeText(settings.tax_id)}`);
    contact.forEach((line) => {
      const wrapped = doc.splitTextToSize(line, 92);
      doc.text(wrapped, MARGIN, leftY);
      // Advance by every wrapped line, otherwise a multi-line address
      // collides with the line that follows it.
      leftY += wrapped.length * 4.2;
    });

    // Right side: title + meta
    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    setText(INK);
    doc.text("INVOICE", PAGE_WIDTH - MARGIN, 20, { align: "right" });

    setDraw(ACCENT);
    doc.setLineWidth(0.7);
    doc.line(PAGE_WIDTH - MARGIN - 38, 24, PAGE_WIDTH - MARGIN, 24);

    const meta: [string, string][] = [
      ["Invoice No", invoice.invoice_number],
      ["Issue Date", formatDatePdf(invoice.issue_date)],
      ["Due Date", formatDatePdf(invoice.due_date)],
      ["Status", invoice.status.replace(/^\w/, (c) => c.toUpperCase())],
    ];
    let metaY = 30;
    meta.forEach(([label, value]) => {
      doc.setFont("helvetica", "normal");
      doc.setFontSize(8.4);
      setText(MUTED);
      doc.text(label, PAGE_WIDTH - MARGIN - 46, metaY);
      doc.setFont("helvetica", "bold");
      setText(INK);
      doc.text(value, PAGE_WIDTH - MARGIN, metaY, { align: "right" });
      metaY += 4.6;
    });
  };

  /* ---------------------------------------------------------------------- */
  /* From / Bill To                                                         */
  /* ---------------------------------------------------------------------- */
  const drawParties = (top: number): number => {
    const columnWidth = 86;
    const rightX = MARGIN + 96;

    doc.setFont("helvetica", "bold");
    doc.setFontSize(7.6);
    setText(ACCENT);
    doc.text("FROM", MARGIN, top);
    doc.text("BILL TO", rightX, top);

    let y = top + 5.5;

    doc.setFont("helvetica", "bold");
    doc.setFontSize(10.5);
    setText(INK);
    doc.text(doc.splitTextToSize(safeText(settings.business_name) || "—", columnWidth), MARGIN, y);
    doc.text(
      doc.splitTextToSize(safeText(client?.name) || "Walk-in / No client", columnWidth),
      rightX,
      y
    );
    y += 5.4;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(8.6);
    setText(MUTED);

    const leftLines: string[] = [];
    if (settings.business_email) leftLines.push(safeText(settings.business_email));
    if (settings.business_phone) leftLines.push(safeText(settings.business_phone));
    if (settings.business_address) leftLines.push(safeText(settings.business_address));
    if (settings.tax_id) leftLines.push(`Tax ID: ${safeText(settings.tax_id)}`);

    const rightLines: string[] = [];
    if (client?.company) rightLines.push(safeText(client.company));
    if (client?.email) rightLines.push(safeText(client.email));
    if (client?.phone) rightLines.push(safeText(client.phone));
    if (client?.address) rightLines.push(safeText(client.address));
    if (client?.tax_id) rightLines.push(`Tax ID: ${safeText(client.tax_id)}`);

    const leftWrapped = leftLines.flatMap((line) => doc.splitTextToSize(line, columnWidth));
    const rightWrapped = rightLines.flatMap((line) => doc.splitTextToSize(line, columnWidth));

    const rows = Math.max(leftWrapped.length, rightWrapped.length);
    for (let index = 0; index < rows; index += 1) {
      if (leftWrapped[index]) doc.text(leftWrapped[index], MARGIN, y);
      if (rightWrapped[index]) doc.text(rightWrapped[index], rightX, y);
      y += 4.2;
    }

    return y + 2;
  };

  /* ---------------------------------------------------------------------- */
  /* Page furniture                                                         */
  /* ---------------------------------------------------------------------- */
  const drawFooter = (pageNumber: number, totalPages: number) => {
    setDraw(LINE);
    doc.setLineWidth(0.2);
    doc.line(MARGIN, PAGE_HEIGHT - 15, PAGE_WIDTH - MARGIN, PAGE_HEIGHT - 15);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    setText(MUTED);
    doc.text("Thank you for your business", MARGIN, PAGE_HEIGHT - 9.5);
    doc.text(`Page ${pageNumber} of ${totalPages}`, PAGE_WIDTH - MARGIN, PAGE_HEIGHT - 9.5, {
      align: "right",
    });
  };

  const drawContinuationHeader = () => {
    setFill(INK);
    doc.rect(0, 0, PAGE_WIDTH, 3.2, "F");
    setFill(ACCENT);
    doc.rect(0, 0, 46, 3.2, "F");

    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    setText(INK);
    doc.text("INVOICE", MARGIN, 11);
    doc.setFont("helvetica", "normal");
    setText(MUTED);
    doc.text(
      `${invoice.invoice_number}  |  ${safeText(client?.name) || "Walk-in / No client"}`,
      PAGE_WIDTH - MARGIN,
      11,
      { align: "right" }
    );
    setDraw(LINE);
    doc.setLineWidth(0.2);
    doc.line(MARGIN, 14, PAGE_WIDTH - MARGIN, 14);
  };

  /* ---------------------------------------------------------------------- */
  /* Build the document                                                      */
  /* ---------------------------------------------------------------------- */
  drawHeader();
  const tableTop = drawParties(48);

  autoTable(doc, {
    startY: tableTop,
    // `startY` positions the table on page 1. `margin.top` is what autoTable
    // uses when it spills onto a new page, so it stays just under the
    // continuation header instead of repeating the page-1 offset.
    margin: { left: MARGIN, right: MARGIN, top: 18 },
    head: [["#", "Description", "Qty", "Rate", "Amount"]],
    body: items.map((item, index) => [
      String(index + 1),
      safeText(item.description),
      String(item.quantity),
      money(item.rate),
      money(item.amount),
    ]),
    theme: "grid",
    styles: {
      font: "helvetica",
      fontSize: 9,
      cellPadding: 2.4,
      textColor: INK,
      lineColor: LINE,
      lineWidth: 0.1,
      overflow: "linebreak",
    },
    headStyles: {
      fillColor: INK,
      textColor: WHITE,
      fontStyle: "bold",
      fontSize: 8.6,
      cellPadding: 2.6,
    },
    alternateRowStyles: { fillColor: SOFT },
    columnStyles: {
      0: { cellWidth: 10, halign: "center" },
      1: { cellWidth: "auto" },
      2: { cellWidth: 18, halign: "right" },
      3: { cellWidth: 28, halign: "right" },
      4: { cellWidth: 32, halign: "right" },
    },
    willDrawPage: (hook) => {
      if (hook.pageNumber > 1) drawContinuationHeader();
    },
  });

  const tableEndY = (doc as JsPdfWithAutoTable).lastAutoTable?.finalY ?? tableTop + 20;

  /* ---------------------------------------------------------------------- */
  /* Totals block                                                            */
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

  const boxWidth = 84;
  const boxX = PAGE_WIDTH - MARGIN - boxWidth;
  const rowHeight = 6.4;
  const boxHeight = totalRows.length * rowHeight + 2;

  let boxY = tableEndY + 6;
  if (boxY + boxHeight > PAGE_HEIGHT - 40) {
    doc.addPage();
    drawContinuationHeader();
    boxY = 22;
  }

  setFill(SOFT);
  setDraw(LINE);
  doc.setLineWidth(0.15);
  doc.roundedRect(boxX, boxY, boxWidth, boxHeight, 2, 2, "FD");

  let rowY = boxY + 5.4;
  totalRows.forEach(([label, value]) => {
    const isTotal = label === "Total";
    const isBalance = label === "Balance Due";

    if (isTotal) {
      setFill(INK);
      doc.roundedRect(boxX, rowY - 4.6, boxWidth, rowHeight + 0.6, 1.5, 1.5, "F");
    }

    doc.setFont("helvetica", isTotal ? "bold" : "normal");
    doc.setFontSize(isTotal ? 9.6 : 9);
    setText(isTotal ? WHITE : isBalance ? DANGER : MUTED);
    doc.text(label, boxX + 4, rowY);

    doc.setFont("helvetica", "bold");
    setText(isTotal ? WHITE : isBalance ? DANGER : INK);
    doc.text(value, boxX + boxWidth - 4, rowY, { align: "right" });

    rowY += rowHeight;
  });

  /* ---------------------------------------------------------------------- */
  /* Amount in words                                                         */
  /* ---------------------------------------------------------------------- */
  let cursorY = Math.max(boxY + boxHeight + 8, tableEndY + 8);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(8.4);
  setText(MUTED);
  doc.text("Amount in words", MARGIN, cursorY);
  doc.setFont("helvetica", "normal");
  setText(INK);
  doc.text(
    doc.splitTextToSize(numberToWordsIndian(invoice.total), CONTENT_WIDTH - 2),
    MARGIN,
    cursorY + 4.6
  );
  cursorY += 11;

  /* ---------------------------------------------------------------------- */
  /* Notes + terms                                                           */
  /* ---------------------------------------------------------------------- */
  if (invoice.notes || invoice.terms || settings.payment_terms) {
    if (cursorY > PAGE_HEIGHT - 55) {
      doc.addPage();
      drawContinuationHeader();
      cursorY = 22;
    }

    const blocks: [string, string][] = [];
    if (invoice.notes) blocks.push(["Notes", invoice.notes]);
    const terms = invoice.terms || settings.payment_terms;
    if (terms) blocks.push(["Terms & Conditions", terms]);

    blocks.forEach(([heading, body]) => {
      doc.setFont("helvetica", "bold");
      doc.setFontSize(8.4);
      setText(MUTED);
      doc.text(heading.toUpperCase(), MARGIN, cursorY);
      cursorY += 4.6;
      doc.setFont("helvetica", "normal");
      doc.setFontSize(8.8);
      setText(INK);
      const wrapped = doc.splitTextToSize(safeText(body), CONTENT_WIDTH);
      doc.text(wrapped, MARGIN, cursorY);
      cursorY += wrapped.length * 4.2 + 3;
    });
  }

  /* ---------------------------------------------------------------------- */
  /* Bank details + sign-off                                                 */
  /* ---------------------------------------------------------------------- */
  if (settings.bank_details) {
    if (cursorY > PAGE_HEIGHT - 50) {
      doc.addPage();
      drawContinuationHeader();
      cursorY = 22;
    }

    setDraw(LINE);
    doc.setLineWidth(0.2);
    doc.line(MARGIN, cursorY, MARGIN + 92, cursorY);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8.4);
    setText(MUTED);
    doc.text("BANK DETAILS", MARGIN, cursorY + 5);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8.8);
    setText(INK);
    const bankLines = doc.splitTextToSize(safeText(settings.bank_details), 92);
    doc.text(bankLines, MARGIN, cursorY + 9.6);
  }

  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  setText(INK);
  doc.text("Authorised Signature", PAGE_WIDTH - MARGIN, PAGE_HEIGHT - 32, { align: "right" });
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.4);
  setText(MUTED);
  doc.text(safeText(settings.business_name) || "OrdinaryCoder", PAGE_WIDTH - MARGIN, PAGE_HEIGHT - 27, {
    align: "right",
  });

  /* ---------------------------------------------------------------------- */
  /* Footers on every page                                                  */
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

/** Build the PDF and hand back a data URL (used for preview / share). */
export const invoicePdfDataUrl = async (data: InvoicePdfData): Promise<string> => {
  const doc = await generateInvoicePdf(data);
  return doc.output("dataurlstring");
};
