# 🐂 Bulls-Mart - USF Student Marketplace

A multi-vendor e-commerce platform specifically designed for USF students to buy and sell items within the campus community.

## 🚀 Features

### For Buyers
- Browse products by category
- Search and filter items
- Secure payment processing
- Real-time order tracking
- Product reviews and ratings

### For Sellers (USF Students)
- Easy product listing
- Inventory management
- Order fulfillment
- Sales analytics
- Secure payment processing

## 🛠️ Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **JWT** - Authentication
- **Multer** - File uploads
- **Stripe** - Payment processing

### Frontend
- **React.js** - UI framework
- **Redux Toolkit** - State management
- **Tailwind CSS** - Styling
- **Axios** - HTTP client
- **React Router** - Navigation

## 📦 Installation

### Prerequisites
- Node.js (v18 or higher)
- MongoDB
- Git

### Backend Setup
```bash
cd Multi_vondor_E_shop/backend
npm install
cp .env.example .env
# Configure your .env file
npm start
```

### Frontend Setup
```bash
cd Multi_vondor_E_shop/frontend
npm install
npm start
```

## 🗄️ Database Setup

The application includes sample data for testing:

```bash
cd Multi_vondor_E_shop/backend
node seedData.js
```

This will create:
- 5 sample shops
- 15 sample products across different categories

## 🌐 API Endpoints

### Products
- `GET /api/v2/product/get-all-products` - Get all products
- `POST /api/v2/product/create-product` - Create new product
- `GET /api/v2/product/get-all-products-shop/:id` - Get shop products

### Users
- `POST /api/v2/user/create-user` - Register user
- `POST /api/v2/user/activation` - Activate account
- `POST /api/v2/user/login-user` - User login

### Shops
- `POST /api/v2/shop/create-shop` - Create shop
- `POST /api/v2/shop/login-shop` - Shop login

## 🎨 UI Features

- **Dark Theme** - Modern dark interface with green accents
- **USF Branding** - University of South Florida branding
- **Responsive Design** - Works on all devices
- **Student-Focused** - Tailored for campus community

## 🔒 Security

- JWT token authentication
- Password encryption
- CORS protection
- Input validation
- Secure file uploads

## 📱 Screenshots

[Add screenshots here]

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Developer

**Kartik Chaudhary**
- Email: chaudhary417@usf.edu
- GitHub: [@kartikchaudhary](https://github.com/kartikchaudhary)

## 🙏 Acknowledgments

- Original template by Om Prakash Pattjoshi
- USF branding and design
- Campus community feedback
