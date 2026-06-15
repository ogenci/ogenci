import { createClient } from "@supabase/supabase-js";
import "dotenv/config";

const supabaseUrl = process.env.SUPABASE_URL || "https://unrsbsyqxaxgbompbhpr.supabase.co";
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "dummy_key_for_boot";

export const supabase = createClient(supabaseUrl, supabaseServiceKey);
