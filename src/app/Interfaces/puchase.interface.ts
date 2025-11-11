
export interface purchase {
    id: number;
    PurchaseId:number;
    purchaseDate: Date | string;
    supplierName: string;
    totalAmount: number;
    supplierContactNumber: string;
    supplierAddress: string;
    comment: string;
    purchaseItems?: purchaseItems[];
}

export interface purchaseItems {
    sl: number;
    productName: string;
    productId: number;
    quantity: number;
    amount: number;
}
