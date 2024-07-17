import { Request , Response  } from "express";
import { BillingUseCase} from "../../application/BillingUseCase";
import { Billing } from "../../domain/Billing";
import { PaymentMethod } from "../../domain/PaymentMethod";
import { Status } from "../../domain/Status"; 

export class BillingController {
    constructor(private billingUseCase: BillingUseCase) {}

    createBilling(req: Request, res: Response): void {
        const { orderId, paymentMethod, status,paymentDate, amount, transactionalId } = req.body;
        const billing = new Billing(orderId, paymentMethod, new Date(paymentDate), status, amount, transactionalId);
        this.billingUseCase.createBilling(billing);
        res.status(201).send();
    }

    updateBillingStatus(req: Request, res: Response): void {
        const { billingId, status } = req.body;
        this.billingUseCase.updateBillingStatus(billingId, status);
        res.status(200).send();
    }

    getBillingById(req: Request, res: Response): void {
        const { billingId } = req.params;
        const billing = this.billingUseCase.getBilling(billingId);
        if (billing){
             res.status(200).send(billing);
        } else  {
            res.status(404).send();
        }
    }


}