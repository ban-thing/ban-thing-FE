import { useEffect, useState } from "react";

const usePhotoUpload = (initialFiles: File[] = []) => {
    const [photosPreview, setPhotosPreview] = useState<string[]>([]);
    const [photoFiles, setPhotoFiles] = useState<File[]>(initialFiles);

    useEffect(() => {
        if (initialFiles.length > 0) {
            const previews = initialFiles.map((file) => URL.createObjectURL(file));
            setPhotosPreview(previews);
            setPhotoFiles(initialFiles);
        }
    }, [initialFiles]);

    const onChangeFile = (files: FileList | null) => {
        if (!files || photoFiles.length === 5) return;
        const fileArray = Array.from(files).slice(0, 5 - photoFiles.length);
        const newPreviews = fileArray.map((file) => URL.createObjectURL(file));
        const newFiles = [...photoFiles, ...fileArray];
        setPhotosPreview((prev) => [...prev, ...newPreviews]);
        setPhotoFiles(newFiles);
    };

    const removePhoto = (indexToRemove: number) => {
        setPhotosPreview((prev) => prev.filter((_, index) => index !== indexToRemove));
        setPhotoFiles((prev) => prev.filter((_, index) => index !== indexToRemove));
    };

    return { photosPreview, photoFiles, onChangeFile, removePhoto };
};

export default usePhotoUpload;

export const useProfilePhotoUpload = () => {
    const [photoPreview, setPhotoPreview] = useState("");

    const onChangeFile = (file: any) => {
        if (!file) return;
        setPhotoPreview(URL.createObjectURL(file));
    };

    return { photoPreview, onChangeFile };
};
