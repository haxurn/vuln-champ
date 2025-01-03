"use client";

import DashboardPreview from "@/components/dashboard";
import { Nav } from "@/components/nav";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { useQuery } from "@tanstack/react-query";
import { redirect, useRouter } from "next/navigation";
import RetroGrid from "@/components/ui/retro-grid";

const fetchStarCount = async () => {
  const response = await fetch("https://api.github.com/repos/haxurn/vuln-champ");
  const data = await response.json();
  return data.stargazers_count;
};

export default function Homer() {
  const router = useRouter();

  const {
    data: starCount,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["githubStarCount"],
    queryFn: fetchStarCount,
  });

  const session = authClient.useSession();

  if (session.data?.session) {
    redirect("/");
  }

  return (
    <div className="h-max-screen md:h-screen overflow-y-hidden bg-background">
      <Nav />

      <main className="px-4">
        <div className="max-w-4xl mx-auto text-center pt-20 pb-16">
          <div className="mt-8 mx-auto justify-center">
            {isLoading ? (
              <p className="text-lg text-muted-foreground mb-4">
                Loading star count...
              </p>
            ) : error ? (
              <p className="text-lg text-red-500 mb-4">
                Error fetching star count.
              </p>
            ) : (
              <a
                href="https://github.com/haxurn/vuln-champ"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center w-fit gap-2 px-5 py-1 mx-auto bg-black/85 text-white border rounded-3xl border-black/40"
              >
                <span className="text-lg text-white text-center font-semibold">
                  {starCount}
                </span>
                <span className="text-lg text-white text-center font-semibold">
                  Stars on GitHub
                </span>
              </a>
            )}
          </div>

          <h1 className="mt-8 scroll-m-20 text-3xl md:text-5xl font-extrabold tracking-tight mb-6">
            Track Vulnerabilities. Reward Excellence.
          </h1>
          <p className="text-sm md:text-xl text-muted-foreground mb-8 max-w-[85%] mx-auto">
            Vuln Champ is the ultimate platform for security teams to manage and gamify vulnerability detection. Discover vulnerabilities, track progress, and compete for the top spot on the leaderboard.
          </p>

          <div className="flex items-center justify-center gap-4">
            <Button
              size="lg"
              onClick={() => {
                router.push("/sign-in");
              }}
              className="font-medium"
            >
              Join the Challenge
            </Button>
          </div>
        </div>

        {/* RetroGrid for Features Section */}
        <RetroGrid className="py-16">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-semibold mb-6">Why Vuln-Champ?</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Vuln-Champ helps organizations to accelerate vulnerability discovery, reward team performance, and improve security posture with real-time updates and engaging gamification features.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-6 bg-white shadow-lg rounded-xl">
                <h3 className="text-xl font-semibold mb-4">Gamified Tracking</h3>
                <p className="text-sm text-muted-foreground">
                  Turn vulnerability detection into a fun, competitive activity with leaderboards, badges, and points.
                </p>
              </div>
              <div className="p-6 bg-white shadow-lg rounded-xl">
                <h3 className="text-xl font-semibold mb-4">Real-Time Stats</h3>
                <p className="text-sm text-muted-foreground">
                  Track vulnerabilities, team contributions, and individual progress in real-time to stay ahead in the race.
                </p>
              </div>
              <div className="p-6 bg-white shadow-lg rounded-xl">
                <h3 className="text-xl font-semibold mb-4">Team Collaboration</h3>
                <p className="text-sm text-muted-foreground">
                  Collaborate seamlessly with your team, share insights, and celebrate each achievement together.
                </p>
              </div>
            </div>
          </div>
        </RetroGrid>

        {/* Dashboard Preview Section */}
        <DashboardPreview />
      </main>
    </div>
  );
}
