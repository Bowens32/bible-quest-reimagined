import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { AuthScreen } from "@/components/AuthScreen";
import { BottomTabBar } from "@/components/BottomTabBar";
import { ReadTab } from "@/components/ReadTab";
import { PlayTab } from "@/components/PlayTab";
import { ProfileTab } from "@/components/ProfileTab";
import { CommunityTab } from "@/components/CommunityTab";
import { FriendsTab } from "@/components/FriendsTab";
import { Book, Gamepad2, User, Users, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const Index = () => {
  const { user, loading } = useAuth();
  const [activeTab, setActiveTab] = useState("read");

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          <p className="font-serif text-lg text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <AuthScreen />;
  }

  const tabs = [
    { id: "read", label: "Read", icon: Book },
    { id: "play", label: "Play", icon: Gamepad2 },
    { id: "community", label: "Community", icon: MessageCircle },
    { id: "friends", label: "Friends", icon: Users },
    { id: "profile", label: "Profile", icon: User },
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="hidden border-b border-border bg-card md:block">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-3">
          <h1 className="font-serif text-xl font-bold text-primary">Bible Quest</h1>
          <nav className="flex gap-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors",
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
        {activeTab === "community" && <CommunityTab />}
        {activeTab === "friends" && <FriendsTab />}
        {activeTab === "profile" && <ProfileTab />}
      </main>

      <BottomTabBar activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
};

export default Index;
