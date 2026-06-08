import { Spinner } from "@/components/atoms/spinner";

export default function Loading() {
  return (
    <div className="flex h-full items-center justify-center py-16">
      <Spinner className="h-6 w-6" />
    </div>
  );
}
