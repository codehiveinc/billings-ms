import StatusEnum from "../../domain/enums/status.enum";
import BillingModel from "../../domain/models/billing.model";

interface IBillingRepository {
  save(billing: BillingModel): Promise<BillingModel>;
  updateStatus(billingId: string, status: StatusEnum): Promise<BillingModel>;
}

export default IBillingRepository;
