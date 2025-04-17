# Kushma Art Project

A modern, dynamic website for Kushma Art Project built with Next.js, TypeScript, and MongoDB.

## Features

- Fully responsive design with dark/light theme support
- Bilingual support (English/Nepali)
- Dynamic content management through admin dashboard
- Image gallery with compression and optimization
- Blog system with comments and reactions
- Event management and registration
- Volunteer management system
- Secure authentication and authorization
- Contact form with admin notifications
- Donation system integration

## Tech Stack

- **Frontend**: Next.js 14, TypeScript, TailwindCSS, Framer Motion
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **Image Processing**: Sharp
- **Authentication**: JWT
- **State Management**: Redux Toolkit
- **Internationalization**: i18next
- **Form Handling**: React Hook Form
- **API Documentation**: Swagger

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
   ```bash
   cp .env.example .env.local
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

## Environment Variables

Create a `.env.local` file with the following variables:

```env
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
NEXT_PUBLIC_API_URL=http://localhost:3000/api
```

## Project Structure

```
src/
├── app/                    # Next.js app router pages
├── components/            # Reusable components
│   ├── common/           # Common UI components
│   ├── layout/           # Layout components
│   └── sections/         # Page sections
├── lib/                  # Utility functions and configurations
├── models/               # MongoDB models
├── services/             # API services
├── store/               # Redux store
├── styles/              # Global styles
└── types/               # TypeScript types
```

## Contributing

1. Create a new branch
2. Make your changes
3. Submit a pull request

## License

MIT