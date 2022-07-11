import {Status} from '../../enum/status';
import {FacilityDto} from './customDto';

export interface PropertyFacilityDto {
  facilityDto: FacilityDto;
  status: Status;
}
