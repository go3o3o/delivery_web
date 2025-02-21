export enum AnalyzeType {
  // (default) 입력한 건물명과 일부만 매칭된 경우에도 확장된 검색 결과 제공
  Similar = 'similar',
  // 입력한 건물명과 정확히 일치하는 검새 결과 제공
  Exact = 'exact',
}

interface IMetaResponse {
  total_count: number; // 검색어에 검색된 문서 수
  pageable_count: number; // total_count 중 노출 가능 문서 수
  is_end: boolean;
}

interface IDocumentResponse {
  address_name: string;
  address_type: string;
  y: string; // 위도(lat)
  x: string; // 경도(lng)
  address: {
    address_name: string;
    region_1depth_name: string; // 시도 단위
    region_2depth_name: string; // 구 단위
    region_3depth_name: string; // 동 단위
    region_3depth_h_name?: string; // 행정동 명칭
    h_code: string; // 행정 코드
    b_code: string; // 법정 코드
    mountain_yn: string; // 산 여부
    x: string;
    y: string;
  };
  road_address: {
    address_name: string;
    region_1depth_name: string; // 지역명1
    region_2depth_name: string; // 지역명2
    region_3depth_name: string; // 지역명3
    road_name: string; // 도로명
    underground_yn: string; // 지하 여부
    main_building_no: string; // 건물 본번
    sub_building_no?: string; // 건물 부번
    building_name?: string; // 건물 이름
    zone_no?: string; // 우편번호
    x: string;
    y: string;
  };
}

export interface IAddressToCoordinateRequest {
  query: string;
  analyze_type?: AnalyzeType;
  page?: number;
  size: number;
}

export interface IAddressToCoordinateResponse {
  meta: IMetaResponse;
  documents: IDocumentResponse[];
}
