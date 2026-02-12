import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { getProgress, saveProgress, type UserProgress } from "@/lib/storage";
import { bibleBooks } from "@/data/bible-books";
import { BookOpen, Flame, Target, Trophy, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function ProfileTab() {
  const [progress, setProgress] = useState<UserProgress>(getProgress);
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(progress.displayName);

  useEffect(() => {
    setProgress(getProgress());
  }, []);

  const saveName = () => {
    const p = getProgress();
    p.displayName = name || "Disciple";
    saveProgress(p);
    setProgress(p);
    setEditing(false);
  };

  const uniqueBooks = new Set(progress.chaptersRead.map((c) => c.split("-")[0]));
  const accuracy = progress.totalAnswered > 0
    ? Math.round((progress.totalCorrect / progress.totalAnswered) * 100)
    : 0;

  return (
    <div className="pb-20">
      <div className="mb-8 text-center">
        <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
          <span className="font-serif text-3xl font-bold text-primary">
            {progress.displayName.charAt(0).toUpperCase()}
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
              {progress.displayName}
            </h1>
            <button onClick={() => setEditing(true)} className="text-muted-foreground hover:text-primary">
              <Pencil className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Card className="p-4 text-center">
          <BookOpen className="mx-auto mb-2 h-5 w-5 text-primary" />
          <p className="text-2xl font-bold text-foreground">{uniqueBooks.size}</p>
          <p className="text-xs text-muted-foreground">Books Started</p>
        </Card>
        <Card className="p-4 text-center">
          <BookOpen className="mx-auto mb-2 h-5 w-5 text-gold" />
          <p className="text-2xl font-bold text-foreground">{progress.chaptersRead.length}</p>
          <p className="text-xs text-muted-foreground">Chapters Read</p>
        </Card>
        <Card className="p-4 text-center">
          <Target className="mx-auto mb-2 h-5 w-5 text-primary" />
          <p className="text-2xl font-bold text-foreground">{accuracy}%</p>
          <p className="text-xs text-muted-foreground">Trivia Accuracy</p>
        </Card>
        <Card className="p-4 text-center">
          <Flame className="mx-auto mb-2 h-5 w-5 text-gold" />
          <p className="text-2xl font-bold text-foreground">{progress.streak}</p>
          <p className="text-xs text-muted-foreground">Day Streak</p>
        </Card>
      </div>

      <Card className="mt-6 p-4">
        <h2 className="mb-3 font-serif text-lg font-semibold text-foreground">Quiz Scores</h2>
        {Object.keys(progress.triviaScores).length === 0 ? (
          <p className="text-sm text-muted-foreground">No quizzes completed yet.</p>
        ) : (
          <div className="space-y-2">
            {Object.entries(progress.triviaScores).map(([key, val]) => {
              const [bookId, ch] = key.split("-");
              const book = bibleBooks.find((b) => b.id === bookId);
              return (
                <div key={key} className="flex items-center justify-between text-sm">
                  <span className="text-foreground">{book?.name || bookId} {ch}</span>
                  <span className="font-semibold text-primary">{val.score}/{val.total}</span>
                </div>
              );
            })}
          </div>
        )}
      </Card>
    </div>
  );
}
