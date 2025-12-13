# DiabeteDetect - Setup & Deployment Guide

## Quick Start (Local Development)

The application works out of the box without a database for development purposes. Data will be processed but not persisted.

### 1. Install Dependencies

```bash
pnpm install
```

### 2. Start Development Server

```bash
pnpm dev
```

The app will be available at `http://localhost:8080`

## With Database (MongoDB)

### Option 1: Local MongoDB

#### Install MongoDB locally:

**macOS (using Homebrew):**
```bash
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

**Ubuntu/Debian:**
```bash
curl -fsSL https://www.mongodb.org/static/pgp/server-7.0.asc | apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/7.0 multiverse" | tee /etc/apt/sources.list.d/mongodb-org-7.0.list
apt-get update
apt-get install -y mongodb-org
sudo systemctl start mongod
```

**Windows:**
- Download from [MongoDB Community Download](https://www.mongodb.com/try/download/community)
- Follow the installer instructions
- MongoDB will run as a service by default

#### Configure Environment Variables:

Create a `.env` file in the project root:

```env
MONGODB_URI=mongodb://localhost:27017/diabetes-detection
```

MongoDB will automatically create the database when the first document is inserted.

### Option 2: MongoDB Atlas (Cloud)

MongoDB Atlas is the easiest cloud option for MongoDB:

1. **Create a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)**

2. **Create a new cluster:**
   - Click "Create a Deployment" → "Build a Cluster"
   - Select "Free" tier
   - Choose your region and click "Create"

3. **Set up authentication:**
   - Create a database user with username and password
   - Note your credentials

4. **Get your connection string:**
   - Click "Connect" → "Drivers"
   - Copy the connection string (it looks like `mongodb+srv://username:password@cluster.mongodb.net/database-name?retryWrites=true&w=majority`)

5. **Configure in your `.env` file:**

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/diabetes-detection?retryWrites=true&w=majority
```

Replace `username` and `password` with your MongoDB Atlas credentials.

### Option 3: Using Builder.io MCP Integrations

Builder.io provides direct integrations for database connections:

1. Click **[Open MCP popover](#open-mcp-popover)**
2. Look for database options like **Neon** or **Supabase**
3. Follow the connection setup to link your database
4. The connection string will be automatically configured

## Environment Variables

Create a `.env` file (copy from `.env.example`):

```env
# MongoDB Connection String (required for data persistence)
MONGODB_URI=mongodb://localhost:27017/diabetes-detection

# Optional
PING_MESSAGE=pong
```

**Important:** Never commit your `.env` file to version control. It contains sensitive credentials.

## Production Deployment

### Deployment Options

#### 1. **Netlify** (Recommended for Static Hosting + Serverless Functions)

Using Builder.io's Netlify MCP integration:

1. Click **[Connect to Netlify](#open-mcp-popover)**
2. Authenticate with your Netlify account
3. Follow the deployment wizard
4. Set environment variables in Netlify dashboard:
   - Add `MONGODB_URI` with your MongoDB connection string

**Build Command:**
```bash
pnpm build
```

**Output Directory:**
```
dist/spa
```

#### 2. **Vercel** (Alternative Cloud Platform)

Using Builder.io's Vercel integration:

1. Click **[Connect Vercel](#open-mcp-popover)**
2. Connect your repository
3. Add environment variables in Vercel dashboard
4. Deploy automatically on git push

#### 3. **Docker Deployment**

Create a `Dockerfile`:

```dockerfile
FROM node:20-alpine

WORKDIR /app

# Copy files
COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm && pnpm install

COPY . .

# Build
RUN pnpm build

