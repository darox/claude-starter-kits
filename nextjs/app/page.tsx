import { Greeting } from "@/components/greeting";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold">Starter App</h1>
      <p className="mt-4 text-gray-500">
        Edit <code className="font-mono text-sm">app/page.tsx</code> to get
        started.
      </p>
      <Greeting />
    </main>
  );
}
