import styled from "styled-components";
import ItemContainer from "@/components/molecules/ItemContainer";

const StyledItemList = styled.div`
    width: 100%;
    padding: 50px 20px 0;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
`;

const ItemList = () => {
    return (
        <StyledItemList>
            <ItemContainer
                title="고양이 장난감 팝니다"
                price={10000}
                location="연수동"
                updatedAt={new Date(new Date().setMinutes(new Date().getMinutes() - 25))}
                type="판매"
            />
            <ItemContainer
                title="고양이 장난감 나눔"
                price={0}
                location="연수동"
                updatedAt={new Date("2024-10-13 10:48:55")}
                type="나눔"
            />
            <ItemContainer
                title="제목 글자 들어오는 곳 두줄짜리 제목은 생략합니다"
                price={100000000}
                location="연수동"
                updatedAt={new Date("2024-11-12 10:48:55")}
                type="나눔"
            />
            <ItemContainer
                title="고양이 장난감 팝니다"
                price={10000}
                location="연수동"
                updatedAt={new Date("2022-11-13 10:48:55")}
                type="판매"
            />
            <ItemContainer
                title="고양이 장난감 팝니다"
                price={10000}
                location="연수동"
                updatedAt={new Date(new Date().setMinutes(new Date().getMinutes() - 5))}
                type="판매"
            />
            <ItemContainer
                title="고양이 장난감 팝니다"
                price={10000}
                location="연수동"
                updatedAt={new Date("2024-08-13 10:48:55")}
                type="판매"
            />
        </StyledItemList>
    );
};

export default ItemList;
