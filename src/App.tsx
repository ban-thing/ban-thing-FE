import "./App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();

const router = createBrowserRouter([
    {
        path: "/",
        element: <Outlet />,
        // errorElement: <NotFound />,
        children: [
            { path: "login" /* element: <Login /> */ },
            { path: "location-select" },
            { path: "my-location-setting" },
            { path: "" },
            { path: "item-view/:id" },
            { path: "chatting-list" },
            { path: "chatting/:id" },
            { path: "item-register" },
            { path: "item-register/hashtag" },
            { path: "item-register/direct" },
            { path: "search" },
            { path: "search/hashtag" },
            { path: "search-result" },
            { path: "my-page" },
            { path: "my-page/edit" },
            { path: "my-page/purchase-list" },
            { path: "my-page/sale-list" },
        ],
    },
]);

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <ReactQueryDevtools initialIsOpen={true} />
            <RouterProvider router={router} />
            <div>Hello World</div>
        </QueryClientProvider>
    );
}

export default App;
