export const categories = {
  'Food': ['Couscous', 'Tagine', 'Pastilla', 'Harira', 'Msemen', 'Baghrir', 'Chebakia', 'Seffa', 'Rfissa', 'Tanjia', 'Zaalouk', 'Taklia'],
  'Animals': ['Lion', 'Camel', 'Horse', 'Rabbit', 'Cat', 'Dog', 'Donkey', 'Cow', 'Sheep', 'Chicken', 'Snake', 'Scorpion'],
  'Professions': ['Carpenter', 'Doctor', 'Engineer', 'Teacher', 'Policeman', 'Farmer', 'Tailor', 'Barber', 'Merchant', 'Driver', 'Builder', 'Butcher'],
  'Places': ['Jemaa el-Fnaa', 'School', 'Hospital', 'Market', 'Sea', 'Mountain', 'Desert', 'Forest', 'House', 'Cafe', 'Cinema'],
  'Movies': ['The Message', 'Casanegra', 'Ali Zaoua', 'Road to Kabul', 'Zero', 'A Mile in My Shoes', 'Finding a Husband for My Wife', 'Marock', 'Khnifist Rmad', 'A Moment of Darkness'],
  'Objects': ['Table', 'Chair', 'Glass', 'Plate', 'Knife', 'Fork', 'Phone', 'Key', 'Book', 'Pen', 'Glasses'],
  'Sports': ['Football', 'Basketball', 'Tennis', 'Swimming', 'Running', 'Equestrianism', 'Boxing', 'Skiing', 'Volleyball'],
  'Celebrities': ['Gad Elmaleh', 'Dounia Batma', 'Saad Lamjarred', 'Hatim Ammor', 'Rachid El Ouali', 'Hassan El Fad', 'Jamel Debbouze', 'Asma Lmnawar'],
  'Home Appliances': ['Refrigerator', 'Oven', 'Washing Machine', 'Television', 'Broom', 'Iron', 'Kettle', 'Pressure Cooker'],
  'Vehicles': ['Car', 'Motorcycle', 'Bicycle', 'Bus', 'Taxi', 'Truck', 'Tractor', 'Train'],
  'Plants': ['Tree', 'Flower', 'Mint', 'Olive', 'Palm Tree', 'Grass', 'Cactus', 'Fig', 'Pomegranate'],
  'Technology': ['Computer', 'Smartphone', 'Internet', 'Application', 'Email', 'Printer', 'Wi-Fi', 'Charger'],
  'Hobbies': ['Reading', 'Painting', 'Music', 'Cooking', 'Traveling', 'Fishing', 'Photography', 'Gardening'],
  'Moroccan Traditions': ['Wedding', 'Henna', 'Caftan', 'Djellaba', 'Ashura', 'Ramadan', 'Eid al-Adha', 'Sebou'],
  'Moroccan Cities': ['Casablanca', 'Marrakech', 'Fes', 'Rabat', 'Tangier', 'Agadir', 'Meknes', 'Oujda', 'Tetouan', 'Chefchaouen'],
};

export type Category = keyof typeof categories;

export const categoryNames = Object.keys(categories) as Category[];
