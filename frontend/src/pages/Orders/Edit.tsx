import { Button, Form, Input, InputNumber, Select } from "antd";
import TextArea from "antd/es/input/TextArea";

import { useOrder, useOrderCreate, useOrderUpdate } from "../../api";
import { OrderAttributes } from "../../api/base";
import { FormDrawer } from "../../components/FormDrawer";
import { ORDER_STATUSES } from "../../helpers/mappings";

const initialValues: OrderAttributes = {
  status: "pending",
};

export const Edit = ({
  modal,
  setModal,
}: {
  modal: { id: string; open: boolean };
  setModal: (modal: { id: string; open: boolean }) => void;
}) => {
  const isNew = modal.id === "";

  const order = useOrder(modal.id);

  const orderCreate = useOrderCreate();
  const orderUpdate = useOrderUpdate();

  const onClose = () => setModal({ id: "", open: false });

  const onFinish = async (attributes: OrderAttributes) => {
    isNew
      ? await orderCreate.mutateAsync({ input: { attributes } })
      : await orderUpdate.mutateAsync({ input: { attributes, id: modal.id } });

    onClose();
  };

  return (
    <FormDrawer
      footer={
        <Button
          form="order-form"
          htmlType="submit"
          loading={orderCreate.isPending || orderUpdate.isPending}
          type="primary"
        >
          Submit
        </Button>
      }
      isFetching={order.isFetching}
      onClose={onClose}
      open={modal.open}
      title={isNew ? "New order" : "Edit order"}
      width={520}
    >
      <Form
        initialValues={isNew ? initialValues : order.data}
        layout="vertical"
        name="order-form"
        onFinish={onFinish}
        preserve={false}
      >
        <div className="columns-2">
          <Form.Item
            label="Customer name"
            name="customerName"
            rules={[{ message: "Required", required: true }]}
          >
            <Input placeholder="Customer name" />
          </Form.Item>

          <Form.Item
            label="Status"
            name="status"
            rules={[{ message: "Required", required: true }]}
          >
            <Select
              options={Object.entries(ORDER_STATUSES).map(([value, label]) => ({
                label,
                value,
              }))}
              placeholder="Status"
            />
          </Form.Item>
        </div>

        <Form.Item
          label="Address"
          name="address"
          rules={[{ message: "Required", required: true }]}
        >
          <TextArea placeholder="Address" />
        </Form.Item>

        <div className="columns-3">
          <Form.Item
            label="Shipping fee"
            name="shippingFee"
            rules={[{ message: "Required", required: true }]}
          >
            <InputNumber className="w-full" placeholder="Shipping fee" />
          </Form.Item>

          <Form.Item
            label="Subtotal"
            name="subtotal"
            rules={[{ message: "Required", required: true }]}
          >
            <InputNumber className="w-full" placeholder="Subtotal" />
          </Form.Item>

          <Form.Item
            label="Tax"
            name="tax"
            rules={[{ message: "Required", required: true }]}
          >
            <InputNumber className="w-full" placeholder="Tax" />
          </Form.Item>
        </div>

        <div className="columns-2">
          <Form.Item
            label="Total"
            name="total"
            rules={[{ message: "Required", required: true }]}
          >
            <InputNumber className="w-full" placeholder="Total" />
          </Form.Item>

          <Form.Item
            label="Currency"
            name="currency"
            rules={[{ message: "Required", required: true }]}
          >
            <Input placeholder="Currency" />
          </Form.Item>
        </div>
      </Form>
    </FormDrawer>
  );
};
