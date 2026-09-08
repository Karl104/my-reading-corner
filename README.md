# My Reading Corner — setup

Expo React Native project using the official `blank-typescript` template, following [the crash course](../react-native-book-app-crash-course.md). TypeScript strict checking and bundler module resolution are enabled.

## Run

From PowerShell:

```powershell
cd D:\Book-App\my-reading-corner
npm.cmd start
```

Open the QR code in Expo Go on your phone, with the phone and computer on the same Wi-Fi. The app currently displays the template's starter screen.

Check TypeScript:

```powershell
npx.cmd tsc --noEmit
```

Dependencies are already installed. After downloading a fresh copy, run `npm.cmd ci` first. The `.cmd` commands work with this computer's PowerShell execution policy; in Command Prompt, you can use `npm` and `npx` as written in the guide.

## Files for your code

```text
my-reading-corner/
├── App.tsx
├── index.ts
├── app.json
├── tsconfig.json
├── package.json
├── package-lock.json
├── assets/
│   └── covers/
├── components/
│   ├── BookCard.tsx
│   └── ScreenTitle.tsx
├── data/
│   └── books.ts
├── screens/
│   ├── BrowseScreen.tsx
│   ├── CurrentReadsScreen.tsx
│   └── ProfileScreen.tsx
├── types/
│   ├── book.ts
│   └── navigation.ts
└── README.md
```

The screen, component, data, and type files contain only reminder comments for you to replace. `assets/covers/` is ready for your images. `App.tsx` retains the working template; continue with the guide's Step 1 greeting checkpoint, then Step 2 to write and connect your screens.

## Installed setup packages

- Expo, React, React Native, and the template's Expo Status Bar.
- TypeScript and React type definitions.
- React Navigation native and bottom tabs.
- React Native Screens and Safe Area Context.
- React Native Vector Icons Ionicons and Expo Font.


Setup reference: [Expo template documentation](https://docs.expo.dev/more/create-expo/).
