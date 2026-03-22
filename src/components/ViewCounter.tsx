"use client";

import { useEffect, useRef } from "react";
import { createClient } from "@/utils/supabase/client";

export default function ViewCounter({ id }: { id: string }) {
  const hasIncremented = useRef(false);

  useEffect(() => {
    if (hasIncremented.current) return;
    hasIncremented.current = true;

    async function incrementView() {
      const supabase = createClient();
      
      // 1. Fetch current views
      const { data, error: fetchError } = await supabase
        .from("articles")
        .select("views")
        .eq("id", id)
        .single();

      if (!fetchError && data) {
        // 2. Increment by 1
        await supabase
          .from("articles")
          .update({ views: (data.views || 0) + 1 })
          .eq("id", id);
      }
    }

    incrementView();
  }, [id]);

  return null;
}
