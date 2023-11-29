import { createClient } from "@refinedev/supabase";

const SUPABASE_URL = "https://edyygoaprlrfqcexmsys.supabase.co";
const SUPABASE_KEY =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVkeXlnb2FwcmxyZnFjZXhtc3lzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDExNzA4MDcsImV4cCI6MjAxNjc0NjgwN30.ENH6N-cSWDrmdE44cMzZZRqwG3hh1RQSq877vPBfntc";

export const supabaseClient = createClient(SUPABASE_URL, SUPABASE_KEY, {
    db: {
        schema: "public",
    },
    auth: {
        persistSession: true,
    },
});
