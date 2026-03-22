import {
  CloseOutlined,
  LineChartOutlined,
  MenuOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { Avatar, Button, Drawer } from "antd";
import { useMemo, useState } from "react";
import { Link, NavLink, Outlet, useNavigate } from "react-router";

import { cn } from "../../helpers";
import { useSessionStore } from "../../stores/useSessionStore";

const navigation = [
  {
    icon: <LineChartOutlined className="text-base" />,
    label: "Dashboard",
    to: "/dashboard",
  },
  {
    icon: <ShoppingCartOutlined className="text-base" />,
    label: "Orders",
    to: "/orders",
  },
];

const Sidebar = ({ setOpen }: { setOpen: (i: boolean) => void }) => {
  const navigate = useNavigate();

  const fullName = useSessionStore((i) => i.session?.fullName ?? "");

  const destroy = useSessionStore((i) => i.destroy);

  const initials = useMemo(
    () =>
      fullName
        .split(" ")
        .map((i) => i[0])
        .join(""),
    [fullName],
  );

  const onLogout = () => {
    destroy();

    navigate("/login");
  };

  const onNavigate = () => {
    setOpen(false);
  };

  return (
    <div className="flex h-full flex-col divide-y divide-neutral-700 bg-neutral-900">
      <div className="flex items-center justify-between p-4">
        <Link className="font-semibold tracking-wider text-white" to="/">
          My shop
        </Link>

        <button
          className="inline-flex rounded border border-neutral-700 bg-neutral-800 p-1 text-white lg:hidden"
          onClick={() => setOpen(false)}
        >
          <CloseOutlined />
        </button>
      </div>

      <div className="no-scrollbar flex-1 overflow-y-scroll py-2">
        {navigation.map((i) => (
          <NavLink
            className={({ isActive }) =>
              cn(
                "flex items-center gap-2 px-5 py-3 text-sm text-neutral-300 hover:text-white",
                isActive ? "bg-neutral-700" : "",
              )
            }
            key={i.to}
            onClick={onNavigate}
            to={i.to}
          >
            {i.icon}
            {i.label}
          </NavLink>
        ))}
      </div>

      <div className="flex items-center justify-between gap-2 px-4 py-3">
        <div className="flex items-center gap-3">
          <Avatar className="bg-neutral-200 text-neutral-900">
            {initials}
          </Avatar>

          <div>
            <p className="text-sm font-medium text-neutral-300">{fullName}</p>
          </div>
        </div>

        <button
          className="inline-flex rounded border border-neutral-700 bg-neutral-800 p-1 text-sm text-white hover:bg-neutral-700"
          onClick={onLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

const Layout = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-neutral-100">
      <aside className="fixed inset-y-0 left-0 hidden h-dvh w-72 lg:block">
        <Sidebar setOpen={setOpen} />
      </aside>

      <Drawer
        closable={false}
        onClose={() => setOpen(false)}
        open={open}
        placement="left"
        styles={{ body: { padding: 0 } }}
        width={288}
      >
        <Sidebar setOpen={setOpen} />
      </Drawer>

      <div className="flex min-h-dvh flex-col lg:pl-72">
        <Button
          className="fixed left-4 top-4 z-10 lg:hidden"
          icon={<MenuOutlined />}
          onClick={() => setOpen(true)}
        />

        <main className="flex-1 p-4 pt-16 lg:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
