import { createClient } from "@/lib/supabase/server";

export default function useUserServer() {
  const supabase = createClient();

  return {};
}
