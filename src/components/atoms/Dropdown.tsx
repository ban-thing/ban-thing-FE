import { useDropdownModalStore } from "@/store/ModalStore";
import { useState, useEffect, useRef, RefObject } from "react";
import styled from "styled-components";
import Arrow from "@/assets/icons/arrowDown.svg?react";

type ShowProps = {
    $show?: boolean;
};

const SelectBox = styled.div`
    position: relative;
    height: 23px;
    align-self: center;
    font-size: 18px;
    cursor: pointer;
    z-index: 20;
`;
const Label = styled.label`
    display: flex;
    align-items: center;
    min-width: 90px;
    cursor: pointer;
    gap: 4px;
`;

const ArrowWrap = styled.span`
    display: flex;
    align-items: center;
    justify-content: center;
`;
const SelectOptions = styled.ul<ShowProps>`
    position: absolute;
    top: 50px;
    left: -5px;
    min-width: 164px;
    overflow-y: auto;
    border-radius: 24px;
    max-height: ${(props) => (props.$show ? "none" : "0")};
    background-color: white;
    padding: ${(props) => (props.$show ? "24px 0" : "0")};

    // 스크롤바 CSS
    ::-webkit-scrollbar {
        width: 4px;
    }
    ::-webkit-scrollbar-thumb {
        background-color: #777777;
        border-radius: 10px;
    }
    ::-webkit-scrollbar-track {
        background-color: #cccccc;
        border-radius: 0px 3px 3px 0px;
    }
`;
const Option = styled.li<ShowProps>`
    /* transition: background-color 0.1s ease-in; */
    padding: ${(props) => (props.$show ? "4px 20px 4px" : 0)};
    color: var(--color-black-5);

    &:hover {
        color: black;
        font-weight: 700;
    }
`;

type DropdownProps = {
    option?: string[];
    onChange?: (value: string) => void;
};

export const Dropdown = ({
    option = ["연수동", "연수1동", "연수2동", "동네바꾸기"],
    onChange,
}: DropdownProps) => {
    const selectRef = useRef(null) as RefObject<HTMLDivElement>;
    const [currentValue, setCurrentValue] = useState(option[0]);
    const { isDropdownOpen, closeDropdown, toggleDropdown } = useDropdownModalStore();

    const handleOnChangeSelectValue = (e: React.MouseEvent<HTMLLIElement>) => {
        const value = e.currentTarget.getAttribute("value") || "";
        setCurrentValue(value);
        onChange?.(value);
    };

    useEffect(() => {
        // Dropdown 바깥쪽 클릭시 접기
        function handleClickOutside(event: MouseEvent) {
            if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
                closeDropdown();
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [selectRef]);

    return (
        <SelectBox onClick={() => toggleDropdown()} ref={selectRef}>
            <Label>
                <span>{currentValue}</span>
                <ArrowWrap>
                    <Arrow />
                </ArrowWrap>
            </Label>
            <SelectOptions $show={isDropdownOpen}>
                {option.map((data, index) => (
                    <Option
                        key={index}
                        value={data}
                        onClick={handleOnChangeSelectValue}
                        $show={isDropdownOpen}
                    >
                        {data}
                    </Option>
                ))}
            </SelectOptions>
        </SelectBox>
    );
};
