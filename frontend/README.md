# BridgingMinds Frontend

## Environment Setup

### 1. Create .env file
Create a `.env` file in the frontend directory with the following variables:

```bash
VITE_PORT=8000
VITE_API_URL=http://localhost:3000
VITE_NODE_ENV=development
VITE_ENABLE_DEBUG=true
VITE_ENABLE_ANALYTICS=false
```

### 2. Start the application

**Option A: Using the helper script (Recommended)**
```bash
npm run start
```

**Option B: Using standard vite**
```bash
npm run dev
```

**Option C: Using environment variables directly**
```bash
npm run dev:env
```

## Environment Variables

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `VITE_PORT` | ✅ | 8000 | Frontend development server port |
| `VITE_API_URL` | ✅ | - | Backend API URL |
| `VITE_NODE_ENV` | ✅ | development | Environment mode |
| `VITE_ENABLE_DEBUG` | ❌ | false | Enable debug logging |
| `VITE_ENABLE_ANALYTICS` | ❌ | true | Enable analytics features |

## Access Points

- **Frontend**: http://localhost:8000 (or port specified in VITE_PORT)
- **Backend API**: http://localhost:3000 (or URL specified in VITE_API_URL)

## Troubleshooting

- **Missing .env file**: The helper script will show you what to create
- **Missing variables**: Check the console for validation errors
- **Port conflicts**: Change VITE_PORT in your .env file
- **API connection issues**: Verify VITE_API_URL points to your running backend
