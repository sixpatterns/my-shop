import { Button, Form, Input } from "antd";
import { useNavigate } from "react-router";

import { useSessionCreate } from "../../api";
import { SessionCreateInput } from "../../api/base";
import { useSessionStore } from "../../stores/useSessionStore";

const Login = () => {
  const navigate = useNavigate();

  const create = useSessionStore((i) => i.create);

  const sessionCreate = useSessionCreate();

  const onFinish = async (attributes: SessionCreateInput) => {
    const session = (await sessionCreate.mutateAsync({ input: attributes }))
      .sessionCreate;

    create(session);

    navigate("/", { replace: true });
  };

  return (
    <div className="flex min-h-dvh flex-col justify-center p-4">
      <div className="mx-auto w-full max-w-md rounded-2xl border border-neutral-200 bg-white p-7 shadow-2xl shadow-neutral-200">
        <h1 className="text-2xl font-semibold text-neutral-900">Sign in</h1>

        <p className="mt-2 text-sm text-neutral-600">
          Login to the portal with your email and password.
        </p>

        <Form className="mt-6 space-y-6" layout="vertical" onFinish={onFinish}>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ message: "Required", required: true }]}
          >
            <Input placeholder="your@example.com" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ message: "Required", required: true }]}
          >
            <Input placeholder="Password" type="password" />
          </Form.Item>

          <Form.Item>
            <Button
              block
              htmlType="submit"
              loading={sessionCreate.isPending}
              type="primary"
            >
              Sign in
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
