import {PaymentMethod} from './PaymentMethod';
import {Status} from './Status';

export class Billing {
    constructor(
        public orderId : string,
        public paymentMethod : PaymentMethod,
        public paymentDate : Date,
        public status : Status,
        public amount : number , 
        public transactionalId : string,
        
    ){}
}