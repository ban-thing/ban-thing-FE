export const imageUrl = "https://kr.object.ncloudstorage.com/banthing-images/itemImage";

export const setImgUrl = (id: string | number, data: string, type: string) => {
    return `${imageUrl}/${id}/${data}.${type}`;
};

export const setImg64 = (string: string) => {
    return `data:image/png;base64,${string}`;
};

export const base64ToFile = (base64: string, filename = `imgFile_${Date.now()}.png`): File => {
    if (!base64) {
        throw new Error("이미지 데이터가 없습니다.");
    }

    if (typeof base64 !== 'string') {
        throw new Error("이미지 데이터가 문자열이 아닙니다.");
    }

    const mimeMap: { [key: string]: string } = {
        jpeg: "image/jpeg",
        jpg: "image/jpeg",
        png: "image/png",
        gif: "image/gif",
        bmp: "image/bmp",
        webp: "image/webp",
        svg: "image/svg+xml",
        tiff: "image/tiff",
        ico: "image/x-icon",
    };

    const match = base64.match(/^data:(\w+\/\w+);base64,/);
    const defaultMime = match ? match[1] : "image/png";

    const extension = filename.split(".").pop()?.toLowerCase();
    const mimeFromFilename = extension && mimeMap[extension] ? mimeMap[extension] : defaultMime;

    const base64Data = base64.replace(/^data:\w+\/\w+;base64,/, "");

    try {
        const bstr = atob(base64Data);
        const u8arr = new Uint8Array(bstr.length);
        for (let i = 0; i < bstr.length; i++) {
            u8arr[i] = bstr.charCodeAt(i);
        }
        return new File([u8arr], filename, { type: mimeFromFilename });
    } catch (error) {
        throw new Error("Failed to decode Base64 string: base64 이미지 변환 중 오류 발생", { cause: error as Error });
    }
};

export const getFileFromUrl = async (id: string | number, name: string) => {
    const [data, type] = name.split(".");
    const url = setImgUrl(id, data, type);
    const response = await fetch(url);
    const blob = await response.blob();
    return new File([blob], `${data}.${type}`, { type: blob.type });
};
