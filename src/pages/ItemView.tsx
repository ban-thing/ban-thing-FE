import ItemViewLayout from "@/components/layout/ItemViewLayout";
import ItemViewInfo from "@/components/molecules/ItemViewInfo";
import ItemViewProfile from "@/components/molecules/ItemViewProfile";
import styled from "styled-components";

const StyledItemImg = styled.div`
    width: 100%;
    height: 315px;
    background-color: gray;
    margin-bottom: 24px;
`;

const ItemView = () => {
    return (
        <ItemViewLayout>
            <StyledItemImg />
            <ItemViewProfile name="이름" address="연수동" directLocation="연수역 1번 출구 앞" />
            <ItemViewInfo />
        </ItemViewLayout>
    );
};

export default ItemView;
