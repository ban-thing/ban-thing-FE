import { Input } from "@/components/atoms/Input";
import NavigationBar from "@/components/atoms/NavigationBar";
import styled from "styled-components";
import SearchIcon from "@/assets/icons/searchIcon.svg?react";
import FootprintIcon from "@/assets/icons/footPrintBackground.svg?react";
import HashTagIcon from "@/assets/icons/hashtag.svg?react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useHashtagFilterModalStore } from "@/store/ModalStore";
import HashtagFilterModal from "@/components/molecules/HashtagFilterModal";
import { useSearchHashListStore } from "@/store/SearchHashList";
import HashTagButtonWithCloseList from "../molecules/ItemRegister/HashTagButtonWithCloseList";

export default function SearchLayout() {
    const navigate = useNavigate();
    const [searchValue, setSearchValue] = useState("");
    const { showHashtagFilterModal, isHashtagFilterModalVisible } = useHashtagFilterModalStore();
    const { searchHashList, setSearchHashList } = useSearchHashListStore();

    const onClickHashTagButton = () => {
        showHashtagFilterModal();
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(event.target.value);
    };

    const handleSearchClick = () => {
        if (searchValue.trim() !== "") {
            navigate("/search-result", {
                state: { searchKeyword: searchValue.trim() },
            });
            setSearchValue("");
        }
    };

    const handleSetValue = (name: string, value: string[]) => {
        name.trim();
        setSearchHashList(value);
    };

    return (
        <SearchContainer>
            <SearchHeader>
                <SearchWrapper>
                    <SearchInputWrapper>
                        <SearchIcon onClick={handleSearchClick} />
                        <Input
                            placeholder="검색어를 입력해요."
                            required
                            minLength={1}
                            value={searchValue}
                            onChange={handleInputChange}
                            onKeyDown={(event) => {
                                if (event.key === "Enter") {
                                    handleSearchClick();
                                }
                            }}
                        />
                    </SearchInputWrapper>
                </SearchWrapper>
                <HashTagArea>
                    <HashTagListWrapper>
                        {searchHashList && searchHashList.length > 0 && (
                            <HashTagButtonWithCloseList
                                hashList={searchHashList}
                                setValue={handleSetValue}
                                margin="0"
                            />
                        )}
                    </HashTagListWrapper>
                    <HashTagButton onClick={onClickHashTagButton}>
                        <HashTagIcon />
                        태그 검색
                    </HashTagButton>
                </HashTagArea>
                {isHashtagFilterModalVisible && <HashtagFilterModal />}
            </SearchHeader>

            <ScrollContent>
                <CenterIcon>
                    <FootprintIcon />
                </CenterIcon>
            </ScrollContent>
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
`;

const SearchHeader = styled.div`
    position: fixed;
    top: 0;
    width: 375px;
    background-color: #fff;
    z-index: 10;
    padding: 0 20px;
    box-sizing: border-box;
`;

const ScrollContent = styled.div`
    margin-top: 80px;
    flex: 1;
    overflow-y: auto;
    position: relative;
`;

const CenterIcon = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    svg {
        width: 118px;
        height: 118px;
    }
`;
const SearchWrapper = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    gap: 8px;
    max-width: 335px;
    height: auto;
    width: 100%;
`;
const SearchInputWrapper = styled.div`
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 335px;
    transition: width 0.3s ease;
    height: 66px;

    svg {
        position: absolute;
        right: 16px;
        top: 50%;
        transform: translateY(-50%);
        color: #999;
        cursor: pointer;
    }
`;

const HashTagArea = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
    width: 100%;
    height: 52px;
`;

const HashTagButton = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid var(--color-main-1);
    color: var(--color-main-1);
    background: rgba(198, 212, 255, 0.3);
    padding: 4px 8px;
    border-radius: 24px;
    font-size: 12px;
    font-weight: 500;
    cursor: pointer;
    gap: 3px;
    margin-left: auto;

    svg {
        width: 18px;
        height: 18px;
    }

    svg path {
        fill: var(--color-main-1);
    }
`;

const HashTagListWrapper = styled.div`
    flex: 1;
    overflow-x: auto;
    display: flex;
    align-items: center;
    &::-webkit-scrollbar {
        display: none;
    }
`;
