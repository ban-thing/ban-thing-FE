import LocationBased from "@/components/molecules/MyPage.tsx/TermsText/LocationBased";
import PersonalInfo from "@/components/molecules/MyPage.tsx/TermsText/PersonalInfo";
import TermsOfUse from "@/components/molecules/MyPage.tsx/TermsText/TermsOfUse";
import VersionInfo from "@/components/molecules/MyPage.tsx/TermsText/VersionInfo";
import { useLocation } from "react-router-dom";

const termsUrls = ["terms-of-use", "personal-info", "location-based", "version-info"];

const MyPageTerms = () => {
    const { pathname } = useLocation();
    const pageType = termsUrls.find((url) => pathname.includes(url)) as string;

    let content = <TermsOfUse />;
    switch (pageType) {
        case "personal-info":
            content = <PersonalInfo />;
            break;
        case "location-based":
            content = <LocationBased />;
            break;
        case "version-info":
            content = <VersionInfo />;
            break;
        default:
            <TermsOfUse />;
            break;
    }

    return <div style={{ padding: "0 20px" }}>{content}</div>;
};

export default MyPageTerms;
