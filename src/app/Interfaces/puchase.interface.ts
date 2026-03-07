
export interface purchase {
    id: number;
    PurchaseId:number;
    purchaseDate: Date | string;
    supplierName: string;
    totalAmount: number;
    supplierContactNumber: string;
    supplierAddress: string;
    comment: string;
    serialNumbers: Record<string, boolean>;
    productName: string;
    productId: number;
    quantity: number;
    amount: number;
}

export interface purchaseItems {
    sl: number;
    productName: string;
    productId: number;
    quantity: number;
    amount: number;
}
