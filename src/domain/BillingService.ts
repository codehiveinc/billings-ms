import {Billing} from './Billing';
import { Status } from './Status';

export class BillingService{
    createBilling(billing:Billing):void{
        console.log(`Billing created for order ${billing.orderId}`);
    }

    updateBillingStatus(billingId:string, status: Status): void {
        console.log(`Billing ${billingId} updated to status ${status}`);
        
    }

    getBilling(billingId:string): Billing | null {
        console.log(`Billing ${billingId} retrieved`);
        return null;
    }
}