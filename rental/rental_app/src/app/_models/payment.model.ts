import { Price } from "./price.model";

export class Payment {  
	id?: any;  
	startDate?: Date;  
	endDate?: Date;  
	paymentDate?: Date;  
	paymentType?: string;  
	price: Price; 
} 