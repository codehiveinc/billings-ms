import { injectable } from "tsyringe";
import PublishAndWaitForResponseUseCase from "../../../shared/application/use-cases/publish-and-wait-for-response.use-case";
import SagaMessageModel from "../../../shared/domain/types/saga-message";
import BillingRoutingKey from "../../../shared/application/types/billing.routing-key";
import BillingQueue from "../../../shared/application/types/billing-queue";

@injectable()
class UpdateAndGetOrderByUuid {
  constructor(
    private readonly publishAndWaitForResponseUseCase: PublishAndWaitForResponseUseCase
  ) {}

  async execute(orderUuid: string, billingUuid: string): Promise<SagaMessageModel> {
    return await this.publishAndWaitForResponseUseCase.excute(
      { order_uuid: orderUuid, billing_uuid: billingUuid },
      BillingRoutingKey.ORDERS_REQUEST_ORDER_UPDATE_UUID,
      (message) => message,
      BillingQueue.ORDER_OBTAINED
    );
  }
}

export default UpdateAndGetOrderByUuid;
