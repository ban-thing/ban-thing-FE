import { PageTitle } from "@/components/atoms/PageTitle";
import { TermsSubTitle, TermsDesc, TermDescList } from "@/components/atoms/MyPageElement";

const PersonalInfo = () => {
    return (
        <>
            <PageTitle $margin="16px 0 40px">개인정보</PageTitle>
            <TermsSubTitle>1. 개인정보의 수집 및 이용목적</TermsSubTitle>
            <TermsDesc $marginBottom="24px">
                “반띵”은 다음의 목적을 위하여 개인정보를 처리합니다. 처리하고 있는 개인정보는 다음의
                목적 이외의 용도로는 이용되지 않으며, 이용 목적이 변경되는 경우에는 「개인정보
                보호법 제18조(개인정보의 목적 외 이용·제공 제한)」에 따라 별도의 동의를 받는 등
                필요한 조치를 이행할 예정입니다.
            </TermsDesc>
            <TermDescList>
                <li>회원가입 및 관리</li>
                <li>재화 또는 서비스 제공</li>
                <li>서비스 개선</li>
                <li>회원간의 사기 및 분쟁 방지</li>
            </TermDescList>
            <TermsSubTitle>2. 처리하는 개인정보 항목</TermsSubTitle>
            <TermDescList>
                <li>
                    회원가입 및 프로필 관리
                    <br /> 수집・이용항목: 이용자 식별 정보, 랜덤 닉네임, 랜덤 프로필 사진,
                    대표지역, 추가지역, 구매내역, 판매내역, 선택적 입력정보(이용자가 직접 설정하는
                    닉네임, 이용자가 직접 설정하는 프로필 사진)
                </li>
                <li>
                    채팅
                    <br /> 수집・이용항목: 채팅 내용
                </li>
                <li>
                    지역
                    <br /> 수집・이용항목: 이용자가 설정한 대표 지역, 추가 지역
                </li>
                <li>
                    서비스 이용과정에서 자동으로 생성 및 수집
                    <br /> 서비스 이용과정에서 검색이력, 거래기록, 방문기록, 콘텐츠
                    생성・열람・추천을 포함한 서비스 이용기록, IP주소, 운영체제
                    정보・인터페이스・언어 설정과 같은 단말기 정보가 생성되어 수집될 수 있습니다.
                    서비스 이용과정에서 위치정보가 수집될 수 있습니다. 위치정보는 「위치정보의 보호
                    및 이용등에 관한 법률」 에 따라 위치정보를 수집 및 이용 하고 있습니다.
                </li>
            </TermDescList>
            <TermsSubTitle>3. 개인정보 처리 및 보유기간</TermsSubTitle>
            <TermsDesc $marginBottom="24px">
                “서비스”는 정보주체의 개인정보를 처리목적 달성에 필요한 기간 동안만 보유하고, 관련
                법령에 따른 보존기간 동안만 개인정보를 처리 및 보유합니다. 각각의 개인정보 처리 및
                보유 기간은 다음과 같습니다.
            </TermsDesc>
            <TermDescList>
                <li>
                    사용자의 개인정보: 회원 탈퇴시까지.
                    <br />※ 다만, 다음의 사유에 해당하는 경우에는 해당 사유 종료시까지 처리·보유
                    합니다.
                    <br />
                    a. 관계 법령 위반에 따른 수사, 조사 등이 진행 중인 경우에는 해당 수사, 조사 종료
                    시까지
                    <br />
                    b. 서비스 이용에 따른 채권, 채무 관계 잔존 시에는 해당 채권, 채무관계 정산
                    시까지
                    <br />
                    c. 반띵 이용 약관에 따른 서비스 이용 제재 발생 시 동일인 식별 및 부정이용방지가
                    필요한 경우
                </li>
                <li>
                    재화 또는 서비스 제공: 재화 또는 서비스 공급 완료 시까지, 또는 서비스 종료
                    시까지.
                    <br />※ 다만, 다음의 사유에 해당하는 경우에는 해당 사유 종료시까지 처리·보유
                    합니다.
                    <br />
                    a. 거래 기록(게시물 및 채팅 내용): 5년 <br />
                    b. 부정이용기록, 단말기정보, 중복가입확인정보(DI) : 제재 종료시까지(최대 5년)
                    <br />
                    c. 계약 또는 청약철회, 대금 결제, 재화 등의 공급 기록: 5년
                    <br />
                    d. 소비자 불만 또는 분쟁 처리에 관한 기록: 3년
                    <br />
                    e. 표시 광고에 관한 기록: 6개월
                    <br />
                    f. 컴퓨터 통신, 인터넷 로그 기록 자료, 접속지 추적 자료: 3개월
                    <br />
                    g. 세법이 규정하는 모든 거래에 관한 장부 및 증빙서류: 5년
                    <br />
                    i. 전자금융 거래에 관한 기록: 5년
                    <br />
                </li>
            </TermDescList>
            <TermsSubTitle>
                4. 개인위치정보의 수집ㆍ이용ㆍ제공 사실 확인 자료의 보유근거 및 보유기간
            </TermsSubTitle>
            <TermsDesc $marginBottom="40px">
                “반띵”은 「위치정보의 보호 및 이용 등에 관한 법률 제16조」 제2항에 근거하여 이용자의
                위치정보 수집ㆍ이용ㆍ제공 사실 확인 자료를 위치정보시스템에 자동으로 기록하며, 6개월
                이상 보관합니다.
            </TermsDesc>
            <TermsSubTitle>5. 개인정보의 제 3자 제공</TermsSubTitle>
            <TermsDesc $marginBottom="40px">
                “반띵”은 정보주체의 개인정보를 “1 개인정보의 수집 및 이용목적”에서 명시한 범위
                내에서만 처리하며, 정보주체의 동의 또는 법령에 따라 제3자에게 제공할 수 있습니다.
            </TermsDesc>
            <TermsSubTitle>6. 추가적인 이용・제공 판단 기준</TermsSubTitle>
            <TermsDesc $marginBottom="40px">
                “반띵”은 사용자로부터 동의를 받은 후에 동의 받는 범위 혹은 관련 법령에서 정한 범위
                내에서만 개인정보를 처리하며, 사용자의 동의 없이 개인정보를 추가적으로
                이용・제공하지 않습니다. 추후에 추가적으로 처리하는 경우가 발생한다면 당근은
                사용자에게 이를 미리 상세히 알릴 것입니다.
            </TermsDesc>
            <TermsSubTitle>7. 개인정보 파기 절차 및 방법에 관한 사항</TermsSubTitle>
            <TermsDesc $marginBottom="24px">
                “반띵”은 개인정보 보유기간의 경과, 처리목적 달성 등 개인정보가 불필요하게 되었을
                때에는 지체없이 해당 개인정보를 파기합니다. 다만, 회사 내부 방침 또는 관계 법령에서
                정한 보관기간이 있을 경우 일정 기간동안 보관 후 파기 됩니다. 또한, 사용자가 요청 시,
                개인정보는 즉시 삭제 됩니다.
            </TermsDesc>
            <TermsDesc $marginBottom="24px">
                ※ 다른법령에 따라 보존하는 개인정보의 항목과 보존근거는 “3. 개인정보 처리 및
                보유기간” 에서 확인 가능합니다. 개인정보 파기의 절차 및 방법은 다음과 같습니다.
            </TermsDesc>
            <TermDescList>
                <li>
                    파기절차
                    <br />
                    파기기준에 도달한 개인정보는 자동화된 처리를 통해 삭제하며, 해당 삭제 과정은
                    전산 시스템을 통해 관리자에게 통보됩니다. 또한, 종이 문서와 같은 비전자적 자료는
                    수동으로 세심하게 파기하여, 모든 처리 과정은 기록되고 관리되도록 합니다.
                </li>
                <li>
                    파기방법
                    <br />
                    종이에 출력된 개인정보는 분쇄기로 분쇄하거나 소각하여 파기하고, 전자적 파일
                    형태로 저장된 기록은 재생할 수 없는 기술적 방법을 사용하여 삭제합니다.
                </li>
            </TermDescList>
            <TermsSubTitle>8. 정보주체의 권리∙의무 및 행사방법</TermsSubTitle>
            <TermDescList>
                <li>
                    정보주체는 번개장터에 언제든지 개인정보 열람·정정·삭제·처리정지 요구 등의 권리를
                    행사할 수 있습니다.
                </li>
                <li>
                    “1”항에 따른 열람·정정 권리 행사는 아래와 같이 하실 수 있으며 반띵는 이에 대해
                    지체없이 조치하겠습니다.
                </li>
                <li>회원탈퇴 및 개인정보 관련 문의: 운영자 이메일 rlatnals874@gmail.com</li>
            </TermDescList>
            <TermsSubTitle>9. 권익침해 구제방법</TermsSubTitle>
            <TermsDesc $marginBottom="24px">
                정보주체는 아래의 기관을 통해 개인정보 침해에 대한 신고, 상담 등을 문의하실 수
                있습니다.
            </TermsDesc>
            <TermDescList>
                <li>
                    개인정보침해신고센터: (국번없이) 118 (
                    <a href="https://privacy.kisa.or.kr">privacy.kisa.or.kr</a>)
                </li>
                <li>
                    개인정보분쟁조정위원회: (국번없이) 1833-6972 (
                    <a href="https://www.kopico.go.kr">kopico.go.kr</a>)
                </li>
                <li>
                    대검찰청: (국번없이) 1301 (<a href="https://www.spo.go.kr/">spo.go.kr</a>)
                </li>
                <li>
                    경찰청: (국번없이) 182 (
                    <a href="https://ecrm.police.go.kr/">ecrm.cyber.go.kr</a>)
                </li>
            </TermDescList>
            <TermsSubTitle>10. 시행일</TermsSubTitle>
            <TermsDesc $marginBottom="24px">
                이 개인정보 처리방침은 2024년 12월 28일부터 적용됩니다.
            </TermsDesc>
        </>
    );
};

export default PersonalInfo;
