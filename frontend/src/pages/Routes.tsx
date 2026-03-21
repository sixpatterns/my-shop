import { Navigate, Outlet, Route, Routes as Router } from "react-router";

import Layout from "./Layout";

import asyncComponent from "../components/asyncComponent";
import { useSessionStore } from "../stores/useSessionStore";

const PublicRoute = () => {
  const session = useSessionStore((i) => i.session);

  if (session) return <Navigate to="/" />;

  return <Outlet />;
};

const PrivateRoute = () => {
  const session = useSessionStore((i) => i.session);

  if (!session) return <Navigate to="/login" />;

  return <Outlet />;
};

export const Routes = () => {
  return (
    <Router>
      <Route element={<PublicRoute />}>
        <Route
          Component={asyncComponent(() => import("./Login"))}
          path="/login"
        />
      </Route>

      <Route Component={asyncComponent(() => import("./Root"))} path="/" />

      <Route element={<PrivateRoute />}>
        <Route element={<Layout />}>
          <Route
            Component={asyncComponent(() => import("./Dashboard"))}
            path="/dashboard"
          />
          <Route
            Component={asyncComponent(() => import("./Orders"))}
            path="/orders"
          />
        </Route>
      </Route>

      <Route element="Not found" path="*" />
    </Router>
  );
};
