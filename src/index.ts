import express from 'express';
import { BillingRepository } from './infrastructure/persistence/BillingRepository';

const app = express();
const port = 3000;
const billingRepository = new BillingRepository();

app.get('/billings/:id', async (req, res) => {
  const billingId = req.params.id;
  const billing = await billingRepository.findById(billingId);

  if (billing) {
    res.json(billing);
  } else {
    res.status(404).send('Billing not found');
  }
});

app.get('/billings', async (req, res) => {
  const billings = await billingRepository.findAll();
  res.json(billings);
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
