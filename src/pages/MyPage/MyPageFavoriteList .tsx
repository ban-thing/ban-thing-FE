import styled from "styled-components";
import ItemList from "@/components/layout/ItemList";
import { useFetchWishlist } from "@/hooks/api/UsersQuery";
import { PageTitleWithBackButton } from "@/components/atoms/PageTitle";

const MyPageFavoriteList = () => {
    const { data: wishlistData, isLoading } = useFetchWishlist();

    return (
        <MyPageItemListWrap>
            <PageTitleWithBackButton text="나의 찜" $margin="10px 0" backTo="/my-page" />
            <ItemList
                data={wishlistData?.data}
                isLoading={isLoading}
                padding="0 20px"
                viewEditButton={false}
                noItemText="앗! 아직 찜한 상품이 없어요."
                isMyPage={true}
            />
        </MyPageItemListWrap>
    );
};

export default MyPageFavoriteList;

const MyPageItemListWrap = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;
