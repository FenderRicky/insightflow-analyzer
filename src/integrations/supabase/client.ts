// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://psnlwggiduzccqqnmumo.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBzbmx3Z2dpZHV6Y2NxcW5tdW1vIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA3NTUzNDQsImV4cCI6MjA2NjMzMTM0NH0.jq92pm7RDZegQLPQTzsS2S55jRN3PLvqLZMCWVa6oQs";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);