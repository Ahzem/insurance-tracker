import * as dotenv from 'dotenv';
import * as path from 'path';

// Try to load environment variables from .env file, but don't fail if file doesn't exist
try {
  dotenv.config({ path: path.join(__dirname, '../../.env') });
} catch (error) {
  console.warn('No .env file found, using default environment variables');
}

const config = {
  port: process.env.PORT || 3000,
  nodeEnv: process.env.NODE_ENV || 'development',
  clientOrigin: process.env.CLIENT_ORIGIN || 'http://localhost:5173',
  mongoUri: process.env.MONGO_URI || 'mongodb://localhost:27017/crm-app',
  aws: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION || 'us-east-1',
    s3: {
      bucketName: process.env.S3_BUCKET_NAME
    }
  }
};

export default config; 