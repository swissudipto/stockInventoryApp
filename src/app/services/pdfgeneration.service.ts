import { formatDate } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { jsPDF } from 'jspdf';
import { autoTable } from 'jspdf-autotable';

@Injectable({
  providedIn: 'root',
})
export class PdfgenerationService {
  constructor(private http: HttpClient) {}

  generateInvoicePdf() {
    const doc = new jsPDF();

    doc.setFontSize(16);
    doc.setFont('Gorgia');

    doc.text('Ghosh Electric', 105, 14, { align: 'center' });

    doc.text('Invoice', 105, 20, { align: 'center' });
    doc.setFontSize(12);
    doc.text(`Invoice #: ${'INV001'}`, 20, 30);
    doc.text(`Date: ${''}`, 20, 36);
    doc.text(`Customer Name: ${'Sudipto Bose'}`, 20, 42);
    doc.text(`Address: ${'K-188'}`, 20, 48);
    doc.text(`Contact Number: ${'6294560952'}`, 20, 54);

    let startY = 60;
    doc.text('Item', 20, startY);
    doc.text('Qty', 100, startY);
    doc.text('Price', 120, startY);
    doc.text('Total', 160, startY);

    let total = 0;
    // data.items.forEach((item: any, index: number) => {
    //   const lineY = startY + 10 + index * 10;
    //   const lineTotal = item.qty * item.price;
    //   total += lineTotal;

    //   doc.text(item.name, 20, lineY);
    //   doc.text(item.qty.toString(), 100, lineY);
    //   doc.text(`$${item.price}`, 120, lineY);
    //   doc.text(`$${lineTotal}`, 160, lineY);
    // });

    doc.text(`Total: $${total}`, 160, startY + 10 + 1 * 10 + 10);

    // Save
    doc.save(`${'INV001'}.pdf`);
  }

  generateSellInvoicePdf(sellDetails: any) {
    const doc = new jsPDF();

    const storeName = 'Ghosh Electric';
    const invoiceTitle = 'INVOICE';
    const lineHeight = 10;
    let currentY = 20;

    // Header
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(18);
    doc.text(storeName, 105, currentY, { align: 'center' });

    currentY += lineHeight;
    doc.setFontSize(14);
    doc.text(invoiceTitle, 105, currentY, { align: 'center' });

    currentY += lineHeight * 1.5;
    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');
    doc.text(`Invoice No: ${sellDetails.invoiceNo}`, 14, currentY);
    doc.text(
      `Date: ${new Date(sellDetails.transactionDateTime).toLocaleString()}`,
      200 - 14,
      currentY,
      { align: 'right' }
    );

    currentY += lineHeight;
    doc.text(
      `Customer Name: ${sellDetails.customerName || 'N/A'}`,
      14,
      currentY
    );
    currentY += lineHeight;
    doc.text(`Address: ${sellDetails.customerAddress || 'N/A'}`, 14, currentY);
    currentY += lineHeight;
    doc.text(`Phone: ${sellDetails.phoneNumber || 'N/A'}`, 14, currentY);
    currentY += lineHeight;

    if (sellDetails.comment) {
      doc.text(`Comment: ${sellDetails.comment}`, 14, currentY);
      currentY += lineHeight;
    }

    currentY += 5;

    // Table
    autoTable(doc, {
      startY: currentY,
      head: [['Sl.', 'Product Name', 'Quantity', 'Amount']],
      body: sellDetails.sellItems.map((item: any) => [
        item.sl,
        item.productName,
        item.quantity,
        item.amount.toFixed(2),
      ]),
      styles: {
        halign: 'center',
        font: 'helvetica',
        fontSize: 11,
        textColor: [0, 0, 0],
        lineColor: [0, 0, 0],
        lineWidth: 0.1,
      },
      headStyles: {
        fillColor: [255, 255, 255],
        textColor: [0, 0, 0],
        fontStyle: 'bold',
        lineWidth: 0.2,
      },
      columnStyles: {
        0: { cellWidth: 15 },
        1: { cellWidth: 90, halign: 'left' },
        2: { cellWidth: 30 },
        3: { cellWidth: 30 },
      },
      theme: 'plain',
      tableLineWidth: 0.1,
      tableLineColor: [0, 0, 0],
    });

    // Total Amount
    const finalY = (doc as any).lastAutoTable.finalY || currentY + 20;
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text(
      `Total Amount: ₹ ${sellDetails.totalAmount.toFixed(2)}`,
      200 - 14,
      finalY + 10,
      { align: 'right' }
    );

    // Footer
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text('Thank you for your purchase!', 105, 285, { align: 'center' });

    // Save
    doc.save(`${sellDetails.invoiceNo}.pdf`);
  }
}
