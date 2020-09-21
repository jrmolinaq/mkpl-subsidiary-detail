import { RegionInterface, CityInterface } from './locations.interface';

export interface RegionList extends RegionInterface {
  cities: CityInterface[];
  collapsed: boolean;
}
