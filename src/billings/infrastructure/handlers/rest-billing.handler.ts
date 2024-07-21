import { injectable } from "tsyringe";
import CreateBillingUseCase from "../../application/use-cases/create-billing.use-case";
import { Request, Response } from "express";
import {
  CreateBillingBodyType,
  UpdateBillingStatusParamsType,
  UpdateBillingStatusType,
} from "../schemas/billing.schema";
import createBaseResponse from "../../../shared/infrastructure/utils/createBaseResponse";
import UpdateBillingStatusUseCase from "../../application/use-cases/update-billing-status.use-case";

@injectable()
class RestBillingHandler {
  constructor(
    private readonly createBillingUseCase: CreateBillingUseCase,
    private readonly updateBillingStatusUseCase: UpdateBillingStatusUseCase
  ) {
    this.createBillingHandler = this.createBillingHandler.bind(this);
    this.updateBillingStatusHandler = this.updateBillingStatusHandler.bind(this);
  }

  async createBillingHandler(
    req: Request<unknown, unknown, CreateBillingBodyType>,
    res: Response
  ) {
    const { orderUuid, paymentMethod, paymentReceiptUrl } = req.body;

    try {
      const data = await this.createBillingUseCase.execute(
        orderUuid,
        paymentMethod,
        paymentReceiptUrl || null
      );

      const baseResponse = createBaseResponse(
        data,
        "Billing created successfully",
        true,
        201
      );

      return res.status(baseResponse.statusCode).json(baseResponse);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error });
    }
  }

  async updateBillingStatusHandler(
    req: Request<
      UpdateBillingStatusParamsType,
      unknown,
      UpdateBillingStatusType
    >,
    res: Response
  ) {
    try {
      const { status } = req.body;
      const { billingUuid } = req.params;

      const data = await this.updateBillingStatusUseCase.execute(
        billingUuid,
        status
      );

      const baseResponse = createBaseResponse(
        data,
        "Billing status updated successfully",
        true,
        200
      );

      return res.status(baseResponse.statusCode).json(baseResponse);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error });
    }
  }
}

export default RestBillingHandler;
