import { Currency, OrderStatus, PaymentMethod } from "@prisma/client";
import { prisma } from "../../../../shared/infrastructure/prisma";
import IBillingRepository from "../../../application/ports/billing.repository.interface";
import PaymentMethodEnum from "../../../domain/enums/payment-method.enum";
import BillingModel from "../../../domain/models/billing.model";
import OrderStatusEnum from "../../../domain/enums/order-status.enum";
import CurrencyEnum from "../../../domain/enums/currency.enum";
import { singleton } from "tsyringe";

@singleton()
class BillingRepository implements IBillingRepository {
  async save(billing: BillingModel): Promise<BillingModel> {
    const billingCreated = await prisma.billing.create({
      data: {
        uuid: billing.uuid,
        orderUuid: billing.orderUuid,
        restaurantUuid: billing.restaurantUuid,
        paymentMethod: this.convertPaymentMethod(billing.paymentMethod),
        status: this.convertStatus(billing.status),
        amount: billing.amount,
        currency: this.convertCurrency(billing.currency),
      },
    });

    return new BillingModel(
      billingCreated.id,
      billingCreated.uuid,
      billingCreated.orderUuid,
      billingCreated.restaurantUuid,
      this.convertPaymentMethodEnum(billingCreated.paymentMethod),
      this.convertStatusEnum(billingCreated.status),
      billingCreated.amount,
      this.convertCurrencyEnum(billingCreated.currency),
      billingCreated.transactionalId,
      billingCreated.createdAt,
      billingCreated.updatedAt
    );
  }

  async updateStatus(
    billingId: number,
    status: OrderStatusEnum
  ): Promise<BillingModel> {
    const billingUpdated = await prisma.billing.update({
      where: {
        id: billingId,
      },
      data: {
        status: this.convertStatus(status),
      },
    });

    return new BillingModel(
      billingUpdated.id,
      billingUpdated.uuid,
      billingUpdated.orderUuid,
      billingUpdated.restaurantUuid,
      this.convertPaymentMethodEnum(billingUpdated.paymentMethod),
      this.convertStatusEnum(billingUpdated.status),
      billingUpdated.amount,
      this.convertCurrencyEnum(billingUpdated.currency),
      billingUpdated.transactionalId,
      billingUpdated.createdAt,
      billingUpdated.updatedAt
    );
  }

  private convertPaymentMethod(
    paymentMethod: PaymentMethodEnum
  ): PaymentMethod {
    switch (paymentMethod) {
      case PaymentMethodEnum.cash:
        return PaymentMethod.cash;
      case PaymentMethodEnum.transfer:
        return PaymentMethod.transfer;
      default:
        throw new Error("Payment method not found");
    }
  }

  private convertPaymentMethodEnum(
    paymentMethod: PaymentMethod
  ): PaymentMethodEnum {
    switch (paymentMethod) {
      case PaymentMethod.cash:
        return PaymentMethodEnum.cash;
      case PaymentMethod.transfer:
        return PaymentMethodEnum.transfer;
      default:
        throw new Error("Payment method not found");
    }
  }

  private convertStatus(status: OrderStatusEnum): OrderStatus {
    switch (status) {
      case OrderStatusEnum.editing:
        return OrderStatus.editing;
      case OrderStatusEnum.confirmed:
        return OrderStatus.confirmed;
      case OrderStatusEnum.verified:
        return OrderStatus.verified;
      case OrderStatusEnum.completed:
        return OrderStatus.completed;
      case OrderStatusEnum.canceled:
        return OrderStatus.canceled;
      default:
        throw new Error("Status not found");
    }
  }

  private convertStatusEnum(status: OrderStatus): OrderStatusEnum {
    switch (status) {
      case OrderStatus.editing:
        return OrderStatusEnum.editing;
      case OrderStatus.confirmed:
        return OrderStatusEnum.confirmed;
      case OrderStatus.verified:
        return OrderStatusEnum.verified;
      case OrderStatus.completed:
        return OrderStatusEnum.completed;
      case OrderStatus.canceled:
        return OrderStatusEnum.canceled;
      default:
        throw new Error("Status not found");
    }
  }

  private convertCurrency(currency: CurrencyEnum): Currency {
    switch (currency) {
      case CurrencyEnum.usd:
        return Currency.usd;
      case CurrencyEnum.mxn:
        return Currency.mxn;
      default:
        throw new Error("Currency not found");
    }
  }

  private convertCurrencyEnum(currency: Currency): CurrencyEnum {
    switch (currency) {
      case Currency.usd:
        return CurrencyEnum.usd;
      case Currency.mxn:
        return CurrencyEnum.mxn;
      default:
        throw new Error("Currency not found");
    }
  }
}

export default BillingRepository;