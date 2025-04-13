import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { jsPDF } from 'jspdf';

@Injectable({
  providedIn: 'root'
})
export class PdfgenerationService {

  constructor(private http : HttpClient) { }

  generateInvoicePdf() {
      const doc = new jsPDF();

      doc.setFontSize(16);
      doc.setFont('Gorgia')

      doc.text('Ghosh Electric', 105, 14, { align: 'center' });

      doc.text('Invoice', 105, 20, { align: 'center' });
      doc.setFontSize(12);
      doc.text(`Invoice #: ${"INV001"}`, 20, 30);
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
}
