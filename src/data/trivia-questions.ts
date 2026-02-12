export interface TriviaQuestion {
  id: string;
  bookId: string;
  chapter: number;
  question: string;
  options: string[];
  correctIndex: number;
}

export const triviaQuestions: TriviaQuestion[] = [
  // Genesis 1
  { id: "gen1-1", bookId: "genesis", chapter: 1, question: "What did God create first?", options: ["Light", "Water", "Animals", "Man"], correctIndex: 0 },
  { id: "gen1-2", bookId: "genesis", chapter: 1, question: "On which day did God create man?", options: ["Third", "Fifth", "Sixth", "Seventh"], correctIndex: 2 },
  { id: "gen1-3", bookId: "genesis", chapter: 1, question: "What did God call the dry land?", options: ["Ground", "Earth", "Soil", "Land"], correctIndex: 1 },
  { id: "gen1-4", bookId: "genesis", chapter: 1, question: "What did God do on the seventh day?", options: ["Created stars", "Rested", "Made animals", "Formed Eve"], correctIndex: 1 },
  { id: "gen1-5", bookId: "genesis", chapter: 1, question: "In whose image was man created?", options: ["Angels", "Animals", "God's", "His own"], correctIndex: 2 },
  { id: "gen1-6", bookId: "genesis", chapter: 1, question: "What separated the waters from the waters?", options: ["Land", "Mountains", "Firmament", "Wind"], correctIndex: 2 },
  { id: "gen1-7", bookId: "genesis", chapter: 1, question: "What two great lights did God make?", options: ["Stars and moon", "Sun and moon", "Sun and stars", "Fire and light"], correctIndex: 1 },
  { id: "gen1-8", bookId: "genesis", chapter: 1, question: "What was God's assessment of all He made?", options: ["It was adequate", "It was good", "It was very good", "It was perfect"], correctIndex: 2 },
  { id: "gen1-9", bookId: "genesis", chapter: 1, question: "On which day were plants created?", options: ["Second", "Third", "Fourth", "Fifth"], correctIndex: 1 },
  { id: "gen1-10", bookId: "genesis", chapter: 1, question: "What did God tell mankind to do?", options: ["Be fruitful and multiply", "Build cities", "Write laws", "Name the stars"], correctIndex: 0 },
  // John 1
  { id: "jn1-1", bookId: "john", chapter: 1, question: "What was in the beginning?", options: ["The Light", "The Word", "The Spirit", "The Son"], correctIndex: 1 },
  { id: "jn1-2", bookId: "john", chapter: 1, question: "Who was sent to bear witness of the Light?", options: ["Peter", "John", "Paul", "Moses"], correctIndex: 1 },
  { id: "jn1-3", bookId: "john", chapter: 1, question: "The Word was made what?", options: ["Spirit", "Light", "Flesh", "Truth"], correctIndex: 2 },
  { id: "jn1-4", bookId: "john", chapter: 1, question: "All things were made by whom?", options: ["Angels", "The Word", "Moses", "David"], correctIndex: 1 },
  { id: "jn1-5", bookId: "john", chapter: 1, question: "What did the darkness NOT do?", options: ["Comprehend the light", "Overcome it", "See it", "Both A and B"], correctIndex: 0 },
  // Matthew 1
  { id: "mt1-1", bookId: "matthew", chapter: 1, question: "Jesus Christ is called the son of whom?", options: ["Abraham only", "David only", "David and Abraham", "Moses"], correctIndex: 2 },
  { id: "mt1-2", bookId: "matthew", chapter: 1, question: "Who was Jesus' earthly father?", options: ["David", "Joseph", "Abraham", "Jacob"], correctIndex: 1 },
  { id: "mt1-3", bookId: "matthew", chapter: 1, question: "Who appeared to Joseph in a dream?", options: ["God", "An angel of the Lord", "Mary", "A prophet"], correctIndex: 1 },
  { id: "mt1-4", bookId: "matthew", chapter: 1, question: "What does the name Jesus mean?", options: ["King of kings", "He shall save his people", "Son of God", "Prince of peace"], correctIndex: 1 },
  { id: "mt1-5", bookId: "matthew", chapter: 1, question: "Mary was found with child of whom?", options: ["Joseph", "The Holy Ghost", "David", "An angel"], correctIndex: 1 },
];

export function getQuestionsForChapter(bookId: string, chapter: number): TriviaQuestion[] {
  return triviaQuestions.filter(q => q.bookId === bookId && q.chapter === chapter);
}
