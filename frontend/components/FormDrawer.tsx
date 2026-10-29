import { Drawer } from "antd";
import { ReactNode } from "react";

type Props = {
  afterClose?: () => void;
  children: ReactNode;
  footer: ReactNode;
  isFetching: boolean;
  onClose: () => void;
  open: boolean;
  title: ReactNode;
  width?: number;
};

export const FormDrawer = ({
  afterClose,
  children,
  footer,
  isFetching,
  onClose,
  open,
  title,
  width,
}: Props) => {
  return (
    <Drawer
      afterOpenChange={(open) => {
        if (!open) afterClose?.();
      }}
      destroyOnHidden
      footer={<div className="flex justify-end">{footer}</div>}
      loading={isFetching}
      onClose={onClose}
      open={open}
      title={title}
      width={width}
    >
      {children}
    </Drawer>
  );
};
