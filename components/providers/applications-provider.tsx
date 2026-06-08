"use client";

import {
  createApplication,
  deleteApplicationFromDb,
  fetchApplications,
  updateApplicationInDb,
} from "@/lib/db/applications";
import type { Application } from "@/types/application";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

interface ApplicationsContextValue {
  applications: Application[];
  loading: boolean;
  addApplication: (data: Omit<Application, "id">) => Promise<Application>;
  updateApplication: (
    id: string,
    data: Partial<Omit<Application, "id">>
  ) => void;
  deleteApplication: (id: string) => void;
  getApplication: (id: string) => Application | undefined;
  reloadApplications: () => Promise<void>;
}

const ApplicationsContext = createContext<ApplicationsContextValue | null>(
  null
);

export function ApplicationsProvider({ children }: { children: ReactNode }) {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);

  const reloadApplications = useCallback(async () => {
    const apps = await fetchApplications();
    setApplications(apps);
  }, []);

  useEffect(() => {
    let cancelled = false;

    fetchApplications()
      .then((apps) => {
        if (!cancelled) setApplications(apps);
      })
      .catch((err) => {
        console.error("Failed to load applications:", err);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const addApplication = useCallback(async (data: Omit<Application, "id">) => {
    const app = await createApplication(data);
    setApplications((prev) => [app, ...prev]);
    return app;
  }, []);

  const updateApplication = useCallback(
    (id: string, data: Partial<Omit<Application, "id">>) => {
      setApplications((prev) =>
        prev.map((a) => (a.id === id ? { ...a, ...data, id: a.id } : a))
      );

      updateApplicationInDb(id, data).catch((err) => {
        console.error("Failed to update application:", err);
        reloadApplications().catch(console.error);
      });
    },
    [reloadApplications]
  );

  const deleteApplication = useCallback((id: string) => {
    setApplications((prev) => prev.filter((a) => a.id !== id));

    deleteApplicationFromDb(id).catch((err) => {
      console.error("Failed to delete application:", err);
      reloadApplications().catch(console.error);
    });
  }, [reloadApplications]);

  const getApplication = useCallback(
    (id: string) => applications.find((a) => a.id === id),
    [applications]
  );

  const value = useMemo(
    () => ({
      applications,
      loading,
      addApplication,
      updateApplication,
      deleteApplication,
      getApplication,
      reloadApplications,
    }),
    [
      applications,
      loading,
      addApplication,
      updateApplication,
      deleteApplication,
      getApplication,
      reloadApplications,
    ]
  );

  return (
    <ApplicationsContext.Provider value={value}>
      {children}
    </ApplicationsContext.Provider>
  );
}

export function useApplications() {
  const ctx = useContext(ApplicationsContext);
  if (!ctx) {
    throw new Error("useApplications must be used within ApplicationsProvider");
  }
  return ctx;
}
