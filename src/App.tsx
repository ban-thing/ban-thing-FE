import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import "react-loading-skeleton/dist/skeleton.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { CookiesProvider } from "react-cookie";
import Layout from "./components/layout/Layout";
import Login from "./pages/Login";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import LocationSelect from "./pages/LocationSelect";
import MyLocationSetting from "./pages/MyLocationSetting";
import ItemView from "./pages/ItemView";
import ItemRegister from "./pages/ItemRegister/ItemRegister";
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
import SplashWrap from "./pages/SplashWrap";
import LoginRedirect from "./pages/LoginRedirect";
import PrivateRoute from "./components/auth/PrivateRoute";
import MyPageFavoriteList from "./pages/MyPage/MyPageFavoriteList ";
import MyPageCancelMembership from "./pages/MyPage/MyPageCancelMembership";
import MyPageCancelNotice from "./pages/MyPage/MyPageCancelNotice";
import MyPageCancelOther from "./pages/MyPage/MyPageCancelOther";
import ReportReason from "./pages/ReportReason/ReportReason";
import ReportReasonAdvertisement from "./pages/ReportReason/ReportReasonAdvertisement";
import ReportReasonInaccurateInfo from "./pages/ReportReason/ReportReasonInaccurateInfo";
import ReportReasonProhibitedItem from "./pages/ReportReason/ReportReasonProhibitedItem";
import ReportReasonRefuseSafeTransaction from "./pages/ReportReason/ReportReasonRefuseSafeTransaction";
import ReportReasonSuspectedFraud from "./pages/ReportReason/ReportReasonSuspectedFraud";
import ReportReasonProfessionalSeller from "./pages/ReportReason/ReportReasonProfessionalSeller ";
import ReportReasonOffensiveContent from "./pages/ReportReason/ReportReasonOffensiveContent";

const queryClient = new QueryClient();

const router = createBrowserRouter([
    {
        path: "/",
        element: (
            <SplashWrap>
                <Layout />
            </SplashWrap>
        ),
        errorElement: <NotFound />,
        children: [
            { path: "", element: <Home /> },
            { path: "login", element: <Login /> },
            { path: "login/kakao", element: <LoginRedirect /> },
            {
                path: "location-select",
                element: (
                    <PrivateRoute>
                        <LocationSelect />
                    </PrivateRoute>
                ),
            },
            {
                path: "my-location-setting",
                element: (
                    <PrivateRoute>
                        <MyLocationSetting />
                    </PrivateRoute>
                ),
            },
            { path: "item-view/:id", element: <ItemView /> },
            {
                path: "chatting-list",
                element: (
                    <PrivateRoute>
                        <ChattingList />
                    </PrivateRoute>
                ),
            },
            {
                path: "chats/:chatRoomId",
                element: (
                    <PrivateRoute>
                        <Chatting />
                    </PrivateRoute>
                ),
            },
            {
                path: "item-register",
                element: (
                    <PrivateRoute>
                        <ItemRegister />
                    </PrivateRoute>
                ),
            },
            { path: "search", element: <Search /> },
            { path: "search/hashtag", element: <SearchHashtag /> },
            { path: "search-result", element: <SearchResult /> },
            {
                path: "my-page",
                element: (
                    <PrivateRoute>
                        <MyPageLayout />
                    </PrivateRoute>
                ),
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
                    { path: "account-setting", element: <MyPageTerms /> },
                    { path: "favorite-list", element: <MyPageFavoriteList /> },
                    { path: "cancel-membership", element: <MyPageCancelMembership /> },
                    { path: "cancel-notice", element: <MyPageCancelNotice /> },
                    { path: "cancel-other", element: <MyPageCancelOther /> },
                ],
            },
            { path: "report-reason", element: <ReportReason /> },
            { path: "report-reason/advertisement", element: <ReportReasonAdvertisement /> },
            { path: "report-reason/inaccurate-info", element: <ReportReasonInaccurateInfo /> },
            { path: "report-reason/prohibited-item", element: <ReportReasonProhibitedItem /> },
            {
                path: "report-reason/refuse-safe-transaction",
                element: <ReportReasonRefuseSafeTransaction />,
            },
            { path: "report-reason/suspected-fraud", element: <ReportReasonSuspectedFraud /> },
            {
                path: "report-reason/professional-seller",
                element: <ReportReasonProfessionalSeller />,
            },
            { path: "report-reason/offensive-content", element: <ReportReasonOffensiveContent /> },
        ],
    },
]);

function App() {
    return (
        <CookiesProvider>
            <QueryClientProvider client={queryClient}>
                {/* <ReactQueryDevtools initialIsOpen={true} /> */}
                <RouterProvider router={router} />
            </QueryClientProvider>
        </CookiesProvider>
    );
}

export default App;
