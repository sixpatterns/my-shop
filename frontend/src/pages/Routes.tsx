import { Navigate, Outlet, Route, Routes as Router } from "react-router";

import Layout from "./Layout";

import AsyncComponent from "../components/AsyncComponent";
import { useSessionStore } from "../stores/useSessionStore";

const Dashboard = AsyncComponent(() => import("./Dashboard"));
const Login = AsyncComponent(() => import("./Login"));
const Orders = AsyncComponent(() => import("./Orders"));
const Root = AsyncComponent(() => import("./Root"));

const PublicRoute = () => {
  const session = useSessionStore((i) => i.session);

  if (session) return <Navigate replace to="/" />;

  return <Outlet />;
};

const PrivateRoute = () => {
  const session = useSessionStore((i) => i.session);

  if (!session) return <Navigate replace to="/login" />;

  return <Outlet />;
};

export const Routes = () => {
  return (
    <Router>
      <Route element={<PublicRoute />}>
        <Route Component={Login} path="/login" />
      </Route>

      <Route Component={Root} path="/" />

      <Route element={<PrivateRoute />}>
        <Route element={<Layout />}>
          <Route Component={Dashboard} path="/dashboard" />
          <Route Component={Orders} path="/orders" />
        </Route>
      </Route>

      <Route element="Not found" path="*" />
    </Router>
  );
};
