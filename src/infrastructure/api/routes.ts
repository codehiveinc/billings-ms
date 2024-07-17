import { Router } from "express";
import { BillingController } from "./BillingController";
import { BillingUseCase } from "../../application/BillingUseCase";
import { BillingService } from "../../domain/BillingService";

const router= Router();
const billingService = new BillingService();
const billingUseCase = new BillingUseCase(billingService);
const billingController = new BillingController(billingUseCase);


router.post('/billing', (req, res) => billingController.createBilling(req, res));
router.put('/billing', (req, res) => billingController.updateBillingStatus(req, res));
router.get('/billing/:billingId', (req, res) => billingController.getBillingById(req, res));


export default router;
