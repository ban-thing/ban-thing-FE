import TabBar from "@/components/atoms/TabBar";
import ItemList from "@/components/layout/ItemList";
import { MySellButton } from "@/components/molecules/MySellButton";
import { useFetchMyPurchases, useFetchMySales } from "@/hooks/api/ItemsQuery";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";

const MyPageItemListWrap = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const MyPageBottom = styled.div`
    height: 0;
    width: 100%;
    max-width: 375px;
    position: fixed;
    bottom: 0;

    & > div {
        position: relative;
    }
`;

const tabsList = ["구매 내역", "판매 내역"];

const MyPageItemList = () => {
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const isSalePage = pathname.includes("sale");
    const { data: purchasesData, isLoading: isLoading1 } = useFetchMyPurchases();
    const { data: saleData, isLoading: isLoading2 } = useFetchMySales();

    const handleTabClick = (tab: string) => {
        if (tab === "구매 내역") navigate("/my-page/purchase-list");
        else if (tab === "판매 내역") navigate("/my-page/sale-list");
    };

    return (
        <MyPageItemListWrap>
            <TabBar
                tabsList={tabsList}
                initTab={isSalePage ? tabsList[1] : tabsList[0]}
                handleTabClick={handleTabClick}
            />
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
            <MyPageBottom>
                <div>
                    <MySellButton />
                </div>
            </MyPageBottom>
        </MyPageItemListWrap>
    );
};

export default MyPageItemList;
