-- NexusVocal: Linguistic & Engineering Mastery Schema

-- 1. Users & Career Profiles
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  full_name TEXT,
  target_role TEXT DEFAULT 'Software Engineer Intern',
  current_level TEXT DEFAULT 'B2',
  github_link TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Sessions (The "War Room" Logs)
CREATE TABLE sessions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id),
  mode TEXT CHECK (mode IN ('Technical Interview', 'Daily Standup', 'Architecture Review', 'Small Talk')),
  stress_score INT, -- 0-100 based on voice analysis
  fluency_score INT,
  transcript JSONB, -- Stores full conversation
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Linguistic Debt (The Error Tracker)
CREATE TABLE linguistic_debt (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id),
  category TEXT CHECK (category IN ('Grammar', 'Pronunciation', 'Technical Accuracy', 'Idiomatic Use')),
  raw_mistake TEXT,
  correction TEXT,
  context_link UUID REFERENCES sessions(id), -- Which session triggered this
  refactored BOOLEAN DEFAULT FALSE, -- Has the user improved this?
  occurrence_count INT DEFAULT 1
);

-- 4. Tech Vocabulary Heatmap
CREATE TABLE tech_vocabulary (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  term TEXT UNIQUE,
  definition TEXT,
  mastery_level INT DEFAULT 0, -- 0-100
  last_used TIMESTAMP WITH TIME ZONE
);