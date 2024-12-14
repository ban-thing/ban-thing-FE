export const imageUrl = "https://kr.object.ncloudstorage.com/banthing-images/itemImage";

export const setImgUrl = (id: string | number, data: string, type: string) => {
    return `${imageUrl}/${id}/${data}.${type}`;
};

export const setImg64 = (string: string) => {
    return `data:image/png;base64,${string}`;
};
