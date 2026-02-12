import { type BibleBook } from "@/data/bible-books";
import { Card } from "@/components/ui/card";
import { getProgress } from "@/lib/storage";
import { ArrowLeft, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ChapterSelectionProps {
  book: BibleBook;
  onSelectChapter: (chapter: number) => void;
  onBack: () => void;
}

export function ChapterSelection({ book, onSelectChapter, onBack }: ChapterSelectionProps) {
  const progress = getProgress();

  return (
    <div className="pb-20">
      <Button variant="ghost" onClick={onBack} className="mb-4 -ml-2 text-muted-foreground">
        <ArrowLeft className="mr-1 h-4 w-4" /> Back
      </Button>

      <h1 className="mb-1 font-serif text-3xl font-bold text-foreground">{book.name}</h1>
      <p className="mb-6 text-sm text-muted-foreground">Select a chapter</p>

      <div className="grid grid-cols-5 gap-2 sm:grid-cols-8 md:grid-cols-10">
        {Array.from({ length: book.chapters }, (_, i) => i + 1).map((ch) => {
          const isRead = progress.chaptersRead.includes(`${book.id}-${ch}`);
          return (
            <Card
              key={ch}
              onClick={() => onSelectChapter(ch)}
              className="group flex aspect-square cursor-pointer items-center justify-center border-border/60 transition-all hover:border-primary/40 hover:shadow-md"
            >
              <div className="relative flex flex-col items-center">
                <span className="font-serif text-lg font-semibold text-foreground group-hover:text-primary">
                  {ch}
                </span>
                {isRead && (
                  <Check className="absolute -top-1 -right-3 h-3 w-3 text-success" />
                )}
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
