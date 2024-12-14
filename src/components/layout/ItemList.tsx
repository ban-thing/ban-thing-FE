import styled from "styled-components";
import ItemContainer from "@/components/molecules/ItemContainer";
import NoItemInList from "@/components/molecules/ItemView/NoItemInList";
import ClipLoader from "react-spinners/ClipLoader";
import { useFetchItemsList } from "@/hooks/api/ItemsQuery";
import { ItemsList } from "@/types/User";
import { useState } from "react";
import { useEffect } from "react";
import { useFetchMyProfile } from "@/hooks/api/UsersQuery";
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
};

const ItemList = ({ padding, viewEditButton = false, noItemText }: ItemListProps) => {
    const [addressList, setAddressList] = useState<string[]>();
    const [listData, setListData] = useState<ItemsList[] | null>();
    const { currentLocation } = useItemListLocationStore();
    const { data: profileData, isSuccess } = useFetchMyProfile();
    const { data: { data } = {}, isLoading } = useFetchItemsList({
        keyword: "",
        hashtags: "",
        minPrice: 0,
        maxPrice: 5000000000,
        address: "",
    });
    useEffect(() => {
        if (isSuccess && profileData) {
            setAddressList([
                profileData.data.address1,
                profileData.data.address2 || "",
                profileData.data.address3 || "",
            ]);
        }
    }, [profileData, isSuccess]);

    useEffect(() => {
        if (data && addressList) {
            const filtered = data.items.filter((item) => item.address === currentLocation);
            if (!filtered) return setListData(null);
            return setListData(filtered);
        }
    }, [data, isLoading, addressList, currentLocation]);

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
                            id={item.id}
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
