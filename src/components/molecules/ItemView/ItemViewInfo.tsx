import styled from "styled-components";
import HashtagButton from "./ItemViewHashButton";
import timeAgo from "@/utils/TimeAgo";
import CleanCheckTitle from "../CleanCheckTitle";
import check from "@/assets/checkBackground.png";
import { ItemView } from "@/types/Item";
import { ItemDescSkt, ItemDescSktBox, ItemTagSkt, ItemTitleSkt } from "@/components/atoms/Skeleton";
import DotIcon from "@/assets/icons/dot.svg?react";
import HeartCountIcon from "@/assets/icons/heartCount.svg?react";

type ItemViewInfoProps = Omit<
    ItemView,
    | "itemImgs"
    | "sellerNickname"
    | "sellerImgUrl"
    | "type"
    | "directLocation"
    | "price"
    | "address"
    | "direct"
    | "itemImgNames"
> & {
    isLoading?: boolean;
    likeCount?: number;
};

export default function ItemViewInfo({
    title = "상품 제목",
    content,
    hashtags = [{ id: 0, hashtag: "" }],
    cleaningDetail,
    updateTime,
    likeCount = 0,
    isLoading = true,
}: ItemViewInfoProps) {
    const { pollution, timeUsed, purchasedDate, cleaned, expire } = cleaningDetail;
    const pollList = ["없음", "1~3개", "3개 이상"];
    const timeList = ["없음", "5회 미만", "5회 이상"];
    const cleanList = ["새 상품", "있음", "없음"];

    return (
        // 스켈레톤
        <ItemViewInfoBox>
            {!isLoading ? (
                <>
                    <TitleWrap>
                        <ItemViewTitle>{title}</ItemViewTitle>
                        <TimeAndLikeWrap>
                            <ItemViewTime>{timeAgo(updateTime ?? new Date())}</ItemViewTime>
                            <DotIconWrapper>
                                <DotIcon />
                            </DotIconWrapper>
                            <LikeCountWrapper>
                                <HeartCountIcon />
                                <span style={{ color: "var(--color-black-5)" }}>{likeCount}</span>
                            </LikeCountWrapper>
                        </TimeAndLikeWrap>
                    </TitleWrap>
                    <HashtagWrap>
                        {hashtags.map(
                            (tag, index) =>
                                tag.hashtag !== "[]" && (
                                    <HashtagButton key={index} text={tag.hashtag} />
                                ),
                        )}
                    </HashtagWrap>
                    <ContentWrap>
                        {content ||
                            "Lorem ipsum dolor sit amet, consectetur adi piscing elit, sed do eiusmod tempor incidid unt ut labore et dolore magna aliqua. enim ad minim veniam, quis nostrud exercitation ullamco "}
                    </ContentWrap>
                    <CleanCheckListWrap>
                        <CleanCheckListGridBackground src={check} />
                        <CleanCheckTitle titleWeight={700} />
                        <CleanCheckListContentWrap>
                            <span>오염</span>
                            <CleanCheckListOption>
                                {pollList.map((value, index) => (
                                    <span
                                        key={index}
                                        className={pollution === value ? "highlight" : ""}
                                    >
                                        {value}
                                    </span>
                                ))}
                            </CleanCheckListOption>
                            <span>사용횟수</span>
                            <CleanCheckListOption>
                                {timeList.map((value, index) => (
                                    <span
                                        key={index}
                                        className={timeUsed === value ? "highlight" : ""}
                                    >
                                        {value}
                                    </span>
                                ))}
                            </CleanCheckListOption>
                            <span>구매시기</span>
                            <CleanCheckListOption>
                                <span
                                    className={
                                        purchasedDate !== "모름" && purchasedDate ? "highlight" : ""
                                    }
                                >
                                    {purchasedDate || "모름"}
                                </span>
                            </CleanCheckListOption>
                            <span>세탁유무</span>
                            <CleanCheckListOption>
                                {cleanList.map((value, index) => (
                                    <span
                                        key={index}
                                        className={cleaned === value ? "highlight" : ""}
                                    >
                                        {value}
                                    </span>
                                ))}
                            </CleanCheckListOption>
                            <span>유통기한</span>
                            <CleanCheckListOption>
                                <span className={expire !== "모름" && expire ? "highlight" : ""}>
                                    {expire || "모름"}
                                </span>
                            </CleanCheckListOption>
                        </CleanCheckListContentWrap>
                    </CleanCheckListWrap>
                </>
            ) : (
                <>
                    <ItemTitleSkt />
                    <ItemTagSkt />
                    <ItemDescSktBox>
                        <ItemDescSkt count={2} />
                    </ItemDescSktBox>
                </>
            )}
        </ItemViewInfoBox>
    );
}

const ItemViewInfoBox = styled.div`
    width: 100%;
    padding: 24px 20px 30px;
    box-sizing: border-box;
`;

const TitleWrap = styled.div`
    width: 100%;
    margin-bottom: 16px;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const TimeAndLikeWrap = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
    color: var(--color-black-4);
`;

const ItemViewTitle = styled.h3`
    font-size: 20px;
    font-weight: 700;
`;

const ItemViewTime = styled.div`
    font-size: 14px;
    color: #949494;
`;

const DotIconWrapper = styled.div`
    display: flex;
    align-items: center;
    svg {
        width: 2px;
        height: 2px;
        color: var(--color-black-4);
    }
`;

const LikeCountWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 4px;
    color: #949494;

    svg {
        width: 16px;
        height: 16px;
    }
`;

const HashtagWrap = styled.div`
    display: flex;
    gap: 6px;
`;

const ContentWrap = styled.div`
    margin: 24px 0 40px;
    white-space: pre-line;
`;

const CleanCheckListWrap = styled.div`
    background-color: #f1f9ff;
    padding: 27px 20px;
    display: flex;
    flex-direction: column;
    gap: 24px;
    box-sizing: border-box;
    font-size: 14px;
    position: relative;
`;

const CleanCheckListContentWrap = styled.div`
    display: grid;
    grid-template-columns: 50px 1fr;
    column-gap: 50px;
    row-gap: 12px;
`;

const CleanCheckListGridBackground = styled.img`
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
`;

const CleanCheckListOption = styled.div`
    display: flex;
    gap: 14px;

    span {
        color: var(--color-black-4);
        &.highlight {
            color: #111;
            position: relative;
            z-index: 2;

            &::before {
                display: inline-block;
                position: absolute;
                content: "";
                width: 100%;
                height: 12px;
                bottom: 0;
                background-color: rgba(157, 189, 255, 0.3);
                z-index: -1;
            }
        }
    }
`;
