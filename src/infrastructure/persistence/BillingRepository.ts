import { Billing } from "../../domain/Billing";

export class BillingRepository{
    save(billing: Billing): void {
        console.log(`Billing saved for order ${billing.orderId}`);
    }


    update(billing:Billing): void {
        console.log(`Billing updated for order ${billing.orderId}`);
    }

    findById(billingId: string): Billing | null {
        console.log(`Billing ${billingId} retrieved`);
        return null;
    }
}