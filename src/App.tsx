import "./App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Layout from "./components/layout/Layout";
import Login from "./pages/Login";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import LocationSelect from "./pages/LocationSelect";
import MyLocationSetting from "./pages/MyLocationSetting";
import ItemView from "./pages/ItemView";
import { LoadScript } from "@react-google-maps/api";

const queryClient = new QueryClient();

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        errorElement: <NotFound />,
        children: [
            { path: "", element: <Home /> },
            { path: "login", element: <Login /> },
            { path: "location-select", element: <LocationSelect /> },
            { path: "my-location-setting", element: <MyLocationSetting /> },
            { path: "item-view/:id", element: <ItemView /> },
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
        <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAP_API_KEY}>
            <QueryClientProvider client={queryClient}>
                <ReactQueryDevtools initialIsOpen={true} />
                <RouterProvider router={router} />
            </QueryClientProvider>
        </LoadScript>
    );
}

export default App;
