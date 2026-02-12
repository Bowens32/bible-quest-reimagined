import { bibleBooks, type BibleBook } from "@/data/bible-books";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getProgress } from "@/lib/storage";
import { Check } from "lucide-react";

interface BookSelectionProps {
  onSelectBook: (book: BibleBook) => void;
}

export function BookSelection({ onSelectBook }: BookSelectionProps) {
  const progress = getProgress();
  const oldTestament = bibleBooks.filter((b) => b.testament === "old");
  const newTestament = bibleBooks.filter((b) => b.testament === "new");

  const hasRead = (bookId: string) =>
    progress.chaptersRead.some((c) => c.startsWith(bookId + "-"));

  const BookGrid = ({ books }: { books: BibleBook[] }) => (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
      {books.map((book) => {
        const read = hasRead(book.id);
        return (
          <Card
            key={book.id}
            onClick={() => onSelectBook(book)}
            className="group cursor-pointer border-border/60 p-4 transition-all hover:border-primary/40 hover:shadow-md"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="font-serif text-base font-semibold text-foreground group-hover:text-primary">
                  {book.name}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {book.chapters} chapter{book.chapters > 1 ? "s" : ""}
                </p>
              </div>
              {read && (
                <div className="flex h-5 w-5 items-center justify-center rounded-full bg-success/15">
                  <Check className="h-3 w-3 text-success" />
                </div>
              )}
            </div>
          </Card>
        );
      })}
    </div>
  );

  return (
    <div className="pb-20">
      <h1 className="mb-1 font-serif text-3xl font-bold text-foreground">Read</h1>
      <p className="mb-6 text-sm text-muted-foreground">Choose a book to begin reading</p>

      <Tabs defaultValue="old" className="w-full">
        <TabsList className="mb-4 w-full bg-secondary">
          <TabsTrigger value="old" className="flex-1 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            Old Testament
          </TabsTrigger>
          <TabsTrigger value="new" className="flex-1 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            New Testament
          </TabsTrigger>
        </TabsList>
        <TabsContent value="old">
          <BookGrid books={oldTestament} />
        </TabsContent>
        <TabsContent value="new">
          <BookGrid books={newTestament} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
