import { z } from "zod";
import PaymentMethodEnum from "../../domain/enums/payment-method.enum";

export const CreateBillingSchema = z.object({
  body: z.object({
    orderUuid: z
      .string({ required_error: "Order UUID is required" })
      .uuid({ message: "Order UUID must be a valid UUID" }),
    paymentMethod: z.nativeEnum(PaymentMethodEnum, {
      required_error: "Payment method is required",
    }),
  }),
});

export type CreateBillingType = z.infer<typeof CreateBillingSchema>["body"];
