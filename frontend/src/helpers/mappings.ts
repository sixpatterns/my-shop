import { OrderStatusEnum } from "../api/base";

export const ORDER_STATUSES: Record<OrderStatusEnum, string> = {
  cancelled: "Cancelled",
  delivered: "Delivered",
  pending: "Pending",
  processing: "Processing",
  shipped: "Shipped",
};
