import { Request , Response  } from "express";
import { BillingUseCase} from "../../application/BillingUseCase";
import { Billing } from "../../domain/Billing";
import { PaymentMethod } from "../../domain/PaymentMethod";
import { Status } from "../../domain/Status"; 

export class BillingController{
    constructor(private billingUseCase: BillingUseCase) {}

    async createBilling(req: Request, res: Response): Promise<void> {
        try {
            const { orderId, paymentMethod, paymentDate, status,amount , transactionalId } = req.body;
            const billing = new Billing(orderId, paymentMethod as PaymentMethod,new Date (paymentDate), status as Status,amount, transactionalId);
            await this.billingUseCase.createBilling(billing);
            res.status(201).send();
        } catch (error) { 
            res.status(500).send({error: (error as any).message});
        }
    }

    async updateBillingStatus(req: Request, res: Response): Promise<void> {
        try {
            const { billingId, status } = req.body;
            await this.billingUseCase.updateBillingStatus(billingId, status as Status);
            res.status(200).send();
        } catch (error) {
            res.status(500).send({error: (error as any).message});
        }
    }

    async getBillingById(req: Request, res: Response): Promise<void> {
        try {
            const { billingId } = req.params;
            const billing = await this.billingUseCase.getBilling(billingId);
            if (billing) {
                res.status(200).send(billing);
            }
            else {
                res.status(404).send();
            }
        } catch (error) {
            res.status(500).send({error: (error as any).message});
            }
    }
}