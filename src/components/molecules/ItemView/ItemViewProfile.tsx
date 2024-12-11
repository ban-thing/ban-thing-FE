import { ProfileAddressSkt, ProfileImgSkt, ProfileNameSkt } from "@/components/atoms/Skeleton";
import { ItemView } from "@/types/Item";
import styled from "styled-components";

const ProfileWrap = styled.div`
    width: 100%;
    height: 67px;
    display: flex;
    gap: 10px;
    padding: 0 0 15px 20px;
    border-bottom: 1px solid #f7f7f7;
`;

const ProfileImgWrap = styled.div`
    width: 56px;
    height: 56px;
    margin: 4.5px 0;
    border-radius: 50%;
    overflow: hidden;
`;

const ProfileTextWrap = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

const ProfileName = styled.div`
    font-size: 18px;
    font-weight: 700;
    margin-bottom: 4px;
`;

const ProfilePlace = styled.div`
    font-size: 16px;
    color: var(--color-black-4);
`;

const ProfilePlace2 = styled.div`
    font-size: 12px;
    color: #949494;
`;

type ItemViewProfileProps = Pick<
    ItemView,
    "sellerNickname" | "sellerImgUrl" | "address" | "directLocation" | "isDirect"
>;

export default function ItemViewProfile({
    sellerNickname,
    sellerImgUrl,
    address,
    directLocation,
    isDirect,
}: ItemViewProfileProps) {
    return (
        // 스켈레톤
        <ProfileWrap>
            {true ? (
                <ProfileImgWrap>
                    <img src={sellerImgUrl} />
                </ProfileImgWrap>
            ) : (
                <ProfileImgSkt circle />
            )}
            <ProfileTextWrap>
                {true ? (
                    <>
                        <ProfileName>{sellerNickname}</ProfileName>
                        <ProfilePlace>{address}</ProfilePlace>
                        <ProfilePlace2>{isDirect ? directLocation : "직거래 불가능"}</ProfilePlace2>
                    </>
                ) : (
                    <>
                        <ProfileNameSkt />
                        <ProfileAddressSkt />
                    </>
                )}
            </ProfileTextWrap>
        </ProfileWrap>
    );
}
