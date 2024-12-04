import styled from "styled-components";
import ItemContainer from "@/components/molecules/ItemContainer";
import NoItemInList from "@/components/molecules/ItemView/noItemInList";
import { dummyItemList } from "@/store/ITemListDummyData";

const StyledItemList = styled.div<{ height: string }>`
    height: ${({ height }) => (height ? height : null)};
    width: 100%;
    padding: 50px 20px 60px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
`;

const ItemList = () => {
    // 선택된 주소로 아이템 리스트 필터링
    // const { currentLocation } = useItemListLocationStore();
    return (
        <StyledItemList height={!dummyItemList.length ? "100vh" : ""}>
            {dummyItemList.length ? (
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
                    />
                ))
            ) : (
                <NoItemInList />
            )}
        </StyledItemList>
    );
};

export default ItemList;
