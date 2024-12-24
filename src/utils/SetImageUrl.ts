export const imageUrl = "https://kr.object.ncloudstorage.com/banthing-images/itemImage";

export const setImgUrl = (id: string | number, data: string, type: string) => {
    return `${imageUrl}/${id}/${data}.${type}`;
};

export const setImg64 = (string: string) => {
    return `data:image/png;base64,${string}`;
};

export const base64ToFile = (base64: string, filename = `imgFile_${Date.now()}`): File => {
    const match = base64.match(/^data:(\w+\/\w+);base64,/);
    const mime = match ? match[1] : "image/png";
    const base64Data = base64.replace(/^data:\w+\/\w+;base64,/, "");

    try {
        const bstr = atob(base64Data);
        const u8arr = new Uint8Array(bstr.length);
        for (let i = 0; i < bstr.length; i++) {
            u8arr[i] = bstr.charCodeAt(i);
        }
        return new File([u8arr], filename, { type: mime });
    } catch (error) {
        throw new Error("Failed to decode Base64 string: base64 이미지 변환 중 오류 발생");
    }
};

export const getFileFromUrl = async (id: string | number, name: string) => {
    const [data, type] = name.split(".");
    const url = setImgUrl(id, data, type);
    const response = await fetch(url);

    const blob = await response.blob();
    return new File([blob], `${data}.${type}`, { type: blob.type });
};
