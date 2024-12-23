export const imageUrl = "https://kr.object.ncloudstorage.com/banthing-images/itemImage";

export const setImgUrl = (id: string | number, data: string, type: string) => {
    return `${imageUrl}/${id}/${data}.${type}`;
};

export const setImg64 = (string: string) => {
    return `data:image/png;base64,${string}`;
};

export const base64ToFile = (base64: string, filename = "imgFile"): File => {
    // base64 데이터에서 MIME 타입 추출
    const match = base64.match(/^data:(\w+\/\w+);base64,/);
    const mime = match ? match[1] : "image/png";

    // base64 데이터에서 실제 base64 문자열 추출
    const base64Data = base64.replace(/^data:\w+\/\w+;base64,/, "");

    try {
        const bstr = atob(base64Data);
        let n = bstr.length;
        const u8arr = new Uint8Array(n);

        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new File([u8arr], filename, { type: mime });
    } catch (error) {
        throw new Error("Failed to decode Base64 string. Ensure it is correctly encoded.");
    }
};

export const getFileFromUrl = async (id: string | number, name: string) => {
    const [data, type] = name.split(".");
    const url = setImgUrl(id, data, type);
    const response = await fetch(url, {
        method: "GET",
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch file: ${response.statusText}`);
    }

    const blob = await response.blob();
    return new File([blob], `${data}.${type}`, { type: blob.type });
};
