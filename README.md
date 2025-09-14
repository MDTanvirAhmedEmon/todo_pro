# Todo Pro

> Todo Pro is a single-page application (SPA) for user registration, login, and todo management. It supports authentication with token persistence, CRUD operations, filtering, sorting, and pagination. The app includes dark mode, skeletons, toast notifications, and is fully responsive. Built with React, TypeScript, Redux Toolkit, React Router, React Hook Form, Zod, Tailwind CSS, and MSW for a mock API, the code is type-safe and easily swappable with a real backend.

---

## Table of Contents

* [Project Overview](#project-overview)
* [Tech Stack](#tech-stack)
* [Architecture](#architecture)
* [Setup Instructions](#setup-instructions)
* [Features](#features)
* [Trade-offs & Design Decisions](#trade-offs--design-decisions)
* [Testing](#testing)

---

## Tech Stack

* **Frontend:** React.js, TypeScript, Tailwind CSS, React Router, React Hook Form
* **Mock Backend:** MSW
* **Mock Database:** LocalStorage
* **State Management:** Redux Toolkit + RTK Query
* **Testing:** Vitest, React Testing Library, MSW
* **Validation:** Zod
* **Other Tools:** React Hot Toast

---

## Architecture

* **Folder Structure Example:**

```
src/
 ├─ components/        # Reusable UI components
 ├─ pages/             # Page-level components (Register, Login, Dashboard)
 ├─ redux/             # Redux slices & store
 ├─ hooks/             # Custom React hooks
 ├─ routes/            # React Router setup
 ├─ layouts/           # Route layouts
 ├─ utils/             # Utility functions
 ├─ mocks/             # MSW mock API handlers
 ├─ skeletons/         # Skeleton UI components
 ├─ zod/              # Zod validation schemas
 ├─ global/           # TypeScript global types
 └─ __tests__/         # Unit and integration tests
```

* **Data Flow:**

  1. Components use **React Hook Form** for form handling.
  2. API requests are handled via **RTK Query**, integrating with Redux.
  3. Responses are stored in the Redux store for global access.
  4. UI feedback is provided via **React Hot Toast**.

* **Routing:** Public vs. Private routes are managed with React Router and `layouts` for structured layouts.

---

## Setup Instructions

1. **Clone the repository:**

```bash
git clone https://github.com/username/project-name.git
cd project-name
```

2. **Install dependencies:**

```bash
npm install
# or
yarn install
```

3. **Run the app:**

```bash
npm run dev
# or
yarn dev
```

---

## Features

* User registration & login
* Form validation (Zod + React Hook Form)
* Password confirmation check
* Real-time feedback using toast notifications
* Responsive design (Tailwind CSS)
* Redux state management and RTK Query for API calls
* Skeleton loading components for better UX
* Unit and integration tests with MSW for mocking API

---

## Trade-offs & Design Decisions

* **Password storage:** Used confirmPassword in the frontend for validation; backend stores hashed password.
* **RTK Query vs Axios:** Chose RTK Query for Redux integration and cache management.
* **Form Handling:** React Hook Form + Zod for type-safe validation.
* **Testing:** Vitest and MSW chosen for fast, reliable tests in the Vite environment.
* **UI Framework:** Tailwind CSS selected for rapid styling and responsive design.

**Trade-offs:**

* Did not implement SSR to simplify scope.
* Minimal animations for performance optimization.
* API error handling uses toast notifications; inline errors are minimal.

---

## Testing

* Unit tests cover:

  * Form validation
  * API integration with RTK Query (mocked using MSW)
  * Toast notifications
* Run tests:

```bash
npm run test
```
