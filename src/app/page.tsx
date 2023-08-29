"use client";

import { useQuery } from "@tanstack/react-query";

export default function HomePage() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["cat"],
    queryFn: async () => {
      const response = await fetch("https://meowfacts.herokuapp.com");
      const data = await response.json();
      const text = data.data[0];
      return text;
    },
    // staleTime: 5 * 60 * 1000,
    staleTime: 10 * 1000,
  });

  return <main className="bg-gray-500">{data}</main>;
}
