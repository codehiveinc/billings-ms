import { BillingService } from "../domain/BillingService";
import { Billing } from "../domain/Billing";
import { Status } from "../domain/Status";


export class BillingUseCase {
    constructor(private billingService: BillingService) {}

    async createBilling(billing: Billing): Promise<void> {
        await this.billingService.createBilling(billing);
    }

    async updateBillingStatus(billingId: string, status: Status): Promise<void> {
        await this.billingService.updateBillingStatus(billingId, status);
    }

    async getBilling(billingId: string): Promise<Billing | null> {
        return this.billingService.getBillingById(billingId);
    }

}