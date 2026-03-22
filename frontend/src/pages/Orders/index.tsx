import { PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Descriptions,
  Popconfirm,
  Space,
  Table,
  TableColumnsType,
  Tag,
} from "antd";
import { useState } from "react";

import { Edit } from "./Edit";

import { useOrderDelete, useOrders } from "../../api";
import { OrdersQuery } from "../../api/base";
import { displayDateTime } from "../../helpers/dateTime";
import { ORDER_STATUSES } from "../../helpers/mappings";

const Orders = () => {
  const [modal, setModal] = useState({ id: "", open: false });

  const orders = useOrders();

  const orderDelete = useOrderDelete();

  const columns: TableColumnsType<OrdersQuery["orders"][number]> = [
    {
      key: "createdAt",
      render: (_, i) => displayDateTime(i.createdAt),
      title: "Purchased at",
    },
    {
      key: "customerName",
      render: (_, i) => i.customerName,
      title: "Customer name",
    },
    {
      key: "status",
      render: (_, i) => <Tag>{ORDER_STATUSES[i.status]}</Tag>,
      title: "Status",
    },
    {
      key: "currency",
      render: (_, i) => i.currency,
      title: "Currency",
    },
    {
      key: "total",
      render: (_, i) => `${i.currency} ${i.total}`,
      title: "Total",
    },
    {
      key: "actions",
      render: (_, i) => (
        <Space>
          <Button
            onClick={() => setModal({ id: i.id, open: true })}
            size="small"
            type="link"
          >
            Edit
          </Button>

          <Popconfirm
            onConfirm={() => orderDelete.mutateAsync({ input: { id: i.id } })}
            title="Sure to delete?"
          >
            <Button size="small" type="link">
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
      title: "Actions",
    },
  ];

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-medium text-neutral-800">Orders</h1>

        <Button
          icon={<PlusOutlined />}
          onClick={() => setModal({ id: "", open: true })}
          type="primary"
        >
          Add order
        </Button>
      </div>

      <Edit modal={modal} setModal={setModal} />

      <Table
        className="mt-4"
        columns={columns}
        dataSource={orders.data}
        expandable={{
          expandedRowRender: (i) => (
            <Descriptions
              column={1}
              items={[
                {
                  children: i.address,
                  label: "Address",
                },
                {
                  children: i.shippingFee,
                  label: "Shipping fee",
                },
                {
                  children: i.subtotal,
                  label: "Subtotal",
                },
                {
                  children: i.tax,
                  label: "Tax",
                },
                {
                  children: i.total,
                  label: "Total",
                },
              ]}
            />
          ),
        }}
        loading={orders.isFetching}
        rowKey="id"
        scroll={{ x: "fit-content" }}
        size="small"
      />
    </>
  );
};

export default Orders;
