# My Reading Corner

A React Native and TypeScript app for tracking books and manga, built with Expo. Browse the catalog, start reading a title, manage your current reads, and choose a profile photo.

## Requirements

- Node.js 24, version 24.3.0 or newer within the 24.x release line, with npm. This supports the app and its TypeScript test runner.
- Git to clone the repository, or download and extract the repository ZIP from GitHub.
- A code editor such as VS Code.
- An Android phone or iPhone with an Expo Go version that supports **Expo SDK 57**.
- Internet access to install dependencies, and a shared Wi-Fi network for your phone and computer when using the local development server.

Check your tools in a terminal:

```sh
node --version
npm --version
git --version
```

**Windows PowerShell:** if you see `npm.ps1 cannot be loaded because running scripts is disabled`, use `npm.cmd` instead of `npm` and `npx.cmd` instead of `npx` throughout this guide. Changing your execution policy is not required.

## 1. Get the project

Open a terminal in the folder where you keep your projects:

```sh
git clone https://github.com/Karl104/my-reading-corner.git
cd my-reading-corner
```

If you downloaded a ZIP, extract it and open a terminal inside the extracted folder containing `package.json`.

If the project is already on your computer, open that existing folder. For the original Windows workspace:

```powershell
cd D:\Book-App\my-reading-corner
```

Run all remaining commands from this project folder. You do not need to run `create-expo-app` again.

## 2. Install dependencies

```sh
npm ci
```

This installs the versions recorded in `package-lock.json`, including navigation, icons, image picking, and TypeScript. Keep the lockfile in the project. No API keys, `.env` file, database, or backend service are required.

## 3. Start the app

```sh
npm start
```

In Windows PowerShell, the equivalent is:

```powershell
npm.cmd start
```

Keep this terminal running while using the app. Expo displays a QR code:

1. Connect the phone and computer to the same Wi-Fi network.
2. On Android, open Expo Go and scan the QR code. On iPhone, scan it with the Camera app and open the link in Expo Go.
3. Wait for the app to load, then use Browse, Current Reads, and Profile.

Save source files to see updates with Fast Refresh. Press `r` in the Expo terminal for a full reload, or `Ctrl+C` to stop the server. See [Expo's development guide](https://docs.expo.dev/get-started/start-developing/) for device connection details.

### Optional: use an existing emulator

With an Android emulator already configured and running:

```sh
npm run android
```

On macOS with Xcode and an iOS simulator configured:

```sh
npm run ios
```

You can use a physical iPhone with Expo Go while developing on Windows; the iOS simulator requires macOS. The browser workflow is not configured with the required web dependencies in this project.

## Using the app

| Screen | What you can do |
| --- | --- |
| Browse | Scroll through books and manga, including a separate philosophy row. Tap **Start reading** to add a book and open Current Reads. |
| Current Reads | View a vertical list with covers, titles, and authors. Open a book's status menu and choose **Finished** or **Not finished**. |
| Profile | View Karl's profile, the italic bio *24/7 reader*, and current/finished counts. Tap **Add photo** or **Change photo** to select a gallery image. |

Finishing a book removes it from Current Reads and restores its **Start reading** button in Browse. Starting it again moves its status back to currently reading. The profile's finished count reflects books whose current status is finished, rather than a lifetime completion total. There is no separate Finished screen.

The profile photo picker supports cropping. Canceling keeps the previous photo. It selects from the gallery; it does not take a camera photo or upload your image to a server.

**Session storage:** reading statuses and the selected profile photo stay while switching tabs, but reset on a full reload or app restart. The catalog, name, and bio are stored in the source code. The app tracks reading status; it does not display book pages or manga chapters.

## Check the project

Run these commands in a second terminal inside the project folder:

```sh
npx tsc --noEmit
npm test
```

The TypeScript checker succeeds with no error output. The tests cover duplicate starts, finishing books, returning to reading, starting a finished book again, and ignoring status changes for unselected books.

To check that Expo can bundle the Android app:

```sh
npx expo export --platform android --output-dir dist
```

The generated `dist/` folder is ignored by Git. This produces a JavaScript/assets bundle, not an installable APK, and does not replace testing on a phone.

A short device check:

1. Start a book and a manga from Browse; confirm both appear in Current Reads.
2. Mark one **Finished**; confirm it leaves the list and its Browse button returns to **Start reading**.
3. Start that book again; confirm it appears once and the profile counts update.
4. Choose a profile photo, switch tabs, and return. Then try canceling another photo selection.
5. Reload the app to confirm that session data resets.

## Troubleshooting

| Problem | What to do |
| --- | --- |
| `npm.ps1` or `npx.ps1` is blocked | Use `npm.cmd` and `npx.cmd` in PowerShell. |
| `package.json` cannot be found | Change into the `my-reading-corner` project folder before running commands. |
| A package cannot be found | Run `npm ci` in the project folder, then restart Expo. |
| “Cannot connect to Expo CLI” or the QR code will not load | Confirm the development terminal is still running and both devices use the same Wi-Fi. Scan the current QR code again. |
| Changes or icons do not appear | Stop Expo with `Ctrl+C`, then run `npx expo start --clear`. |
| Expo Go reports an unsupported SDK | Use an Expo Go version or development build compatible with this project's SDK 57. Clearing the cache does not resolve an SDK mismatch. |
| A cover cannot be resolved | Check that the file exists in `assets/covers/` and that its name, extension, and letter case match the `require` path in `data/books.ts`. |

If the local network blocks the phone connection, stop Expo and try:

```sh
npx expo start --tunnel
```

A tunnel requires internet access and may prompt you to install tunnel support. For dependency compatibility problems, run `npx expo install --check` and `npx expo-doctor` and read their results. These options are documented in the [Expo CLI reference](https://docs.expo.dev/more/expo-cli/).

## Project structure

```text
my-reading-corner/
|-- App.tsx                         # Three tabs and shared reading state
|-- index.ts                        # App entry point
|-- app.json                        # Expo configuration and plugins
|-- assets/covers/                  # Local book cover images
|-- components/
|   |-- BookCard.tsx                # Browse shelf card
|   |-- ReadingRow.tsx              # Vertical reading row and status menu
|   `-- ScreenTitle.tsx             # Reusable heading and subtitle
|-- data/books.ts                   # Typed catalog and cover references
|-- screens/
|   |-- BrowseScreen.tsx
|   |-- CurrentReadsScreen.tsx
|   `-- ProfileScreen.tsx
|-- state/reading.ts                # Reading status updates and selectors
|-- tests/reading.test.mjs           # Reading-state tests
|-- types/
|   |-- book.ts                     # Shared book type
|   `-- navigation.ts               # Allowed tab names
|-- package.json                    # Dependencies and commands
|-- package-lock.json               # Reproducible dependency versions
|-- tsconfig.json                   # Strict TypeScript configuration
`-- react-native-book-app-crash-course.md
```

## Main packages

| Package | Purpose |
| --- | --- |
| `expo`, `react`, `react-native` | App runtime and native UI components. |
| `typescript`, `@types/react` | Type checking during development. |
| `@react-navigation/native`, `@react-navigation/bottom-tabs` | Navigation between the three screens. |
| `react-native-screens`, `react-native-safe-area-context` | Native navigation support and safe screen edges. |
| `@react-native-vector-icons/ionicons`, `expo-font` | Tab, profile, and status icons with font support. |
| `expo-image-picker` | Selecting and cropping a profile photo from the gallery. |

The original learning walkthrough is included in the [React Native and TypeScript crash course](react-native-book-app-crash-course.md). This README describes the current app; some earlier walkthrough examples differ from the final UI.
