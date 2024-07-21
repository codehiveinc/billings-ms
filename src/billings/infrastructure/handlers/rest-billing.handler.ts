import { injectable } from "tsyringe";
import CreateBillingUseCase from "../../application/use-cases/create-billing.use-case";
import { Request, Response } from "express";
import { CreateBillingType } from "../schemas/billing.schema";
import createBaseResponse from "../../../shared/infrastructure/utils/createBaseResponse";

@injectable()
class RestBillingHandler {
  constructor(private readonly createBillingUseCase: CreateBillingUseCase) {
    this.createBillingHandler = this.createBillingHandler.bind(this);
  }

  async createBillingHandler(
    req: Request<unknown, unknown, CreateBillingType>,
    res: Response
  ) {
    const { orderUuid, paymentMethod } = req.body;

    try {
      const data = await this.createBillingUseCase.execute(
        orderUuid,
        paymentMethod
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
}

export default RestBillingHandler;
