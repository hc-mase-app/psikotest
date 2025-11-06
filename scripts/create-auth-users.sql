-- Create authorized_users table for login authentication
CREATE TABLE IF NOT EXISTS authorized_users (
  user_id VARCHAR(10) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  is_active BOOLEAN DEFAULT true,
  last_login TIMESTAMP
);

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_authorized_users_active ON authorized_users(is_active);

-- Insert sample users (you can add more via database)
INSERT INTO authorized_users (user_id, name, is_active) VALUES
  ('1234567890', 'John Doe', true),
  ('0987654321', 'Jane Smith', true),
  ('1111111111', 'Test User', true)
ON CONFLICT (user_id) DO NOTHING;

-- Add comment
COMMENT ON TABLE authorized_users IS 'Stores authorized users who can access the psikotest system';
