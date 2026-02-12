import { Button } from "@/components/ui/button";
import { BookOpen } from "lucide-react";

interface WelcomeScreenProps {
  onGetStarted: () => void;
}

export function WelcomeScreen({ onGetStarted }: WelcomeScreenProps) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <div className="mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-primary/10">
        <BookOpen className="h-12 w-12 text-gold" />
      </div>

      <h1 className="font-serif text-5xl font-bold tracking-tight text-foreground md:text-6xl">
        Bible Quest
      </h1>

      <p className="mt-4 font-serif text-xl text-muted-foreground italic md:text-2xl">
        Read. Listen. Learn.
      </p>

      <p className="mt-6 max-w-md text-muted-foreground">
        Explore scripture, test your knowledge, and grow in faith — one chapter at a time.
      </p>

      <Button
        onClick={onGetStarted}
        className="mt-10 h-12 rounded-full bg-primary px-10 text-base font-semibold text-primary-foreground shadow-lg hover:bg-primary/90"
      >
        Get Started
      </Button>

      <div className="mt-16 flex gap-8 text-sm text-muted-foreground">
        <div className="text-center">
          <p className="text-2xl font-bold text-primary">66</p>
          <p>Books</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-primary">1,189</p>
          <p>Chapters</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-gold">∞</p>
          <p>Wisdom</p>
        </div>
      </div>
    </div>
  );
}
