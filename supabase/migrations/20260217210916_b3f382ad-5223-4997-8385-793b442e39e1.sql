
-- Profiles table
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  display_name TEXT NOT NULL DEFAULT 'Disciple',
  friend_code TEXT NOT NULL UNIQUE DEFAULT upper(substr(md5(random()::text), 1, 8)),
  avatar_url TEXT,
  preferred_version TEXT NOT NULL DEFAULT 'KJV',
  preferred_language TEXT NOT NULL DEFAULT 'en',
  theme TEXT NOT NULL DEFAULT 'warm',
  text_size TEXT NOT NULL DEFAULT 'medium',
  app_language TEXT NOT NULL DEFAULT 'en',
  streak INTEGER NOT NULL DEFAULT 0,
  last_read_date DATE,
  total_correct INTEGER NOT NULL DEFAULT 0,
  total_answered INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view any profile" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (user_id, display_name)
  VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'display_name', 'Disciple'));
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Updated at trigger
CREATE OR REPLACE FUNCTION public.update_updated_at()
RETURNS TRIGGER AS $$ BEGIN NEW.updated_at = now(); RETURN NEW; END; $$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

-- Bible versions table
CREATE TABLE public.bible_versions (
  id TEXT PRIMARY KEY, -- e.g. 'KJV', 'NIV'
  name TEXT NOT NULL,
  language TEXT NOT NULL DEFAULT 'en',
  description TEXT
);

ALTER TABLE public.bible_versions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can read versions" ON public.bible_versions FOR SELECT USING (true);

-- Bible verses table (the main content)
CREATE TABLE public.bible_verses (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  version_id TEXT NOT NULL REFERENCES public.bible_versions(id),
  book_id TEXT NOT NULL,
  chapter INTEGER NOT NULL,
  verse_number INTEGER NOT NULL,
  text TEXT NOT NULL,
  UNIQUE(version_id, book_id, chapter, verse_number)
);
CREATE INDEX idx_verses_lookup ON public.bible_verses(version_id, book_id, chapter);
ALTER TABLE public.bible_verses ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can read verses" ON public.bible_verses FOR SELECT USING (true);

-- Reading progress
CREATE TABLE public.chapters_read (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  book_id TEXT NOT NULL,
  chapter INTEGER NOT NULL,
  read_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(user_id, book_id, chapter)
);
ALTER TABLE public.chapters_read ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users read own progress" ON public.chapters_read FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users insert own progress" ON public.chapters_read FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Highlights
CREATE TABLE public.highlights (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  version_id TEXT NOT NULL,
  book_id TEXT NOT NULL,
  chapter INTEGER NOT NULL,
  verse_number INTEGER NOT NULL,
  color TEXT NOT NULL DEFAULT '#D4AF37',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.highlights ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users manage own highlights" ON public.highlights FOR ALL USING (auth.uid() = user_id);

-- Notes
CREATE TABLE public.notes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  book_id TEXT NOT NULL,
  chapter INTEGER NOT NULL,
  verse_number INTEGER,
  content TEXT NOT NULL,
  is_public BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.notes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users manage own notes" ON public.notes FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Anyone can read public notes" ON public.notes FOR SELECT USING (is_public = true);
CREATE TRIGGER update_notes_updated_at BEFORE UPDATE ON public.notes FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

-- Friends system
CREATE TABLE public.friendships (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  requester_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  addressee_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'declined')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(requester_id, addressee_id)
);
ALTER TABLE public.friendships ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users see own friendships" ON public.friendships FOR SELECT USING (auth.uid() = requester_id OR auth.uid() = addressee_id);
CREATE POLICY "Users can send requests" ON public.friendships FOR INSERT WITH CHECK (auth.uid() = requester_id);
CREATE POLICY "Users can update own friendships" ON public.friendships FOR UPDATE USING (auth.uid() = addressee_id OR auth.uid() = requester_id);
CREATE POLICY "Users can delete own friendships" ON public.friendships FOR DELETE USING (auth.uid() = requester_id OR auth.uid() = addressee_id);

