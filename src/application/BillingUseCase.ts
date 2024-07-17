import { BillingService } from "../domain/BillingService";
import { Billing } from "../domain/Billing";
import { Status } from "../domain/Status";


export class BillingUseCase {
    constructor(private billingService: BillingService) {}

    createBilling(billing: Billing): void {
        this.billingService.createBilling(billing);
    }

    updateBillingStatus(billingId: string, status: Status): void {
        this.billingService.updateBillingStatus(billingId, status);
    }

    getBilling(billingId: string): Billing | null {
        return this.billingService.getBilling(billingId);
    }
}