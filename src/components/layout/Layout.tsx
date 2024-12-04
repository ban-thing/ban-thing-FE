import { Outlet, useLocation } from "react-router-dom";
import { LayoutBox } from "../atoms/LayoutBox";

const Layout = () => {
    const location = useLocation();

    // 특정경로에서 max-width 미설정
    // TODO: 로그인창 max width 문의
    const pagesWithoutMaxWidth =
        location.pathname.startsWith("/login") || location.pathname.startsWith("/item-register");

    return (
        <LayoutBox $nullMaxWidth={pagesWithoutMaxWidth}>
            <Outlet />
        </LayoutBox>
    );
};

export default Layout;
