/*
  # Setup Marketplace RLS and Policies

  1. Security
    - Enable RLS on all marketplace tables
    - Create policies for public viewing of active products
    - Create policies for authenticated user management
*/

-- Enable RLS
ALTER TABLE marketplace_products ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_tokens ENABLE ROW LEVEL SECURITY;
ALTER TABLE marketplace_transactions ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Public can view active marketplace products" ON marketplace_products;
DROP POLICY IF EXISTS "Users can view their own marketplace products" ON marketplace_products;
DROP POLICY IF EXISTS "Anyone can read active products" ON marketplace_products;
DROP POLICY IF EXISTS "Users can insert their own products" ON marketplace_products;
DROP POLICY IF EXISTS "Users can update their own products" ON marketplace_products;
DROP POLICY IF EXISTS "Users can delete their own products" ON marketplace_products;

-- Marketplace Products Policies
CREATE POLICY "Public can view active marketplace products" ON marketplace_products
  FOR SELECT 
  USING (status = 'active');

CREATE POLICY "Users can view their own marketplace products" ON marketplace_products
  FOR SELECT 
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own products" ON marketplace_products
  FOR INSERT 
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own products" ON marketplace_products
  FOR UPDATE 
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own products" ON marketplace_products
  FOR DELETE 
  TO authenticated
  USING (auth.uid() = user_id);

-- User Tokens Policies
DROP POLICY IF EXISTS "Users can read their own tokens" ON user_tokens;
DROP POLICY IF EXISTS "Users can update their own tokens" ON user_tokens;

CREATE POLICY "Users can read their own tokens" ON user_tokens
  FOR SELECT 
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own tokens" ON user_tokens
  FOR UPDATE 
  TO authenticated
  USING (auth.uid() = user_id);

-- Marketplace Transactions Policies
DROP POLICY IF EXISTS "Users can read their own transactions" ON marketplace_transactions;
DROP POLICY IF EXISTS "Users can insert transactions as buyers" ON marketplace_transactions;

CREATE POLICY "Users can read their own transactions" ON marketplace_transactions
  FOR SELECT 
  TO authenticated
  USING (auth.uid() = buyer_id OR auth.uid() = seller_id);

CREATE POLICY "Users can insert transactions as buyers" ON marketplace_transactions
  FOR INSERT 
  TO authenticated
  WITH CHECK (auth.uid() = buyer_id);

-- Grant permissions
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT SELECT ON public.marketplace_products TO anon, authenticated;
GRANT ALL ON public.marketplace_products TO authenticated;
GRANT ALL ON public.user_tokens TO authenticated;
GRANT ALL ON public.marketplace_transactions TO authenticated;
