import { IResourceComponentsProps } from "@refinedev/core";

import { useForm, Create } from "@refinedev/antd";

import { Form, Input } from "antd";

import { IAuthUser } from "interfaces";

export const UserCreate: React.FC<IResourceComponentsProps> = () => {
    const { formProps, saveButtonProps } = useForm<IAuthUser>();

    return (
        <Create saveButtonProps={saveButtonProps}>
            <Form {...formProps} wrapperCol={{ span: 12 }} layout="vertical">
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
            </Form>
        </Create>
    );
};
