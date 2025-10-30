import { MenuCategory } from './constants';

const categoryKeywords = {
  [MenuCategory.COFFEE_TEA]: ['cappuccino', 'latte', 'espresso', 'americano', 'mocha', 'café', 'coffee', 'tea'],
  [MenuCategory.BEVERAGES]: ['juice', 'shake', 'soda', 'cold drink', 'water', 'lime soda', 'frappe'],
  [MenuCategory.SANDWICHES]: ['sandwich', 'burger'],
  [MenuCategory.PASTRIES]: ['muffin', 'brownie', 'cookies', 'packet', 'roll', 'truffle', 'icecream', 'croissant'],
  [MenuCategory.SNACKS]: ['samosa', 'kachori', 'patty', 'omllette', 'egg', 'maggi', 'chips', 'peanut', 'kulcha'],
  [MenuCategory.MISC]: [], // Serves as the default category
};

const categorizeItem = name => {
  const lowerName = name.toLowerCase();
  for (const [category, keywords] of Object.entries(categoryKeywords)) {
    if (category === MenuCategory.MISC) continue;
    if (keywords.some(keyword => lowerName.includes(keyword))) {
      return category;
    }
  }
  return MenuCategory.MISC;
};

const rawMenu = [
  { name: 'Cappuccino', price: 219 }, { name: 'Polo Tea', price: 50 }, { name: 'Café latte', price: 199 },
  { name: 'Orange Juice', price: 160 }, { name: 'Bread Omllette with Cheese', price: 259 }, { name: 'Bread Omllette', price: 229 },
  { name: 'Kachori', price: 69 }, { name: 'cookies', price: 20 }, { name: 'Peanut', price: 10 },
  { name: 'Samosa', price: 50 }, { name: 'Brownie with Icecream', price: 120 }, { name: 'Brownie', price: 129 },
  { name: 'Veg Bread Patty', price: 110 }, { name: 'Chips', price: 10 }, { name: 'Maggie', price: 169 },
  { name: 'Chicken Tikka Sandwich', price: 269 }, { name: 'Mosambi Juice', price: 160 }, { name: 'Boiled Egg', price: 79 },
  { name: 'Healthy Veg Sandwich', price: 189 }, { name: 'Nutty Bunch', price: 50 }, { name: 'Cold Drink', price: 25 },
  { name: 'Paneer Kulcha', price: 229 }, { name: 'Aloo Kachori', price: 129 }, { name: 'Café Americano', price: 189 },
  { name: 'Cold coffee', price: 189 }, { name: 'Walnut Muffin', price: 139 }, { name: 'Paneer Sandwich', price: 189 },
  { name: 'Cucumber Sandwich', price: 99 }, { name: 'Kitkat Shake', price: 239 }, { name: 'Brownie Shake', price: 189 },
  { name: 'Omelette', price: 90 }, { name: 'Chicken Seek Sandwich', price: 130 }, { name: 'Tomato Cheese Sandwich', price: 139 },
  { name: 'Truffle', price: 120 }, { name: 'Chocolate packet', price: 120 }, { name: 'Blueberry Muffin', price: 139 },
  { name: 'Iced Americano', price: 199 }, { name: 'Frappe', price: 209 }, { name: 'Egg Sandwich', price: 85 },
  { name: 'Oreo Shake', price: 199 }, { name: 'Espresso single shot', price: 120 }, { name: 'Water', price: 20 },
  { name: 'Lime soda', price: 150 }, { name: 'Green Tea', price: 80 }, { name: 'Polo Chicken Sandwich', price: 229 },
  { name: 'Lemonade', price: 120 }, { name: 'Veg Burger', price: 110 }, { name: 'Café Mocha', price: 160 },
];

export const MENU_ITEMS = rawMenu.map((item, index) => ({
  id: index + 1,
  name: item.name,
  price: item.price,
  category: categorizeItem(item.name),
  imageUrl: `https://picsum.photos/seed/${item.name.replace(/\s/g, '')}/200/200`,
}));

