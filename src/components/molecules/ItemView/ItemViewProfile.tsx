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
`;

const ProfileName = styled.div`
    font-size: 18px;
    font-weight: 700;
    margin-bottom: 4px;
`;

const ProfilePlace = styled.div`
    font-size: 16px;
    color: #505050;
`;

const ProfilePlace2 = styled.div`
    font-size: 12px;
    color: #949494;
`;

type ItemViewProfileProps = {
    sellerNickname: string;
    sellerImgUrl: string;
    address: string;
    directLocation: string;
    // sellerImgUrl: string
};

export default function ItemViewProfile({
    sellerNickname,
    sellerImgUrl,
    address,
    directLocation,
}: ItemViewProfileProps) {
    return (
        <ProfileWrap>
            <ProfileImgWrap>
                <img src={sellerImgUrl} />
            </ProfileImgWrap>
            <ProfileTextWrap>
                <ProfileName>{sellerNickname}</ProfileName>
                <ProfilePlace>{address}</ProfilePlace>
                <ProfilePlace2>{directLocation}</ProfilePlace2>
            </ProfileTextWrap>
        </ProfileWrap>
    );
}
