interface ICommonResponse {
  totalCount: string; // 총 검색 데이터수
  currentPage: number; // 페이지 번호
  countPerPage: number; // 페이지당 출력할 결과 Row 수
  errorCode?: string;
  errorMessage?: string;
}

interface IJusoResponse {
  roadAddr: string; // 전체 도로명주소
  roadAddrPart1: string; // 도로명주소 (참고항목 제외)
  roadAddrPart2?: string; // 도로명주소 참고항목
  jibunAddr: string; // 지번주소
  engAddr?: string; // 도로명주소(영문)
  zipNo: string; // 우편번호
  admCd: string; // 행정구역코드
  rnMgtSn: string; // 도로명코드
  bdMgtSn: string; // 건물관리번호
  detBdNmList?: string; // 상세건물명
  bdNm?: string; // 건물명
  bdKdcd: string; // 공동주택여부(1: 공동주택, 0: 비공동주택)
  siNm: string; // 시도명
  sggNm: string; // 시군구명
  emdNm: string; // 읍면동명
  liNm?: string; // 법정리명
  rn: string; // 도로명
  buldMnnm?: number; // 건물본번
  buldSlno?: number; // 건물부번
  udrtYn: string; // 지하여부(0: 지상, 1: 지하)
  mtYn: string; // 산여부(0 : 대지, 1 : 산)
}

export interface ISearchAddressResponse {
  common: ICommonResponse;
  juso: IJusoResponse[];
}
