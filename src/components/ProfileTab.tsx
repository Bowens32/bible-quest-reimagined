import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { BookOpen, Flame, Target, Trophy, Pencil, LogOut, Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Profile {
  display_name: string;
  friend_code: string;
  streak: number;
  total_correct: number;
  total_answered: number;
}

export function ProfileTab() {
  const { user, signOut } = useAuth();
  const { toast } = useToast();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState("");
  const [chaptersCount, setChaptersCount] = useState(0);
  const [booksCount, setBooksCount] = useState(0);

  useEffect(() => {
    if (!user) return;
    fetchProfile();
    fetchStats();
  }, [user]);

  const fetchProfile = async () => {
    const { data } = await supabase
      .from("profiles")
      .select("display_name, friend_code, streak, total_correct, total_answered")
      .eq("user_id", user!.id)
      .single();
    if (data) {
      setProfile(data);
      setName(data.display_name);
    }
  };

  const fetchStats = async () => {
    const { data: chapters } = await supabase
      .from("chapters_read")
      .select("book_id, chapter")
      .eq("user_id", user!.id);
    if (chapters) {
      setChaptersCount(chapters.length);
      setBooksCount(new Set(chapters.map((c) => c.book_id)).size);
    }
  };

  const saveName = async () => {
    const newName = name.trim() || "Disciple";
    await supabase.from("profiles").update({ display_name: newName }).eq("user_id", user!.id);
    setProfile((p) => p ? { ...p, display_name: newName } : p);
    setEditing(false);
  };

  const accuracy = profile && profile.total_answered > 0
    ? Math.round((profile.total_correct / profile.total_answered) * 100)
    : 0;

  if (!profile) return <div className="py-10 text-center text-muted-foreground">Loading...</div>;

  return (
    <div className="pb-20">
      <div className="mb-8 text-center">
        <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
          <span className="font-serif text-3xl font-bold text-primary">
            {profile.display_name.charAt(0).toUpperCase()}
          </span>
        </div>

        {editing ? (
          <div className="mx-auto flex max-w-xs items-center gap-2">
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="text-center"
              autoFocus
              onKeyDown={(e) => e.key === "Enter" && saveName()}
            />
            <Button size="sm" onClick={saveName}>Save</Button>
          </div>
        ) : (
          <div className="flex items-center justify-center gap-2">
            <h1 className="font-serif text-2xl font-bold text-foreground">
              {profile.display_name}
            </h1>
            <button onClick={() => setEditing(true)} className="text-muted-foreground hover:text-primary">
              <Pencil className="h-4 w-4" />
            </button>
          </div>
        )}

        <div className="mt-2 flex items-center justify-center gap-1 text-sm text-muted-foreground">
          <span className="font-mono text-xs">{profile.friend_code}</span>
          <button
            onClick={() => {
              navigator.clipboard.writeText(profile.friend_code);
              toast({ title: "Copied!" });
            }}
            className="text-muted-foreground hover:text-primary"
          >
            <Copy className="h-3 w-3" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Card className="p-4 text-center">
          <BookOpen className="mx-auto mb-2 h-5 w-5 text-primary" />
          <p className="text-2xl font-bold text-foreground">{booksCount}</p>
          <p className="text-xs text-muted-foreground">Books Started</p>
        </Card>
        <Card className="p-4 text-center">
          <BookOpen className="mx-auto mb-2 h-5 w-5 text-gold" />
          <p className="text-2xl font-bold text-foreground">{chaptersCount}</p>
          <p className="text-xs text-muted-foreground">Chapters Read</p>
        </Card>
        <Card className="p-4 text-center">
          <Target className="mx-auto mb-2 h-5 w-5 text-primary" />
          <p className="text-2xl font-bold text-foreground">{accuracy}%</p>
          <p className="text-xs text-muted-foreground">Trivia Accuracy</p>
        </Card>
        <Card className="p-4 text-center">
          <Flame className="mx-auto mb-2 h-5 w-5 text-gold" />
          <p className="text-2xl font-bold text-foreground">{profile.streak}</p>
          <p className="text-xs text-muted-foreground">Day Streak</p>
        </Card>
      </div>

      {/* Achievements placeholder */}
      <Card className="mt-6 p-4">
        <div className="flex items-center gap-2 mb-3">
          <Trophy className="h-5 w-5 text-gold" />
          <h2 className="font-serif text-lg font-semibold text-foreground">Achievements</h2>
        </div>
        <p className="text-sm text-muted-foreground">Achievements coming in a future phase!</p>
      </Card>

      <Button
        variant="outline"
        className="mt-6 w-full text-destructive hover:bg-destructive/10"
        onClick={signOut}
      >
        <LogOut className="mr-2 h-4 w-4" /> Sign Out
      </Button>
    </div>
  );
}
