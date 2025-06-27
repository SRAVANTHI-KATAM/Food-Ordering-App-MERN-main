import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

// MongoDB connection
const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/foodDelivery', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
};

// Schema definitions
const userSchema = new mongoose.Schema({
    username: {type: String},
    password: {type: String},
    email: {type: String},
    usertype: {type: String},
    approval: {type: String}
});

const adminSchema = new mongoose.Schema({
    categories: {type: Array},
    promotedRestaurants: []
});

const restaurantSchema = new mongoose.Schema({
    ownerId: {type: String},
    title: {type: String},
    address: {type: String},
    mainImg: {type: String},
    menu: {type: Array, default: []}
});

const foodItemSchema = new mongoose.Schema({
    title: {type: String},
    description: {type: String},
    itemImg: {type: String},
    category: {type: String},
    menuCategory: {type: String},
    restaurantId: {type: String},
    price: {type: Number},
    discount: {type: Number},
    rating: {type: Number}
});

const orderSchema = new mongoose.Schema({
    userId: {type: String},
    name: {type: String},
    email: {type: String},
    mobile: {type: String},
    address: {type: String},
    pincode: {type: String},
    restaurantId: {type: String},
    restaurantName: {type: String},
    foodItemId: {type: String},
    foodItemName: {type: String},
    foodItemImg: {type: String},
    quantity: {type: Number},
    price: {type: Number},
    discount: {type: Number},
    paymentMethod: {type: String},
    orderDate: {type: String},
    orderStatus: {type: String, default: 'order placed'}
});

const cartSchema = new mongoose.Schema({
    userId: {type: String},
    restaurantId: {type: String},
    restaurantName: {type: String},
    foodItemId: {type: String},
    foodItemName: {type: String},
    foodItemImg: {type: String},
    quantity: {type: Number},
    price: {type: Number},
    discount: {type: Number}
});

// Models
const User = mongoose.model('users', userSchema);
const Admin = mongoose.model('admin', adminSchema);
const Restaurant = mongoose.model('restaurant', restaurantSchema);
const FoodItem = mongoose.model('foodItem', foodItemSchema);
const Orders = mongoose.model('orders', orderSchema);
const Cart = mongoose.model('cart', cartSchema);

// Utility functions
const hashPassword = async (password) => {
    return await bcrypt.hash(password, 10);
};

const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getRandomFloat = (min, max, decimals = 1) => {
    return parseFloat((Math.random() * (max - min) + min).toFixed(decimals));
};

const getRandomElement = (array) => {
    return array[Math.floor(Math.random() * array.length)];
};

// Enhanced Sample Data
const customerUsers = [
    { name: 'John Smith', email: 'john.smith@gmail.com', password: 'customer123' },
    { name: 'Sarah Johnson', email: 'sarah.johnson@yahoo.com', password: 'customer123' },
    { name: 'Michael Brown', email: 'michael.brown@outlook.com', password: 'customer123' },
    { name: 'Emily Davis', email: 'emily.davis@gmail.com', password: 'customer123' },
    { name: 'David Wilson', email: 'david.wilson@hotmail.com', password: 'customer123' },
    { name: 'Jessica Martinez', email: 'jessica.martinez@gmail.com', password: 'customer123' },
    { name: 'Robert Taylor', email: 'robert.taylor@yahoo.com', password: 'customer123' },
    { name: 'Amanda Anderson', email: 'amanda.anderson@gmail.com', password: 'customer123' }
];

