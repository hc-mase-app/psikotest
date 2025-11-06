-- Psikotest Online Database Schema
-- Run this script to initialize the database tables

-- Participants table
CREATE TABLE IF NOT EXISTS participants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  position VARCHAR(100) NOT NULL,
  department VARCHAR(100) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Test Results table
CREATE TABLE IF NOT EXISTS test_results (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  participant_id UUID NOT NULL REFERENCES participants(id) ON DELETE CASCADE,
  test_modules TEXT[] NOT NULL,
  total_questions INTEGER NOT NULL,
  responses JSONB NOT NULL,
  completed_at TIMESTAMP NOT NULL,
  submitted_at TIMESTAMP DEFAULT NOW(),
  status VARCHAR(50) DEFAULT 'submitted'
);

-- Admin access table (for HR personnel)
CREATE TABLE IF NOT EXISTS admin_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) NOT NULL UNIQUE,
  name VARCHAR(255) NOT NULL,
  role VARCHAR(50) DEFAULT 'viewer',
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX idx_participants_email ON participants(email);
CREATE INDEX idx_test_results_participant_id ON test_results(participant_id);
CREATE INDEX idx_test_results_submitted_at ON test_results(submitted_at);

-- Optional: Create a view for test summary
CREATE OR REPLACE VIEW test_summary AS
SELECT
  p.id,
  p.name,
  p.email,
  p.position,
  p.department,
  tr.total_questions,
  array_length(tr.test_modules, 1) as module_count,
  tr.completed_at,
  tr.submitted_at,
  tr.status
FROM participants p
LEFT JOIN test_results tr ON p.id = tr.participant_id
ORDER BY tr.submitted_at DESC;