-- Note sharing between friends
CREATE TABLE public.shared_notes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  note_id UUID REFERENCES public.notes(id) ON DELETE CASCADE NOT NULL,
  shared_by UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  shared_with UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.shared_notes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users see shared notes" ON public.shared_notes FOR SELECT USING (auth.uid() = shared_by OR auth.uid() = shared_with);
CREATE POLICY "Users can share notes" ON public.shared_notes FOR INSERT WITH CHECK (auth.uid() = shared_by);

-- Trivia scores
CREATE TABLE public.trivia_scores (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  book_id TEXT NOT NULL,
  chapter INTEGER NOT NULL,
  score INTEGER NOT NULL,
  total INTEGER NOT NULL,
  played_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.trivia_scores ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users manage own scores" ON public.trivia_scores FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Anyone can view scores" ON public.trivia_scores FOR SELECT USING (true);

-- Trivia questions table
CREATE TABLE public.trivia_questions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  book_id TEXT NOT NULL,
  chapter INTEGER NOT NULL,
  question TEXT NOT NULL,
  options TEXT[] NOT NULL,
  correct_index INTEGER NOT NULL,
  difficulty TEXT NOT NULL DEFAULT 'medium' CHECK (difficulty IN ('easy', 'medium', 'hard'))
);
ALTER TABLE public.trivia_questions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can read questions" ON public.trivia_questions FOR SELECT USING (true);

-- Multiplayer trivia matches
CREATE TABLE public.trivia_matches (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  challenger_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  opponent_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  is_npc BOOLEAN NOT NULL DEFAULT false,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'active', 'completed')),
  book_id TEXT,
  chapter INTEGER,
  challenger_score INTEGER DEFAULT 0,
  opponent_score INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.trivia_matches ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users see own matches" ON public.trivia_matches FOR SELECT USING (auth.uid() = challenger_id OR auth.uid() = opponent_id);
CREATE POLICY "Users create matches" ON public.trivia_matches FOR INSERT WITH CHECK (auth.uid() = challenger_id);
CREATE POLICY "Users update own matches" ON public.trivia_matches FOR UPDATE USING (auth.uid() = challenger_id OR auth.uid() = opponent_id);

-- Community posts
CREATE TABLE public.community_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('question', 'answer', 'prayer', 'note', 'worship')),
  parent_id UUID REFERENCES public.community_posts(id) ON DELETE CASCADE,
  title TEXT,
  content TEXT NOT NULL,
  file_url TEXT,
  likes_count INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.community_posts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can read posts" ON public.community_posts FOR SELECT USING (true);
CREATE POLICY "Auth users create posts" ON public.community_posts FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users update own posts" ON public.community_posts FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users delete own posts" ON public.community_posts FOR DELETE USING (auth.uid() = user_id);
CREATE TRIGGER update_posts_updated_at BEFORE UPDATE ON public.community_posts FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

-- Post likes
CREATE TABLE public.post_likes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  post_id UUID REFERENCES public.community_posts(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(user_id, post_id)
);
ALTER TABLE public.post_likes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can see likes" ON public.post_likes FOR SELECT USING (true);
CREATE POLICY "Auth users toggle likes" ON public.post_likes FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users remove own likes" ON public.post_likes FOR DELETE USING (auth.uid() = user_id);

-- Achievements
CREATE TABLE public.achievements (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  icon TEXT NOT NULL DEFAULT '🏆',
  category TEXT NOT NULL DEFAULT 'reading' CHECK (category IN ('reading', 'trivia', 'social', 'streak', 'special'))
);
ALTER TABLE public.achievements ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can read achievements" ON public.achievements FOR SELECT USING (true);

-- User achievements
CREATE TABLE public.user_achievements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  achievement_id TEXT REFERENCES public.achievements(id) NOT NULL,
  earned_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(user_id, achievement_id)
);
ALTER TABLE public.user_achievements ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view earned achievements" ON public.user_achievements FOR SELECT USING (true);
CREATE POLICY "System inserts achievements" ON public.user_achievements FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Daily quotes
CREATE TABLE public.daily_quotes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  book_id TEXT NOT NULL,
  chapter INTEGER NOT NULL,
  verse_number INTEGER NOT NULL,
  text TEXT NOT NULL,
  quote_date DATE NOT NULL UNIQUE DEFAULT CURRENT_DATE
);
ALTER TABLE public.daily_quotes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can read quotes" ON public.daily_quotes FOR SELECT USING (true);