export const salesData = [
  { saleId: 'cd02c382', date: '2025-04-28', itemName: 'Polo Tea', quantity: 7, pricePerUnit: 50, staff: 'Preeti' },
  { saleId: '9de27dfb', date: '2025-06-02', itemName: 'Bread Omllette with Cheese', quantity: 1, pricePerUnit: 259, staff: 'Sashikant' },
  { saleId: '865e9eb1', date: '2025-06-02', itemName: 'Chicken Tikka Sandwich', quantity: 18, pricePerUnit: 269, staff: 'Preeti' },
  { saleId: 'e2977cc6', date: '2025-06-02', itemName: 'Veg Bread Patty', quantity: 12, pricePerUnit: 110, staff: 'Preeti' },
  { saleId: '53890cea', date: '2025-06-06', itemName: 'Veg Bread Patty', quantity: 12, pricePerUnit: 110, staff: 'Preeti' },
  { saleId: '4ed20d37', date: '2025-06-06', itemName: 'Veg Bread Patty', quantity: 12, pricePerUnit: 110, staff: 'Preeti' },
  { saleId: '91321d80', date: '2025-05-27', itemName: 'Polo Tea', quantity: 10, pricePerUnit: 50, staff: null },
  { saleId: '23f0e884', date: '2025-06-16', itemName: 'Paneer Sandwich', quantity: 11, pricePerUnit: 189, staff: 'Preeti' },
  { saleId: '3daee9a7', date: '2025-06-18', itemName: 'cookies', quantity: 12, pricePerUnit: 20, staff: 'Preeti' },
  { saleId: '58b47ce0', date: '2025-06-27', itemName: 'Polo Tea', quantity: 10, pricePerUnit: 50, staff: 'Preeti' },
  { saleId: 'e2baaca8', date: '2025-06-19', itemName: 'Paneer Sandwich', quantity: 8, pricePerUnit: 189, staff: 'Preeti' },
  { saleId: 'bfff4624', date: '2025-06-06', itemName: 'Boiled Egg', quantity: 8, pricePerUnit: 79, staff: 'Preeti' },
  { saleId: '83efe3f2', date: '2025-06-06', itemName: 'Boiled Egg', quantity: 8, pricePerUnit: 79, staff: 'Preeti' },
  { saleId: 'a874ff77', date: '2025-06-02', itemName: 'Mosambi Juice', quantity: 8, pricePerUnit: 160, staff: 'Preeti' },
  { saleId: '94b79452', date: '2025-06-23', itemName: 'cookies', quantity: 8, pricePerUnit: 20, staff: 'Preeti' },
  { saleId: 'eb4e4a5f', date: '2025-06-25', itemName: 'Paneer Sandwich', quantity: 7, pricePerUnit: 189, staff: 'Preeti' },
  { saleId: 'd4e85e28', date: '2025-06-27', itemName: 'Polo Tea', quantity: 8, pricePerUnit: 50, staff: 'Preeti' },
  { saleId: 'de6523f2', date: '2025-09-20', itemName: 'Polo Tea', quantity: 7, pricePerUnit: 50, staff: 'Sashikant' },
  { saleId: '1d312f8d', date: '2025-06-02', itemName: 'Brownie', quantity: 6, pricePerUnit: 129, staff: 'Preeti' },
  { saleId: 'ca9ef147', date: '2025-09-04', itemName: 'Polo Tea', quantity: 9, pricePerUnit: 50, staff: 'Preeti' },
  { saleId: '616b309a', date: '2025-05-29', itemName: 'Polo Tea', quantity: 9, pricePerUnit: 50, staff: null },
  { saleId: '4496ff41', date: '2025-09-04', itemName: 'Polo Tea', quantity: 2, pricePerUnit: 50, staff: 'Soni' },
  { saleId: '62cd9afc', date: '2025-09-05', itemName: 'Cappuccino', quantity: 2, pricePerUnit: 219, staff: 'Sashikant' },
  { saleId: 'd501fdcd', date: '2025-05-01', itemName: 'Polo Tea', quantity: 2, pricePerUnit: 50, staff: 'Sashikant' },
  { saleId: '090dad56', date: '2025-05-01', itemName: 'Cappuccino', quantity: 5, pricePerUnit: 219, staff: 'Sashikant' },
  { saleId: '002f135f', date: '2025-09-04', itemName: 'Healthy Veg Sandwich', quantity: 2, pricePerUnit: 189, staff: 'Soni' },
  { saleId: 'eaf4c54f', date: '2025-04-29', itemName: 'Samosa', quantity: 2, pricePerUnit: 50, staff: 'Sashikant' },
  { saleId: '2a7daa39', date: '2025-09-04', itemName: 'Paneer Sandwich', quantity: 3, pricePerUnit: 189, staff: 'Soni' },
  { saleId: '60565f33', date: '2025-06-21', itemName: 'Healthy Veg Sandwich', quantity: 2, pricePerUnit: 189, staff: 'Preeti' }, // Corrected price from 378 to 189
  { saleId: 'fa97b9cc', date: '2025-06-21', itemName: 'Paneer Sandwich', quantity: 2, pricePerUnit: 189, staff: 'Preeti' },
  { saleId: 'd0e3d4fd', date: '2025-06-23', itemName: 'Polo Tea', quantity: 2, pricePerUnit: 50, staff: 'Preeti' },
  { saleId: '0d1b3352', date: '2025-06-23', itemName: 'Paneer Sandwich', quantity: 4, pricePerUnit: 189, staff: 'Preeti' },
];
