import { inject, injectable } from "tsyringe";
import IBillingRepository from "../ports/billing.repository.interface";
import StatusEnum from "../../domain/enums/status.enum";

@injectable()
class UpdateBillingStatusUseCase {
  constructor(
    @inject("BillingRepository")
    private readonly billingRepository: IBillingRepository
  ) {}

  async execute(billingUuid: string, status: string) {
    const statusEnum = this.convertStatusEnum(status);
    return this.billingRepository.updateStatus(billingUuid, statusEnum);
  }

  private convertStatusEnum(status: string): StatusEnum {
    switch (status) {
      case "paid":
        return StatusEnum.paid;
      case "unpaid":
        return StatusEnum.unpaid;
      default:
        throw new Error("Invalid status");
    }
  }
}

export default UpdateBillingStatusUseCase;