-- Seed Bible versions
INSERT INTO public.bible_versions (id, name, language, description) VALUES
('KJV', 'King James Version', 'en', 'Classic English translation from 1611'),
('NIV', 'New International Version', 'en', 'Modern English translation'),
('ESV', 'English Standard Version', 'en', 'Literal modern translation'),
('NLT', 'New Living Translation', 'en', 'Easy-to-read modern translation'),
('RVR', 'Reina-Valera 1960', 'es', 'Classic Spanish translation'),
('LSG', 'Louis Segond', 'fr', 'Classic French translation');

-- Seed achievements
INSERT INTO public.achievements (id, name, description, icon, category) VALUES
('first_chapter', 'First Steps', 'Read your first chapter', '📖', 'reading'),
('ten_chapters', 'Dedicated Reader', 'Read 10 chapters', '📚', 'reading'),
('fifty_chapters', 'Scholar', 'Read 50 chapters', '🎓', 'reading'),
('full_book', 'Book Worm', 'Read an entire book', '🐛', 'reading'),
('five_books', 'Library Card', 'Read 5 complete books', '📕', 'reading'),
('first_quiz', 'Quiz Taker', 'Complete your first trivia quiz', '❓', 'trivia'),
('perfect_score', 'Perfect Score', 'Get 100% on a quiz', '💯', 'trivia'),
('ten_quizzes', 'Trivia Master', 'Complete 10 quizzes', '🧠', 'trivia'),
('trivia_streak', 'On Fire', 'Get 5 perfect scores in a row', '🔥', 'trivia'),
('first_friend', 'Fellowship', 'Add your first friend', '🤝', 'social'),
('five_friends', 'Community Builder', 'Have 5 friends', '👥', 'social'),
('first_post', 'Voice', 'Create your first community post', '💬', 'social'),
('helpful', 'Helpful Hand', 'Answer 10 community questions', '🙏', 'social'),
('three_day_streak', 'Consistent', '3-day reading streak', '⭐', 'streak'),
('seven_day_streak', 'Faithful', '7-day reading streak', '🌟', 'streak'),
('thirty_day_streak', 'Devoted', '30-day reading streak', '👑', 'streak'),
('highlighter', 'Colorful Mind', 'Highlight 10 verses', '🖍️', 'special'),
('note_taker', 'Scribe', 'Write 10 notes', '✍️', 'special'),
('share_note', 'Generous', 'Share a note with a friend', '🎁', 'special'),
('daily_challenge', 'Daily Champion', 'Complete a daily trivia challenge', '🏅', 'special');

-- Seed some daily quotes
INSERT INTO public.daily_quotes (book_id, chapter, verse_number, text, quote_date) VALUES
('john', 3, 16, 'For God so loved the world, that he gave his only begotten Son, that whosoever believeth in him should not perish, but have everlasting life.', CURRENT_DATE),
('psalms', 23, 1, 'The Lord is my shepherd; I shall not want.', CURRENT_DATE + 1),
('proverbs', 3, 5, 'Trust in the Lord with all thine heart; and lean not unto thine own understanding.', CURRENT_DATE + 2),
('philippians', 4, 13, 'I can do all things through Christ which strengtheneth me.', CURRENT_DATE + 3),
('romans', 8, 28, 'And we know that all things work together for good to them that love God, to them who are the called according to his purpose.', CURRENT_DATE + 4),
('isaiah', 40, 31, 'But they that wait upon the Lord shall renew their strength; they shall mount up with wings as eagles; they shall run, and not be weary; and they shall walk, and not faint.', CURRENT_DATE + 5),
('jeremiah', 29, 11, 'For I know the thoughts that I think toward you, saith the Lord, thoughts of peace, and not of evil, to give you an expected end.', CURRENT_DATE + 6);
