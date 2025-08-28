# **App Name**: كلمة خداع

## Core Features:

- Game Configuration: Setup phase to configure the game: category selection (مأكولات, أفلام, etc.) and number of players (3-20 لاعبين).
- Role Reveal: Role Reveal: "شد باش تشوف" interaction reveals the secret word or Imposter status (الكلمة السرية or نتا الـImposter).
- Discussion Start: Discussion Start Screen: displays "اللعبة بدات، [Player X] غادي يبدا النقاش" with options to reveal the Imposter and word, or to start a new game.
- Word Database: Large word database in `/data/words.js`, including words relevant to Moroccan culture. Random word selection per category.
- Endgame Mechanics: Endgame Screen to allow the Imposter to input their guess, with react-confetti to visually enhance winning the game
- Game state: Client-side state management to deal with game state, managing the players' turns. A "Pass the device" prompt must follow role reveals.
- Game strategies: Modal strategy tips in Darija, shown as a guidance.

## Style Guidelines:

- Primary color: Saturated violet (#9400D3). Purple conveys the sense of mystery and subtle deceit that aligns with the spirit of the game.
- Background color: Light gray (#E0E0E0) - a desaturated shade of violet creates a neutral backdrop.
- Accent color: Bright fuchsia (#FF00FF), approximately 30 degrees from the violet primary.
- Font: 'Amiri' (serif) for all Darija text, since this font has the RTL and diacritic support required.
- Mobile-first, touch-friendly design for use on phones and tablets; the game is expected to run in portrait orientation on small, handheld devices.
- Framer Motion to provide flip and slide transitions in the reveal mechanics and various screens.
- Simple and intuitive icons with descriptive ARIA labels in Darija to improve user accessibility, such as when picking game parameters.