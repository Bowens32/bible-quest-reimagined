import { type BibleBook } from "@/data/bible-books";
import { getChapterContent } from "@/data/sample-verses";
import { markChapterRead } from "@/lib/storage";
import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";

interface ReadingViewProps {
  book: BibleBook;
  chapter: number;
  onBack: () => void;
  onNavigate: (chapter: number) => void;
}

export function ReadingView({ book, chapter, onBack, onNavigate }: ReadingViewProps) {
  const content = getChapterContent(book.id, chapter);

  useEffect(() => {
    markChapterRead(book.id, chapter);
  }, [book.id, chapter]);

  return (
    <div className="pb-24">
      <Button variant="ghost" onClick={onBack} className="mb-4 -ml-2 text-muted-foreground">
        <ArrowLeft className="mr-1 h-4 w-4" /> {book.name}
      </Button>

      <h1 className="mb-6 font-serif text-3xl font-bold text-foreground">
        {book.name} {chapter}
      </h1>

      {content ? (
        <div className="space-y-4">
          {content.verses.map((verse) => (
            <p key={verse.number} className="font-serif text-lg leading-relaxed text-foreground">
              <span className="mr-1.5 text-xs font-bold text-gold align-super">{verse.number}</span>
              {verse.text}
            </p>
          ))}
        </div>
      ) : (
        <div className="rounded-lg border border-border bg-card p-8 text-center">
          <p className="font-serif text-lg text-muted-foreground italic">
            Content for {book.name} {chapter} is not yet available in this sample.
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            Try Genesis 1–3, Matthew 1, or John 1.
          </p>
        </div>
      )}

      <div className="mt-10 flex items-center justify-between">
        <Button
          variant="outline"
          onClick={() => onNavigate(chapter - 1)}
          disabled={chapter <= 1}
          className="gap-1"
        >
          <ChevronLeft className="h-4 w-4" /> Previous
        </Button>
        <span className="text-sm text-muted-foreground">
          {chapter} of {book.chapters}
        </span>
        <Button
          variant="outline"
          onClick={() => onNavigate(chapter + 1)}
          disabled={chapter >= book.chapters}
          className="gap-1"
        >
          Next <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
