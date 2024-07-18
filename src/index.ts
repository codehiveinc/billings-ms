import express from 'express';
import { BillingRepository } from './infrastructure/persistence/BillingRepository';
import { Billing } from './domain/Billing';
import { createResponse } from './utils/response';
const app = express();
const port = 3000;
const billingRepository = new BillingRepository();

app.use(express.json());

app.get('/billings/:id', async (req, res) => {
  const billingId = req.params.id;
  const billing = await billingRepository.findById(billingId);

  try {
    const billing = await billingRepository.findById(billingId);

    if (billing) {
      res.json(createResponse(billing, 'Billing found', true, 200));
    } else {
      res.status(404).json(createResponse(null, 'Billing not found', false, 404));
    }
  } catch (error) {
    res.status(500).json(createResponse(null, 'Internal server error', false, 500));
  }
});

app.get('/billings', async (req, res) => {
  try {
    const billings = await billingRepository.findAll();
    res.json(createResponse(billings, 'Billings retrieved', true, 200));
  } catch (error) {
    res.status(500).json(createResponse(null, 'Internal server error', false, 500));
  }
});

app.post('/billings', async (req, res) => {
    const { orderId, paymentMethod, paymentDate, status, amount, transactionalId } = req.body;

    try {
      const newBilling = new Billing(orderId, paymentMethod, new Date(paymentDate), status, amount, transactionalId);
      await billingRepository.save(newBilling);
      res.status(201).json(createResponse(null, 'Billing created', true, 201));
    } catch (error) {
      res.status(500).json(createResponse(null, 'Internal server error', false, 500));      
    }
})

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