# Start production server
EXPOSE 3000
CMD ["pnpm", "start"]
```

Build and run:

```bash
docker build -t diabetes-detect .
docker run -p 3000:3000 -e MONGODB_URI=your_mongodb_uri diabetes-detect
```

#### 4. **Self-Hosted (VPS/Linux Server)**

1. **Install Node.js and pnpm:**

```bash
curl -sL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs
npm install -g pnpm
```

2. **Clone and setup:**

```bash
git clone <your-repo-url>
cd diabetes-detect
pnpm install
```

3. **Create `.env` file with MongoDB credentials**

4. **Build:**

```bash
pnpm build
```

5. **Start production server:**

```bash
pnpm start
```

6. **Use PM2 for process management:**

```bash
npm install -g pm2
pm2 start "pnpm start" --name "diabetes-detect"
pm2 startup
pm2 save
```

## Database Setup at Scale

### MongoDB Atlas Best Practices

For production deployments:

1. **Enable IP Whitelist:**
   - Only allow your server's IP address
   - In MongoDB Atlas: Network Access → IP Whitelist

2. **Use Strong Passwords:**
   - Generate complex database user passwords
   - Store in secure secrets manager

3. **Enable Backups:**
   - Enable automated daily backups
   - Test restore procedures

4. **Monitor Performance:**
   - Use MongoDB Atlas monitoring dashboard
   - Set up alerts for query performance

### Data Privacy & HIPAA Compliance

If handling real patient data:

1. **Encryption:**
   - Enable TLS/SSL connections (enabled by default in Atlas)
   - Enable encryption at rest
   - Use encrypted environment variables

2. **Access Control:**
   - Implement role-based access control (RBAC)
   - Regular audit logs review
   - Minimize database user permissions

3. **Data Protection:**
   - Regular backups to geographically separate location
   - Implement data retention policies
   - Comply with HIPAA, GDPR, or applicable regulations

4. **API Security (Production):**
   - Implement authentication (JWT, API keys)
   - Add rate limiting
   - Use HTTPS only
   - Implement CORS restrictions

## Troubleshooting

### MongoDB Connection Issues

**Error: `connect ECONNREFUSED 127.0.0.1:27017`**

- MongoDB is not running locally
- Solutions:
  - Start MongoDB: `brew services start mongodb-community` (macOS)
  - Or use MongoDB Atlas cloud option
  - Or check MongoDB is installed correctly

**Error: `MongooseServerSelectionError`**

- Cannot connect to MongoDB URI
- Check:
  - MONGODB_URI is correctly set in `.env`
  - Database username/password is correct
  - IP whitelist includes your connection IP (for Atlas)
  - Network connectivity to database

### Build Issues

**Error: `TypeScript compilation failed`**

```bash
pnpm typecheck
```

**Error: `Missing dependencies`**

```bash
pnpm install --force
```

### Port Already in Use

If port 8080 is already in use:

```bash
# Find process using port 8080
lsof -i :8080

# Kill the process
kill -9 <PID>
```

## Testing the Application

### Test Prediction Endpoint

```bash
curl -X POST http://localhost:8080/api/predict \
  -H "Content-Type: application/json" \
  -d '{
    "age": 45,
    "bmi": 28.5,
    "glucose": 145,
    "bloodPressure": 135,
    "insulin": 220,
    "pregnancies": 2
  }'
```

### Test History Endpoint

```bash
curl http://localhost:8080/api/history
```

## Performance Optimization

### Caching Predictions

For frequently requested patient data, consider adding Redis caching:

```bash
pnpm add redis
```

### Database Indexing

Ensure proper indexes on MongoDB for fast queries:

```javascript
// In Patient model
patientSchema.index({ createdAt: -1 });
patientSchema.index({ glucose: 1 });
```

### API Rate Limiting

Implement rate limiting for production:

```bash
pnpm add express-rate-limit
```

## Next Steps

1. **Integrate Your ML Model:**
   - Replace the demo scoring in `server/routes/predict.ts`
   - Integrate your trained Python ML model
   - Use services like Hugging Face Inference API

2. **Add User Authentication:**
   - Implement user login for doctors
   - Use services like Auth0, Firebase, or Supabase

3. **Implement ROC Curve Visualization:**
   - Add ROC curve chart to results page
   - Use Recharts or similar library

4. **Data Analytics Dashboard:**
   - Add analytics for model performance
   - Track prediction accuracy metrics

## Support & Resources

- **API Documentation:** See `API_DOCUMENTATION.md`
- **MongoDB Docs:** https://docs.mongodb.com
- **Express.js Docs:** https://expressjs.com
- **React Docs:** https://react.dev
- **Vite Docs:** https://vitejs.dev

## License

This project is provided as-is for research and educational purposes.

---

**Need help?** Consult the API documentation or check the troubleshooting section above.
