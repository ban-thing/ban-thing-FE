import { Outlet, useLocation } from "react-router-dom";
import { LayoutBox } from "../atoms/LayoutBox";

const Layout = () => {
    const location = useLocation();

    // 특정경로에서 max-width 미설정
    const pagesWithoutMaxWidth =
        location.pathname.startsWith("/login") ||
        location.pathname.startsWith("/item-register") ||
        location.pathname.startsWith("/splash");

    return (
        <LayoutBox $nullMaxWidth={pagesWithoutMaxWidth}>
            <Outlet />
        </LayoutBox>
    );
};

export default Layout;
