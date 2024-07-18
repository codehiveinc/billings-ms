import { Billing } from './Billing';
import { BillingRepository } from '../infrastructure/persistence/BillingRepository';
import { Status } from './Status';

export class BillingService {
  private billingRepository: BillingRepository;

  constructor(billingRepository: BillingRepository) {
    this.billingRepository = billingRepository;
  }

  async createBilling(billing: Billing): Promise<void> {
    await this.billingRepository.save(billing);
  }

  async updateBillingStatus(billingId: string, status: Status): Promise<void> {
    const billing = await this.billingRepository.findById(billingId);
    if (billing) {
      billing.status = status;
      await this.billingRepository.update(billing);
    } else {
      throw new Error(`Billing with ID ${billingId} not found`);
    }
  }

  async getBillingById(billingId: string): Promise<Billing | null> {
    return await this.billingRepository.findById(billingId);
  }
}
