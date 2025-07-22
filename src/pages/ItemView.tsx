import ItemViewLayout from "@/components/layout/ItemViewLayout";
import ItemViewInfo from "@/components/molecules/ItemView/ItemViewInfo";
import ItemViewProfile from "@/components/molecules/ItemView/ItemViewProfile";
import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css/pagination";
import { ItemImgSkt } from "@/components/atoms/Skeleton";
import { useFetchItem } from "@/hooks/api/ItemsQuery";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { base64ToFile } from "@/utils/SetImageUrl";
import { useFetchMyProfile } from "@/hooks/api/UsersQuery";
import BackIcon from "@/assets/icons/back.svg?react";
import HomeIcon from "@/assets/icons/home.svg?react";
import SearchIcon from "@/assets/icons/search.svg?react";
import { useState, useEffect } from "react";
import { Toast } from "@/components/atoms/Toast";

const ItemViewPage = () => {
    const { data: myProfileData } = useFetchMyProfile();
    const location = useLocation();
    const { id: itemId } = useParams();
    const { data: { data: itemData } = {}, isLoading } = useFetchItem(
        Number(location.pathname.split("/")[2]),
    );
    const navigate = useNavigate();
    const [showToast, setShowToast] = useState(false);
    const [wishlistCount, setWishlistCount] = useState(0);

    useEffect(() => {
        if (itemData) {
            setWishlistCount(itemData.wishlistCount || 0);
        }
    }, [itemData]);

    const handleWishlistUpdate = (isAdding: boolean) => {
        setWishlistCount(prev => isAdding ? prev + 1 : Math.max(0, prev - 1));
        if (isAdding) {
            setShowToast(true);
        }
    };

    return (
        <>
            <ItemViewLayout
                type={itemData?.type || ""}
                price={itemData?.price || 0}
                sellerId={Number(itemData?.sellerId)}
                itemId={Number(itemId)}
                myId={myProfileData?.data.userId}
                status={itemData?.status || ""}
                wishlisted={itemData?.wishlisted || false}
                wishlistCount={wishlistCount}
                onWishlistClick={handleWishlistUpdate}
            >
                {/* 스켈레톤 */}
                {!isLoading ? (
                    <StyledItemImg>
                        <Swiper pagination={true} modules={[Pagination]} className="mySwiper">
                            {itemData && itemData.itemImgs && itemData.itemImgs.length > 0 ? (
                                itemData.itemImgs.map((value, index) => {
                                    if (!value) return null;
                                    try {
                                        return (
                                            <SwiperSlide key={index}>
                                                <img src={URL.createObjectURL(base64ToFile(value))} alt={`상품 이미지 ${index + 1}`} />
                                            </SwiperSlide>
                                        );
                                    } catch (error) {
                                        console.error('이미지 변환 중 오류:', error);
                                        return null;
                                    }
                                })
                            ) : (
                                <SwiperSlide>
                                    <img src="/default-image.png" alt="기본 이미지" />
                                </SwiperSlide>
                            )}
                        </Swiper>
                        <TitleWrapper>
                            <BackButton onClick={() => navigate(-1)}>
                                <BackIcon />
                            </BackButton>
                            <ButtonGroup>
                                <BackButton onClick={() => navigate("/")}>
                                    <HomeIcon />
                                </BackButton>
                                <BackButton onClick={() => navigate("/search")}>
                                    <SearchIcon />
                                </BackButton>
                            </ButtonGroup>
                        </TitleWrapper>
                    </StyledItemImg>
                ) : (
                    <ItemImgSkt />
                )}

                <ItemViewProfile
                    sellerNickname={itemData?.sellerNickname ?? ""}
                    sellerImgUrl={itemData?.sellerImgUrl ?? ""}
                    address={itemData?.address ?? ""}
                    directLocation={itemData?.directLocation ?? ""}
                    direct={itemData?.direct ?? false}
                    isLoading={isLoading}
                />
                <ItemViewInfo
                    isLoading={isLoading}
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
                    likeCount={wishlistCount}
                />
                <ReportButtonWrapper>
                    <SkipButton onClick={() => {
                        console.log('🔍 신고 버튼 클릭:', { itemId: Number(itemId), sellerId: Number(itemData?.sellerId), itemData });
                        navigate("/report-reason", { state: { itemId: Number(itemId), sellerId: Number(itemData?.sellerId) } });
                    }}>
                        이 게시글 신고하기
                    </SkipButton>
                </ReportButtonWrapper>
            </ItemViewLayout>
            <Toast 
                message="나의 찜에 추가했어요"
                isVisible={showToast}
                onClose={() => setShowToast(false)}
            />
        </>
    );
};

export default ItemViewPage;

const StyledItemImg = styled.div`
    position: relative;
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

    svg path {
        stroke: white;
    }
`;

const TitleWrapper = styled.div`
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: row;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 100%;
    height: 44px;
    z-index: 1;
`;

const BackButton = styled.div`
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: row;
    &:first-child {
        margin-left: 20px;
    }
`;

const ButtonGroup = styled.div`
    display: flex;
    align-items: center;
    gap: 16px;
    &:last-child {
        margin-right: 20px;
    }
`;

const ReportButtonWrapper = styled.div`
    width: 100%;
    padding: 0 20px 120px; 
    box-sizing: border-box;
`;

const SkipButton = styled.button`
    width: 100%;
    display: flex;
    justify-content: flex-start;s
    background: none;
    border: none;
    color: var(--color-black-6);
    font-size: 12px;
    padding: 0;
    cursor: pointer;
    margin-top: -20px;
    text-decoration: underline;
`;
