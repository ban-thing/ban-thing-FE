import { PageTitle } from "@/components/atoms/PageTitle";
import { useLocation } from "react-router-dom";

const termsTitles = ["이용약관", "개인정보", "위치기반", "버전정보"];
const termsUrls = ["terms-of-use", "personal-info", "location-based", "version-info"];

const MyPageTerms = () => {
    const { pathname } = useLocation();
    const pageType = termsUrls.find((url) => pathname.includes(url)) as string;

    return (
        <div>
            {/* TODO: 화살표추가 */}
            <PageTitle>{termsTitles[termsUrls.indexOf(pageType)]}</PageTitle>
            text contents
        </div>
    );
};

export default MyPageTerms;
