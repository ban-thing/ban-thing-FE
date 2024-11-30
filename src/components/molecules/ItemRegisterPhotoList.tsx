import {
    PhotoAddButton,
    PhotoCount,
    PhotosList,
    UploadedImage,
    UploadedImageWrap,
} from "@/components/atoms/ItemRegisterElement";
import Camera from "@/assets/icons/camera.svg?react";
import Exit from "@/assets/icons/exit.svg?react";
import { FieldValues, UseFormRegister } from "react-hook-form";
import { GrayCloseButton } from "@/components/atoms/Button";
import usePhotoUpload from "@/hooks/usePhotoUpload";

type PhotoListProps = {
    register: UseFormRegister<FieldValues>;
};

const ItemRegisterPhotoList = ({ register }: PhotoListProps) => {
    const { photosPreview, photoFiles, onChangeFile, removePhoto } = usePhotoUpload();

    return (
        <PhotosList>
            <PhotoAddButton htmlFor="photoUpload" $enable={photoFiles.length !== 5}>
                <Camera fill="#949494" />
                <span>
                    <PhotoCount $hasImg={photosPreview.length > 0}>
                        {photosPreview.length}
                    </PhotoCount>
                    /5
                </span>
            </PhotoAddButton>
            <input
                type="file"
                id="photoUpload"
                accept="image/*"
                multiple
                disabled={photoFiles.length === 5}
                {...register("photos", {
                    onChange: onChangeFile,
                })}
            />
            {photosPreview.map((preview, index) => (
                <UploadedImageWrap key={index}>
                    <UploadedImage src={preview} alt={`미리보기 ${index + 1}`} />
                    <GrayCloseButton type="button" onClick={() => removePhoto(index)}>
                        <Exit width="18px" height="18px" fill="white" stroke="white" />
                    </GrayCloseButton>
                </UploadedImageWrap>
            ))}
        </PhotosList>
    );
};

export default ItemRegisterPhotoList;
