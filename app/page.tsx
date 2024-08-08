import { LoginButton } from "@/components/auth/login-button";
import { Button } from "@/components/ui/button";

export default async function Home() {
  return (
    <main className="flex h-screen flex-col items-center justify-center bg-gradient-to-r from-gray-700 via-gray-900 to-black">
      <div className="space-y-6 text-center">
        <h1 className="font-mono text-6xl font-semibold text-white drop-shadow-md">
          🔐App
        </h1>
        <p className="text-white text-lg">A simple authntification service</p>
        <div>
          <LoginButton mode="modal" asChild>
            <Button variant="secondary" size="lg">
              Sign In
            </Button>
          </LoginButton>
        </div>
      </div>
    </main>
  );
}
