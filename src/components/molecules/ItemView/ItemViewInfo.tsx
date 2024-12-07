import styled from "styled-components";
import HashtagButton from "./ItemViewHashButton";
import timeAgo from "@/utils/TimeAgo";
import CleanCheckTitle from "../CleanCheckTitle";
import check from "@/assets/checkBackground.png";
import { ItemView } from "@/types/Item";

const ItemViewInfoBox = styled.div`
    width: 100%;
    padding: 24px 20px 108px;
    box-sizing: border-box;
`;

const TitleWrap = styled.div`
    width: 100%;
    margin-bottom: 16px;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const ItemViewTitle = styled.h3`
    font-size: 20px;
    font-weight: 700;
`;

const ItemViewTime = styled.div`
    font-size: 14px;
    color: #949494;
`;

const HashtagWrap = styled.div`
    display: flex;
    gap: 6px;
`;

const ContentWrap = styled.div`
    margin: 24px 0 40px;
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

type ItemViewInfoProps = Omit<
    ItemView,
    | "itemImgs"
    | "sellerNickname"
    | "sellerImgUrl"
    | "type"
    | "directLocation"
    | "price"
    | "address"
    | "isDirect"
>;

export default function ItemViewInfo({
    title = "상품 제목",
    content,
    hashtags = ["해시태그1", "해시태그2"],
    clnPollution = "없음",
    clnTimeUsed = "없음",
    clnPurchasedDate = "모름",
    clnCleaned = "없음",
    clnExpire = "모름",
    updatedAt = new Date(),
}: ItemViewInfoProps) {
    const pollList = ["없음", "1-3개", "3개 이상"];
    const timeList = ["없음", "5회 미만", "5회 이상"];
    const cleanList = ["새 상품", "있음", "없음"];

    return (
        <ItemViewInfoBox>
            <TitleWrap>
                <ItemViewTitle>{title}</ItemViewTitle>
                <ItemViewTime>{timeAgo(updatedAt)}</ItemViewTime>
            </TitleWrap>
            <HashtagWrap>
                {hashtags.map((tag, index) => (
                    <HashtagButton key={index} text={tag} />
                ))}
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
                            <span key={index} className={clnPollution === value ? "highlight" : ""}>
                                {value}
                            </span>
                        ))}
                    </CleanCheckListOption>
                    <span>사용횟수</span>
                    <CleanCheckListOption>
                        {timeList.map((value, index) => (
                            <span key={index} className={clnTimeUsed === value ? "highlight" : ""}>
                                {value}
                            </span>
                        ))}
                    </CleanCheckListOption>
                    <span>구매시기</span>
                    <CleanCheckListOption>
                        <span className={clnPurchasedDate !== "모름" ? "highlight" : ""}>
                            {clnPurchasedDate}
                        </span>
                    </CleanCheckListOption>
                    <span>세탁유무</span>
                    <CleanCheckListOption>
                        {cleanList.map((value, index) => (
                            <span key={index} className={clnCleaned === value ? "highlight" : ""}>
                                {value}
                            </span>
                        ))}
                    </CleanCheckListOption>
                    <span>유통기한</span>
                    <CleanCheckListOption>
                        <span className={clnExpire !== "모름" ? "highlight" : ""}>{clnExpire}</span>
                    </CleanCheckListOption>
                </CleanCheckListContentWrap>
            </CleanCheckListWrap>
        </ItemViewInfoBox>
    );
}
