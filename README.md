# Upgraded Portfolio

A modern, full-stack portfolio application built with **React**, **TypeScript**, **Node.js/Express**, and **Supabase**. This project showcases professional work, projects, and expertise with a responsive, interactive user experience.

## 🚀 Features

- **Modern Frontend**: Built with React and TypeScript for type safety and enhanced development experience
- **Responsive Design**: Mobile-first approach ensuring compatibility across all devices
- **Full-Stack Architecture**: Complete modern stack implementation with React frontend and Express backend
- **TypeScript Throughout**: 95.2% TypeScript codebase for better code quality and maintainability
- **Supabase Backend**: Leveraging Supabase for authentication, real-time database, and storage
- **Interactive UI**: Smooth animations and intuitive user interactions
- **Project Showcase**: Dedicated section to display portfolio projects with detailed information
- **Contact Integration**: Easy ways for visitors to get in touch

## 📋 Tech Stack

### Frontend
- **React** - UI library for building interactive components
- **TypeScript** - Static typing for JavaScript
- **HTML & CSS** - Markup and styling
- **JavaScript** - Application logic

### Backend & Database
- **Node.js** - JavaScript runtime
- **Express** - Web application framework
- **Supabase** - PostgreSQL database, authentication, real-time features, and storage
- **PostgreSQL** - Relational database through Supabase

## 📁 Project Structure

```
upgraded_portfolio/
├── src/
│   ├── components/      # React components
│   ├── pages/          # Page components
│   ├── styles/         # CSS stylesheets
│   ├── services/       # Supabase and API services
│   ├── assets/         # Images and media
│   ├── App.tsx         # Main App component
│   └── index.tsx       # Entry point
├── server/             # Express backend (if applicable)
│   ├── routes/         # API routes
│   ├── middleware/     # Express middleware
│   └── config/         # Configuration files
├── public/             # Static files
├── package.json        # Dependencies and scripts
├── tsconfig.json       # TypeScript configuration
└── README.md          # This file
```

## 🛠️ Installation

### Prerequisites
- Node.js (v14.0.0 or higher)
- npm or yarn
- Supabase account and project

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/mithlesh-vishwakarma/upgraded_portfolio.git
   cd upgraded_portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory:
   ```env
   REACT_APP_SUPABASE_URL=your_supabase_url
   REACT_APP_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Start the development server**
   ```bash
   npm start
   ```

   The application will open at `http://localhost:3000`

## 📦 Available Scripts

- `npm start` - Runs the app in development mode
- `npm build` - Builds the app for production
- `npm test` - Runs the test suite
- `npm eject` - Ejects from Create React App configuration (not reversible)

## 🎨 Pages & Sections

- **Home** - Welcome section with introduction
- **About** - Personal background and skills
- **Projects** - Showcase of portfolio projects (fetched from Supabase)
- **Contact** - Contact information and form (integrated with Supabase)

## 🔄 Development Roadmap

- [x] Frontend scaffolding with React & TypeScript
- [x] Supabase integration and setup
- [ ] Backend API with Node.js & Express
- [ ] User authentication with Supabase Auth
- [ ] Real-time project updates
- [ ] Contact form functionality with email notifications
- [ ] Blog/Articles section
- [ ] Dark mode support
- [ ] Performance optimization
- [ ] SEO enhancements

## 🗄️ Supabase Setup

### Database Tables

Create the following tables in your Supabase dashboard:

**projects** table:
```sql
- id (uuid, primary key)
- title (text)
- description (text)
- technologies (text array)
- image_url (text)
- project_url (text)
- github_url (text)
- created_at (timestamp)
```

**contact_messages** table:
```sql
- id (uuid, primary key)
- name (text)
- email (text)
- message (text)
- created_at (timestamp)
```

### Supabase Client Setup

The Supabase client is configured in `src/services/supabase.ts`:

```typescript
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL!
const supabaseKey = process.env.REACT_APP_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseKey)
```

## 🚀 Deployment

### Frontend Deployment Options
- **Vercel** - Recommended for React apps (best integration with Next.js)
- **Netlify** - Great alternative with CI/CD
- **GitHub Pages** - Free hosting for static sites

### Supabase Deployment
- Supabase automatically handles cloud hosting
- No additional deployment steps required for database

### Full Stack Deployment
- **Vercel** - Deploy both frontend and backend
- **Heroku** - For Express backend
- **Railway** - Modern alternative to Heroku
- **AWS/Google Cloud** - For scalable applications

## 📝 Environment Variables

Create a `.env.local` file in the root directory:

```env
REACT_APP_SUPABASE_URL=https://your-project.supabase.co
REACT_APP_SUPABASE_ANON_KEY=your_anon_key_here
REACT_APP_API_URL=http://localhost:5000
REACT_APP_ENVIRONMENT=development
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👤 Author

**Mithlesh Vishwakarma**
- GitHub: [@mithlesh-vishwakarma](https://github.com/mithlesh-vishwakarma)
- Portfolio: [https://github.com/mithlesh-vishwakarma/upgraded_portfolio](https://github.com/mithlesh-vishwakarma/upgraded_portfolio)

## 📞 Contact

Feel free to reach out for collaborations or just a friendly hello!

---

## 📚 Resources & Learning

- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Node.js Guide](https://nodejs.org/en/docs/)
- [Express.js Documentation](https://expressjs.com/)
- [Supabase Documentation](https://supabase.com/docs)
- [PostgreSQL Guide](https://www.postgresql.org/docs/)

---

**⭐ If you find this project helpful, please consider giving it a star!**

---

*Last Updated: 2026*
