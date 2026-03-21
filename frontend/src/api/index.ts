import { useMutation } from "@tanstack/react-query";
import { notification } from "antd";
import { GraphQLClient } from "graphql-request";

import { SessionCreateDocument, SessionCreateMutationVariables } from "./base";

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
