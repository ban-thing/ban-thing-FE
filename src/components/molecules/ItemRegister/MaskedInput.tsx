import { Controller, FieldErrorsImpl, FieldValues, UseFormWatch } from "react-hook-form";
import { InputMask } from "@react-input/mask";
import styled from "styled-components";

const MaskedInputWrap = styled.div`
    & .masked-input {
        width: 301px;
        height: 50px;
        border: 1px solid var(--color-black-6);
        border-radius: 8px;
        padding: 0 16px;
        font-size: 15px;
        color: var(--color-black-1);
        caret-color: "transparent";

        &:focus {
            outline: 1px solid var(--color-black-1);
        }

        &.error {
            background-color: rgba(255, 0, 0, 0.08);
            border-color: var(--color-red-1);
            color: red;

            &::placeholder {
                color: red;
            }
            &:focus {
                outline: none;
            }
        }
    }
`;

type MaskedInputProps = {
    control: any;
    errors: FieldErrorsImpl<FieldValues>;
    name: string;
    watch: UseFormWatch<FieldValues>;
    isChecked: boolean;
};

const MaskedInput = ({ control, errors, name, watch, isChecked }: MaskedInputProps) => {
    return (
        <MaskedInputWrap>
            <Controller
                name={name}
                control={control}
                rules={{
                    required: isChecked,
                    validate: (value) => value !== "OO.OO.OO" && value !== "모름",
                }}
                render={({ field }) => (
                    <InputMask
                        mask="OO.OO.OO"
                        replacement={{ O: /[0-9]/ }}
                        showMask
                        {...field}
                        className={`masked-input ${errors.clnExprice && "error"}`}
                        placeholder="OO.OO.OO"
                        value={watch(name) === "모름" ? "" : watch(name) || ""}
                    />
                )}
            />
        </MaskedInputWrap>
    );
};

export default MaskedInput;
