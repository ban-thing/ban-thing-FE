import { Input } from "@/components/atoms/Input";
import styled from "styled-components";
import SearchIcon from "@/assets/icons/search.svg?react";
import { useNavigate } from "react-router-dom";
import { ItemFilterButton, ItemPlusButton } from "@/components/atoms/Button";
import ItemList from "@/components/layout/ItemList";
import { useFilterModalStore } from "@/store/ModalStore";
import FilterModal from "@/components/molecules/FilterModal";
import { useSearchHashListStore } from "@/store/SearchHashList";
import { useForm, UseFormSetValue, FieldValues } from "react-hook-form";
import HashTagButtonWithCloseList from "@/components/molecules/ItemRegister/HashTagButtonWithCloseList";
import { useState } from "react";
import NoItemInList from "@/components/molecules/ItemView/NoItemInList";
import { dummyItemList } from "@/store/ItemListDummyData";

export default function SearchResult() {
    const navigate = useNavigate();
    const { showFilterModal } = useFilterModalStore();
    const { isFilterModalVisible } = useFilterModalStore();
    const { searchHashList, setSearchHashList } = useSearchHashListStore();
    const { setValue } = useForm();
    const [searchValue, setSearchValue] = useState("");

    const handleSetValue: UseFormSetValue<FieldValues> = (name, value) => {
        if (name === "hashtags") {
            setSearchHashList(value);
        }
        setValue(name, value);
    };

    const onClickHashTagButton = () => {
        navigate("/search/hashtag");
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(event.target.value);
    };
    const handleSearchClick = () => {
        if (searchValue.trim() !== "") {
            setSearchValue("");
        }
    };
    const isMaxTags = searchHashList.length >= 5;

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
                        />
                    </SearchInputWrapper>
                    <ItemFilterButton onClick={showFilterModal} />
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
                    {!isMaxTags && (
                        <ItemPlusButton width="26px" height="26px" onClick={onClickHashTagButton} />
                    )}
                </HashTagArea>
                {isFilterModalVisible && <FilterModal />}
            </SearchHeader>
            <ScrollContent>
                {dummyItemList.length ? <ItemList /> : <NoItemInList text="앗! 검색된 결과가 없어요." />}
            </ScrollContent>
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
    width: 100%;
    height: 100%;
    margin-top: ${dummyItemList.length ? "68px" : "0"};
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 1;
    overflow-y: auto;
    position: relative;
`;

const SearchWrapper = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    gap: 8px;
    max-width: 335px;
    height: 66px;
    width: 100%;
`;
const SearchInputWrapper = styled.div`
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 275px;
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

const HashTagArea = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
    width: 100%;
    height: 52px;
`;

const HashTagListWrapper = styled.div`
    flex: 1;
    overflow-x: auto;
    &::-webkit-scrollbar {
        display: none;
    }
`;
