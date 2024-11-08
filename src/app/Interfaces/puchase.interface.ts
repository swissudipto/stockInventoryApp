
export interface purchase {
    id: string;
    purchaseId: string;
    purchaseDate: Date | string;
    productId: number;
    productName: string;
    quantity: number;
    supplierName: string;
    invoiceAmount: number;
    invoiceNo: string;
    comment: string;
}