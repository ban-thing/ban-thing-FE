import { ButtonProps, CloseButton } from "@/components/atoms/Button";
import styled from "styled-components";
import Exit from "@/assets/icons/exit.svg?react";
import { Dispatch, SetStateAction } from "react";
import { useItemRegisterHashListStore } from "@/store/ItemRegisterHashList";

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
    hashList: string[];
    setHashList?: Dispatch<SetStateAction<string[]>>;
    deleteItem?: (index: number) => void;
}

const HashTagButtonWithCloseList = ({
    margin,
    hashList,
    setHashList,
    deleteItem,
}: HashTagButtonProps) => {
    const { deleteItemAtIndex } = useItemRegisterHashListStore();
    const onDeleteHash = (index: number) => {
        if (setHashList) {
            setHashList((prev) => prev.filter((_, i) => i !== index));
        }
        if (deleteItem) {
            deleteItemAtIndex(index);
        }
    };

    return (
        <HashTagList margin={margin}>
            {hashList
                .filter((value) => value.trim() !== "")
                .map((value, index) => (
                    <HashTagWrap>
                        <HashtagButton variant="outlined" type="button">
                            #{value}
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
