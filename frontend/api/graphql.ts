import { initGraphQLTada } from "gql.tada";

import type { introspection } from "./graphql-env.d.ts";

export const graphql = initGraphQLTada<{
  introspection: introspection;
  scalars: {
    ISO8601Date: string;
    ISO8601DateTime: string;
  };
}>();

export type { ResultOf, VariablesOf } from "gql.tada";
