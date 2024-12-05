import styled from "styled-components";
import ItemContainer from "@/components/molecules/ItemContainer";
import NoItemInList from "@/components/molecules/ItemView/NoItemInList";
import { dummyItemList } from "@/store/ItemListDummyData";

const StyledItemList = styled.div<{ height: string; padding?: string }>`
    height: ${({ height }) => (height ? height : null)};
    width: 100%;
    padding: ${({ padding }) => (padding ? padding : "50px 20px 60px")};
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
`;

type ItemListProps = {
    padding?: string;
    itemListData?: Record<string, any>[];
    viewEditButton?: boolean;
    noItemText?: string;
};

const ItemList = ({ padding, viewEditButton = false, noItemText }: ItemListProps) => {
    // TODO: 선택된 주소로 아이템 리스트 필터링
    // const { currentLocation } = useItemListLocationStore();
    // 수정삭제 모달창
    // const { isEditModalVisible, showEditModal, hideEditModal } = useEditModalStore();
    return (
        <StyledItemList height={!dummyItemList.length ? "100vh" : ""} padding={padding}>
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
                        viewEditButton={viewEditButton}
                    />
                ))
            ) : (
                <NoItemInList text={noItemText} />
            )}
        </StyledItemList>
    );
};

export default ItemList;
