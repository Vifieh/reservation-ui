import {PropertyAddressDto} from './propertyDto';
import {FileInfoDto} from './fileInfoDto';

export interface CityDto {
  id: string;
  name: string;
  propertyAddressDtoList: PropertyAddressDto[]
  fileInfoList: FileInfoDto[]
}
