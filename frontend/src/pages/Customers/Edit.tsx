import { Button, Form, Input } from "antd";

import { useCustomer, useCustomerCreate, useCustomerUpdate } from "../../api";
import { CustomerAttributes } from "../../api/base";
import { FormDrawer } from "../../components/FormDrawer";

export const Edit = ({
  modal,
  setModal,
}: {
  modal: { id: string; open: boolean };
  setModal: (modal: { id: string; open: boolean }) => void;
}) => {
  const isNew = modal.id === "";

  const customer = useCustomer(modal.id);

  const customerCreate = useCustomerCreate();
  const customerUpdate = useCustomerUpdate();

  const onClose = () => setModal({ id: "", open: false });

  const onFinish = async (attributes: CustomerAttributes) => {
    isNew
      ? await customerCreate.mutateAsync({ input: { attributes } })
      : await customerUpdate.mutateAsync({
          input: { attributes, id: modal.id },
        });

    onClose();
  };

  return (
    <FormDrawer
      footer={
        <Button
          form="customer-form"
          htmlType="submit"
          loading={customerCreate.isPending || customerUpdate.isPending}
          type="primary"
        >
          Submit
        </Button>
      }
      isFetching={customer.isFetching}
      onClose={onClose}
      open={modal.open}
      title={isNew ? "New customer" : "Edit customer"}
    >
      <Form
        initialValues={customer.data}
        layout="vertical"
        name="customer-form"
        onFinish={onFinish}
        preserve={false}
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[{ message: "Required", required: true }]}
        >
          <Input placeholder="Name" />
        </Form.Item>

        <div className="columns-2">
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { message: "Required", required: true },
              { message: "Invalid email", type: "email" },
            ]}
          >
            <Input placeholder="Email" />
          </Form.Item>

          <Form.Item label="Phone" name="phone">
            <Input placeholder="Phone" />
          </Form.Item>
        </div>
      </Form>
    </FormDrawer>
  );
};
