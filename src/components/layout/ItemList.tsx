import styled from "styled-components";
import ItemContainer from "@/components/molecules/ItemContainer";
import NoItemInList from "@/components/molecules/ItemView/NoItemInList";
import ClipLoader from "react-spinners/ClipLoader";
import { ItemsList } from "@/types/User";
import { useState } from "react";
import { useEffect } from "react";
import { useItemListLocationStore } from "@/store/LocationStore";

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
    data: ItemsList[] | undefined;
    isLoading: boolean;
    isHome?: boolean;
};

const ItemList = ({
    padding,
    viewEditButton = false,
    noItemText,
    data,
    isLoading,
    isHome = false,
}: ItemListProps) => {
    const { currentLocation } = useItemListLocationStore();
    const [listData, setListData] = useState<ItemsList[] | null>();

    useEffect(() => {
        // 홈 메뉴일 때만 지역 필터링
        if (data && currentLocation && isHome) {
            const filtered = data?.filter((item) => item.address === currentLocation);
            if (!filtered) return setListData(null);
            return setListData(filtered);
        }
        if (data) {
            return setListData(data);
        }
    }, [data, isLoading, currentLocation]);

    return (
        <StyledItemList
            height={isLoading ? "100vh" : listData?.length ? "" : "100vh"}
            padding={padding}
        >
            {!isLoading ? ( // 로딩중/로딩끝
                listData?.length ? ( // 로딩끝나고 목록 데이터 있을 때/없을 때
                    listData?.map((item, index) => (
                        <ItemContainer
                            key={index}
                            images={item.images}
                            itemId={item.itemId || item.id}
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
