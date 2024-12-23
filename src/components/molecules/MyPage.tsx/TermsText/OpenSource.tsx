import { PageTitle } from "@/components/atoms/PageTitle";
import { TermsSubTitle, TermsDesc, TermDescList } from "@/components/atoms/MyPageElement";

const VersionInfo = () => {
    return (
        <>
            <PageTitle $margin="16px 0 40px">오픈소스 라이선스</PageTitle>
            <TermsSubTitle>Front-end</TermsSubTitle>
            <TermDescList>
                <li>
                    React Vite <br />
                    <a href="https://ko.vite.dev/" target="_blank">
                        https://ko.vite.dev/
                    </a>
                </li>
                <li>
                    Styled component
                    <br />
                    <a href="https://styled-components.com/" target="_blank">
                        https://styled-components.com/
                    </a>
                </li>
                <li>
                    zustand
                    <br />
                    <a href="https://zustand-demo.pmnd.rs/" target="_blank">
                        https://zustand-demo.pmnd.rs/
                    </a>
                </li>
            </TermDescList>
            <TermsSubTitle>Back-end</TermsSubTitle>
            <TermDescList>
                <li>
                    Spring Boot: Apache License 2.0 <br />
                    <a
                        href="https://github.com/spring-projects/spring-boot/blob/main/LICENSE.txt"
                        target="_blank"
                    >
                        https://github.com/spring-projects/spring-boot/blob/main/LICENSE.txt
                    </a>
                </li>
                <li>
                    MySQL: GPL 2.0
                    <br />
                    <a
                        href="https://github.com/mysql/mysql-server?tab=License-1-ov-file"
                        target="_blank"
                    >
                        https://github.com/mysql/mysql-server?tab=License-1-ov-file
                    </a>
                </li>
                <li>
                    Docker : Apache License 2.0
                    <br />
                    <a href="https://github.com/moby/moby/blob/master/LICENSE" target="_blank">
                        https://github.com/moby/moby/blob/master/LICENSE
                    </a>
                </li>
                <li>
                    Github actions : MIT License
                    <br />
                    <a href="https://github.com/actions/runner/blob/main/LICENSE" target="_blank">
                        https://github.com/actions/runner/blob/main/LICENSE
                    </a>
                </li>
            </TermDescList>
            <TermsSubTitle>Kakao login REST API</TermsSubTitle>
            <TermsDesc $marginBottom="40px">
                “반띵”은 Kakao REST API를 사용하여 카카오톡 로그인 및 기타 관련 기능을 제공합니다.
                <br />
                <br />
                [Kakao Developers Documentation]
                <br />
                <a href="https://developers.kakao.com" target="_blank">
                    https://developers.kakao.com
                </a>
                <br />
                <br />
                [Kakao Developers Terms of Service]
                <br />
                <a href="https://developers.kakao.com/terms/latest/ko/site-terms" target="_blank">
                    https://developers.kakao.com/terms/latest/ko/site-terms
                </a>
            </TermsDesc>
            <TermsSubTitle>CREDIT</TermsSubTitle>
            <TermsDesc $marginBottom="40px">
                GITHUB <br />
                <a href="https://github.com/ban-thing/ban-thing-FE" target="_blank">
                    https://github.com/ban-thing/ban-thing-FE
                </a>
                <br />
                <a href="https://github.com/ban-thing/ban-thing-BE" target="_blank">
                    https://github.com/ban-thing/ban-thing-BE
                </a>
                <br />
                <br />
                SWYP
                <br />
                <a href="https://swyp.swyg.im/" target="_blank">
                    https://swyp.swyg.im/
                </a>
            </TermsDesc>
        </>
    );
};

export default VersionInfo;
