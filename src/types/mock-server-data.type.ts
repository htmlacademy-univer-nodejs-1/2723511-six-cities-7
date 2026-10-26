import { City, Good, HousingType, UserType } from './offer.type.js';

export type MockServerData = {
  titles: string[];
  descriptions: string[];
  cities: City[];
  previewImages: string[];
  images: string[];
  housingTypes: HousingType[];
  goods: Good[];
  users: { name: string; email: string; avatarPath: string }[];
  userTypes: UserType[];
};
