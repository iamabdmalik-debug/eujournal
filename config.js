// Supabase Configuration
const SUPABASE_CONFIG = {
  url: "https://vnpsubzrxgnysmprjmad.supabase.co",
  anonKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZucHN1YnpyeGdueXNtcHJqbWFkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQyNzI3MDgsImV4cCI6MjA5OTg0ODcwOH0.zDCkBfN9D-3Iks45I1Fq7ekiZMZvRlCGpQTt2a9yxOo"
};

// Export if running in environment supporting import/export, otherwise bind to window
if (typeof window !== 'undefined') {
  window.SUPABASE_CONFIG = SUPABASE_CONFIG;
}
