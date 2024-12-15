import { ButtonProps, CloseButton } from "@/components/atoms/Button";
import styled from "styled-components";
import Exit from "@/assets/icons/exit.svg?react";
import { FieldValues, UseFormSetValue } from "react-hook-form";

export const HashtagButton = styled.button<ButtonProps>`
    border-radius: 24px;
    border: none;
    padding: 8px 12px;
    height: 26px;
    font-size: 15px;
    font-weight: 500;
    background-color: var(--color-main-1);
    color: white;
    display: flex;
    align-items: center;
    gap: 4px;
    cursor: default;

    ${(props) =>
        props.variant === "outlined" &&
        `
        background-color: rgba(198, 216, 255, 0.1);
        border: 1px solid var(--color-main-1);
        color: var(--color-main-1);
    `};
`;

const HashTagList = styled.div<{ margin?: string }>`
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    column-gap: 7px;
    row-gap: 10px;
    margin: ${({ margin }) => (margin ? margin : "16px 0 0 0")};
`;

const HashTagWrap = styled.div`
    position: relative;
    height: 39px;
    display: flex;
    align-items: flex-end;
`;

const CloseButtonWrap = styled.div`
    position: absolute;
    top: 0;
    right: 0;
`;

interface HashTagButtonProps {
    margin?: string;
    hashList: any[];
    setValue: UseFormSetValue<FieldValues>;
}

const HashTagButtonWithCloseList = ({ margin, hashList, setValue }: HashTagButtonProps) => {
    const onDeleteHash = (index: number) => {
        let filteredHash = hashList.filter((_: string, i: number) => i !== index);
        setValue("hashtags", filteredHash);
    };

    return (
        <HashTagList margin={margin}>
            {hashList
                ?.filter((value) => value?.hashtag?.trim() || value?.trim() !== "")
                .map((value, index) => (
                    <HashTagWrap key={index}>
                        <HashtagButton variant="outlined" type="button">
                            #{value.hashtag || value}
                        </HashtagButton>
                        <CloseButtonWrap onClick={() => onDeleteHash(index)}>
                            <CloseButton variant="outlined" type="button">
                                <Exit width="16px" height="16px" fill="#6290EC" stroke="#6290EC" />
                            </CloseButton>
                        </CloseButtonWrap>
                    </HashTagWrap>
                ))}
        </HashTagList>
    );
};

export default HashTagButtonWithCloseList;
