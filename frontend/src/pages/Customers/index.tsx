import { PlusOutlined } from "@ant-design/icons";
import { Button, Popconfirm, Space, Table, TableColumnsType } from "antd";
import { useState } from "react";

import { Edit } from "./Edit";

import { useCustomerDelete, useCustomers } from "../../api";
import { CustomersQuery } from "../../api/base";
import { displayDateTime } from "../../helpers/dateTime";

const Customers = () => {
  const [modal, setModal] = useState({ id: "", open: false });

  const customers = useCustomers();

  const customerDelete = useCustomerDelete();

  const columns: TableColumnsType<CustomersQuery["customers"][number]> = [
    {
      key: "name",
      render: (_, i) => i.name,
      title: "Name",
    },
    {
      key: "email",
      render: (_, i) => i.email,
      title: "Email",
    },
    {
      key: "phone",
      render: (_, i) => i.phone,
      title: "Phone",
    },
    {
      key: "createdAt",
      render: (_, i) => displayDateTime(i.createdAt),
      title: "Created at",
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
            onConfirm={() =>
              customerDelete.mutateAsync({ input: { id: i.id } })
            }
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
        <h1 className="text-lg font-medium text-neutral-800">Customers</h1>

        <Button
          icon={<PlusOutlined />}
          onClick={() => setModal({ id: "", open: true })}
          type="primary"
        >
          Add customer
        </Button>
      </div>

      <Edit modal={modal} setModal={setModal} />

      <Table
        className="mt-4"
        columns={columns}
        dataSource={customers.data}
        loading={customers.isFetching}
        rowKey="id"
        scroll={{ x: "max-content" }}
        size="small"
      />
    </>
  );
};

export default Customers;
