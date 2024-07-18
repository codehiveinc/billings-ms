import { Router } from 'express';
import { BillingController } from './BillingController';
import { BillingUseCase } from '../../application/BillingUseCase';
import { BillingService } from '../../domain/BillingService';
import { BillingRepository } from '../persistence/BillingRepository';

const router = Router();
const billingRepository = new BillingRepository();
const billingService = new BillingService(billingRepository);
const billingUseCase = new BillingUseCase(billingService);
const billingController = new BillingController(billingUseCase);

router.post('/billings', (req, res) => billingController.createBilling(req, res));
router.put('/billings/status', (req, res) => billingController.updateBillingStatus(req, res));
router.get('/billings/:id', (req, res) => billingController.getBillingById(req, res));

export default router;

