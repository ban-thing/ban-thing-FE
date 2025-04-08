import { Input } from "@/components/atoms/Input";
import styled from "styled-components";
import SearchIcon from "@/assets/icons/searchIcon.svg?react";
import { useLocation } from "react-router-dom";
import { ItemFilterButton, ItemPlusButton } from "@/components/atoms/Button";
import ItemList from "@/components/layout/ItemList";
import { useFilterModalStore, useHashtagFilterModalStore } from "@/store/ModalStore";
import FilterModal from "@/components/molecules/FilterModal";
import { useSearchHashListStore } from "@/store/SearchHashList";
import { useForm, UseFormSetValue, FieldValues } from "react-hook-form";
import HashTagButtonWithCloseList from "@/components/molecules/ItemRegister/HashTagButtonWithCloseList";
import { useEffect, useState } from "react";
import { useFetchItemsList } from "@/hooks/api/ItemsQuery";
import HashtagFilterModal from "@/components/molecules/HashtagFilterModal";
import { useFetchMyProfile } from "@/hooks/api/UsersQuery";
import { useSelectedAddressStore } from "@/store/SelectedAddressStore";

export default function SearchResult() {
    const location = useLocation();
    const { showFilterModal } = useFilterModalStore();
    const { showHashtagFilterModal, isHashtagFilterModalVisible } = useHashtagFilterModalStore();
    const { isFilterModalVisible } = useFilterModalStore();
    const { priceRange } = useFilterModalStore();
    const { searchHashList, setSearchHashList } = useSearchHashListStore();
    const { setValue } = useForm();
    const [searchValue, setSearchValue] = useState(location.state?.searchKeyword || "");
    const [searchKeyword, setSearchKeyword] = useState(location.state?.searchKeyword || "");
    const { data: profileData } = useFetchMyProfile();
    const { selectedAddress } = useSelectedAddressStore();

    const searchParams = {
        keyword: searchKeyword,
        hashtags: searchHashList.join(","),
        minPrice: priceRange.minPrice,
        maxPrice: priceRange.maxPrice,
        address: selectedAddress || profileData?.data?.address1 || "",
    };

    const { data: { data } = {}, isLoading, refetch } = useFetchItemsList(searchParams);

    const handleSetValue: UseFormSetValue<FieldValues> = (name, value) => {
        if (name === "hashtags") {
            setSearchHashList(value);
        }
        setValue(name, value);
    };

    const onClickHashTagButton = () => {
        showHashtagFilterModal();
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(event.target.value);
    };

    const handleSearch = () => {
        if (searchValue.trim() !== "") {
            setSearchKeyword(searchValue.trim());
            setSearchValue("");
        }
    };

    useEffect(() => {
        if (location.state?.searchKeyword) {
            setSearchKeyword(location.state.searchKeyword);
        }
    }, [location.state]);

    useEffect(() => {
        refetch();
    }, [searchKeyword, searchHashList, priceRange, refetch]);

    useEffect(() => {
        if (location.state?.fromHashtag) {
            refetch();
        }
    }, [location.state, refetch]);

    const isMaxTags = searchHashList.length >= 5;

    return (
        <SearchContainer>
            <SearchHeader>
                <SearchWrapper>
                    <SearchInputWrapper>
                        <SearchIcon onClick={handleSearch} />
                        <Input
                            placeholder="검색어를 입력해요."
                            required
                            minLength={1}
                            value={searchValue}
                            onChange={handleInputChange}
                            onKeyPress={(event) => {
                                if (event.key === "Enter") {
                                    handleSearch();
                                }
                            }}
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
                {isHashtagFilterModalVisible && <HashtagFilterModal />}
                {isFilterModalVisible && <FilterModal />}
            </SearchHeader>
            <ScrollContent>
                <ItemList
                    data={data?.items}
                    isLoading={isLoading}
                    noItemText={
                        searchKeyword || searchHashList.length > 0
                            ? "검색 결과가 없습니다."
                            : "검색어를 입력해요."
                    }
                />
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
    padding-top: 72px;
    flex: 1;
    overflow-y: auto;
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
