# Project Title (Placeholder)

This is a placeholder description for the project. We will update this with more details as we go.
It appears to be a web application for managing subcontractors, including features for authentication, dashboard displays, CRUD operations for subcontractors, and document uploads to AWS S3.

## Features

-   **User Authentication:** Allows users to register and log in to the application.
-   **Dashboard Overview:** Provides a summary or visualization of key data (details to be confirmed by examining dashboard components).
-   **Subcontractor Management:** Enables users to Create, Read, Update, and Delete subcontractor records.
-   **Certificate/Document Upload:** Supports uploading documents (e.g., certificates) for subcontractors, with files stored in AWS S3.

## Tech Stack

### Frontend
-   **Framework/Library:** React
-   **Language:** TypeScript
-   **Build Tool:** Vite
-   **Styling:** Tailwind CSS

### Backend
-   **Runtime Environment:** Node.js
-   **Framework:** Express.js
-   **Language:** TypeScript

### Database
-   **Type:** MongoDB (NoSQL)

### File Storage
-   **Service:** AWS S3

### Authentication
-   **Method:** JWT (JSON Web Tokens)

## Project Structure

The project is organized into two main directories:

-   **`client/`**: Contains the frontend application code, built with React, TypeScript, and Vite. This directory includes all UI components, pages, assets, and client-side logic.
-   **`server/`**: Contains the backend API server code, built with Node.js, Express.js, and TypeScript. This directory handles business logic, data persistence (MongoDB), file storage (AWS S3), and authentication.

## Setup and Running Instructions

### Prerequisites

-   Node.js (v18.x or later recommended)
-   npm (comes with Node.js) or yarn
-   MongoDB instance (local or cloud-hosted like MongoDB Atlas)
-   AWS Account with S3 bucket and IAM user credentials (access key ID, secret access key)

### 1. Backend Setup (`server/`)

1.  **Navigate to the server directory:**
    ```bash
    cd server
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    # or
    # yarn install
    ```

3.  **Set up environment variables:**
    Create a `.env` file in the `server/` directory by copying `server/.env.example`:
    ```bash
    cp .env.example .env
    ```
    Update the `server/.env` file with your specific configurations:
    -   `PORT`: The port the server will run on (default: `3000`).
    -   `NODE_ENV`: Application environment (default: `development`).
    -   `CLIENT_ORIGIN`: The URL of the client application for CORS (default: `http://localhost:5173`).
    -   `MONGO_URI`: Your MongoDB connection string.
    -   `JWT_SECRET`: A strong, unique secret for signing JWTs (e.g., a long random string).
    -   `AWS_ACCESS_KEY_ID`: Your AWS IAM user's access key ID.
    -   `AWS_SECRET_ACCESS_KEY`: Your AWS IAM user's secret access key.
    -   `AWS_REGION`: The AWS region where your S3 bucket is located (default: `us-east-1`).
    -   `S3_BUCKET_NAME`: The name of your AWS S3 bucket for file uploads.

4.  **Run in development mode:**
    This will start the server with `nodemon`, automatically restarting on file changes.
    ```bash
    npm run dev
    ```
    The server should be running at `http://localhost:PORT` (e.g., `http://localhost:3000`).

5.  **Build for production:**
    ```bash
    npm run build
    ```
    This compiles TypeScript to JavaScript and outputs to the `dist/` directory.

6.  **Start in production mode:**
    ```bash
    npm start
    ```
    This runs the compiled application from the `dist/` directory.

### 2. Frontend Setup (`client/`)

1.  **Navigate to the client directory (from the project root):**
    ```bash
    cd client
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    # or
    # yarn install
    ```

3.  **Set up environment variables (optional):**
    The client uses `VITE_API_URL` to connect to the backend. By default, it's `http://localhost:3000/api`. If your server is running on a different URL, create a `.env` file in the `client/` directory by copying `client/.env.example`:
    ```bash
    cp .env.example .env
    ```
    Update `client/.env` with:
    -   `VITE_API_URL`: The full base URL of your backend API (e.g., `http://localhost:3001/api` if your server is on port 3001).

4.  **Run in development mode:**
    This will start the Vite development server with Hot Module Replacement (HMR).
    ```bash
    npm run dev
    ```
    The client application should be accessible at `http://localhost:5173` (or another port if 5173 is busy).

5.  **Build for production:**
    ```bash
    npm run build
    ```
    This creates an optimized static build in the `client/dist/` directory.

6.  **Preview the production build:**
    ```bash
    npm run preview
    ```
    This serves the production build locally for testing.

---

## API Endpoints (Overview)

The backend server exposes the following groups of API endpoints under the base path `/api`:

-   **`/auth`**: Handles user authentication, including:
    -   `POST /auth/register`: User registration.
    -   `POST /auth/login`: User login.
-   **`/subcontractors`**: Manages subcontractor data:
    -   `POST /subcontractors`: Create a new subcontractor.
    -   `GET /subcontractors`: List all subcontractors.
    -   `GET /subcontractors/:id`: Get details of a specific subcontractor.
    -   `PUT /subcontractors/:id`: Update a subcontractor.
    -   `DELETE /subcontractors/:id`: Delete a subcontractor.
-   **`/upload`**: Handles file uploads, particularly for subcontractor certificates.
    -   (Specific endpoints might include POST for uploading, GET for listing/retrieving, DELETE for removing files. Further inspection of `server/src/routes/upload.routes.ts` would be needed for exact paths if required.)
-   **`/dashboard`**: Provides data for the dashboard.
    -   (Specific endpoints would be defined in `server/src/routes/dashboard.routes.ts`. Further inspection needed for exact paths if required.)

*Note: For detailed information on request/response formats and specific parameters, please refer to the route definitions in the `server/src/routes/` directory and corresponding controllers in `server/src/controllers/`.*

## Linting and Code Style

### Client
The client-side code (`client/`) is configured with ESLint to enforce code quality and consistency.
-   To run the linter, navigate to the `client/` directory and use:
    ```bash
    npm run lint
    ```
-   ESLint configuration can be found in `client/eslint.config.js`.

### Server
While the `server/package.json` does not explicitly define a top-level lint script, the project uses TypeScript and common practices for code quality (like Prettier or ESLint) can be integrated if not already implicitly used by developer environments. It's recommended to set up or verify a linting process for the backend code as well to maintain consistency.

## Future Improvements & Contributing

Currently, the project is focused on delivering the core functionalities described above. Future improvements could include:

-   More detailed analytics on the dashboard.
-   Advanced user role and permission management.
-   Integration with other third-party services.

If you'd like to contribute, please feel free to fork the repository, make your changes, and submit a pull request. For major changes, it's recommended to open an issue first to discuss what you would like to change.
