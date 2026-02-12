import { useState, useCallback } from "react";
import { type BibleBook } from "@/data/bible-books";
import { BookSelection } from "./BookSelection";
import { ChapterSelection } from "./ChapterSelection";
import { ReadingView } from "./ReadingView";

type ReadView = "books" | "chapters" | "reading";

export function ReadTab() {
  const [view, setView] = useState<ReadView>("books");
  const [selectedBook, setSelectedBook] = useState<BibleBook | null>(null);
  const [selectedChapter, setSelectedChapter] = useState<number>(1);

  const handleSelectBook = useCallback((book: BibleBook) => {
    setSelectedBook(book);
    setView("chapters");
  }, []);

  const handleSelectChapter = useCallback((ch: number) => {
    setSelectedChapter(ch);
    setView("reading");
  }, []);

  const handleNavigate = useCallback((ch: number) => {
    setSelectedChapter(ch);
  }, []);

  if (view === "reading" && selectedBook) {
    return (
      <ReadingView
        book={selectedBook}
        chapter={selectedChapter}
        onBack={() => setView("chapters")}
        onNavigate={handleNavigate}
      />
    );
  }

  if (view === "chapters" && selectedBook) {
    return (
      <ChapterSelection
        book={selectedBook}
        onSelectChapter={handleSelectChapter}
        onBack={() => setView("books")}
      />
    );
  }

  return <BookSelection onSelectBook={handleSelectBook} />;
}
