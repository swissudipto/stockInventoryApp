
export interface purchase {
    id: string;
    purchaseDate: Date | string;
    productId: number;
    productName: string;
    quantity: number;
    supplierName: string;
    invoiceAmount: string;
    invoiceNo: string;
    comment: string;
}
