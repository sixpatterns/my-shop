import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { notification } from "antd";
import { GraphQLClient } from "graphql-request";

import {
  CustomerCreateDocument,
  CustomerCreateMutationVariables,
  CustomerDeleteDocument,
  CustomerDeleteMutationVariables,
  CustomerDocument,
  CustomersDocument,
  CustomerUpdateDocument,
  CustomerUpdateMutationVariables,
  OrderCreateDocument,
  OrderCreateMutationVariables,
  OrderDeleteDocument,
  OrderDeleteMutationVariables,
  OrderDocument,
  OrdersDocument,
  OrdersSummaryDocument,
  OrdersSummaryQueryVariables,
  OrderUpdateDocument,
  OrderUpdateMutationVariables,
  SessionCreateDocument,
  SessionCreateMutationVariables,
} from "./base";

import { queryClient } from "../App";
import { useSessionStore } from "../stores/useSessionStore";

const logout = () => {
  useSessionStore.getState().destroy();

  queryClient.clear();
};

const client = new GraphQLClient(
  `${import.meta.env.VITE_BACKEND_BASE_URL}/graphql`,
  {
    headers: () => ({
      Authorization: useSessionStore.getState().session?.token
        ? `Bearer ${useSessionStore.getState().session?.token}`
        : "",
    }),
    responseMiddleware: (r) => {
      if (
        "response" in r &&
        r.response.errors?.map((i) => i.message).join("") ===
          "Session not found"
      ) {
        logout();

        return;
      }

      if ("response" in r && r.response.errors) {
        notification.error({
          message: r.response.errors.map((e) => e.message).join(", "),
        });
      }
    },
  },
);

export const useSessionCreate = () => {
  return useMutation({
    mutationFn: (i: SessionCreateMutationVariables) =>
      client.request(SessionCreateDocument, i),
  });
};

export const useCustomers = () => {
  return useQuery({
    initialData: [],
    queryFn: async () => (await client.request(CustomersDocument)).customers,
    queryKey: ["customers"],
  });
};

export const useCustomer = (id: string) => {
  return useQuery({
    enabled: id !== "",
    queryFn: async () =>
      (await client.request(CustomerDocument, { id })).customer,
    queryKey: ["customer", id],
  });
};

export const useCustomerCreate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (i: CustomerCreateMutationVariables) =>
      client.request(CustomerCreateDocument, i),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["customers"] });
    },
  });
};

export const useCustomerDelete = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (i: CustomerDeleteMutationVariables) =>
      client.request(CustomerDeleteDocument, i),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["customers"] });
    },
  });
};

export const useCustomerUpdate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (i: CustomerUpdateMutationVariables) =>
      client.request(CustomerUpdateDocument, i),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["customers"] });
    },
  });
};

export const useOrdersSummary = (i: OrdersSummaryQueryVariables) => {
  return useQuery({
    queryFn: async () =>
      (await client.request(OrdersSummaryDocument, i)).ordersSummary,
    queryKey: ["ordersSummary", i],
  });
};

export const useOrders = () => {
  return useQuery({
    initialData: [],
    queryFn: async () => (await client.request(OrdersDocument)).orders,
    queryKey: ["orders"],
  });
};

export const useOrder = (id: string) => {
  return useQuery({
    enabled: id !== "",
    queryFn: async () => (await client.request(OrderDocument, { id })).order,
    queryKey: ["order", id],
  });
};

export const useOrderCreate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (i: OrderCreateMutationVariables) =>
      client.request(OrderCreateDocument, i),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });
};

export const useOrderDelete = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (i: OrderDeleteMutationVariables) =>
      client.request(OrderDeleteDocument, i),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });
};

export const useOrderUpdate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (i: OrderUpdateMutationVariables) =>
      client.request(OrderUpdateDocument, i),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });
};
