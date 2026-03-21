import { Navigate } from "react-router";

import { useSessionsStore } from "../../stores/useSessionsStore";

const Root = () => {
  const session = useSessionsStore((i) => i.session);

  if (session) return <Navigate to="/dashboard" />;

  return <Navigate to="/login" />;
};

export default Root;
