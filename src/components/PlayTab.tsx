import { useState, useMemo, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { getProgress, saveTriviaScore, type UserProgress } from "@/lib/storage";
import { getQuestionsForChapter, type TriviaQuestion } from "@/data/trivia-questions";
import { bibleBooks } from "@/data/bible-books";
import { Trophy, Flame, Target, RotateCcw, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

type PlayView = "hub" | "quiz" | "results";

export function PlayTab() {
  const [view, setView] = useState<PlayView>("hub");
  const [currentQuestions, setCurrentQuestions] = useState<TriviaQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const [progress, setProgress] = useState<UserProgress>(getProgress);
  const [quizBookId, setQuizBookId] = useState("");
  const [quizChapter, setQuizChapter] = useState(0);

  // Find available chapters with trivia
  const availableQuizzes = useMemo(() => {
    const chaptersRead = progress.chaptersRead;
    const quizzes: { bookId: string; bookName: string; chapter: number; done: boolean }[] = [];
    for (const key of chaptersRead) {
      const [bookId, ch] = key.split("-");
      const questions = getQuestionsForChapter(bookId, parseInt(ch));
      if (questions.length > 0) {
        const book = bibleBooks.find((b) => b.id === bookId);
        quizzes.push({
          bookId,
          bookName: book?.name || bookId,
          chapter: parseInt(ch),
          done: !!progress.triviaScores[key],
        });
      }
    }
    return quizzes;
  }, [progress]);

  const startQuiz = useCallback((bookId: string, chapter: number) => {
    const questions = getQuestionsForChapter(bookId, chapter);
    setCurrentQuestions(questions);
    setCurrentIndex(0);
    setScore(0);
    setSelected(null);
    setAnswered(false);
    setQuizBookId(bookId);
    setQuizChapter(chapter);
    setView("quiz");
  }, []);

  const handleAnswer = useCallback((index: number) => {
    if (answered) return;
    setSelected(index);
    setAnswered(true);
    if (index === currentQuestions[currentIndex].correctIndex) {
      setScore((s) => s + 1);
    }
  }, [answered, currentQuestions, currentIndex]);

  const nextQuestion = useCallback(() => {
    if (currentIndex + 1 >= currentQuestions.length) {
      const finalScore = selected === currentQuestions[currentIndex].correctIndex ? score : score;
      // score is already updated
      const newProgress = saveTriviaScore(quizBookId, quizChapter, score, currentQuestions.length);
      setProgress(newProgress);
      setView("results");
    } else {
      setCurrentIndex((i) => i + 1);
      setSelected(null);
      setAnswered(false);
    }
  }, [currentIndex, currentQuestions, score, quizBookId, quizChapter, selected]);

  const accuracy = progress.totalAnswered > 0
    ? Math.round((progress.totalCorrect / progress.totalAnswered) * 100)
    : 0;

  // HUB VIEW
  if (view === "hub") {
    return (
      <div className="pb-20">
        <h1 className="mb-1 font-serif text-3xl font-bold text-foreground">Play</h1>
        <p className="mb-6 text-sm text-muted-foreground">Test your knowledge after reading</p>

        <div className="mb-6 grid grid-cols-3 gap-3">
          <Card className="p-4 text-center">
            <Flame className="mx-auto mb-1 h-5 w-5 text-gold" />
            <p className="text-2xl font-bold text-foreground">{progress.streak}</p>
            <p className="text-xs text-muted-foreground">Streak</p>
          </Card>
          <Card className="p-4 text-center">
            <Target className="mx-auto mb-1 h-5 w-5 text-primary" />
            <p className="text-2xl font-bold text-foreground">{accuracy}%</p>
            <p className="text-xs text-muted-foreground">Accuracy</p>
          </Card>
          <Card className="p-4 text-center">
            <Trophy className="mx-auto mb-1 h-5 w-5 text-gold" />
            <p className="text-2xl font-bold text-foreground">
              {Object.keys(progress.triviaScores).length}
            </p>
            <p className="text-xs text-muted-foreground">Completed</p>
          </Card>
        </div>

        {availableQuizzes.length === 0 ? (
          <Card className="p-8 text-center">
            <p className="font-serif text-lg text-muted-foreground">
              Read a chapter first to unlock trivia!
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              Try Genesis 1, Matthew 1, or John 1.
            </p>
          </Card>
        ) : (
          <div className="space-y-3">
            <h2 className="font-serif text-lg font-semibold text-foreground">Available Quizzes</h2>
            {availableQuizzes.map((q) => (
              <Card
                key={`${q.bookId}-${q.chapter}`}
                className="flex cursor-pointer items-center justify-between p-4 transition-all hover:shadow-md"
                onClick={() => startQuiz(q.bookId, q.chapter)}
              >
                <div>
                  <p className="font-serif font-semibold text-foreground">
                    {q.bookName} {q.chapter}
                  </p>
                  {q.done && (
                    <p className="text-xs text-success">
                      Score: {progress.triviaScores[`${q.bookId}-${q.chapter}`].score}/
                      {progress.triviaScores[`${q.bookId}-${q.chapter}`].total}
                    </p>
                  )}
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground" />
              </Card>
            ))}
          </div>
        )}
      </div>
    );
  }

  // QUIZ VIEW
  if (view === "quiz" && currentQuestions.length > 0) {
    const q = currentQuestions[currentIndex];
    const progressPercent = ((currentIndex + 1) / currentQuestions.length) * 100;

    return (
      <div className="pb-20">
        <div className="mb-6">
          <div className="mb-2 flex items-center justify-between text-sm text-muted-foreground">
            <span>Question {currentIndex + 1} of {currentQuestions.length}</span>
            <span>{score} correct</span>
          </div>
          <Progress value={progressPercent} className="h-2" />
        </div>

        <Card className="mb-6 p-6">
          <p className="font-serif text-xl font-semibold text-foreground">{q.question}</p>
        </Card>

        <div className="space-y-3">
          {q.options.map((option, i) => {
            let variant = "outline" as const;
            let extraClass = "";
            if (answered) {
              if (i === q.correctIndex) extraClass = "border-success bg-success/10 text-success";
              else if (i === selected) extraClass = "border-burgundy bg-burgundy/10 text-burgundy";
            }

            return (
              <Button
                key={i}
                variant={variant}
                onClick={() => handleAnswer(i)}
                disabled={answered}
                className={cn(
                  "h-auto w-full justify-start whitespace-normal p-4 text-left font-serif text-base",
                  extraClass
                )}
              >
                <span className="mr-3 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-border text-sm font-bold">
                  {String.fromCharCode(65 + i)}
                </span>
                {option}
              </Button>
            );
          })}
        </div>

        {answered && (
          <Button onClick={nextQuestion} className="mt-6 w-full" size="lg">
            {currentIndex + 1 >= currentQuestions.length ? "See Results" : "Next Question"}
          </Button>
        )}
      </div>
    );
  }

  // RESULTS VIEW
  if (view === "results") {
    const bookName = bibleBooks.find((b) => b.id === quizBookId)?.name || quizBookId;
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center pb-20 text-center">
        <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gold/15">
          <Trophy className="h-10 w-10 text-gold" />
        </div>

        <h1 className="font-serif text-4xl font-bold text-foreground">
          {score}/{currentQuestions.length}
        </h1>
        <p className="mt-2 text-muted-foreground">
          {bookName} {quizChapter} Quiz Complete
        </p>

        <div className="mt-8 flex gap-3">
          <Button
            variant="outline"
            onClick={() => startQuiz(quizBookId, quizChapter)}
            className="gap-2"
          >
            <RotateCcw className="h-4 w-4" /> Replay
          </Button>
          <Button onClick={() => { setProgress(getProgress()); setView("hub"); }}>
            Back to Hub
          </Button>
        </div>
      </div>
    );
  }

  return null;
}
