"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Home from "@/components/Home";

export default function Page() {
  const router = useRouter();

  useEffect(() => {
    // Check for JWT token on client side
    const cookies = document.cookie.split(";");
    const jwtCookie = cookies.find((cookie) =>
      cookie.trim().startsWith("jwt_token=")
    );

    if (!jwtCookie) {
      router.push("/login");
      return;
    }
  }, [router]);

  return <Home />;
}
