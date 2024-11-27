import Dropdown, { Option } from "react-dropdown";
import "react-dropdown/style.css";
import styled from "styled-components";

const StyledDropdown = styled(Dropdown)`
    * {
        cursor: pointer;
        font-size: 18px;
    }
    .Dropdown-control {
        border: none;
        padding: 8px;
        &:hover {
            box-shadow: none;
        }
    }
    .Dropdown-placeholder.is-selected {
        min-width: 110px;
    }
    .Dropdown-option {
        color: inherit;
        padding: 4px 0;
        color: var(--color-black-5);
    }
    .Dropdown-option.is-selected {
        background-color: inherit;
        color: #000;
    }
    .Dropdown-option:hover {
        background: none;
        color: #000;
    }
    .Dropdown-menu {
        border: none;
        box-shadow: none;
        margin-top: 15px;
        padding: 20px;
        border-radius: 24px;
        min-width: 164px;
    }
    /* TODO: 화살표 수정 */
    .Dropdown-arrow {
    }
`;

type DropdownProps = {
    options?: string[];
    onChange?: (arg: Option) => void;
};

export default function DropdownComponent({
    options = ["연수동", "ㅇㅇ동", "ㅁㅁ동"],
    onChange = () => {},
}: DropdownProps) {
    // const options = ["연수동", "ㅇㅇ동", "ㅁㅁ동"];
    const defaultOption = options[0];

    return (
        <StyledDropdown
            options={options}
            onChange={onChange}
            value={defaultOption}
            placeholder="Select an option"
        />
    );
}
