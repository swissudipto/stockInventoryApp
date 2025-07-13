export interface sell {
  id: string;
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
  productId: number;
  quantity: number;
  amount: number;
}
