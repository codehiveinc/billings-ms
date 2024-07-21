import { inject, injectable } from "tsyringe";
import IBillingRepository from "../ports/billing.repository.interface";
import BillingModel from "../../domain/models/billing.model";
import PaymentMethodEnum from "../../domain/enums/payment-method.enum";
import StatusEnum from "../../domain/enums/status.enum";
import { v4 as uuidV4 } from "uuid";
import CurrencyEnum from "../../domain/enums/currency.enum";
import UpdateAndGetOrderByUuid from "../../../orders/application/use-cases/update-and-get-order-by-uuid";

type GetOrderByUserUuidResponseDto = {
  totalAmount: number;
}

@injectable()
class CreateBillingUseCase {
  constructor(
    @inject("BillingRepository") private billingRepository: IBillingRepository,
    private readonly updateAndGetOrderByUuid: UpdateAndGetOrderByUuid,
  ) {}

  async execute(
    userUuid: string,
    oderUuid: string,
    paymentMethod: PaymentMethodEnum,
    paymentReceiptUrl: string | null
  ): Promise<BillingModel> {
    const currencyDefault = CurrencyEnum.mxn;
    const orderStatusDefault = StatusEnum.unpaid;
    const billingUuid = uuidV4();

    const sagaMessage = await this.updateAndGetOrderByUuid.execute(oderUuid, billingUuid);

    if (sagaMessage.success === false) {
      throw new Error("Order not found");
    }

    const { totalAmount: amount } = sagaMessage.data as GetOrderByUserUuidResponseDto;


    const billing = new BillingModel(
      0,
      billingUuid,
      userUuid,
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
