export type MenuItem = {
  id: number;
  name: string;
  category: string;
  description: string;
  price: number;
  image: string;
  tag?: string;
};

export const menu: MenuItem[] = [
  { id: 1, name: 'Jiko Breakfast Board', category: 'Breakfast', description: 'Kaimati, eggs, grilled tomato, smokies & Kenyan chai.', price: 780, image: 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?auto=format&fit=crop&w=900&q=85', tag: 'Morning favourite' },
  { id: 2, name: 'Swahili Coconut Beans', category: 'Breakfast', description: 'Slow-cooked maharagwe, turmeric rice and house kachumbari.', price: 690, image: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=85' },
  { id: 3, name: 'Coastal Pilau', category: 'Mains', description: 'Fragrant spiced rice, braised beef, kachumbari and mango pickle.', price: 980, image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=900&q=85', tag: 'Jiko classic' },
  { id: 4, name: 'Githeri Power Bowl', category: 'Mains', description: 'Heritage beans, maize, sukuma, avocado and chilli oil.', price: 820, image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=900&q=85' },
  { id: 5, name: 'Nyama Choma Platter', category: 'Grills', description: 'Charcoal-grilled goat, ugali, greens and smoky kachumbari.', price: 1650, image: 'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?auto=format&fit=crop&w=900&q=85', tag: 'Feeds two' },
  { id: 6, name: 'Tamarind Chicken', category: 'Grills', description: 'Fire-roasted chicken, tamarind glaze, cassava and greens.', price: 1280, image: 'https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?auto=format&fit=crop&w=900&q=85' },
  { id: 7, name: 'Jiko Chapati', category: 'Sides', description: 'Warm, flaky chapati brushed with cardamom ghee.', price: 180, image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=900&q=85' },
  { id: 8, name: 'Sukuma & Garlic', category: 'Sides', description: 'Market greens, caramelised onion and fresh lemon.', price: 320, image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=85' },
  { id: 9, name: 'Tropical Dawa', category: 'Drinks', description: 'Lime, honey, ginger, mint and a bright passionfruit finish.', price: 450, image: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&w=900&q=85' },
  { id: 10, name: 'Spiced Hibiscus Iced Tea', category: 'Drinks', description: 'Rosella, orange peel, cloves and ginger — served cold.', price: 390, image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=900&q=85' },
  { id: 11, name: 'Cardamom Mandazi', category: 'Desserts', description: 'Pillowy fried dough, chai caramel and toasted sesame.', price: 460, image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=900&q=85' },
  { id: 12, name: 'Mango & Coconut Tart', category: 'Desserts', description: 'Silky coconut custard, fresh mango and a buttery crust.', price: 520, image: 'https://images.unsplash.com/photo-1576610616656-d3aa5d1f4534?auto=format&fit=crop&w=900&q=85' },
  { id: 13, name: 'Mombasa Fish Curry', category: 'Specials', description: 'Line-caught fish in a rich coconut, tomato and lime curry.', price: 1420, image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=900&q=85', tag: 'Today only' },
];
