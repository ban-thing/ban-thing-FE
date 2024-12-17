import { Cookies } from "react-cookie";

const cookies = new Cookies();

export const setCookie = (name: string, value: string, options?: any) => {
    return cookies.set(name, value, { ...options });
};

export const getCookie = (name: string) => {
    return cookies.get(name);
};

export const removeCookie = (name: string) => {
    cookies.remove(name);
};

export const getAllCookiesByName = (name: string) => {
    const cookiesString = document.cookie;
    const cookiesArray = cookiesString.split("; ");
    console.log(cookiesArray, "쿠키 배열");

    // 같은 이름의 쿠키 필터링
    const matchedCookies = cookiesArray
        .filter((cookie) => cookie.startsWith(`${name}=`))
        .map((cookie) => {
            const [_, value] = cookie.split("=");
            return decodeURIComponent(value);
        });

    return matchedCookies;
};

export const removeAllCookiesByName = (name: string) => {
    const cookiesString = document.cookie;
    const cookiesArray = cookiesString.split("; ");

    // 같은 이름의 쿠키를 필터링
    const matchedCookies = cookiesArray.filter((cookie) => cookie.startsWith(`${name}=`));

    // 쿠키 삭제 (만료 날짜를 과거로 설정)
    matchedCookies.forEach((_) => {
        document.cookie = `${name}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
        console.log(`${name} 쿠키 삭제 완료`);
    });
};
