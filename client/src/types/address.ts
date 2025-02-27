interface Coordinate {
  address: string;
  lat: string;
  lng: string;
}

interface Address {
  address: string;
  roadAddress: string;
  englishAddress?: string;
  zipCode?: string;
}

export type { Address, Coordinate };
