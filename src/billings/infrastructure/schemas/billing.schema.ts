import { z } from "zod";
import PaymentMethodEnum from "../../domain/enums/payment-method.enum";
import StatusEnum from "../../domain/enums/status.enum";

export const CreateBillingSchema = z.object({
  body: z.object({
    orderUuid: z
      .string({ required_error: "Order UUID is required" })
      .uuid({ message: "Order UUID must be a valid UUID" }),
    paymentMethod: z.nativeEnum(PaymentMethodEnum, {
      required_error: "Payment method is required",
    }),
    paymentReceiptUrl: z
      .string({ required_error: "Payment receipt is required" })
      .url({ message: "Payment receipt must be a valid URL" })
      .optional(),
  }),
});

export type CreateBillingBodyType = z.infer<typeof CreateBillingSchema>["body"];

export const UpdateBillingStatusSchema = z.object({
  params: z.object({
    billingUuid: z
      .string({ required_error: "Billing UUID is required" })
      .uuid({ message: "Billing UUID must be a valid UUID" }),
  }),
  body: z.object({
    status: z.nativeEnum(StatusEnum, {
      required_error: "Status is required",
    }),
  }),
});

export type UpdateBillingStatusType = z.infer<
  typeof UpdateBillingStatusSchema
>["body"];
export type UpdateBillingStatusParamsType = z.infer<
  typeof UpdateBillingStatusSchema
>["params"];
