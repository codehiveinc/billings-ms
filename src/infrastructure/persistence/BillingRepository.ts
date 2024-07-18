import { Billing } from '../../domain/Billing';
import prisma from './prismaClient';
import { PaymentMethod } from '../../domain/PaymentMethod';
import { Status } from '../../domain/Status';

export class BillingRepository {
  async save(billing: Billing): Promise<void> {
    await prisma.billing.create({
      data: {
        orderId: billing.orderId,
        paymentMethod: billing.paymentMethod as PaymentMethod,
        amount: billing.amount,
        paymentDate: billing.paymentDate,
        status: billing.status,
        transactionalId: billing.transactionalId,
      },
    });
  }

  async update(billing: Billing): Promise<void> {
    await prisma.billing.update({
      where: { transactionalId: billing.transactionalId },
      data: {
        orderId: billing.orderId,
        paymentMethod: billing.paymentMethod as PaymentMethod,
        amount: billing.amount,
        paymentDate: billing.paymentDate,
        status: billing.status ,
      },
    });
  }

  async findById(billingId: string): Promise<Billing | null> {
    const billing = await prisma.billing.findUnique({
      where: { id: billingId },
    });

    if (!billing) return null;

    return new Billing(
      billing.orderId,
      billing.paymentMethod as PaymentMethod,
      billing.paymentDate,
      billing.status as Status,
      billing.amount,
      billing.transactionalId
    );
  }

  async findAll(): Promise<Billing[]> {
    const billings = await prisma.billing.findMany();

    return billings.map(
      (billing) =>
        new Billing(
          billing.orderId,
          billing.paymentMethod as PaymentMethod,
          billing.paymentDate,
          billing.status as Status,
          billing.amount,
          billing.transactionalId
        )
    );
  }
  
}
