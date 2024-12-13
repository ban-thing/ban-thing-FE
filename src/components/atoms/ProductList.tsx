import styled from "styled-components";
import { ItemsList } from "../../types/User";
interface ProductListItemProps {
    item: ItemsList;
    timeAgo: number;
}

export default function ProductList({ item, timeAgo }: ProductListItemProps) {
    return (
        <ProductItemContainer>
            <ProductImage src={item.images} />
            <ProductInfo>
                <ProductName>{item.title}</ProductName>
                <ProductDetails>
                    <span>{item.address}</span>
                    <span>{timeAgo}일 전 </span>
                    <span>나눔</span>
                </ProductDetails>
                <Price>{item.price}원</Price>
            </ProductInfo>
        </ProductItemContainer>
    );
}

const ProductItemContainer = styled.div`
    display: flex;
    align-items: center;
    height: calc(150px - 40px);
    padding: 20px;
    background-color: #f9f9f9;
`;

const ProductImage = styled.img`
    width: 120px;
    height: 120px;
    border-radius: 8px;
    margin-right: 12px;
`;

const ProductInfo = styled.div`
    display: flex;
    flex-direction: column;
    flex-grow: 1;
`;

const ProductName = styled.div`
    font-size: 16px;
`;

const ProductDetails = styled.div`
    display: flex;
    align-items: center;
    gap: 5px;
    span {
        color: gray;
        font-size: 12px;
    }
`;

const Price = styled.div`
    font-size: 16px;
    font-weight: bold;
    margin-top: 10px;
    color: black;
`;
