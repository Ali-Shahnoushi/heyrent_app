import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://okiyilgeinfscqjhoefj.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9raXlpbGdlaW5mc2NxamhvZWZqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDk5NjI1MTcsImV4cCI6MjAyNTUzODUxN30.x3ayCJvGzqmDFdcgbTq_uM59VOgSBFBUoMyTCUSeFEc";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
