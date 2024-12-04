import { Input } from "@/components/atoms/Input";
import styled from "styled-components";
import SearchIcon from "@/assets/icons/search.svg?react";
// import HashTagIcon from "@/assets/icons/hashtag.svg?react";
import { useNavigate } from "react-router-dom";
import { ItemFilterButton, ItemPlusButton } from "@/components/atoms/Button";
import ItemList from "@/components/layout/ItemList";
import { useFilterModalStore } from "@/store/ModalStore";
import FilterModal from "@/components/molecules/FilterModal";

export default function SearchResult() {
    const navigate = useNavigate();
    const { showFilterModal } = useFilterModalStore();
    const { isFilterModalVisible } = useFilterModalStore();

    const onClickHashTagButton = () => {
        navigate("/search/hashtag");
    };

    return (
        <SearchContainer>
            <SearchHeader>
                <SearchWrapper>
                    <SearchInputWrapper>
                        <SearchIcon />
                        <Input placeholder="검색어를 입력해요." required minLength={1} />
                    </SearchInputWrapper>
                    <ItemFilterButton onClick={showFilterModal} />
                </SearchWrapper>
                <ItemPlusButton width="26px" height="26px" onClick={onClickHashTagButton} />
                {isFilterModalVisible && <FilterModal />}
            </SearchHeader>
            <ScrollContent>
                <ItemList />
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
    margin-top: 80px;
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
    height: 100px;
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
// const HashTagButton = styled.div`
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     width: 66px;
//     border: 1px solid var(--color-main-1);
//     color: var(--color-main-1);
//     background: rgba(198, 212, 255, 0.3);
//     padding: 4px 8px;
//     border-radius: 24px;
//     font-size: 12px;
//     font-weight: 500;
//     cursor: pointer;
//     gap: 3px;
//     margin-left: auto;

//     svg {
//         width: 18px;
//         height: 18px;
//     }

//     svg path {
//         fill: var(--color-main-1);
//     }
// `;
