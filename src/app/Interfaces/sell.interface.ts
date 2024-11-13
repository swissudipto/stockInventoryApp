
export interface sell {
    id: string;
    customerName: string;
    customerAddress: string;
    phoneNumber: string;
    invoiceNo: string;
    sellDate: Date | string;
    productId: number;
    productName: string;
    quantity: number;
    sellAmount: number;
    comment: string;
}