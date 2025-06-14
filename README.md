# TalenTag

A modern web application for talent management and tagging.

## Project Structure

```
TalenTag/
├── src/                    # Source files
│   ├── components/         # React components
│   ├── services/          # Firebase and other services
│   └── ...
├── public/                # Static files
└── ...
```

## Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file with your Firebase configuration:
   ```
   VITE_FIREBASE_API_KEY=your_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   ```
4. Run the development server:
   ```bash
   npm run dev
   ```

## Technologies Used

- React
- TypeScript
- Firebase
- Vite
- Tailwind CSS
