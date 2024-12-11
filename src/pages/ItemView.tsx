import ItemViewLayout from "@/components/layout/ItemViewLayout";
import ItemViewInfo from "@/components/molecules/ItemView/ItemViewInfo";
import ItemViewProfile from "@/components/molecules/ItemView/ItemViewProfile";
import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css/pagination";
import { ItemImgSkt } from "@/components/atoms/Skeleton";

const StyledItemImg = styled.div`
    width: 100%;
    height: 315px;
    margin-bottom: 24px;

    & .mySwiper {
        height: 100%;
    }
`;

const dummyData = {
    title: "상품 제목",
    content:
        "Lorem ipsum dolor sit amet, consectetur adi piscing elit, sed do eiusmod tempor incidid unt ut labore et dolore magna aliqua. enim ad minim veniam, quis nostrud exercitation ullamco ",
    sellerImgUrl:
        "https://fastly.picsum.photos/id/588/56/56.jpg?hmac=Q5IXrX009yD-wG4f7qAHsq0_TRTcY0AHN_77hBHr7dM",
    sellerNickname: "닉네임",
    type: "판매",
    price: 5000,
    directLocation: "연수역 1번 출구 앞",
    address: "연수동",
    itemImgs: [
        "https://fastly.picsum.photos/id/481/375/375.jpg?hmac=t373WijYdP9inn7tZbKcD7ITS7vEWV6TS3gVfJg_4FY",
        "https://fastly.picsum.photos/id/130/375/375.jpg?hmac=oSTydHYiz0dB24ZAUR1GMbNkum0ZDISyOjsjsW8IzzY",
    ],
    hashtags: ["고양이", "장난감"],
    clnPollution: "모름",
    clnTimeUsed: "5회 미만",
    clnPurchasedDate: "모름",
    clnCleaned: "있음",
    clnExpire: "24.08.12",
    isDirect: true,
    updatedAt: new Date(),
};

const ItemView = () => {
    return (
        <ItemViewLayout type={dummyData.type} price={dummyData.price}>
            {/* 스켈레톤 */}
            {true ? (
                <StyledItemImg>
                    <Swiper pagination={true} modules={[Pagination]} className="mySwiper">
                        {dummyData.itemImgs.map((value, index) => (
                            <SwiperSlide key={index}>
                                <img src={value} />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </StyledItemImg>
            ) : (
                <ItemImgSkt />
            )}

            <ItemViewProfile
                sellerNickname={dummyData.sellerNickname}
                sellerImgUrl={dummyData.sellerImgUrl}
                address={dummyData.address}
                directLocation={dummyData.directLocation}
                isDirect={dummyData.isDirect}
            />
            <ItemViewInfo
                title={dummyData.title}
                content={dummyData.content}
                hashtags={dummyData.hashtags}
                clnPollution={dummyData.clnPollution}
                clnTimeUsed={dummyData.clnTimeUsed}
                clnPurchasedDate={dummyData.clnPurchasedDate}
                clnCleaned={dummyData.clnCleaned}
                clnExpire={dummyData.clnExpire}
                updatedAt={dummyData.updatedAt}
            />
        </ItemViewLayout>
    );
};

export default ItemView;
