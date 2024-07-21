import { Currency, PaymentMethod, Status } from "@prisma/client";
import { prisma } from "../../../../shared/infrastructure/prisma";
import IBillingRepository from "../../../application/ports/billing.repository.interface";
import PaymentMethodEnum from "../../../domain/enums/payment-method.enum";
import BillingModel from "../../../domain/models/billing.model";
import StatusEnum from "../../../domain/enums/status.enum";
import CurrencyEnum from "../../../domain/enums/currency.enum";
import { singleton } from "tsyringe";

@singleton()
class BillingRepository implements IBillingRepository {
  async save(billing: BillingModel): Promise<BillingModel> {
    const billingCreated = await prisma.billing.create({
      data: {
        uuid: billing.uuid,
        orderUuid: billing.orderUuid,
        paymentMethod: this.convertPaymentMethod(billing.paymentMethod),
        status: this.convertStatus(billing.status),
        amount: billing.amount,
        currency: this.convertCurrency(billing.currency),
        paymentReceiptUrl: billing.paymentReceiptUrl,
      },
    });

    return new BillingModel(
      billingCreated.id,
      billingCreated.uuid,
      billingCreated.orderUuid,
      this.convertPaymentMethodEnum(billingCreated.paymentMethod),
      this.convertStatusEnum(billingCreated.status),
      billingCreated.amount,
      this.convertCurrencyEnum(billingCreated.currency),
      billingCreated.paymentReceiptUrl,
      billingCreated.transactionalId,
      billingCreated.createdAt,
      billingCreated.updatedAt
    );
  }

  async updateStatus(
    billingId: string,
    status: StatusEnum
  ): Promise<BillingModel> {
    const billingUpdated = await prisma.billing.update({
      where: {
        uuid: billingId,
      },
      data: {
        status: this.convertStatus(status),
      },
    });

    return new BillingModel(
      billingUpdated.id,
      billingUpdated.uuid,
      billingUpdated.orderUuid,
      this.convertPaymentMethodEnum(billingUpdated.paymentMethod),
      this.convertStatusEnum(billingUpdated.status),
      billingUpdated.amount,
      this.convertCurrencyEnum(billingUpdated.currency),
      billingUpdated.paymentReceiptUrl,
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

  private convertStatus(status: StatusEnum): Status {
    switch (status) {
      case StatusEnum.unpaid:
        return Status.unpaid;
      case StatusEnum.paid:
        return Status.paid;
      default:
        throw new Error("Status not found");
    }
  }

  private convertStatusEnum(status: Status): StatusEnum {
    switch (status) {
      case Status.unpaid:
        return StatusEnum.unpaid;
      case Status.paid:
        return StatusEnum.paid;
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
