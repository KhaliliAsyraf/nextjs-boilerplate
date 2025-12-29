# Next.js Frontend for NestJS Boilerplate

This is the frontend application built with Next.js 14, Tailwind CSS, and Shadcn UI, designed to work with the NestJS Boilerplate backend.

## ✨ Features

- **Next.js 14 App Router**: Modern architecture.
- **Shadcn UI**: Beautiful, accessible components.
- **Authentication**: Login, Register, Logout using backend API.
- **State Management**: Zustand for client-side auth state.
- **Dashboard**: CRUD operations for Posts.
- **Dark Mode**: System-based auto-switching + manual toggle.
- **Dockerized**: specific Dockerfile and integration with backend docker-compose.

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- Docker & Docker Compose

### Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run in development mode:
   ```bash
   npm run dev
   ```
   The app will be available at [http://localhost:3000](http://localhost:3000).

   > **Note**: For local dev without Docker, ensure your backend is running and `next.config.js` rewrites are pointing to `http://localhost:3000` instead of `http://app:3000`.

### 🐳 Docker Usage

To run both backend and frontend together using Docker:

1. Go to the root `nestjs-boilerplate` directory (where `docker-compose.yml` is).
2. Run:
   ```bash
   docker-compose up -d --build
   ```
3. Access the application:
   - Frontend: [http://localhost](http://localhost) (via Nginx proxy on port 80)
   - Backend API: [http://localhost/api](http://localhost/api)

## 📁 Structure

- `src/app`: Pages and Layouts.
  - `(auth)`: Login/Register pages.
  - `(dashboard)`: Protected dashboard pages.
- `src/components`: UI components and shared layout components.
  - `ui`: Shadcn UI primitives.
  - `layout`: Sidebar, Topbar.
- `src/lib`: Utilities and API client.
- `src/store`: Zustand stores (Auth).

## 🛠️ Configuration

- **API URL**: Configured in `src/lib/api.ts` and `next.config.js` rewrites.
- **Theme**: Configured in `src/components/theme-provider.tsx` and `tailwind.config.ts`.
