// Sample dishes data for the app
import indianFood from '../indian_food.json';

export interface IDish {
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

export const dishes: IDish[] = (indianFood as Omit<IDish, 'id'>[]).map((dish, idx) => ({ ...dish, id: idx }));
export const headers:{
  name: string;
  key: keyof IDish
}[] = [{name:"Name", key:"name"},{name:"Diet", key:"diet"},{name:"Course", key:"course"},{name:"Cook Time", key:"cook_time"},{name:"Flavor", key:"flavor_profile"},{name:"State", key:"state"},{name:"Region", key:"region"}];