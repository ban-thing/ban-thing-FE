import { ProfileAddressSkt, ProfileImgSkt, ProfileNameSkt } from "@/components/atoms/Skeleton";
import { base64ToFile } from "@/utils/SetImageUrl";
import styled from "styled-components";

type ItemViewProfileProps = {
    sellerNickname: string;
    sellerImgUrl: string | { id: number; data: string; type: string };
    address: string;
    directLocation: string;
    direct: boolean;
    isLoading?: boolean;
};

export default function ItemViewProfile({
    sellerNickname,
    sellerImgUrl,
    address,
    directLocation,
    direct,
    isLoading = true,
}: ItemViewProfileProps) {
    const getImageUrl = () => {
        if (typeof sellerImgUrl === 'string') {
            return URL.createObjectURL(base64ToFile(sellerImgUrl));
        }
        return URL.createObjectURL(base64ToFile(sellerImgUrl.data));
    };

    return (
        // 스켈레톤
        <ProfileWrap>
            {!isLoading ? (
                <ProfileImgWrap>
                    {sellerImgUrl ? (
                        <img 
                            src={getImageUrl()} 
                            alt="Seller Profile"
                        />
                    ) : (
                        <img 
                            src="/default-profile.png" 
                            alt="Default Profile"
                        />
                    )}
                </ProfileImgWrap>
            ) : (
                <ProfileImgSkt circle />
            )}
            <ProfileTextWrap>
                {!isLoading ? (
                    <>
                        <ProfileName>{sellerNickname}</ProfileName>
                        <ProfilePlace>{address}</ProfilePlace>
                        <ProfilePlace2>{direct ? directLocation : "직거래 불가능"}</ProfilePlace2>
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

    & img {
        width: 56px;
        height: 56px;
    }
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