import styled from "styled-components";
import ItemContainer from "@/components/molecules/ItemContainer";

const StyledItemList = styled.div`
    width: 100%;
    padding: 50px 20px 60px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
`;

const ItemList = () => {
    return (
        <StyledItemList>
            <ItemContainer
                itemId={1}
                title="Lorem ipsum dolor"
                price={10000}
                location="연수동"
                updatedAt={new Date(new Date().setMinutes(new Date().getMinutes() - 25))}
                type="판매"
            />
            <ItemContainer
                itemId={2}
                title="consectetur adip"
                price={0}
                location="ㅇㅇ동"
                updatedAt={new Date("2024-10-13 10:48:55")}
                type="나눔"
            />
            <ItemContainer
                itemId={3}
                title="Lorem ipsum dolor sit am et conse ctetur adipi"
                price={100000000}
                location="연수1동"
                updatedAt={new Date("2024-11-12 10:48:55")}
                type="나눔"
            />
            <ItemContainer
                itemId={4}
                title="Excepteur sint occaecat"
                price={10000}
                location="ㅁㅁ동"
                updatedAt={new Date("2022-11-13 10:48:55")}
                type="판매"
            />
            <ItemContainer
                itemId={5}
                title="anim id est laborum"
                price={10000}
                location="연수2동"
                updatedAt={new Date(new Date().setMinutes(new Date().getMinutes() - 5))}
                type="판매"
            />
            <ItemContainer
                itemId={6}
                title="dolore eu fugiat"
                price={10000}
                location="연수3동"
                updatedAt={new Date("2024-08-13 10:48:55")}
                type="판매"
            />
        </StyledItemList>
    );
};

export default ItemList;
