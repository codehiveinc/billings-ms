import CurrencyEnum from "../enums/currency.enum";
import StatusEnum from "../enums/status.enum";
import PaymentMethodEnum from "../enums/payment-method.enum";

class BillingModel {
  id: number;
  uuid: string;
  orderUuid: string;
  paymentMethod: PaymentMethodEnum;
  status: StatusEnum;
  amount: number;
  currency: CurrencyEnum;
  paymentReceiptUrl: string | null;
  transactionalId: string | null;
  createdAt: Date;
  updatedAt: Date;

  constructor(
    id: number,
    uuid: string,
    orderUuid: string,
    paymentMethod: PaymentMethodEnum,
    status: StatusEnum,
    amount: number,
    currency: CurrencyEnum,
    paymentReceiptUrl: string | null,
    transactionalId: string | null,
    createdAt: Date,
    updatedAt: Date
  ) {
    this.id = id;
    this.uuid = uuid;
    this.orderUuid = orderUuid;
    this.paymentMethod = paymentMethod;
    this.status = status;
    this.amount = amount;
    this.currency = currency;
    this.paymentReceiptUrl = paymentReceiptUrl;
    this.transactionalId = transactionalId;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}

export default BillingModel;
