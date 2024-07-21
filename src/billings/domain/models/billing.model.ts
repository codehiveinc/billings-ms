import CurrencyEnum from "../enums/currency.enum";
import OrderStatusEnum from "../enums/order-status.enum";
import PaymentMethodEnum from "../enums/payment-method.enum";

class BillingModel {
  id: number;
  uuid: string;
  orderUuid: string;
  restaurantUuid: string;
  paymentMethod: PaymentMethodEnum;
  status: OrderStatusEnum;
  amount: number;
  currency: CurrencyEnum;
  transactionalId: string | null;
  createdAt: Date;
  updatedAt: Date;

  constructor(
    id: number,
    uuid: string,
    orderUuid: string,
    restaurantUuid: string,
    paymentMethod: PaymentMethodEnum,
    status: OrderStatusEnum,
    amount: number,
    currency: CurrencyEnum,
    transactionalId: string | null,
    createdAt: Date,
    updatedAt: Date
  ) {
    this.id = id;
    this.uuid = uuid;
    this.orderUuid = orderUuid;
    this.restaurantUuid = restaurantUuid;
    this.paymentMethod = paymentMethod;
    this.status = status;
    this.amount = amount;
    this.currency = currency;
    this.transactionalId = transactionalId;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}

export default BillingModel;
