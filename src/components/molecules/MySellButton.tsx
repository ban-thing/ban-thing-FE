import styled from "styled-components";
import { ButtonHTMLAttributes, useEffect, useState } from "react";
import Plus from "@/assets/icons/plusBold.svg?react";
import Snack from "@/assets/icons/snackWhite.svg?react";
import { useNavigate } from "react-router-dom";
import { getCookie } from "@/utils/Cookie";

interface MySellButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    alwaysShowPlus?: boolean;
}

export const MySellButton = ({ alwaysShowPlus = false, ...props }: MySellButtonProps) => {
    const navigate = useNavigate();
    const [showPlus, setShowPlus] = useState(alwaysShowPlus);
    const handleScroll = () => {
        if (alwaysShowPlus) return;
        // 현재 스크롤 위치가 최상단인지 확인
        const isTop = window.scrollY === 0;
        setShowPlus(!isTop);
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [alwaysShowPlus]);

    useEffect(() => {
        setShowPlus(alwaysShowPlus);
    }, [alwaysShowPlus]);

    const onClickSellButton = () => {
        const authCookie = getCookie("Authorization_banthing");
        if (!authCookie) return navigate("/login");
        navigate("/item-register");
    };

    return (
        <StyledMySellButton
            onClick={onClickSellButton}
            className={showPlus ? "small" : ""}
            {...props}
        >
            {showPlus ? (
                <Plus stroke="white" />
            ) : (
                <>
                    <Snack />
                    <div>내 물건 팔기</div>
                </>
            )}
        </StyledMySellButton>
    );
};

const StyledMySellButton = styled.button<ButtonHTMLAttributes<HTMLButtonElement>>`
    width: 128px;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 8px;
    padding: 15px 13px;
    border-radius: 32px;
    background-color: var(--color-main-1);
    position: absolute;
    bottom: 70px;
    right: 20px;
    font-size: 14px;
    box-sizing: border-box;
    box-shadow: 0 10px 15px 0 rgba(53, 101, 199, 0.2);
    transition: all 0.25s;
    white-space: nowrap;
    &.small {
        width: 50px;
        border-radius: 50%;
    }

    & > * {
        color: white;
        font-weight: 700;
    }
`;