const restaurantData = [
    {
        owner: { name: 'Giuseppe Romano', email: 'giuseppe@dominos.com', password: 'owner123' },
        restaurant: {
            title: "Domino's Pizza",
            address: "123 Main Street, Downtown, Mumbai 400001",
            mainImg: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&h=600&fit=crop",
            menuCategories: ['Pizza', 'Sides', 'Beverages', 'Desserts']
        }
    },
    {
        owner: { name: 'Rajesh Kumar', email: 'rajesh@burgerking.com', password: 'owner123' },
        restaurant: {
            title: "Burger King",
            address: "456 Commercial Road, Andheri West, Mumbai 400058",
            mainImg: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&h=600&fit=crop",
            menuCategories: ['Burgers', 'Chicken', 'Sides', 'Beverages', 'Desserts']
        }
    },
    {
        owner: { name: 'Priya Sharma', email: 'priya@kfc.com', password: 'owner123' },
        restaurant: {
            title: "KFC",
            address: "789 Link Road, Bandra West, Mumbai 400050",
            mainImg: "https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?w=800&h=600&fit=crop",
            menuCategories: ['Chicken', 'Burgers', 'Wraps', 'Sides', 'Beverages']
        }
    },
    {
        owner: { name: 'Chen Wei', email: 'chen@pandaexpress.com', password: 'owner123' },
        restaurant: {
            title: "Panda Express",
            address: "321 Hill Road, Bandra West, Mumbai 400050",
            mainImg: "https://images.unsplash.com/photo-1617093727343-374698b1b08d?w=800&h=600&fit=crop",
            menuCategories: ['Chinese', 'Rice', 'Noodles', 'Beverages']
        }
    },
    {
        owner: { name: 'Ahmed Hassan', email: 'ahmed@subway.com', password: 'owner123' },
        restaurant: {
            title: "Subway",
            address: "654 SV Road, Malad West, Mumbai 400064",
            mainImg: "https://images.unsplash.com/photo-1579952363873-27d3bfad9c0d?w=800&h=600&fit=crop",
            menuCategories: ['Sandwiches', 'Salads', 'Wraps', 'Sides', 'Beverages']
        }
    },
    {
        owner: { name: 'Maria Rodriguez', email: 'maria@tacobell.com', password: 'owner123' },
        restaurant: {
            title: "Taco Bell",
            address: "987 Turner Road, Bandra West, Mumbai 400050",
            mainImg: "https://images.unsplash.com/photo-1565299585323-38174c4a6cf4?w=800&h=600&fit=crop",
            menuCategories: ['Mexican', 'Tacos', 'Burritos', 'Sides', 'Beverages']
        }
    },
    {
        owner: { name: 'Vikram Singh', email: 'vikram@haldirams.com', password: 'owner123' },
        restaurant: {
            title: "Haldiram's",
            address: "147 Linking Road, Khar West, Mumbai 400052",
            mainImg: "https://images.unsplash.com/photo-1596797038530-2c107229654b?w=800&h=600&fit=crop",
            menuCategories: ['Indian', 'Sweets', 'Snacks', 'Thali', 'Beverages']
        }
    },
    {
        owner: { name: 'Lisa Thompson', email: 'lisa@starbucks.com', password: 'owner123' },
        restaurant: {
            title: "Starbucks",
            address: "258 Carter Road, Bandra West, Mumbai 400050",
            mainImg: "https://images.unsplash.com/photo-1521017432531-fbd92d768814?w=800&h=600&fit=crop",
            menuCategories: ['Coffee', 'Beverages', 'Pastries', 'Sandwiches', 'Desserts']
        }
    },
    {
        owner: { name: 'Takeshi Yamamoto', email: 'takeshi@sushizone.com', password: 'owner123' },
        restaurant: {
            title: "Sushi Zone",
            address: "369 Juhu Tara Road, Juhu, Mumbai 400049",
            mainImg: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=800&h=600&fit=crop",
            menuCategories: ['Sushi', 'Japanese', 'Sashimi', 'Rolls', 'Beverages']
        }
    },
    {
        owner: { name: 'Elena Rossi', email: 'elena@pizzahut.com', password: 'owner123' },
        restaurant: {
            title: "Pizza Hut",
            address: "741 Western Express Highway, Goregaon East, Mumbai 400063",
            mainImg: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=800&h=600&fit=crop",
            menuCategories: ['Pizza', 'Pasta', 'Sides', 'Desserts', 'Beverages']
        }
    }
];

