"use client";

import { useQuery } from "@tanstack/react-query";

export default function HomePage() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["cat"],
    queryFn: async () => {
      const response = await fetch(
        "https://uselessfacts.jsph.pl/api/v2/facts/random"
      );
      const data = await response.json();
      const text = data.text;
      return text;
    },
    // staleTime: 5 * 60 * 1000,
    staleTime: 10 * 1000,
  });

  return <main>{data}</main>;
}
