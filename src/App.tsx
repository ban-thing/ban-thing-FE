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
import ItemRegister from "./pages/ItemRegister/ItemRegister";
import { LoadScript } from "@react-google-maps/api";
import Search from "./pages/Search";
import SearchHashtag from "./pages/SearchHashtag";
import SearchResult from "./pages/SearchResult";
import MyPage from "./pages/MyPage/MyPage";
import MyPageEdit from "./pages/MyPage/MyPageEdit";
import MyPageLayout from "./pages/MyPage/MyPageLayout";
import MyPageItemList from "./pages/MyPage/MyPageItemList";
import MyPageTerms from "./pages/MyPage/MyPageTerms";
import ChattingList from "./pages/ChattingList";
import Chatting from "./pages/Chatting";

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
            { path: "chatting-list", element: <ChattingList /> },
            { path: "chatting/:id", element: <Chatting /> },
            { path: "item-register", element: <ItemRegister /> },
            { path: "search", element: <Search /> },
            { path: "search/hashtag", element: <SearchHashtag /> },
            { path: "search-result", element: <SearchResult /> },
            {
                path: "my-page",
                element: <MyPageLayout />,
                errorElement: <NotFound />,
                children: [
                    { path: "", element: <MyPage /> },
                    { path: "edit", element: <MyPageEdit /> },
                    { path: "purchase-list", element: <MyPageItemList /> },
                    { path: "sale-list", element: <MyPageItemList /> },
                    { path: "terms-of-use", element: <MyPageTerms /> },
                    { path: "personal-info", element: <MyPageTerms /> },
                    { path: "location-based", element: <MyPageTerms /> },
                    { path: "version-info", element: <MyPageTerms /> },
                ],
            },
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
