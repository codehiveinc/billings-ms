import { autoInjectable } from "tsyringe";
import RestBillingHandler from "../handlers/rest-billing.handler";
import { Router } from "express";
import validateResource from "../../../shared/infrastructure/middlewares/validate-resource.middleware";
import { CreateBillingSchema } from "../schemas/billing.schema";
import { authenticate } from "../../../shared/infrastructure/middlewares/authenticate.middleware";

@autoInjectable()
class BillingRouter {
  private router: Router;
  constructor(private readonly restBillingHandler: RestBillingHandler) {
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      "",
      authenticate,
      validateResource(CreateBillingSchema),
      this.restBillingHandler.createBillingHandler
    );
  }

  public getRouter() {
    return this.router;
  }
}

export default BillingRouter;