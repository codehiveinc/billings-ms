import express from 'express';
import { BillingRepository } from './infrastructure/persistence/BillingRepository';
import { Billing } from './domain/Billing';
import { createResponse } from './utils/response';
import { authenticate } from './middleware/auth';
import { generateToken } from './utils/jwt';

const app = express();
const port = 3000;
const billingRepository = new BillingRepository();

// Middleware para parsear JSON
app.use(express.json());

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Aquí deberías validar el usuario y la contraseña. Esto es solo un ejemplo.
  if (username === 'admin' && password === 'password') {
    const token = generateToken({ username });
    res.json(createResponse({ token }, 'Login successful', true, 200));
  } else {
    res.status(401).json(createResponse(null, 'Invalid username or password', false, 401));
  }
});

// Rutas protegidas por JWT
app.get('/billings/:id', authenticate, async (req, res) => {
  const billingId = req.params.id;
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

app.get('/billings', authenticate, async (req, res) => {
  try {
    const billings = await billingRepository.findAll();
    res.json(createResponse(billings, 'Billings retrieved', true, 200));
  } catch (error) {
    res.status(500).json(createResponse(null, 'Internal server error', false, 500));
  }
});

app.post('/billings', authenticate, async (req, res) => {
  try {
    const { orderId, paymentMethod, amount, paymentDate, status, transactionId } = req.body;

    const newBilling = new Billing(orderId, paymentMethod, amount, paymentDate, status, transactionId);
    await billingRepository.save(newBilling);

    res.status(201).json(createResponse(newBilling, 'Billing created', true, 201));
  } catch (error) {
    console.error('Error creating billing:', error);
    res.status(400).json(createResponse(null, `Error creating billing: ${(error as any).message}`, false, 400));
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
