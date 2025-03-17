"use client";

import { useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import { useZustandStore } from "@/state/zustandStore";

export default function AuthProvider() {
  const { setUser, setLoading, reset } = useZustandStore();
  const supabase = createClient();

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        setUser(user);
      } else {
        setLoading(false);
      }
    };

    fetchUser();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (session) {
          if (session.provider_token) {
            window.localStorage.setItem(
              "oauth_provider_token",
              session.provider_token
            );
          }
          if (session.provider_refresh_token) {
            window.localStorage.setItem(
              "oauth_provider_refresh_token",
              session.provider_refresh_token
            );
          }

          setUser(session.user);
        }

        if (event === "SIGNED_OUT") {
          window.localStorage.removeItem("oauth_provider_token");
          window.localStorage.removeItem("oauth_provider_refresh_token");
          reset();
        }
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [setUser, setLoading, reset, supabase]);

  return null;
}
