export type City = 'Paris' | 'Cologne' | 'Brussels' | 'Amsterdam' | 'Hamburg' | 'Dusseldorf';
export type HousingType = 'apartment' | 'house' | 'room' | 'hotel';
export type Good =
  | 'Breakfast' | 'Air conditioning' | 'Laptop friendly workspace'
  | 'Baby seat' | 'Washer' | 'Towels' | 'Fridge';
export type UserType = 'обычный' | 'pro';

export type User = {
  name: string;
  email: string;
  avatarPath?: string;
  password: string;
  type: UserType;
};

export type Offer = {
  title: string;
  description: string;
  publishDate: Date;
  city: City;
  previewImage: string;
  images: string[];
  isPremium: boolean;
  isFavorite: boolean;
  rating: number;
  type: HousingType;
  rooms: number;
  guests: number;
  price: number;
  goods: Good[];
  author: User;
  commentsCount: number;
  latitude: number;
  longitude: number;
};
