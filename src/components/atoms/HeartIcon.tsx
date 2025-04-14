import styled from "styled-components";
import HeartSvg from "@/assets/icons/heart.svg?react";

interface HeartIconProps {
    isLiked?: boolean;
}

const StyledHeartIcon = styled(HeartSvg)<HeartIconProps>`
    path {
        fill: ${({ isLiked }) => (isLiked ? "var(--color-main-1)" : "#111")};
    }
`;

export const HeartIcon = ({ isLiked }: HeartIconProps) => {
    return <StyledHeartIcon isLiked={isLiked} />;
};

export default HeartIcon; 