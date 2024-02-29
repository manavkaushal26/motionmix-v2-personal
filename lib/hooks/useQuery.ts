"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

type Query = { [key: string]: string | string[] };

type UseQueryReturn = {
  query: Query;
  writeQuery: (key: string, value: string) => void;
  updateQuery: (key: string, value: string) => void;
  removeQuery: (key: string) => void;
};

const useQuery = (): UseQueryReturn => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [query, setQuery] = useState<any>(searchParams);

  useEffect(() => {
    setQuery(searchParams);
  }, [pathname, searchParams]);

  const writeQuery = (
    key: string,
    value: string,
    scrollToTop: boolean = false
  ) => {
    const params = new URLSearchParams(searchParams);
    params.set(key, value);
    const newParams = params.toString();
    router.push(`${pathname}?${newParams}`, { scroll: scrollToTop });
  };

  const updateQuery = (
    key: string,
    value: string,
    scrollToTop: boolean = false
  ) => {
    const params = new URLSearchParams(searchParams);
    params.set(key, value);
    const newParams = params.toString();
    router.push(`${pathname}?${newParams}`, { scroll: scrollToTop });
  };

  const removeQuery = (key: any, scrollToTop: boolean = false) => {
    const params = new URLSearchParams(searchParams);
    params.delete(key);
    const newParams = params.toString();
    router.push(`${pathname}?${newParams}`, { scroll: scrollToTop });
  };

  return { query, writeQuery, updateQuery, removeQuery };
};

export default useQuery;
