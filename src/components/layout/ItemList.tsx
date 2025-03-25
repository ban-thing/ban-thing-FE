import styled from "styled-components";
import ItemContainer from "@/components/molecules/ItemContainer";
import NoItemInList from "@/components/molecules/ItemView/NoItemInList";
import ClipLoader from "react-spinners/ClipLoader";
import { ItemsList } from "@/types/User";
import { useState } from "react";
import { useEffect } from "react";
import { useItemListLocationStore } from "@/store/LocationStore";
import { useSearchHashListStore } from "@/store/SearchHashList";

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
    isMyPage?: boolean;
};

const ItemList = ({
    padding,
    viewEditButton = false,
    noItemText,
    data,
    isLoading,
    isHome = false,
    isMyPage = false,
}: ItemListProps) => {
    const { searchHashList } = useSearchHashListStore();
    const { currentLocation } = useItemListLocationStore();
    const [listData, setListData] = useState<ItemsList[] | null>();

    useEffect(() => {
        if (!data) return setListData(null);
        if (isMyPage) return setListData(data);

        let filtered = [...data];

        // 홈 메뉴일 때 지역 필터링
        if (currentLocation && isHome) {
            filtered = filtered.filter((item) => {
                const itemAddress = item.address?.replace(/\s+/g, "");
                const currentLoc = currentLocation?.replace(/\s+/g, "");

                // 전체 지역이 선택된 경우의 처리
                if (currentLoc.endsWith("전체")) {
                    const baseLocation = currentLoc.replace("전체", "");
                    return itemAddress?.includes(baseLocation);
                }

                return itemAddress?.includes(currentLoc);
            });
        }

        // 해시태그 필터링
        if (searchHashList && searchHashList.length > 0) {
            filtered = filtered.filter((item) => {
                if (!item.hashtag || !Array.isArray(item.hashtag) || item.hashtag.length === 0) {
                    return false;
                }

                return searchHashList.some((searchTag) => {
                    if (!searchTag.trim()) return true;

                    return item.hashtag?.some((itemTag) => {
                        // 임시로 객체를 문자열로 변환
                        const tagText =
                            typeof itemTag === "string" ? itemTag : JSON.stringify(itemTag);

                        const match = tagText.toLowerCase().includes(searchTag.toLowerCase());
                        return match;
                    });
                });
            });
        }

        filtered.sort((a, b) => {
            return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
        });
        setListData(filtered);
    }, [data, isLoading, currentLocation, searchHashList, isHome, isMyPage]);

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
                            images={item.itemImgs?.[0] || item.images || item.imgUrl}
                            itemId={item.itemId || item.id}
                            title={item.title}
                            price={item.price}
                            address={item.address}
                            updatedAt={item.updatedAt}
                            type={item.type}
                            status={item.status}
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
