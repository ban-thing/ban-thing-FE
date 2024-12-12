import styled from "styled-components";
import ItemContainer from "@/components/molecules/ItemContainer";
import NoItemInList from "@/components/molecules/ItemView/NoItemInList";
import { dummyItemList } from "@/store/ItemListDummyData";
import ClipLoader from "react-spinners/ClipLoader";
import { useFetchItemsList } from "@/hooks/api/ItemsQuery";

const StyledItemList = styled.div<{ height: string; padding?: string }>`
    height: ${({ height }) => (height ? height : null)};
    width: 100%;
    max-width: 375px;
    padding: ${({ padding }) => (padding ? padding : "50px 20px 60px")};
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

type ItemListProps = {
    padding?: string;
    itemListData?: Record<string, any>[];
    viewEditButton?: boolean;
    noItemText?: string;
};

const ItemList = ({ padding, viewEditButton = false, noItemText }: ItemListProps) => {
    const { data, error, isLoading } = useFetchItemsList({
        keyword: "머신",
        hashtags: "",
        minPrice: 1000,
        maxPrice: 30000,
        address: "파주",
    });
    // TODO: 선택된 주소로 아이템 리스트 필터링
    // const { currentLocation } = useItemListLocationStore();
    // 스피너
    // const isLoading = false;
    return (
        <StyledItemList
            height={isLoading ? "100vh" : dummyItemList.length ? "" : "100vh"}
            padding={padding}
        >
            {!isLoading ? ( //로딩중/로딩끝
                dummyItemList.length ? ( //로딩끝나고 목록 데이터 있을 때/없을 때
                    dummyItemList?.map((item, index) => (
                        <ItemContainer
                            key={index}
                            imgUrl={item.imgUrl}
                            itemId={item.itemId}
                            title={item.title}
                            price={item.price}
                            address={item.address}
                            updatedAt={item.updatedAt}
                            type={item.type}
                            viewEditButton={viewEditButton}
                        />
                    ))
                ) : (
                    <NoItemInList text={noItemText} />
                )
            ) : (
                <ClipLoader size={48} color="#d7d7d7" />
            )}
        </StyledItemList>
    );
};

export default ItemList;
