import LocationBased from "@/components/molecules/MyPage.tsx/TermsText/LocationBased";
import PersonalInfo from "@/components/molecules/MyPage.tsx/TermsText/PersonalInfo";
import TermsOfUse from "@/components/molecules/MyPage.tsx/TermsText/TermsOfUse";
import OpenSource from "@/components/molecules/MyPage.tsx/TermsText/OpenSource";
import { useLocation } from "react-router-dom";

const termsUrls = ["terms-of-use", "personal-info", "location-based", "open-source"];

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
        case "open-source":
            content = <OpenSource />;
            break;
        default:
            <TermsOfUse />;
            break;
    }

    return <div style={{ padding: "0 20px" }}>{content}</div>;
};

export default MyPageTerms;
