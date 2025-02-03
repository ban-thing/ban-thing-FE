import styled from "styled-components";
import ItemList from "@/components/layout/ItemList";
import { useFetchMyPurchases, useFetchMySales } from "@/hooks/api/ItemsQuery";
import { useLocation } from "react-router-dom";
import { PageTitleWithBackButton } from "@/components/atoms/PageTitle";

const MyPageFavoriteList = () => {
    const { pathname } = useLocation();
    const isSalePage = pathname.includes("sale");
    const { data: purchasesData, isLoading: isLoading1 } = useFetchMyPurchases();
    const { data: saleData, isLoading: isLoading2 } = useFetchMySales();

    return (
        <MyPageItemListWrap>
            <PageTitleWithBackButton text="나의 찜" $margin="10px 0" backTo="/my-page" />
            {isSalePage ? (
                <ItemList
                    data={saleData?.data}
                    isLoading={isLoading2}
                    padding="0 20px"
                    viewEditButton={true}
                    noItemText="앗! 아직 내역이 없어요."
                    isMyPage={true}
                />
            ) : (
                <ItemList
                    data={purchasesData?.data}
                    isLoading={isLoading1}
                    padding="0 20px"
                    viewEditButton={false}
                    noItemText="앗! 아직 내역이 없어요."
                    isMyPage={true}
                />
            )}
        </MyPageItemListWrap>
    );
};

export default MyPageFavoriteList;

const MyPageItemListWrap = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;
