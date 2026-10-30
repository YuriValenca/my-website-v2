"use client";

import { useQuery } from "@tanstack/react-query";
import { getPerson } from "../(api)/people";

export function useGetPerson(id: number) {
  return useQuery({
    queryKey: ["people", id],
    queryFn: () => getPerson(id),
  })
}
