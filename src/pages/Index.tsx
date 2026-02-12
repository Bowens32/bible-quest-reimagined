import { useState, useEffect } from "react";
import { WelcomeScreen } from "@/components/WelcomeScreen";
import { BottomTabBar } from "@/components/BottomTabBar";
import { ReadTab } from "@/components/ReadTab";
import { PlayTab } from "@/components/PlayTab";
import { ProfileTab } from "@/components/ProfileTab";
import { Book, Gamepad2, User } from "lucide-react";
import { cn } from "@/lib/utils";

const ONBOARDED_KEY = "bible-quest-onboarded";

const Index = () => {
  const [onboarded, setOnboarded] = useState(() => localStorage.getItem(ONBOARDED_KEY) === "true");
  const [activeTab, setActiveTab] = useState("read");

  const handleGetStarted = () => {
    localStorage.setItem(ONBOARDED_KEY, "true");
    setOnboarded(true);
  };

  if (!onboarded) {
    return <WelcomeScreen onGetStarted={handleGetStarted} />;
  }

  const tabs = [
    { id: "read", label: "Read", icon: Book },
    { id: "play", label: "Play", icon: Gamepad2 },
    { id: "profile", label: "Profile", icon: User },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Desktop top nav */}
      <header className="hidden border-b border-border bg-card md:block">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-3">
          <h1 className="font-serif text-xl font-bold text-primary">Bible Quest</h1>
          <nav className="flex gap-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-colors",
                  activeTab === tab.id
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <tab.icon className="h-4 w-4" />
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-4 py-6 md:px-6">
        {activeTab === "read" && <ReadTab />}
        {activeTab === "play" && <PlayTab />}
        {activeTab === "profile" && <ProfileTab />}
      </main>

      <BottomTabBar activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
};

export default Index;
