import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { notification } from "antd";
import { GraphQLClient } from "graphql-request";

import { graphql, VariablesOf } from "./graphql";

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

const SessionCreateDocument = graphql(`
  mutation sessionCreate($input: SessionCreateInput!) {
    sessionCreate(input: $input) {
      fullName
      token
    }
  }
`);

export const useSessionCreate = () => {
  return useMutation({
    mutationFn: (i: VariablesOf<typeof SessionCreateDocument>) =>
      client.request(SessionCreateDocument, i),
  });
};

const CustomersDocument = graphql(`
  query customers {
    customers {
      createdAt
      email
      id
      name
      phone
    }
  }
`);

export const useCustomers = () => {
  return useQuery({
    initialData: [],
    queryFn: async () => (await client.request(CustomersDocument)).customers,
    queryKey: ["customers"],
  });
};

const CustomerDocument = graphql(`
  query customer($id: ID!) {
    customer(id: $id) {
      email
      id
      name
      phone
    }
  }
`);

export const useCustomer = (id: string) => {
  return useQuery({
    enabled: id !== "",
    queryFn: async () =>
      (await client.request(CustomerDocument, { id })).customer,
    queryKey: ["customer", id],
  });
};

const CustomerCreateDocument = graphql(`
  mutation customerCreate($input: CustomerCreateInput!) {
    customerCreate(input: $input)
  }
`);

export const useCustomerCreate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (i: VariablesOf<typeof CustomerCreateDocument>) =>
      client.request(CustomerCreateDocument, i),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["customers"] });
    },
  });
};

const CustomerDeleteDocument = graphql(`
  mutation customerDelete($input: CustomerDeleteInput!) {
    customerDelete(input: $input)
  }
`);

export const useCustomerDelete = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (i: VariablesOf<typeof CustomerDeleteDocument>) =>
      client.request(CustomerDeleteDocument, i),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["customers"] });
    },
  });
};

const CustomerUpdateDocument = graphql(`
  mutation customerUpdate($input: CustomerUpdateInput!) {
    customerUpdate(input: $input)
  }
`);

export const useCustomerUpdate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (i: VariablesOf<typeof CustomerUpdateDocument>) =>
      client.request(CustomerUpdateDocument, i),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["customers"] });
    },
  });
};

const OrdersSummaryDocument = graphql(`
  query ordersSummary(
    $createdAtGt: ISO8601DateTime
    $createdAtLt: ISO8601DateTime
  ) {
    ordersSummary {
      avgAmount(createdAtGt: $createdAtGt, createdAtLt: $createdAtLt)
      countByStatus(createdAtGt: $createdAtGt, createdAtLt: $createdAtLt) {
        name
        value
      }
      revenueByMonth(createdAtGt: $createdAtGt, createdAtLt: $createdAtLt) {
        name
        value
      }
      totalCount(createdAtGt: $createdAtGt, createdAtLt: $createdAtLt)
      totalPendingCount: totalCount(
        createdAtGt: $createdAtGt
        createdAtLt: $createdAtLt
        status: pending
      )
      totalRevenue(createdAtGt: $createdAtGt, createdAtLt: $createdAtLt)
    }
  }
`);

export const useOrdersSummary = (
  i: VariablesOf<typeof OrdersSummaryDocument>,
) => {
  return useQuery({
    queryFn: async () =>
      (await client.request(OrdersSummaryDocument, i)).ordersSummary,
    queryKey: ["ordersSummary", i],
  });
};

const OrdersDocument = graphql(`
  query orders($includeCustomer: Boolean!) {
    orders {
      address
      createdAt
      currency
      customer @include(if: $includeCustomer) {
        name
      }
      id
      shippingFee
      status
      subtotal
      tax
      total
    }
  }
`);

export const useOrders = (i: VariablesOf<typeof OrdersDocument>) => {
  return useQuery({
    initialData: [],
    queryFn: async () => (await client.request(OrdersDocument, i)).orders,
    queryKey: ["orders", i],
  });
};

const OrderDocument = graphql(`
  query order($id: ID!) {
    order(id: $id) {
      address
      currency
      customerId
      id
      shippingFee
      status
      subtotal
      tax
      total
    }
  }
`);

export const useOrder = (id: string) => {
  return useQuery({
    enabled: id !== "",
    queryFn: async () => (await client.request(OrderDocument, { id })).order,
    queryKey: ["order", id],
  });
};

const OrderCreateDocument = graphql(`
  mutation orderCreate($input: OrderCreateInput!) {
    orderCreate(input: $input)
  }
`);

export const useOrderCreate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (i: VariablesOf<typeof OrderCreateDocument>) =>
      client.request(OrderCreateDocument, i),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });
};

const OrderDeleteDocument = graphql(`
  mutation orderDelete($input: OrderDeleteInput!) {
    orderDelete(input: $input)
  }
`);

export const useOrderDelete = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (i: VariablesOf<typeof OrderDeleteDocument>) =>
      client.request(OrderDeleteDocument, i),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });
};

const OrderUpdateDocument = graphql(`
  mutation orderUpdate($input: OrderUpdateInput!) {
    orderUpdate(input: $input)
  }
`);

export const useOrderUpdate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (i: VariablesOf<typeof OrderUpdateDocument>) =>
      client.request(OrderUpdateDocument, i),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });
};
