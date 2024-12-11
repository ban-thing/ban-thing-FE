import styled from "styled-components";
import { useFilterModalStore } from "@/store/ModalStore";
import { useState } from "react";
import ReactSlider from "react-slider";
import { Button, FilterResetButton } from "../atoms/Button";
import { motion } from "motion/react";
import { slideUpMotionWithX } from "@/utils/animation";

const formatPrice = (price: number) => {
    return price.toLocaleString("ko-KR");
};

const removeCommas = (str: string) => {
    return str.replace(/,/g, "");
};

export default function FilterModal() {
    const { hideFilterModal } = useFilterModalStore();
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(5000000);

    const handleSliderChange = (value: number | readonly number[]) => {
        if (Array.isArray(value)) {
            const [newMin, newMax] = value;
            if (newMax - newMin >= 5000) {
                setMinPrice(newMin);
                setMaxPrice(newMax);
            }
        }
    };

    return (
        <>
            <ModalBase onClick={hideFilterModal} />
            <ModalContainer {...slideUpMotionWithX}>
                <Title>가격</Title>
                <PriceRangeContainer>
                    <PriceInput
                        placeholder="무료 나눔"
                        value={formatPrice(minPrice)}
                        onChange={(e) => setMinPrice(Number(removeCommas(e.target.value)))}
                        type="text"
                    />
                    <RangeDivider>~</RangeDivider>
                    <PriceInput
                        placeholder="최대"
                        value={formatPrice(maxPrice)}
                        onChange={(e) => setMaxPrice(Number(removeCommas(e.target.value)))}
                        type="text"
                    />
                </PriceRangeContainer>
                <SliderContainer>
                    <PriceLabel>0원</PriceLabel>
                    <StyledSlider
                        value={[minPrice, maxPrice]}
                        min={0}
                        max={5000000}
                        step={5000}
                        minDistance={5000}
                        onChange={handleSliderChange}
                        renderTrack={(props, state) => (
                            <div
                                {...props}
                                style={{
                                    ...props.style,
                                    background:
                                        state.index === 1
                                            ? "var(--color-main-1)"
                                            : "var(--color-black-6)",
                                }}
                            />
                        )}
                        renderThumb={(props) => <div {...props} />}
                    />
                </SliderContainer>
                <ButtonContainer>
                    <FilterResetButton
                        onClick={() => {
                            setMinPrice(0);
                            setMaxPrice(5000000);
                        }}
                    />
                    <Button variant="filled" size="small">
                        적용하기
                    </Button>
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

const ModalContainer = styled(motion.div)`
    position: fixed;
    bottom: 0;
    left: 50%;
    transform: translate(-50%, 0);
    width: 375px;
    height: 294px;
    padding: 40px 19px 0 19px;
    border-top-left-radius: 24px;
    border-top-right-radius: 24px;
    background-color: white;
    z-index: 20;
    box-sizing: border-box;
`;

const Title = styled.h2`
    font-size: 18px;
    font-weight: 700;
    margin-bottom: 16px;
`;

const PriceRangeContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    margin-bottom: 16px;
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
    width: 100%;
    height: 43px;
    margin-bottom: 40px;
    display: flex;
    flex-direction: column;
`;

const PriceLabel = styled.span`
    font-size: 12px;
    color: var(--color-black-5);
    margin-bottom: 14px;
    margin-left: 4px;
`;

const StyledSlider = styled(ReactSlider)`
    width: 100%;
    height: 4px;
    display: flex;
    align-items: center;

    .thumb {
        height: 24px;
        width: 24px;
        background-color: white;
        border: 2px solid var(--color-black-6);
        border-radius: 50%;
        cursor: pointer;
    }

    .track {
        top: 0;
        bottom: 0;
        background: var(--color-main-1);
        border-radius: 2px;
    }
`;

const ButtonContainer = styled.div`
    display: flex;
    justify-content: center;
    gap: 15px;
`;
