import { Navigate } from "react-router";

import { useSessionStore } from "../../stores/useSessionStore";

const Root = () => {
  const session = useSessionStore((i) => i.session);

  if (session) return <Navigate to="/dashboard" />;

  return <Navigate to="/login" />;
};

export default Root;
