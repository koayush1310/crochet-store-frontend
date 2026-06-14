# Knot Your Nani - Frontend

A modern React-based e-commerce website for **Knot Your Nani**, a handmade crochet business offering custom crochet creations, keychains, amigurumis, flowers, and personalized gifts.

## Features

### Customer Features

* Browse crochet products
* Product details page
* Wishlist management
* Shopping cart
* WhatsApp-based ordering
* Customer reviews and ratings
* Contact form
* User registration and login
* Profile management
* Order history tracking

### Admin Features

* Admin dashboard
* Product management
* Category management
* Order management
* Contact enquiry management
* Order status updates

## Tech Stack

* React.js
* React Router DOM
* Axios
* Tailwind CSS
* Lucide React Icons

## Installation

```bash
git clone <frontend-repository-url>
cd crochet-store-frontend

npm install
npm run dev
```

## Environment Setup

Update API URL in:

```javascript
src/api/axios.js
```

```javascript
const API = axios.create({
  baseURL: "YOUR_BACKEND_URL/api",
});
```

## Build

```bash
npm run build
```

## Deployment

Frontend is deployed on:

* Vercel / Netlify

## Project Structure

```text
src/
├── api/
├── components/
├── context/
├── layouts/
├── pages/
│   ├── admin/
│   └── user/
├── routes/
└── assets/
```

## Developer

Developed by Ayush

B.Tech Student & Full Stack Developer