import { IResourceComponentsProps } from "@refinedev/core";

import { useForm, Edit } from "@refinedev/antd";

import { Form, Input } from "antd";

import { IAuthUser } from "interfaces";

export const UserEdit: React.FC<IResourceComponentsProps> = () => {
    const { formProps, saveButtonProps } = useForm<IAuthUser>({
        resource: "users",
    });

    return (
        <Edit saveButtonProps={saveButtonProps}>
            <Form {...formProps} wrapperCol={{ span: 12 }} layout="vertical">
            <Form.Item label="Email" name="email">
                    <Input />
                </Form.Item>
            </Form>
        </Edit>
    );
};
