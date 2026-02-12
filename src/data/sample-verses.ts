export interface Verse {
  number: number;
  text: string;
}

export interface ChapterContent {
  bookId: string;
  chapter: number;
  verses: Verse[];
}

export const sampleVerses: Record<string, ChapterContent> = {
  "genesis-1": {
    bookId: "genesis",
    chapter: 1,
    verses: [
      { number: 1, text: "In the beginning God created the heaven and the earth." },
      { number: 2, text: "And the earth was without form, and void; and darkness was upon the face of the deep. And the Spirit of God moved upon the face of the waters." },
      { number: 3, text: "And God said, Let there be light: and there was light." },
      { number: 4, text: "And God saw the light, that it was good: and God divided the light from the darkness." },
      { number: 5, text: "And God called the light Day, and the darkness he called Night. And the evening and the morning were the first day." },
      { number: 6, text: "And God said, Let there be a firmament in the midst of the waters, and let it divide the waters from the waters." },
      { number: 7, text: "And God made the firmament, and divided the waters which were under the firmament from the waters which were above the firmament: and it was so." },
      { number: 8, text: "And God called the firmament Heaven. And the evening and the morning were the second day." },
      { number: 9, text: "And God said, Let the waters under the heaven be gathered together unto one place, and let the dry land appear: and it was so." },
      { number: 10, text: "And God called the dry land Earth; and the gathering together of the waters called he Seas: and God saw that it was good." },
      { number: 11, text: "And God said, Let the earth bring forth grass, the herb yielding seed, and the fruit tree yielding fruit after his kind, whose seed is in itself, upon the earth: and it was so." },
      { number: 12, text: "And the earth brought forth grass, and herb yielding seed after his kind, and the tree yielding fruit, whose seed was in itself, after his kind: and God saw that it was good." },
      { number: 13, text: "And the evening and the morning were the third day." },
      { number: 14, text: "And God said, Let there be lights in the firmament of the heaven to divide the day from the night; and let them be for signs, and for seasons, and for days, and years." },
      { number: 15, text: "And let them be for lights in the firmament of the heaven to give light upon the earth: and it was so." },
      { number: 16, text: "And God made two great lights; the greater light to rule the day, and the lesser light to rule the night: he made the stars also." },
      { number: 17, text: "And God set them in the firmament of the heaven to give light upon the earth." },
      { number: 18, text: "And to rule over the day and over the night, and to divide the light from the darkness: and God saw that it was good." },
      { number: 19, text: "And the evening and the morning were the fourth day." },
      { number: 20, text: "And God said, Let the waters bring forth abundantly the moving creature that hath life, and fowl that may fly above the earth in the open firmament of heaven." },
      { number: 21, text: "And God created great whales, and every living creature that moveth, which the waters brought forth abundantly, after their kind, and every winged fowl after his kind: and God saw that it was good." },
      { number: 22, text: "And God blessed them, saying, Be fruitful, and multiply, and fill the waters in the seas, and let fowl multiply in the earth." },
      { number: 23, text: "And the evening and the morning were the fifth day." },
      { number: 24, text: "And God said, Let the earth bring forth the living creature after his kind, cattle, and creeping thing, and beast of the earth after his kind: and it was so." },
      { number: 25, text: "And God made the beast of the earth after his kind, and cattle after their kind, and every thing that creepeth upon the earth after his kind: and God saw that it was good." },
      { number: 26, text: "And God said, Let us make man in our image, after our likeness: and let them have dominion over the fish of the sea, and over the fowl of the air, and over the cattle, and over all the earth, and over every creeping thing that creepeth upon the earth." },
      { number: 27, text: "So God created man in his own image, in the image of God created he him; male and female created he them." },
      { number: 28, text: "And God blessed them, and God said unto them, Be fruitful, and multiply, and replenish the earth, and subdue it: and have dominion over the fish of the sea, and over the fowl of the air, and over every living thing that moveth upon the earth." },
      { number: 29, text: "And God said, Behold, I have given you every herb bearing seed, which is upon the face of all the earth, and every tree, in the which is the fruit of a tree yielding seed; to you it shall be for meat." },
      { number: 30, text: "And to every beast of the earth, and to every fowl of the air, and to every thing that creepeth upon the earth, wherein there is life, I have given every green herb for meat: and it was so." },
      { number: 31, text: "And God saw every thing that he had made, and, behold, it was very good. And the evening and the morning were the sixth day." },
    ],
  },
  "genesis-2": {
    bookId: "genesis",
    chapter: 2,
    verses: [
      { number: 1, text: "Thus the heavens and the earth were finished, and all the host of them." },
      { number: 2, text: "And on the seventh day God ended his work which he had made; and he rested on the seventh day from all his work which he had made." },
      { number: 3, text: "And God blessed the seventh day, and sanctified it: because that in it he had rested from all his work which God created and made." },
      { number: 4, text: "These are the generations of the heavens and of the earth when they were created, in the day that the LORD God made the earth and the heavens." },
      { number: 5, text: "And every plant of the field before it was in the earth, and every herb of the field before it grew: for the LORD God had not caused it to rain upon the earth, and there was not a man to till the ground." },
      { number: 6, text: "But there went up a mist from the earth, and watered the whole face of the ground." },
      { number: 7, text: "And the LORD God formed man of the dust of the ground, and breathed into his nostrils the breath of life; and man became a living soul." },
    ],
  },
  "genesis-3": {
    bookId: "genesis",
    chapter: 3,
    verses: [
      { number: 1, text: "Now the serpent was more subtil than any beast of the field which the LORD God had made. And he said unto the woman, Yea, hath God said, Ye shall not eat of every tree of the garden?" },
      { number: 2, text: "And the woman said unto the serpent, We may eat of the fruit of the trees of the garden:" },
      { number: 3, text: "But of the fruit of the tree which is in the midst of the garden, God hath said, Ye shall not eat of it, neither shall ye touch it, lest ye die." },
      { number: 4, text: "And the serpent said unto the woman, Ye shall not surely die:" },
      { number: 5, text: "For God doth know that in the day ye eat thereof, then your eyes shall be opened, and ye shall be as gods, knowing good and evil." },
      { number: 6, text: "And when the woman saw that the tree was good for food, and that it was pleasant to the eyes, and a tree to be desired to make one wise, she took of the fruit thereof, and did eat, and gave also unto her husband with her; and he did eat." },
    ],
  },
  "matthew-1": {
    bookId: "matthew",
    chapter: 1,
    verses: [
      { number: 1, text: "The book of the generation of Jesus Christ, the son of David, the son of Abraham." },
      { number: 2, text: "Abraham begat Isaac; and Isaac begat Jacob; and Jacob begat Judas and his brethren;" },
      { number: 3, text: "And Judas begat Phares and Zara of Thamar; and Phares begat Esrom; and Esrom begat Aram;" },
      { number: 18, text: "Now the birth of Jesus Christ was on this wise: When as his mother Mary was espoused to Joseph, before they came together, she was found with child of the Holy Ghost." },
      { number: 19, text: "Then Joseph her husband, being a just man, and not willing to make her a publick example, was minded to put her away privily." },
      { number: 20, text: "But while he thought on these things, behold, the angel of the Lord appeared unto him in a dream, saying, Joseph, thou son of David, fear not to take unto thee Mary thy wife: for that which is conceived in her is of the Holy Ghost." },
      { number: 21, text: "And she shall bring forth a son, and thou shalt call his name JESUS: for he shall save his people from their sins." },
    ],
  },
  "john-1": {
    bookId: "john",
    chapter: 1,
    verses: [
      { number: 1, text: "In the beginning was the Word, and the Word was with God, and the Word was God." },
      { number: 2, text: "The same was in the beginning with God." },
      { number: 3, text: "All things were made by him; and without him was not any thing made that was made." },
      { number: 4, text: "In him was life; and the life was the light of men." },
      { number: 5, text: "And the light shineth in darkness; and the darkness comprehended it not." },
      { number: 6, text: "There was a man sent from God, whose name was John." },
      { number: 7, text: "The same came for a witness, to bear witness of the Light, that all men through him might believe." },
      { number: 8, text: "He was not that Light, but was sent to bear witness of that Light." },
      { number: 9, text: "That was the true Light, which lighteth every man that cometh into the world." },
      { number: 10, text: "He was in the world, and the world was made by him, and the world knew him not." },
      { number: 11, text: "He came unto his own, and his own received him not." },
      { number: 12, text: "But as many as received him, to them gave he power to become the sons of God, even to them that believe on his name:" },
      { number: 13, text: "Which were born, not of blood, nor of the will of the flesh, nor of the will of man, but of God." },
      { number: 14, text: "And the Word was made flesh, and dwelt among us, (and we beheld his glory, the glory as of the only begotten of the Father,) full of grace and truth." },
    ],
  },
};

export function getChapterContent(bookId: string, chapter: number): ChapterContent | null {
  const key = `${bookId}-${chapter}`;
  return sampleVerses[key] || null;
}
