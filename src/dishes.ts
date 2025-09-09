// Sample dishes data for the app
import indianFood from '../indian_food.json';

export interface Dish {
  id: number;
  name: string;
  ingredients: string;
  diet: string;
  prep_time: number;
  cook_time: number;
  flavor_profile: string;
  course: string;
  state: string;
  region: string;
}

export const dishes: Dish[] = (indianFood as Omit<Dish, 'id'>[]).map((dish, idx) => ({ ...dish, id: idx }));
