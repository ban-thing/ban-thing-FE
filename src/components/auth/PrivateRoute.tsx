import { Navigate, useLocation } from "react-router-dom";
import { getCookie } from "@/utils/Cookie";

interface PrivateRouteProps {
    children: React.ReactNode;
}

export default function PrivateRoute({ children }: PrivateRouteProps) {
    const authCookie = getCookie("Authorization");
    const location = useLocation();

    if (!authCookie) {
        // 현재 시도한 경로를 state로 전달
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return <>{children}</>;
}
