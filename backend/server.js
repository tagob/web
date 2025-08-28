import express from 'express';
import cors from 'cors';
import { createClient } from '@supabase/supabase-js';

const app = express();
const PORT = 3000;

// Hardcoded Supabase credentials
const SUPABASE_URL = "https://zrwqpzvjjeunrccubgfd.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inpyd3FwenZqamV1bnJjY3ViZ2ZkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkwNTg4NDYsImV4cCI6MjA2NDYzNDg0Nn0.TRUoeIFoif4nct-zVd73KAsBazsv3qXDkqPqiHLQRnQ";
const SUPABASE_SERVICE_ROLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inpyd3FwenZqamV1bnJjY3ViZ2ZkIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0OTA1ODg0NiwiZXhwIjoyMDY0NjM0ODQ2fQ.gdMcK2TqZfKDs3ymtzGDiXhcB1n9B-QFN_z4zRPWgCM";

// Create Supabase client using service role key for server operations
const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

// Middleware
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5000'],
  credentials: true
}));
app.use(express.json());

// Root route
app.get('/', (req, res) => {
  res.json({ "message": "Riyadah Elite Backend & Database Connected ✅" });
});

// Test database connection
async function testDatabaseConnection() {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('count')
      .limit(1);
    
    if (error) {
      console.error('❌ Database connection failed:', error.message);
      return false;
    }
    
    console.log('✅ Database connected successfully');
    return true;
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
    return false;
  }
}

// Start server
app.listen(PORT, async () => {
  console.log(`✅ Backend running on http://localhost:${PORT}`);
  
  // Test database connection
  await testDatabaseConnection();
});

export default app;