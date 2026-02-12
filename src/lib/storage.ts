const STORAGE_KEY = "bible-quest";

export interface UserProgress {
  displayName: string;
  chaptersRead: string[]; // "bookId-chapter"
  triviaScores: Record<string, { score: number; total: number }>; // "bookId-chapter" -> score
  streak: number;
  lastReadDate: string | null;
  totalCorrect: number;
  totalAnswered: number;
}

const defaultProgress: UserProgress = {
  displayName: "Disciple",
  chaptersRead: [],
  triviaScores: {},
  streak: 0,
  lastReadDate: null,
  totalCorrect: 0,
  totalAnswered: 0,
};

export function getProgress(): UserProgress {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) return { ...defaultProgress, ...JSON.parse(data) };
  } catch {}
  return { ...defaultProgress };
}

export function saveProgress(progress: UserProgress) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

export function markChapterRead(bookId: string, chapter: number) {
  const progress = getProgress();
  const key = `${bookId}-${chapter}`;
  if (!progress.chaptersRead.includes(key)) {
    progress.chaptersRead.push(key);
  }
  // Update streak
  const today = new Date().toDateString();
  if (progress.lastReadDate !== today) {
    const yesterday = new Date(Date.now() - 86400000).toDateString();
    progress.streak = progress.lastReadDate === yesterday ? progress.streak + 1 : 1;
    progress.lastReadDate = today;
  }
  saveProgress(progress);
  return progress;
}

export function saveTriviaScore(bookId: string, chapter: number, score: number, total: number) {
  const progress = getProgress();
  const key = `${bookId}-${chapter}`;
  progress.triviaScores[key] = { score, total };
  progress.totalCorrect += score;
  progress.totalAnswered += total;
  saveProgress(progress);
  return progress;
}