// Comprehensive food items data with realistic prices and high-quality images
const foodItemsData = {
    'Pizza': [
        { name: 'Margherita Pizza', price: 349, image: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=500&h=400&fit=crop', description: 'Classic pizza with fresh mozzarella, tomato sauce, and basil leaves', category: 'Veg' },
        { name: 'Pepperoni Pizza', price: 449, image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=500&h=400&fit=crop', description: 'Loaded with pepperoni slices and mozzarella cheese', category: 'Non Veg' },
        { name: 'BBQ Chicken Pizza', price: 529, image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500&h=400&fit=crop', description: 'Grilled chicken with BBQ sauce, onions, and bell peppers', category: 'Non Veg' },
        { name: 'Veggie Supreme', price: 399, image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=500&h=400&fit=crop', description: 'Loaded with fresh vegetables, olives, and cheese', category: 'Veg' },
        { name: 'Cheese Burst Pizza', price: 479, image: 'https://images.unsplash.com/photo-1555072956-7758afb20e8f?w=500&h=400&fit=crop', description: 'Pizza with cheese-filled crust and extra mozzarella', category: 'Veg' }
    ],
    'Burgers': [
        { name: 'Whopper', price: 279, image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&h=400&fit=crop', description: 'Flame-grilled beef patty with lettuce, tomato, onion, and mayo', category: 'Non Veg' },
        { name: 'Chicken Maharaja Mac', price: 249, image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=500&h=400&fit=crop', description: 'Double chicken patty with special sauce and fresh vegetables', category: 'Non Veg' },
        { name: 'Veggie Burger', price: 199, image: 'https://images.unsplash.com/photo-1520072959219-c595dc870360?w=500&h=400&fit=crop', description: 'Plant-based patty with fresh lettuce, tomato, and mayo', category: 'Veg' },
        { name: 'Fish Burger', price: 229, image: 'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=500&h=400&fit=crop', description: 'Crispy fish fillet with tartar sauce and lettuce', category: 'Non Veg' },
        { name: 'Double Cheese Burger', price: 319, image: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=500&h=400&fit=crop', description: 'Double beef patty with extra cheese and special sauce', category: 'Non Veg' }
    ],
    'Chicken': [
        { name: 'Original Recipe Chicken', price: 179, image: 'https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?w=500&h=400&fit=crop', description: '11 herbs and spices fried chicken - KFC original', category: 'Non Veg' },
        { name: 'Hot & Crispy Chicken', price: 189, image: 'https://images.unsplash.com/photo-1562967914-608f82629710?w=500&h=400&fit=crop', description: 'Spicy and crispy fried chicken with hot sauce', category: 'Non Veg' },
        { name: 'Chicken Popcorn', price: 149, image: 'https://images.unsplash.com/photo-1610057099431-d73a1c9d2f2f?w=500&h=400&fit=crop', description: 'Bite-sized crispy chicken pieces - perfect for sharing', category: 'Non Veg' },
        { name: 'Grilled Chicken', price: 229, image: 'https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=500&h=400&fit=crop', description: 'Healthy grilled chicken breast with herbs and spices', category: 'Non Veg' },
        { name: 'Buffalo Wings', price: 259, image: 'https://images.unsplash.com/photo-1527477396000-e27163b481c2?w=500&h=400&fit=crop', description: 'Spicy buffalo chicken wings with blue cheese dip', category: 'Non Veg' }
    ],
    'Chinese': [
        { name: 'Fried Rice', price: 189, image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=500&h=400&fit=crop', description: 'Wok-fried rice with vegetables and your choice of protein', category: 'Veg' },
        { name: 'Chicken Chow Mein', price: 219, image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=500&h=400&fit=crop', description: 'Stir-fried noodles with chicken and vegetables', category: 'Non Veg' },
        { name: 'Sweet & Sour Chicken', price: 249, image: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=500&h=400&fit=crop', description: 'Crispy chicken in tangy sweet and sour sauce', category: 'Non Veg' },
        { name: 'Kung Pao Chicken', price: 239, image: 'https://images.unsplash.com/photo-1596797038530-2c107229654b?w=500&h=400&fit=crop', description: 'Spicy Sichuan dish with chicken, peanuts, and chili', category: 'Non Veg' },
        { name: 'Vegetable Spring Rolls', price: 149, image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=500&h=400&fit=crop', description: 'Crispy rolls filled with fresh vegetables', category: 'Veg' }
    ],
    'Indian': [
        { name: 'Butter Chicken', price: 329, image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=500&h=400&fit=crop', description: 'Creamy tomato-based curry with tender chicken pieces', category: 'Non Veg' },
        { name: 'Chicken Biryani', price: 349, image: 'https://images.unsplash.com/photo-1563379091339-03246963d96c?w=500&h=400&fit=crop', description: 'Aromatic basmati rice with spiced chicken and saffron', category: 'Non Veg' },
        { name: 'Palak Paneer', price: 279, image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=500&h=400&fit=crop', description: 'Fresh cottage cheese in spiced spinach gravy', category: 'Veg' },
        { name: 'Dal Makhani', price: 249, image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=500&h=400&fit=crop', description: 'Rich and creamy black lentils cooked overnight', category: 'Veg' },
        { name: 'Tandoori Chicken', price: 399, image: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=500&h=400&fit=crop', description: 'Clay oven roasted chicken marinated in yogurt and spices', category: 'Non Veg' }
    ],
    'Mexican': [
        { name: 'Chicken Quesadilla', price: 229, image: 'https://images.unsplash.com/photo-1618040996337-56904b7850b9?w=500&h=400&fit=crop', description: 'Grilled tortilla filled with chicken and melted cheese', category: 'Non Veg' },
        { name: 'Beef Burrito', price: 269, image: 'https://images.unsplash.com/photo-1566740933430-b5e70b06d2d5?w=500&h=400&fit=crop', description: 'Large flour tortilla wrapped with seasoned beef and beans', category: 'Non Veg' },
        { name: 'Veggie Tacos', price: 189, image: 'https://images.unsplash.com/photo-1565299585323-38174c4a6cf4?w=500&h=400&fit=crop', description: 'Soft tacos filled with seasoned vegetables and salsa', category: 'Veg' },
        { name: 'Loaded Nachos', price: 219, image: 'https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?w=500&h=400&fit=crop', description: 'Crispy tortilla chips with cheese, jalapeños, and salsa', category: 'Veg' },
        { name: 'Guacamole Bowl', price: 159, image: 'https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=500&h=400&fit=crop', description: 'Fresh avocado dip with lime, onions, and cilantro', category: 'Veg' }
    ],
    'Japanese': [
        { name: 'California Roll', price: 329, image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=500&h=400&fit=crop', description: 'Crab, avocado, and cucumber rolled in seaweed and rice', category: 'Non Veg' },
        { name: 'Salmon Sashimi', price: 449, image: 'https://images.unsplash.com/photo-1583623025817-d180a2221d0a?w=500&h=400&fit=crop', description: 'Fresh raw salmon sliced and served without rice', category: 'Non Veg' },
        { name: 'Chicken Teriyaki', price: 389, image: 'https://images.unsplash.com/photo-1626804475297-41608ea09aeb?w=500&h=400&fit=crop', description: 'Grilled chicken glazed with sweet teriyaki sauce', category: 'Non Veg' },
        { name: 'Vegetable Tempura', price: 279, image: 'https://images.unsplash.com/photo-1607301405390-d831c242f59b?w=500&h=400&fit=crop', description: 'Lightly battered and fried seasonal vegetables', category: 'Veg' },
        { name: 'Miso Soup', price: 129, image: 'https://images.unsplash.com/photo-1547573854-74d2a71d0826?w=500&h=400&fit=crop', description: 'Traditional Japanese soup with tofu and seaweed', category: 'Veg' }
    ],
    'Sandwiches': [
        { name: 'Italian BMT', price: 259, image: 'https://images.unsplash.com/photo-1579952363873-27d3bfad9c0d?w=500&h=400&fit=crop', description: 'Genoa salami, spicy pepperoni, and ham with cheese', category: 'Non Veg' },
        { name: 'Veggie Delite', price: 189, image: 'https://images.unsplash.com/photo-1550304943-4f24f54ddde9?w=500&h=400&fit=crop', description: 'Fresh vegetables with your choice of sauce and cheese', category: 'Veg' },
        { name: 'Chicken Teriyaki', price: 229, image: 'https://images.unsplash.com/photo-1542574621-e088a4464f7e?w=500&h=400&fit=crop', description: 'Tender chicken strips with teriyaki sauce and vegetables', category: 'Non Veg' },
        { name: 'Tuna Sandwich', price: 249, image: 'https://images.unsplash.com/photo-1509722747041-616f39b57569?w=500&h=400&fit=crop', description: 'Fresh tuna with mayo, lettuce, and tomatoes', category: 'Non Veg' }
    ],
    'Coffee': [
        { name: 'Cappuccino', price: 189, image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=500&h=400&fit=crop', description: 'Rich espresso with steamed milk and foam', category: 'Beverages' },
        { name: 'Caffe Latte', price: 219, image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=500&h=400&fit=crop', description: 'Smooth espresso with steamed milk and light foam', category: 'Beverages' },
        { name: 'Americano', price: 149, image: 'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?w=500&h=400&fit=crop', description: 'Rich espresso shots with hot water', category: 'Beverages' },
        { name: 'Frappuccino', price: 279, image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=500&h=400&fit=crop', description: 'Blended coffee drink with ice and whipped cream', category: 'Beverages' }
    ],
    'Beverages': [
        { name: 'Coca Cola', price: 49, image: 'https://images.unsplash.com/photo-1561758033-d89a9ad46330?w=500&h=400&fit=crop', description: 'Classic refreshing cola drink', category: 'Beverages' },
        { name: 'Fresh Orange Juice', price: 89, image: 'https://images.unsplash.com/photo-1613478223719-2ab802602423?w=500&h=400&fit=crop', description: 'Freshly squeezed orange juice', category: 'Beverages' },
        { name: 'Iced Tea', price: 59, image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=500&h=400&fit=crop', description: 'Refreshing iced tea with lemon', category: 'Beverages' },
        { name: 'Mango Lassi', price: 79, image: 'https://images.unsplash.com/photo-1571091655789-405eb7a3a3a8?w=500&h=400&fit=crop', description: 'Traditional yogurt drink with fresh mango', category: 'Beverages' },
        { name: 'Mineral Water', price: 25, image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=500&h=400&fit=crop', description: 'Pure mineral water bottle', category: 'Beverages' }
    ],
    'Sides': [
        { name: 'French Fries', price: 99, image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=500&h=400&fit=crop', description: 'Crispy golden french fries with salt', category: 'Veg' },
        { name: 'Onion Rings', price: 129, image: 'https://images.unsplash.com/photo-1639024471283-03518883512d?w=500&h=400&fit=crop', description: 'Crispy battered onion rings', category: 'Veg' },
        { name: 'Chicken Nuggets', price: 179, image: 'https://images.unsplash.com/photo-1562967914-608f82629710?w=500&h=400&fit=crop', description: 'Bite-sized crispy chicken pieces', category: 'Non Veg' },
        { name: 'Mozzarella Sticks', price: 149, image: 'https://images.unsplash.com/photo-1548913583-fec8e6fe4767?w=500&h=400&fit=crop', description: 'Crispy fried mozzarella cheese sticks', category: 'Veg' }
    ],
    'Desserts': [
        { name: 'Chocolate Brownie', price: 159, image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=500&h=400&fit=crop', description: 'Rich chocolate brownie with vanilla ice cream', category: 'Veg' },
        { name: 'Tiramisu', price: 189, image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=500&h=400&fit=crop', description: 'Classic Italian dessert with coffee and mascarpone', category: 'Veg' },
        { name: 'Cheesecake', price: 179, image: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=500&h=400&fit=crop', description: 'Creamy New York style cheesecake', category: 'Veg' },
        { name: 'Ice Cream Sundae', price: 139, image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=500&h=400&fit=crop', description: 'Vanilla ice cream with chocolate sauce and nuts', category: 'Veg' }
    ],
    'Pasta': [
        { name: 'Spaghetti Carbonara', price: 289, image: 'https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?w=500&h=400&fit=crop', description: 'Classic Italian pasta with eggs, cheese, and pancetta', category: 'Non Veg' },
        { name: 'Penne Arrabbiata', price: 249, image: 'https://images.unsplash.com/photo-1572441713132-51c75654db73?w=500&h=400&fit=crop', description: 'Spicy tomato sauce with garlic and red chili', category: 'Veg' },
        { name: 'Chicken Alfredo', price: 319, image: 'https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?w=500&h=400&fit=crop', description: 'Creamy white sauce pasta with grilled chicken', category: 'Non Veg' }
    ],
    'Salads': [
        { name: 'Caesar Salad', price: 199, image: 'https://images.unsplash.com/photo-1551248429-40975aa4de74?w=500&h=400&fit=crop', description: 'Romaine lettuce with Caesar dressing and croutons', category: 'Veg' },
        { name: 'Greek Salad', price: 179, image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=500&h=400&fit=crop', description: 'Fresh vegetables with feta cheese and olives', category: 'Veg' },
        { name: 'Chicken Salad', price: 229, image: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=500&h=400&fit=crop', description: 'Grilled chicken breast on mixed greens', category: 'Non Veg' }
    ],
    'Wraps': [
        { name: 'Chicken Caesar Wrap', price: 219, image: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=500&h=400&fit=crop', description: 'Grilled chicken with Caesar salad in tortilla wrap', category: 'Non Veg' },
        { name: 'Veggie Wrap', price: 179, image: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=500&h=400&fit=crop', description: 'Fresh vegetables and hummus in whole wheat wrap', category: 'Veg' },
        { name: 'Buffalo Chicken Wrap', price: 239, image: 'https://images.unsplash.com/photo-1604467794349-0b74285de7e7?w=500&h=400&fit=crop', description: 'Spicy buffalo chicken with lettuce and ranch dressing', category: 'Non Veg' }
    ],
    'Tacos': [
        { name: 'Beef Tacos', price: 199, image: 'https://images.unsplash.com/photo-1565299585323-38174c4a6cf4?w=500&h=400&fit=crop', description: 'Seasoned ground beef in soft tortilla shells', category: 'Non Veg' },
        { name: 'Fish Tacos', price: 229, image: 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=500&h=400&fit=crop', description: 'Grilled fish with cabbage slaw and lime crema', category: 'Non Veg' },
        { name: 'Veggie Tacos', price: 169, image: 'https://images.unsplash.com/photo-1565299585323-38174c4a6cf4?w=500&h=400&fit=crop', description: 'Black beans, corn, and fresh vegetables', category: 'Veg' }
    ],
    'Burritos': [
        { name: 'Chicken Burrito', price: 249, image: 'https://images.unsplash.com/photo-1566740933430-b5e70b06d2d5?w=500&h=400&fit=crop', description: 'Grilled chicken with rice, beans, and salsa', category: 'Non Veg' },
        { name: 'Bean Burrito', price: 199, image: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=500&h=400&fit=crop', description: 'Refried beans with cheese and vegetables', category: 'Veg' }
    ],
    'Rice': [
        { name: 'Steamed Rice', price: 89, image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=500&h=400&fit=crop', description: 'Perfectly cooked jasmine rice', category: 'Veg' },
        { name: 'Chicken Fried Rice', price: 219, image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=500&h=400&fit=crop', description: 'Wok-fried rice with chicken and vegetables', category: 'Non Veg' },
        { name: 'Vegetable Fried Rice', price: 179, image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=500&h=400&fit=crop', description: 'Fried rice with mixed vegetables and soy sauce', category: 'Veg' }
    ],
    'Noodles': [
        { name: 'Chicken Lo Mein', price: 229, image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=500&h=400&fit=crop', description: 'Soft noodles with chicken and vegetables', category: 'Non Veg' },
        { name: 'Vegetable Lo Mein', price: 199, image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=500&h=400&fit=crop', description: 'Soft noodles with mixed vegetables', category: 'Veg' },
        { name: 'Pad Thai', price: 249, image: 'https://images.unsplash.com/photo-1559314809-0f31657def5e?w=500&h=400&fit=crop', description: 'Thai stir-fried noodles with tamarind and peanuts', category: 'Veg' }
    ],
    'Sushi': [
        { name: 'Salmon Roll', price: 359, image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=500&h=400&fit=crop', description: 'Fresh salmon with avocado and cucumber', category: 'Non Veg' },
        { name: 'Tuna Roll', price: 389, image: 'https://images.unsplash.com/photo-1617093727343-374698b1b08d?w=500&h=400&fit=crop', description: 'Fresh tuna with spicy mayo and scallions', category: 'Non Veg' },
        { name: 'Vegetable Roll', price: 259, image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=500&h=400&fit=crop', description: 'Cucumber, avocado, and carrot roll', category: 'Veg' }
    ],
    'Sashimi': [
        { name: 'Salmon Sashimi', price: 449, image: 'https://images.unsplash.com/photo-1583623025817-d180a2221d0a?w=500&h=400&fit=crop', description: 'Fresh raw salmon slices', category: 'Non Veg' },
        { name: 'Tuna Sashimi', price: 479, image: 'https://images.unsplash.com/photo-1583623025817-d180a2221d0a?w=500&h=400&fit=crop', description: 'Premium tuna sashimi slices', category: 'Non Veg' }
    ],
    'Rolls': [
        { name: 'Dragon Roll', price: 529, image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=500&h=400&fit=crop', description: 'Shrimp tempura with eel and avocado on top', category: 'Non Veg' },
        { name: 'Rainbow Roll', price: 489, image: 'https://images.unsplash.com/photo-1617093727343-374698b1b08d?w=500&h=400&fit=crop', description: 'California roll topped with assorted fish', category: 'Non Veg' }
    ],
    'Sweets': [
        { name: 'Gulab Jamun', price: 89, image: 'https://images.unsplash.com/photo-1606471254744-5c6cc86b8e78?w=500&h=400&fit=crop', description: 'Traditional milk-based sweet in sugar syrup', category: 'Veg' },
        { name: 'Rasgulla', price: 79, image: 'https://images.unsplash.com/photo-1630409346077-08b4ca65b5e5?w=500&h=400&fit=crop', description: 'Soft cottage cheese balls in sugar syrup', category: 'Veg' },
        { name: 'Kaju Katli', price: 399, image: 'https://images.unsplash.com/photo-1606471254744-5c6cc86b8e78?w=500&h=400&fit=crop', description: 'Premium cashew-based sweet (per kg)', category: 'Veg' },
        { name: 'Baklava', price: 129, image: 'https://images.unsplash.com/photo-1519676867240-f03562e64548?w=500&h=400&fit=crop', description: 'Layers of phyllo pastry with nuts and honey', category: 'Veg' }
    ],
    'Snacks': [
        { name: 'Samosa', price: 49, image: 'https://images.unsplash.com/photo-1630409346077-08b4ca65b5e5?w=500&h=400&fit=crop', description: 'Crispy triangular pastry with spiced potato filling', category: 'Veg' },
        { name: 'Bhel Puri', price: 69, image: 'https://images.unsplash.com/photo-1606471254744-5c6cc86b8e78?w=500&h=400&fit=crop', description: 'Mumbai street food with puffed rice and chutneys', category: 'Veg' },
        { name: 'Pakora', price: 89, image: 'https://images.unsplash.com/photo-1630409346077-08b4ca65b5e5?w=500&h=400&fit=crop', description: 'Deep-fried vegetable fritters with spices', category: 'Veg' }
    ],
    'Thali': [
        { name: 'Punjabi Thali', price: 299, image: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=500&h=400&fit=crop', description: 'Complete North Indian meal with dal, sabzi, roti, and rice', category: 'Veg' },
        { name: 'South Indian Thali', price: 279, image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=500&h=400&fit=crop', description: 'Traditional South Indian meal with sambar, rasam, and curry', category: 'Veg' },
        { name: 'Gujarati Thali', price: 259, image: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=500&h=400&fit=crop', description: 'Sweet and savory Gujarati meal with unlimited servings', category: 'Veg' }
    ],
    'Pastries': [
        { name: 'Croissant', price: 129, image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=500&h=400&fit=crop', description: 'Buttery, flaky French pastry', category: 'Veg' },
        { name: 'Danish Pastry', price: 149, image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500&h=400&fit=crop', description: 'Sweet pastry with fruit or cream filling', category: 'Veg' },
        { name: 'Muffin', price: 99, image: 'https://images.unsplash.com/photo-1607958996333-41aef7caefaa?w=500&h=400&fit=crop', description: 'Soft, sweet quick bread in various flavors', category: 'Veg' }
    ]
};

// Main seeding function
const seedDatabase = async () => {
    try {
        console.log('🌱 Starting comprehensive database seeding...');

        // Clear existing collections
        console.log('🧹 Clearing existing collections...');
        await User.deleteMany({});
        await Restaurant.deleteMany({});
        await FoodItem.deleteMany({});
        await Orders.deleteMany({});
        await Cart.deleteMany({});
        await Admin.deleteMany({});

        // Create customer users
        console.log('👥 Creating customer users...');
        const savedCustomers = [];
        for (const customer of customerUsers) {
            const hashedPassword = await hashPassword(customer.password);
            const user = new User({
                username: customer.name,
                email: customer.email,
                password: hashedPassword,
                usertype: 'customer',
                approval: 'approved'
            });
            const savedUser = await user.save();
            savedCustomers.push(savedUser);
            console.log(`   ✓ Customer: ${customer.name} (${customer.email})`);
        }

        // Create restaurant owners and restaurants
        console.log('🏪 Creating restaurant owners and restaurants...');
        const savedRestaurants = [];
        const allCategories = new Set();
        
        for (const data of restaurantData) {
            // Create restaurant owner user
            const hashedPassword = await hashPassword(data.owner.password);
            const ownerUser = new User({
                username: data.owner.name,
                email: data.owner.email,
                password: hashedPassword,
                usertype: 'restaurant',
                approval: 'approved'
            });
            const savedOwner = await ownerUser.save();
            console.log(`   ✓ Owner: ${data.owner.name} (${data.owner.email})`);

            // Create restaurant
            const restaurant = new Restaurant({
                ownerId: savedOwner._id.toString(),
                title: data.restaurant.title,
                address: data.restaurant.address,
                mainImg: data.restaurant.mainImg,
                menu: data.restaurant.menuCategories
            });
            const savedRestaurant = await restaurant.save();
            savedRestaurants.push(savedRestaurant);
            console.log(`   ✓ Restaurant: ${data.restaurant.title}`);

            // Add categories to master list
            data.restaurant.menuCategories.forEach(cat => allCategories.add(cat));
        }

        // Create food items for each restaurant
        console.log('🍕 Creating food items for restaurants...');
        let totalFoodItems = 0;
        
        for (const restaurant of savedRestaurants) {
            console.log(`   📋 Adding items for ${restaurant.title}...`);
            let restaurantItemCount = 0;
            
            for (const menuCategory of restaurant.menu) {
                const categoryItems = foodItemsData[menuCategory] || [];
                
                // Add all items from this category, plus some random extras
                for (const item of categoryItems) {
                    const foodItem = new FoodItem({
                        title: item.name,
                        description: item.description,
                        itemImg: item.image,
                        category: item.category,
                        menuCategory: menuCategory,
                        restaurantId: restaurant._id.toString(),
                        price: item.price,
                        discount: getRandomInt(5, 25), // Random discount between 5-25%
                        rating: getRandomFloat(3.5, 4.9, 1)
                    });
                    await foodItem.save();
                    restaurantItemCount++;
                    totalFoodItems++;
                }
                
                // Add some random items from other compatible categories
                if (categoryItems.length > 0) {
                    const extraItemsCount = getRandomInt(1, 3);
                    for (let i = 0; i < extraItemsCount; i++) {
                        const randomItem = getRandomElement(categoryItems);
                        const foodItem = new FoodItem({
                            title: `${randomItem.name} Special`,
                            description: `Chef's special ${randomItem.description.toLowerCase()}`,
                            itemImg: randomItem.image,
                            category: randomItem.category,
                            menuCategory: menuCategory,
                            restaurantId: restaurant._id.toString(),
                            price: randomItem.price + getRandomInt(20, 50),
                            discount: getRandomInt(10, 30),
                            rating: getRandomFloat(4.0, 4.8, 1)
                        });
                        await foodItem.save();
                        restaurantItemCount++;
                        totalFoodItems++;
                    }
                }
            }
            console.log(`     ✓ Added ${restaurantItemCount} items`);
        }

        // Create admin configuration
        console.log('⚙️ Creating admin configuration...');
        const promotedRestaurants = [];
        
        // Select 3-4 restaurants for promotion
        const shuffledRestaurants = [...savedRestaurants].sort(() => 0.5 - Math.random());
        for (let i = 0; i < Math.min(4, shuffledRestaurants.length); i++) {
            promotedRestaurants.push(shuffledRestaurants[i]._id.toString());
        }

        const admin = new Admin({
            categories: Array.from(allCategories),
            promotedRestaurants: promotedRestaurants
        });
        await admin.save();

        // Create some sample orders
        console.log('📦 Creating sample orders...');
        const allFoodItems = await FoodItem.find().limit(20);
        let orderCount = 0;
        
        for (let i = 0; i < 15; i++) {
            const randomCustomer = getRandomElement(savedCustomers);
            const randomFoodItem = getRandomElement(allFoodItems);
            const randomRestaurant = savedRestaurants.find(r => r._id.toString() === randomFoodItem.restaurantId);
            
            if (randomRestaurant) {
                const order = new Orders({
                    userId: randomCustomer._id.toString(),
                    name: randomCustomer.username,
                    email: randomCustomer.email,
                    mobile: `+91${getRandomInt(7000000000, 9999999999)}`,
                    address: `${getRandomInt(1, 999)} Random Street, Mumbai, Maharashtra`,
                    pincode: `40000${getRandomInt(1, 9)}`,
                    restaurantId: randomRestaurant._id.toString(),
                    restaurantName: randomRestaurant.title,
                    foodItemId: randomFoodItem._id.toString(),
                    foodItemName: randomFoodItem.title,
                    foodItemImg: randomFoodItem.itemImg,
                    quantity: getRandomInt(1, 3),
                    price: randomFoodItem.price,
                    discount: randomFoodItem.discount,
                    paymentMethod: getRandomElement(['Online', 'Cash on Delivery', 'Card']),
                    orderDate: new Date().toISOString().split('T')[0],
                    orderStatus: getRandomElement(['order placed', 'preparing', 'out for delivery', 'delivered'])
                });
                await order.save();
                orderCount++;
            }
        }

        // Create some sample cart items
        console.log('🛒 Creating sample cart items...');
        let cartCount = 0;
        
        for (let i = 0; i < 10; i++) {
            const randomCustomer = getRandomElement(savedCustomers);
            const randomFoodItem = getRandomElement(allFoodItems);
            const randomRestaurant = savedRestaurants.find(r => r._id.toString() === randomFoodItem.restaurantId);
            
            if (randomRestaurant) {
                const cartItem = new Cart({
                    userId: randomCustomer._id.toString(),
                    restaurantId: randomRestaurant._id.toString(),
                    restaurantName: randomRestaurant.title,
                    foodItemId: randomFoodItem._id.toString(),
                    foodItemName: randomFoodItem.title,
                    foodItemImg: randomFoodItem.itemImg,
                    quantity: getRandomInt(1, 2),
                    price: randomFoodItem.price,
                    discount: randomFoodItem.discount
                });
                await cartItem.save();
                cartCount++;
            }
        }

        console.log('\n🎉 Database seeding completed successfully!');
        console.log('\n📊 SUMMARY:');
        console.log(`   👥 Customer Users: ${savedCustomers.length}`);
        console.log(`   🏪 Restaurant Owners: ${restaurantData.length}`);
        console.log(`   🏢 Restaurants: ${savedRestaurants.length}`);
        console.log(`   🍽️  Food Items: ${totalFoodItems}`);
        console.log(`   📋 Categories: ${allCategories.size}`);
        console.log(`   ⭐ Promoted Restaurants: ${promotedRestaurants.length}`);
        console.log(`   📦 Sample Orders: ${orderCount}`);
        console.log(`   🛒 Sample Cart Items: ${cartCount}`);
        
        console.log('\n🔐 LOGIN CREDENTIALS:');
        console.log('\n👥 CUSTOMERS:');
        customerUsers.forEach(customer => {
            console.log(`   📧 ${customer.email} | 🔑 ${customer.password}`);
        });
        
        console.log('\n🏪 RESTAURANT OWNERS:');
        restaurantData.forEach(data => {
            console.log(`   📧 ${data.owner.email} | 🔑 ${data.owner.password} | 🏢 ${data.restaurant.title}`);
        });
        
        console.log('\n📋 AVAILABLE CATEGORIES:');
        Array.from(allCategories).forEach(cat => {
            console.log(`   • ${cat}`);
        });

    } catch (error) {
        console.error('❌ Error during seeding:', error);
        throw error;
    }
};

// Execute seeding
const runSeeder = async () => {
    try {
        await connectDB();
        await seedDatabase();
        console.log('\n✅ Seeding process completed successfully!');
        console.log('🚀 Your food delivery database is ready to use!');
        process.exit(0);
    } catch (error) {
        console.error('💥 Seeding failed:', error);
        process.exit(1);
    }
};

// Run the seeder
runSeeder();