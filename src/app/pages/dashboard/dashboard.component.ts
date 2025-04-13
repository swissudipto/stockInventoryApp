import { Component } from '@angular/core';
import { PdfgenerationService } from 'src/app/services/pdfgeneration.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  companyName = 'Cosmos Enterprise LTD';

constructor(private pdfservice : PdfgenerationService){
}


  onbuttonpress(){
    this.pdfservice.generateInvoicePdf();
  }
}
