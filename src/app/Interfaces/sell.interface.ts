export interface sell {
  id: number;
  customerName: string;
  customerAddress: string;
  phoneNumber: string;
  invoiceNo: string;
  sellDate: Date | string;
  sellAmount: string;
  comment: string;
  sellItems: sellItem[];
  totalAmount: number;
}

export interface sellItem {
  sl: number;
  productName: string;
  serial:string;
  productId: number;
  quantity: number;
  taxableamount:number;
  gstpercentage:number
  gstamount: number;
  amount: number;
}
