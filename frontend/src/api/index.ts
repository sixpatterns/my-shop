import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { notification } from "antd";
import { GraphQLClient } from "graphql-request";

import {
  OrderCreateDocument,
  OrderCreateMutationVariables,
  OrderDeleteDocument,
  OrderDeleteMutationVariables,
  OrderDocument,
  OrdersDocument,
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
    mutationFn: (variables: SessionCreateMutationVariables) =>
      client.request(SessionCreateDocument, variables),
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
    mutationFn: (variables: OrderCreateMutationVariables) =>
      client.request(OrderCreateDocument, variables),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });
};

export const useOrderDelete = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (variables: OrderDeleteMutationVariables) =>
      client.request(OrderDeleteDocument, variables),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });
};

export const useOrderUpdate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (variables: OrderUpdateMutationVariables) =>
      client.request(OrderUpdateDocument, variables),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });
};
