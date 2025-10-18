/*
  # Innovation Arcade Tables Setup

  1. New Tables
    - `arcade_projects` - Stores student projects
    - `arcade_skill_drops` - Stores skill-building resources
    - `arcade_competitions` - Stores competition information
    - `arcade_courses` - Stores course offerings

  2. Security
    - Enable RLS on all tables
    - Public can view active items
    - Authenticated users can manage their own items
*/

-- Create arcade_projects table
CREATE TABLE IF NOT EXISTS arcade_projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  title text NOT NULL,
  description text,
  category text NOT NULL,
  image_url text,
  project_link text,
  status text DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'archived')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create arcade_skill_drops table
CREATE TABLE IF NOT EXISTS arcade_skill_drops (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  title text NOT NULL,
  description text,
  category text NOT NULL,
  image_url text,
  resource_link text,
  status text DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'archived')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create arcade_competitions table
CREATE TABLE IF NOT EXISTS arcade_competitions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  category text NOT NULL,
  image_url text,
  registration_link text,
  deadline timestamptz,
  status text DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'archived')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create arcade_courses table
CREATE TABLE IF NOT EXISTS arcade_courses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  category text NOT NULL,
  image_url text,
  course_link text,
  instructor text,
  status text DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'archived')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_arcade_projects_user_id ON arcade_projects(user_id);
CREATE INDEX IF NOT EXISTS idx_arcade_projects_status ON arcade_projects(status);
CREATE INDEX IF NOT EXISTS idx_arcade_projects_category ON arcade_projects(category);
CREATE INDEX IF NOT EXISTS idx_arcade_skill_drops_user_id ON arcade_skill_drops(user_id);
CREATE INDEX IF NOT EXISTS idx_arcade_skill_drops_status ON arcade_skill_drops(status);
CREATE INDEX IF NOT EXISTS idx_arcade_skill_drops_category ON arcade_skill_drops(category);
CREATE INDEX IF NOT EXISTS idx_arcade_competitions_status ON arcade_competitions(status);
CREATE INDEX IF NOT EXISTS idx_arcade_competitions_category ON arcade_competitions(category);
CREATE INDEX IF NOT EXISTS idx_arcade_courses_status ON arcade_courses(status);
CREATE INDEX IF NOT EXISTS idx_arcade_courses_category ON arcade_courses(category);

-- Enable RLS
ALTER TABLE arcade_projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE arcade_skill_drops ENABLE ROW LEVEL SECURITY;
ALTER TABLE arcade_competitions ENABLE ROW LEVEL SECURITY;
ALTER TABLE arcade_courses ENABLE ROW LEVEL SECURITY;

-- RLS Policies for arcade_projects
DROP POLICY IF EXISTS "Everyone can view active projects" ON arcade_projects;
CREATE POLICY "Everyone can view active projects" ON arcade_projects
  FOR SELECT 
  USING (status = 'active');

DROP POLICY IF EXISTS "Authenticated users can view own projects" ON arcade_projects;
CREATE POLICY "Authenticated users can view own projects" ON arcade_projects
  FOR SELECT 
  TO authenticated
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Authenticated users can insert own projects" ON arcade_projects;
CREATE POLICY "Authenticated users can insert own projects" ON arcade_projects
  FOR INSERT 
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update own projects" ON arcade_projects;
CREATE POLICY "Users can update own projects" ON arcade_projects
  FOR UPDATE 
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete own projects" ON arcade_projects;
CREATE POLICY "Users can delete own projects" ON arcade_projects
  FOR DELETE 
  TO authenticated
  USING (auth.uid() = user_id);

-- RLS Policies for arcade_skill_drops
DROP POLICY IF EXISTS "Everyone can view active skill drops" ON arcade_skill_drops;
CREATE POLICY "Everyone can view active skill drops" ON arcade_skill_drops
  FOR SELECT 
  USING (status = 'active');

DROP POLICY IF EXISTS "Authenticated users can view own skill drops" ON arcade_skill_drops;
CREATE POLICY "Authenticated users can view own skill drops" ON arcade_skill_drops
  FOR SELECT 
  TO authenticated
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Authenticated users can insert own skill drops" ON arcade_skill_drops;
CREATE POLICY "Authenticated users can insert own skill drops" ON arcade_skill_drops
  FOR INSERT 
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update own skill drops" ON arcade_skill_drops;
CREATE POLICY "Users can update own skill drops" ON arcade_skill_drops
  FOR UPDATE 
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete own skill drops" ON arcade_skill_drops;
CREATE POLICY "Users can delete own skill drops" ON arcade_skill_drops
  FOR DELETE 
  TO authenticated
  USING (auth.uid() = user_id);

-- RLS Policies for arcade_competitions
DROP POLICY IF EXISTS "Everyone can view active competitions" ON arcade_competitions;
CREATE POLICY "Everyone can view active competitions" ON arcade_competitions
  FOR SELECT 
  USING (status = 'active');

-- RLS Policies for arcade_courses
DROP POLICY IF EXISTS "Everyone can view active courses" ON arcade_courses;
CREATE POLICY "Everyone can view active courses" ON arcade_courses
  FOR SELECT 
  USING (status = 'active');

-- Grant permissions
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON public.arcade_projects TO anon, authenticated;
GRANT ALL ON public.arcade_skill_drops TO anon, authenticated;
GRANT ALL ON public.arcade_competitions TO anon, authenticated;
GRANT ALL ON public.arcade_courses TO anon, authenticated;
