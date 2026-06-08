"use client";

import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

interface SearchContextValue {
  query: string;
  setQuery: (query: string) => void;
}

/** Default no-op so `useSearch` is safe to call without a provider (e.g. Storybook). */
const SearchContext = createContext<SearchContextValue>({
  query: "",
  setQuery: () => {},
});

export function SearchProvider({ children }: { children: ReactNode }) {
  const [query, setQuery] = useState("");
  const value = useMemo(() => ({ query, setQuery }), [query]);
  return (
    <SearchContext.Provider value={value}>{children}</SearchContext.Provider>
  );
}

export function useSearch() {
  return useContext(SearchContext);
}
