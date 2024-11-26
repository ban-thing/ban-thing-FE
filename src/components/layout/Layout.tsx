import { Outlet } from "react-router-dom";
import { LayoutBox } from "../atoms/LayoutBox";

const Layout = () => {
    return (
        <LayoutBox>
            <Outlet />
        </LayoutBox>
    );
};

export default Layout;
