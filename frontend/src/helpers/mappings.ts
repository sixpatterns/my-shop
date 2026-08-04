import { graphql } from "../api/graphql";

type OrderStatusEnum = ReturnType<typeof graphql.scalar<"OrderStatusEnum">>;

export const ORDER_STATUSES: Record<OrderStatusEnum, string> = {
  cancelled: "Cancelled",
  delivered: "Delivered",
  pending: "Pending",
  processing: "Processing",
  shipped: "Shipped",
};
