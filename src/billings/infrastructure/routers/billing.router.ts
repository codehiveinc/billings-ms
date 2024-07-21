import { autoInjectable } from "tsyringe";
import RestBillingHandlers from "../handlers/rest-billing.handlers";
import { Router } from "express";
import validateResource from "../../../shared/infrastructure/middlewares/validate-resource.middleware";
import { CreateBillingSchema, UpdateBillingStatusSchema } from "../schemas/billing.schema";

@autoInjectable()
class BillingRouter {
  private router: Router;
  constructor(private readonly restBillingHandler: RestBillingHandlers) {
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      "",
      validateResource(CreateBillingSchema),
      this.restBillingHandler.createBillingHandler
    );

    this.router.put(
      "/:billingUuid/status",
      validateResource(UpdateBillingStatusSchema),
      this.restBillingHandler.updateBillingStatusHandler
    );
  }

  public getRouter() {
    return this.router;
  }
}

export default BillingRouter;
