import ItemViewLayout from "@/components/layout/ItemViewLayout";
import ItemViewInfo from "@/components/molecules/ItemView/ItemViewInfo";
import ItemViewProfile from "@/components/molecules/ItemView/ItemViewProfile";
import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css/pagination";
import { ItemImgSkt } from "@/components/atoms/Skeleton";
import { useFetchItem } from "@/hooks/api/ItemsQuery";
import { useLocation, useParams } from "react-router-dom";
import { setImgUrl } from "@/utils/SetImageUrl";

const StyledItemImg = styled.div`
    width: 100%;
    height: 315px;
    margin-bottom: 24px;

    & .mySwiper {
        height: 100%;
    }

    & img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
`;

const ItemViewPage = () => {
    const location = useLocation();
    const { id: itemId } = useParams();
    const { data: { data: itemData } = {}, isLoading } = useFetchItem(
        Number(location.pathname.split("/")[2]),
    );

    return (
        <ItemViewLayout
            type={itemData?.type || ""}
            price={itemData?.price || 0}
            sellerId={Number(itemId)}
            itemId={Number(itemId)}
        >
            {/* 스켈레톤 */}
            {!isLoading ? (
                <StyledItemImg>
                    <Swiper pagination={true} modules={[Pagination]} className="mySwiper">
                        {itemData?.itemImgs.map((value, index) => {
                            const imgInfo = value.split(".");
                            return (
                                <SwiperSlide key={index}>
                                    <img src={setImgUrl(Number(itemId), imgInfo[0], imgInfo[1])} />
                                </SwiperSlide>
                            );
                        })}
                    </Swiper>
                </StyledItemImg>
            ) : (
                <ItemImgSkt />
            )}

            <ItemViewProfile
                sellerNickname={itemData?.sellerNickname ?? ""}
                sellerImgUrl={itemData?.sellerImgUrl ?? { id: 0, data: "", type: "" }}
                address={itemData?.address ?? ""}
                directLocation={itemData?.directLocation ?? ""}
                direct={itemData?.direct ?? false}
            />
            <ItemViewInfo
                title={itemData?.title ?? ""}
                content={itemData?.content ?? ""}
                hashtags={itemData?.hashtags ?? [{ id: 0, hashtag: "" }]}
                cleaningDetail={
                    itemData?.cleaningDetail ?? {
                        pollution: "",
                        timeUsed: "",
                        purchasedDate: "",
                        cleaned: "",
                        expire: "",
                    }
                }
                updateTime={itemData?.updateTime ?? ""}
            />
        </ItemViewLayout>
    );
};

export default ItemViewPage;
