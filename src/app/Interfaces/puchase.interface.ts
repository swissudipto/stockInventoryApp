
export interface purchase{
    id : string;  
    purchaseId : string;  
    purchaseDate : Date | string;   
    productId : number;  
    quantity : number;  
    supplierName : string;
    invoiceAmount : number ; 
    invoiceNo : string;  
}