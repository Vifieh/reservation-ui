export interface RecommenderDto {
  Average_Score: AverageScoreDto
  Hotel_Address: HotelAddressDto;
  Hotel_Name: HotelNameDto;
}

export interface AverageScoreDto {
  id: string;
  name: string;
}

export interface HotelAddressDto {
  id: string;
  name: string;
}
export interface HotelNameDto {
  name: string;
}
