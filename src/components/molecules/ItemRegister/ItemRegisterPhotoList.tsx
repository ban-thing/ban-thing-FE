import {
    PhotoAddButton,
    PhotoCount,
    UploadedImage,
    // UploadedImageWrap,
} from "@/components/atoms/ItemRegisterElement";
import Camera from "@/assets/icons/camera.svg?react";
import Exit from "@/assets/icons/exit.svg?react";
import { Control, Controller, FieldValues, UseFormSetValue } from "react-hook-form";
import { GrayCloseButton } from "@/components/atoms/Button";
import usePhotoUpload from "@/hooks/usePhotoUpload";
import { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

type PhotoListProps = {
    setValue: UseFormSetValue<FieldValues>;
    Controller: typeof Controller;
    control: Control<FieldValues>;
    initialFiles: any;
};

const ItemRegisterPhotoList = ({ setValue, Controller, control, initialFiles }: PhotoListProps) => {
    const { photosPreview, photoFiles, onChangeFile, removePhoto } = usePhotoUpload(
        initialFiles || [],
    );

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onChangeFile(event.target.files);
    };

    useEffect(() => {
        console.log(photoFiles, "포토파일");
        setValue("photos", photoFiles);
    }, [photoFiles, setValue]);

    return (
        <Swiper
            slidesPerView={5.5}
            spaceBetween={4}
            style={{ height: "66px", overflow: "visible" }}
        >
            <SwiperSlide>
                <PhotoAddButton htmlFor="photoUpload" $enable={photoFiles.length !== 5}>
                    <Camera fill="#949494" />
                    <span>
                        <PhotoCount $hasImg={photosPreview.length > 0}>
                            {photosPreview.length}
                        </PhotoCount>
                        /5
                    </span>
                </PhotoAddButton>
                <Controller
                    name="photos"
                    control={control}
                    rules={{
                        validate: {
                            required: (value: any) =>
                                (value && value.length > 0) || "최소 1개의 사진을 업로드하세요.",
                        },
                    }}
                    render={({ field }: any) => (
                        <input
                            type="file"
                            id="photoUpload"
                            accept="image/*"
                            multiple
                            disabled={photoFiles.length === 5}
                            onChange={(e) => {
                                handleFileChange(e);
                                field.onChange(e.target.files);
                            }}
                        />
                    )}
                />
            </SwiperSlide>
            {photosPreview.map((preview, index) => (
                <SwiperSlide key={index} style={{ width: "66px" }}>
                    {/* <UploadedImageWrap key={index}> */}
                    <UploadedImage src={preview} alt={`미리보기 ${index + 1}`} />
                    <GrayCloseButton type="button" onClick={() => removePhoto(index)}>
                        <Exit width="18px" height="18px" fill="white" stroke="white" />
                    </GrayCloseButton>
                    {/* </UploadedImageWrap> */}
                </SwiperSlide>
            ))}
        </Swiper>
    );
};

export default ItemRegisterPhotoList;
