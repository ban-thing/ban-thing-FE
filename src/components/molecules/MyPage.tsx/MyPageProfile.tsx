import styled from "styled-components";
import Setting from "@/assets/icons/setting.svg?react";
import { UserProfile } from "@/types/User";
import { useNavigate } from "react-router-dom";
import { setImg64 } from "@/utils/SetImageUrl";

const MyPageProfileWrap = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30px;
`;

const StyledMyPageProfile = styled.div`
    display: grid;
    grid-template-columns: 56px 1fr;
    grid-template-rows: auto auto;
    gap: 4px 16px;
    align-items: start; /* 아이템을 상단 정렬 */

    & img {
        width: 56px;
        height: 56px;
        border-radius: 50%;
    }

    & .MyPageProfilePhoto {
        width: 56px;
        height: 56px;
        grid-row: span 2;
    }

    & .MyPageProfileId {
        grid-column: 2;
        grid-row: 1;
        font-size: 18px;
        font-weight: 700;
        color: var(--color-black-3);
        padding-top: 4px;
    }

    & .MyPageProfileAddress {
        grid-column: 2;
        grid-row: 2;
        color: var(--color-black-4);
        padding-bottom: 4px;
    }
`;

const MyPageProfileEditButton = styled.button`
    cursor: pointer;
    padding: 0 8px;
    & * {
        stroke: #949494;
    }
`;

type ProfileProps = Pick<UserProfile, "profileImg" | "address1" | "nickname">;

const MyPageProfile = ({ profileImg, address1, nickname }: ProfileProps) => {
    const navigate = useNavigate();

    return (
        <MyPageProfileWrap>
            <StyledMyPageProfile>
                <div className="MyPageProfilePhoto">
                    <img src={setImg64(profileImg)} alt="프로필 이미지" />
                </div>
                <div className="MyPageProfileId">{nickname}</div>
                <div className="MyPageProfileAddress">{address1}</div>
            </StyledMyPageProfile>
            <MyPageProfileEditButton onClick={() => navigate("edit")}>
                <Setting width={24} height={24} />
            </MyPageProfileEditButton>
        </MyPageProfileWrap>
    );
};

export default MyPageProfile;
