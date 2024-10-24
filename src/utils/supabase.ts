import { SUPABASE_ANON_KEY, SUPABASE_URL } from "@/config/constants";
import { createClient } from "@supabase/supabase-js";

/**
 * This is our supabase client, it communicates with the db for us.
 * For reasons that are slightly outside of the scope of this project,
 * we are only going to use this in api routes even though there is a
 * verions of supabase that can be used in client components.
 */
export const client = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
