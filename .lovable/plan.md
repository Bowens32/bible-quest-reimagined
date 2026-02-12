
# Bible Quest — Web App Recreation

Recreating the Bible Quest app as a responsive web application with the same warm, editorial aesthetic and all core features.

## Design & Theme
- **Warm bronze/sepia color palette**: Primary #8B6F47, background #FAF7F2, gold accents #D4AF37
- **Elegant typography**: Serif font (EB Garamond via Google Fonts) for scripture text, clean sans-serif for UI
- **Card-based layouts** with subtle shadows, generous whitespace
- **Fully responsive** — looks great on mobile browsers and desktop

## Pages & Features

### 1. Welcome/Onboarding
- Beautiful landing page with "Read. Listen. Learn." tagline
- Get Started button leading to the main app

### 2. Read Tab — Bible Reading
- **Book Selection**: Browse all 66 books organized by Old/New Testament in card grid
- **Chapter Selection**: Grid of numbered chapter cards for selected book
- **Reading View**: Verse-by-verse scripture display with elegant typography, chapter navigation arrows
- Sample content for Genesis 1-3, Matthew 1, John 1 (same as original)

### 3. Play Tab — Trivia Game
- **Trivia Hub**: Progress card, Continue button, personal stats (streak, accuracy)
- **Quiz Screen**: Multiple-choice questions (4 options), progress bar, visual feedback (green for correct, burgundy for incorrect)
- **Results Screen**: Score display (X/10), Next Chapter / Replay options
- **Leaderboard**: Ranked list view (placeholder for future backend)
- Progressive unlocking — trivia follows reading journey through books

### 4. Profile Tab
- User display name and progress overview
- Stats: books completed, chapters read, trivia accuracy
- Reading streak tracker
- Settings: theme preferences

### 5. Navigation
- Bottom tab bar on mobile (Read, Play, Profile) mimicking the native app feel
- Responsive sidebar/header on desktop

### 6. Data & Storage
- Bible book metadata for all 66 books
- Sample verse content and trivia questions stored locally
- Browser localStorage for progress tracking (reading history, trivia scores, streaks)
- No backend needed initially — all data persists locally

## What Won't Be Included (Native-Only Features)
- Audio playback (could be added later with web audio)
- Haptic feedback
- Apple/Google SSO (could add email auth later with Supabase)
