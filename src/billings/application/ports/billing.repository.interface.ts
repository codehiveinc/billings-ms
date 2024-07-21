import OrderStatusEnum from "../../domain/enums/order-status.enum";
import BillingModel from "../../domain/models/billing.model";

interface IBillingRepository {
  save(billing: BillingModel): Promise<BillingModel>;
  updateStatus(billingId: number, status: OrderStatusEnum): Promise<BillingModel>;
}

export default IBillingRepository;
