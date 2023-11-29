import React from "react";
import { IResourceComponentsProps } from "@refinedev/core";

import { useTable, List, ShowButton, EditButton, DeleteButton } from "@refinedev/antd";

import { Space, Table } from "antd";

import { IAuthUser, ITask } from "interfaces";

export const UserList: React.FC<IResourceComponentsProps> = () => {
    const { tableProps } = useTable<IAuthUser>();

    return (
        <List>
            <Table {...tableProps} rowKey="id">
                <Table.Column dataIndex="email" title="Email" />
                <Table.Column dataIndex="id" title="ID" />
                <Table.Column<ITask>
                            title="Actions"
                            dataIndex="actions"
                            render={(_, record): React.ReactNode => {
                                return (
                                    <Space>
                                        <EditButton
                                            size="small"
                                            recordItemId={record.id}
                                            hideText
                                        />
                                        <DeleteButton
                                            size="small"
                                            recordItemId={record.id}
                                            hideText
                                        />
                                    </Space>
                                );
                            }}
                        />
            </Table>
        </List>
    );
};


