import "reflect-metadata";
import "./env";
import express, { Request, Response } from "express";
import morganMiddleware from "./shared/infrastructure/middlewares/morgan.middleware";
import camelCaseMiddleware from "./shared/infrastructure/middlewares/camel-case.middleware";
import snakeCaseMiddleware from "./shared/infrastructure/middlewares/snake-case.middleware";
import { container } from "tsyringe";
import JWTRepository from "./auth/infrastructure/adapters/repositories/jwt.repository";
import MessageBrokerRepository from "./shared/infrastructure/adapters/repositories/message-broker.repository";
import { envVariables } from "./env";
import BillingRepository from "./billings/infrastructure/adapters/repositories/billing.repository";
import BillingRouter from "./billings/infrastructure/routers/billing.router";

const app = express();
const PORT = envVariables.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morganMiddleware);

app.use(camelCaseMiddleware);
app.use(snakeCaseMiddleware);

container.register("JWTRepository", JWTRepository);
container.register("MessageBrokerRepository", MessageBrokerRepository);
container.register("BillingRepository", BillingRepository);

const billingsRouter = container.resolve(BillingRouter);

app.use("/api/v1/billings", billingsRouter.getRouter());

app.get("/health", (req: Request, res: Response) => {
  res.status(200).json({ message: "Everything is working!" });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
