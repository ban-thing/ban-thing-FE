import { MySellButton } from "@/components/atoms/Button";
import TabBar from "@/components/atoms/TabBar";
import ItemList from "@/components/layout/ItemList";
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

    const handleTabClick = (tab: string) => {
        if (tab === "구매 내역") navigate("/my-page/purchase-list");
        else if (tab === "판매 내역") navigate("/my-page/sale-list");
    };

    const onClickSellButton = () => {
        navigate("/item-register");
    };

    return (
        <MyPageItemListWrap>
            <TabBar
                tabsList={tabsList}
                initTab={isSalePage ? tabsList[1] : tabsList[0]}
                handleTabClick={handleTabClick}
            />
            <ItemList padding="0 20px" viewEditButton={true} noItemText="앗! 아직 내역이 없어요." />
            <MyPageBottom>
                <div>
                    <MySellButton onClick={onClickSellButton} />
                </div>
            </MyPageBottom>
        </MyPageItemListWrap>
    );
};

export default MyPageItemList;
