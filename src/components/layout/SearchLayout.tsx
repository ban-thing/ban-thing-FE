import { Input } from "@/components/atoms/Input";
import NavigationBar from "@/components/atoms/NavigationBar";
import styled from "styled-components";
import SearchIcon from "@/assets/icons/search.svg?react";
import FootprintIcon from "@/assets/icons/footPrintBackground.svg?react";
import HashTagIcon from "@/assets/icons/hashtag.svg?react";
import { useNavigate } from "react-router-dom";
import { ItemFilterButton } from "../atoms/Button";
import { useState } from "react";

export default function SearchLayout({ children }: { children: React.ReactNode }) {
    const navigate = useNavigate();
    const [isSearching, setIsSearching] = useState(false);

    const onClickHashTagButton = () => {
        navigate("/search/hashtag");
    };

    const handleSearchClick = () => {
        setIsSearching(true);
    };

    return (
        <SearchContainer>
            <SearchWrapper>
                <SearchInputWrapper $isSearching={isSearching}>
                    <SearchIcon onClick={handleSearchClick} />
                    <Input placeholder="검색어를 입력해요." required minLength={1} />
                </SearchInputWrapper>
                {isSearching && <ItemFilterButton />}
            </SearchWrapper>
            <HashTagButton onClick={onClickHashTagButton}>
                <HashTagIcon />
                태그 검색
            </HashTagButton>
            {isSearching && children}

            <CenterIcon>
                <FootprintIcon />
            </CenterIcon>

            <NavigationBar />
        </SearchContainer>
    );
}
const SearchContainer = styled.div`
    width: 100%;
    min-height: 100vh;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const CenterIcon = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    svg {
        width: 118px;
        height: 118px;
    }
`;
const SearchWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
    max-width: 335px;
    height: 100px;
`;

const SearchInputWrapper = styled.div<{ $isSearching: boolean }>`
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: ${(props) => (props.$isSearching ? "275px" : "335px")};
    transition: width 0.3s ease;
    height: 100px;

    svg {
        position: absolute;
        right: 16px;
        top: 50%;
        transform: translateY(-50%);
        color: #999;
        cursor: pointer;
    }
`;
const HashTagButton = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: auto;
    border: 1px solid var(--color-main-1);
    color: var(--color-main-1);
    background: rgba(198, 212, 255, 0.3);
    padding: 4px 8px;
    border-radius: 24px;
    font-size: 12px;
    font-weight: 500;
    cursor: pointer;
    gap: 3px;
    margin-right: 16px;

    svg {
        width: 18px;
        height: 18px;
    }

    svg path {
        fill: var(--color-main-1);
    }
`;
