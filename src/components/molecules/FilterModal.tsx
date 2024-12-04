import styled from "styled-components";
import { useFilterModalStore } from "@/store/ModalStore";
import { useState } from "react";

export default function FilterModal() {
    const { hideFilterModal } = useFilterModalStore();
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(1000000);

    const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>, type: "min" | "max") => {
        const value = Number(e.target.value);
        if (type === "min") {
            setMinPrice(Math.min(value, maxPrice));
        } else {
            setMaxPrice(Math.max(value, minPrice));
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, type: "min" | "max") => {
        const value = Number(e.target.value);
        if (type === "min") {
            setMinPrice(Math.min(value, maxPrice));
        } else {
            setMaxPrice(Math.max(value, minPrice));
        }
    };

    return (
        <>
            <ModalBase onClick={hideFilterModal} />
            <ModalContainer>
                <Title>가격</Title>
                <PriceRangeContainer>
                    <PriceInput
                        placeholder="무료 나눔"
                        value={minPrice}
                        onChange={(e) => handleInputChange(e, "min")}
                        type="number"
                    />
                    <RangeDivider>~</RangeDivider>
                    <PriceInput
                        placeholder="최대"
                        value={maxPrice}
                        onChange={(e) => handleInputChange(e, "max")}
                        type="number"
                    />
                </PriceRangeContainer>
                <SliderContainer>
                    <input
                        type="range"
                        min="0"
                        max="1000000"
                        step="100"
                        value={minPrice}
                        onChange={(e) => handleSliderChange(e, "min")}
                    />
                    <input
                        type="range"
                        min="0"
                        max="1000000"
                        step="100"
                        value={maxPrice}
                        onChange={(e) => handleSliderChange(e, "max")}
                    />
                </SliderContainer>
                <ButtonContainer>
                    <ResetButton
                        onClick={() => {
                            setMinPrice(0);
                            setMaxPrice(1000000);
                        }}
                    >
                        <ResetIcon />
                        초기화
                    </ResetButton>
                    <ApplyButton>적용하기</ApplyButton>
                </ButtonContainer>
            </ModalContainer>
        </>
    );
}

const ModalBase = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.4);
    z-index: 10;
`;

const ModalContainer = styled.div`
    position: fixed;
    bottom: 0;
    left: 50%;
    transform: translate(-50%, 0);
    width: 375px;
    height: 294px;
    padding: 24px;
    border-top-left-radius: 24px;
    border-top-right-radius: 24px;
    background-color: white;
    z-index: 20;
    box-sizing: border-box;
`;

const Title = styled.h2`
    font-size: 18px;
    font-weight: 700;
    margin: 16px 0;
`;

const PriceRangeContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    margin-bottom: 24px;
`;

const PriceInput = styled.input`
    width: 129px;
    height: 26px;
    padding: 12px;
    border: 1px solid var(--color-black-6);
    border-radius: 12px;
    font-size: 14px;

    &::placeholder {
        color: var(--color-black-5);
    }
`;

const RangeDivider = styled.span`
    color: var(--color-black-5);
    font-size: 16px;
`;

const SliderContainer = styled.div`
    position: relative;
    width: 100%;
    height: 24px;
    margin-bottom: 24px;

    input[type="range"] {
        position: absolute;
        width: 100%;
        -webkit-appearance: none;
        pointer-events: none;
        background: none;

        &::-webkit-slider-thumb {
            pointer-events: auto;
            -webkit-appearance: none;
            width: 24px;
            height: 24px;
            background: white;
            border: 2px solid var(--color-black-6);
            border-radius: 50%;
            cursor: pointer;
            margin-top: -10px;
        }

        &::-webkit-slider-runnable-track {
            width: 100%;
            height: 4px;
            background: var(--color-main-1);
            border-radius: 2px;
        }

        &:nth-child(1) {
            z-index: 2;
            &::-webkit-slider-runnable-track {
                background: var(--color-black-6);
                z-index: 1;
            }
        }
        &:nth-child(2) {
            z-index: 2;
            &::-webkit-slider-runnable-track {
                background: var(--color-black-6);
                z-index: 1;
            }
        }
    }
`;

// const PriceSlider = styled.input`
//     width: 100%;
//     margin-bottom: 24px;

//     &::-webkit-slider-thumb {
//         -webkit-appearance: none;
//         width: 24px;
//         height: 24px;
//         background: white;
//         border: 2px solid var(--color-black-6);
//         border-radius: 50%;
//         cursor: pointer;
//     }

//     &::-webkit-slider-runnable-track {
//         width: 100%;
//         height: 4px;
//         background: var(--color-main-1);
//         border-radius: 2px;
//     }
// `;

const ButtonContainer = styled.div`
    display: flex;
    gap: 8px;
`;

const ResetButton = styled.button`
    flex: 1;
    height: 52px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 4px;
    border: 1px solid var(--color-black-6);
    border-radius: 12px;
    background: white;
    font-size: 16px;
    color: var(--color-black-4);
`;

const ApplyButton = styled.button`
    flex: 1;
    height: 52px;
    border: none;
    border-radius: 12px;
    background: var(--color-main-1);
    color: white;
    font-size: 16px;
    font-weight: 500;
`;

const ResetIcon = styled.div`
    width: 20px;
    height: 20px;
    background: url("/path-to-reset-icon.svg") no-repeat center;
`;
