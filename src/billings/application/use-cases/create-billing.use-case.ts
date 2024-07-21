import { inject, injectable } from "tsyringe";
import IBillingRepository from "../ports/billing.repository.interface";
import BillingModel from "../../domain/models/billing.model";
import PaymentMethodEnum from "../../domain/enums/payment-method.enum";
import StatusEnum from "../../domain/enums/status.enum";
import { v4 as uuidV4 } from "uuid";
import CurrencyEnum from "../../domain/enums/currency.enum";

@injectable()
class CreateBillingUseCase {
  constructor(
    @inject("BillingRepository") private billingRepository: IBillingRepository
  ) {}

  async execute(
    orderUuid: string,
    paymentMethod: PaymentMethodEnum,
    paymentReceiptUrl: string | null
  ): Promise<BillingModel> {
    const restaurantUuid = uuidV4();
    const currencyDefault = CurrencyEnum.mxn;

    // TODO: Get restaurantUuid and amound from message broker
    const orderStatusDefault = StatusEnum.unpaid;
    const amount = 100;

    const billing = new BillingModel(
      0,
      uuidV4(),
      orderUuid,
      restaurantUuid,
      paymentMethod,
      orderStatusDefault,
      amount,
      currencyDefault,
      paymentReceiptUrl,
      "",
      new Date(),
      new Date()
    );

    return await this.billingRepository.save(billing);
  }
}

export default CreateBillingUseCase;
