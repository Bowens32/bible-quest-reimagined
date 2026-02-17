import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { bibleBooks } from "@/data/bible-books";
import { Sparkles } from "lucide-react";

interface Quote {
  book_id: string;
  chapter: number;
  verse_number: number;
  text: string;
}

export function DailyQuote() {
  const [quote, setQuote] = useState<Quote | null>(null);

  useEffect(() => {
    const fetchQuote = async () => {
      const today = new Date().toISOString().split("T")[0];
      const { data } = await supabase
        .from("daily_quotes")
        .select("book_id, chapter, verse_number, text")
        .eq("quote_date", today)
        .maybeSingle();

      if (data) {
        setQuote(data);
      } else {
        // Fallback: get any quote
        const { data: fallback } = await supabase
          .from("daily_quotes")
          .select("book_id, chapter, verse_number, text")
          .order("quote_date", { ascending: false })
          .limit(1)
          .maybeSingle();
        if (fallback) setQuote(fallback);
      }
    };
    fetchQuote();
  }, []);

  if (!quote) return null;

  const book = bibleBooks.find((b) => b.id === quote.book_id);
  const reference = `${book?.name || quote.book_id} ${quote.chapter}:${quote.verse_number}`;

  return (
    <Card className="mb-6 overflow-hidden border-gold/30 bg-gradient-to-br from-primary/5 to-gold/10 p-5">
      <div className="mb-2 flex items-center gap-2">
        <Sparkles className="h-4 w-4 text-gold" />
        <span className="text-xs font-semibold uppercase tracking-wider text-gold">Verse of the Day</span>
      </div>
      <p className="font-serif text-lg leading-relaxed text-foreground italic">
        "{quote.text}"
      </p>
      <p className="mt-3 text-sm font-semibold text-primary">— {reference}</p>
    </Card>
  );
}
