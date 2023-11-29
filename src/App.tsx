import { Authenticated, GitHubBanner, Refine } from "@refinedev/core";
import {
    useNotificationProvider,
    ThemedLayoutV2,
    ThemedTitleV2,
    ErrorComponent,
    RefineThemes,
} from "@refinedev/antd";
import routerProvider, {
    NavigateToResource,
    CatchAllNavigate,
    UnsavedChangesNotifier,
    DocumentTitleHandler,
} from "@refinedev/react-router-v6";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { dataProvider } from "@refinedev/supabase";
import { DashboardOutlined } from "@ant-design/icons";

import { ConfigProvider, App as AntdApp } from "antd";
import "@refinedev/antd/dist/reset.css";

import authProvider from "./authProvider";
import { supabaseClient } from "utility";
import { UserCreate, UserEdit, UserList } from "./pages/user";
import { TaskList, TaskShow, TaskCreate, TaskEdit } from "./pages/task";
import { Dashboard } from "./pages/dashboard";
import { Login } from "./pages/login";
import { Signup } from "./pages/signup";

function App() {
    return (
        <BrowserRouter>
            <ConfigProvider theme={RefineThemes.Green}>
                <AntdApp>
                    <Refine
                        dataProvider={dataProvider(supabaseClient)}
                        authProvider={authProvider}
                        routerProvider={routerProvider}
                        resources={[
                            {
                                name: "dashboard",
                                list: "/",
                                meta: {
                                    label: "Dashboard",
                                    icon: <DashboardOutlined />,
                                },
                            },
                            {
                                name: "users",
                                list: "/users",
                                edit: "/users/edit/:id",
                                show: "/users/show/:id",
                                create: "/users/create",
                            },
                            {
                                name: "tasks",
                                list: "/tasks",
                                show: "/tasks/show/:id",
                                create: "/tasks/create",
                                edit: "/tasks/edit/:id",
                            },
                        ]}
                        notificationProvider={useNotificationProvider}
                    >
                        <Routes>
                            <Route
                                element={
                                    <Authenticated
                                        fallback={
                                            <CatchAllNavigate to="/login" />
                                        }
                                    >
                                        <ThemedLayoutV2
                                            Title={({ collapsed }) => (
                                                <ThemedTitleV2
                                                    collapsed={collapsed}
                                                    text="Fixperts"
                                                    />)}
                                        >
                                            <Outlet />
                                        </ThemedLayoutV2>
                                    </Authenticated>
                                }
                            >
                                <Route index element={<Dashboard />} />


                                <Route path="users">
                                    <Route index element={<UserList />} />
                                    <Route
                                        path="edit/:id"
                                        element={<UserEdit />}
                                    />
                                    <Route
                                        path="create"
                                        element={<UserCreate />}
                                    />
                                    <Route
                                        path="show/:id"
                                        element={<UserList />}
                                    />
                                </Route>

                                <Route path="tasks">
                                    <Route index element={<TaskList />} />
                                    <Route
                                        path="edit/:id"
                                        element={<TaskEdit />}
                                    />
                                    <Route
                                        path="create"
                                        element={<TaskCreate />}
                                    />
                                    <Route
                                        path="show/:id"
                                        element={<TaskShow />}
                                    />
                                </Route>
                            </Route>

                            <Route
                                element={
                                    <Authenticated fallback={<Outlet />}>
                                        <NavigateToResource resource="users" />
                                    </Authenticated>
                                }
                            >
                                <Route path="/login" element={<Login />} />
                                <Route path="/signup" element={<Signup />} />
                            </Route>

                            <Route
                                element={
                                    <Authenticated>
                                        <ThemedLayoutV2>
                                            <Outlet />
                                        </ThemedLayoutV2>
                                    </Authenticated>
                                }
                            >
                                <Route path="*" element={<ErrorComponent />} />
                            </Route>
                        </Routes>
                        <UnsavedChangesNotifier />
                        <DocumentTitleHandler />
                    </Refine>
                </AntdApp>
            </ConfigProvider>
        </BrowserRouter>
    );
}

export default App;