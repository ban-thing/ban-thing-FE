export interface Region {
    id: string;
    name: string;
}

export interface AdmVO {
    admCode: string;
    admCodeNm: string;
    lowestAdmCodeNm: string;
}

export interface ApiResponse {
    admVOList: {
        pageNo: string;
        admVOList: AdmVO[];
        totalCount: string;
        error: string;
        message: string;
        numOfRows: string;
    };
}
