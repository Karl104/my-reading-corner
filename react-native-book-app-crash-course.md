# React Native + TypeScript crash course: build your own book and manga app

## 1. Read this first: React in very plain English

**Your goal today:** understand enough React Native and TypeScript to build your three-screen book-and-manga tracker yourself. You do not need to master either subject in four hours.

This is the revised TypeScript edition. Use this guide on its own; you do not need the earlier JavaScript edition.

Read **Sections 1 and 2 first**, for about **45 minutes total**: 25 minutes for React Native and 20 for TypeScript. Then follow the hands-on steps in Section 4. Read each small step, type it yourself, run it, and explain what changed. The remaining sections are references you use while building, not extra reading to finish first.

This guide follows your attached `react-native-prelim-project(1).md`: exactly three primary screens, working navigation, at least two reusable custom components, one actively used third-party package, and a mostly static Expo app. **TypeScript is your chosen language** for meeting those requirements. Every lesson below uses your book app.

### 1.1 What are TypeScript, React, React Native, and Expo?

Imagine you are building a small bookshelf.

| Name | Plain meaning | Its job in your app |
| --- | --- | --- |
| JavaScript | The language underneath TypeScript. | Run instructions such as adding a book ID. |
| TypeScript | JavaScript with extra checks while you write. | Catch a missing book title or the wrong kind of button input. |
| React | A tool for describing a screen using small reusable pieces. | Show the right pieces when information changes. |
| React Native | Lets those React pieces become phone interface elements. | Show text, pictures, scrolling areas, and buttons. |
| Expo | Tools that help you create and run a React Native project. | Open your work on your phone while you build. |

Your app will have a book shelf, a reading shelf, and a profile. Think about those visible things first. We will attach the React words to them.

### 1.2 The programming basics you will use in TypeScript

Read these as little sentences. You do not need files yet. TypeScript uses the same variables, objects, lists, and functions as JavaScript. We will add simple labels such as `: string` to describe the values those instructions expect.

**A variable gives a value a name.**

```ts
const appName = 'My Reading Corner';
```

Read it as: “The name `appName` points to the text My Reading Corner.” Quotes mean text. `const` means you cannot later assign a different value to that name.

**An object holds details about one thing.**

```ts
const book = {
  id: 'book-1',
  title: 'My First Book',
  author: 'A. Writer',
  kind: 'Book',
};
```

`book.title` means “get the title from this book.” Its value is `'My First Book'`.

`id` is a unique label. Two items can have similar titles, but their IDs must differ. We will use IDs to remember selected books.

**An array is a list.**

```ts
const readingIds = ['book-1', 'manga-1'];
```

Square brackets hold the items. `[]` means an empty list. `readingIds.length` is `2` here.

**A function is a named set of instructions.**

```ts
function getReadingMessage(title: string): string {
  return 'Now reading: ' + title;
}

getReadingMessage('My First Book');
```

`title` is the input. `title: string` means that input must be text. The `: string` after the closing parenthesis says the result is text too. `return` gives back the result. Calling this function gives back `'Now reading: My First Book'`. It does not display anything by itself.

An arrow function is another way to write a function:

```ts
const getReadingMessage = (title: string): string => {
  return 'Now reading: ' + title;
};
```

Those are alternative examples. Do not declare both versions with the same name in one file.

**A condition lets you make a choice.**

```ts
if (readingIds.length === 0) {
  // Instructions for an empty reading list would go here.
}
```

`===` asks “are these equal?” `//` starts a comment: a note for humans that JavaScript does not run.

These three list tools will do most of our work:

| Code | Read it as |
| --- | --- |
| `readingIds.includes('book-1')` | Is book-1 in this list? Gives `true` or `false`. |
| `books.map((book) => book.title)` | Go through every book and make a new list of titles. |
| `books.filter((book) => book.kind === 'Manga')` | Make a new list containing only the manga. |

`map` transforms each item. `filter` keeps matching items. Neither example changes the original list.

**Pause and predict:** if `readingIds` is `[]`, what is `readingIds.length`? What does `readingIds.includes('book-1')` give?

Answer: `0` and `false`.

### 1.3 A component is a piece of the screen

A component can be a whole screen or a small piece, such as one book card. A basic component is a function that returns what React should show.

```tsx
import { Text } from 'react-native';

export default function Welcome() {
  return <Text>Welcome to my shelf</Text>;
}
```

Read it slowly:

1. `import` brings in something this file needs.
2. `Text` is React Native's piece for showing words.
3. `function Welcome()` defines our own piece, named `Welcome`.
4. `return` gives React the description of what to show.
5. `export default` lets another file import this piece.

Use a capital first letter for component names: `BookCard`, `ScreenTitle`, `BrowseScreen`.

You use your component like this: `<Welcome />`. The `/>` closes a tag that has nothing inside it.

React's official introduction covers components and their inputs. Its website examples use web elements; this guide uses React Native elements. [React Quick Start](https://react.dev/learn)

### 1.4 JSX is the screen description inside your TypeScript file

This is JSX. A TypeScript file containing JSX uses the `.tsx` extension:

```tsx
<View>
  <Text>My Reading Corner</Text>
  <Text>Books and manga in one place</Text>
</View>
```

`View` groups pieces together. The two `Text` pieces sit inside it. Matching opening and closing tags belong together.

For this app, use these building blocks:

| Piece | What you use it for |
| --- | --- |
| `View` | A box that holds other pieces. |
| `Text` | Words or numbers. |
| `Image` | A cover picture. |
| `Pressable` | An area the user can tap. |
| `ScrollView` | Content the user can scroll through. |

Use `<Text>` for visible words. For example, use `<View><Text>Hello</Text></View>` rather than placing `Hello` directly inside `View`.

**Curly braces inside JSX mean “use a JavaScript value here.”**

```tsx
<Text>{book.title}</Text>
```

This shows the book's title. `<Text>book.title</Text>` would show the literal words `book.title`.

A component's `return` needs one outer container around sibling pieces. In this guide, that outer container will usually be a `View` or `ScrollView`.

### 1.5 Props are information passed into a component

Imagine giving a blank book card a note saying which title to display. That note is like a **prop**.

```tsx
type SmallTitleProps = { title: string };

function SmallTitle({ title }: SmallTitleProps) {
  return <Text>{title}</Text>;
}
```

Usage:

```tsx
<SmallTitle title="My Reading Corner" />
<SmallTitle title="My Current Reads" />
```

One component. Two different inputs. Two different titles. `SmallTitleProps` describes the input: a property named `title` containing text. Section 2 teaches how to write these descriptions yourself.

`{ title }` in the function input means “take the value named title from the incoming props.” This is called **destructuring**. You only need to recognize that meaning today.

In your project, `BookCard` receives a `book` prop. That prop holds the title, author, type, and cover for one item.

**Predict:** if you change the prop to `title="My Manga Shelf"`, do you need another component?

Answer: no. The same component displays the new input.

### 1.6 State is information React remembers between screen updates

The hardcoded book catalog mostly stays the same. The user's reading list changes when they tap a button. That changing information belongs in **state**.

```tsx
const [readingIds, setReadingIds] = useState<string[]>([]);
```

Read it as:

- `readingIds`: the current list of selected book IDs.
- `setReadingIds`: the function we use to request an updated list.
- `<string[]>`: the list is allowed to hold text values, such as book IDs.
- `([])`: begin with an empty list.

You import `useState` from `'react'`. Put this line inside your component function, before its `return`. Keep it at the top level of that function, outside conditions and other functions.

Calling the setter lets React remember the new value and update the screen. An ordinary variable does not give you that behavior. [React: State as memory](https://react.dev/learn/state-a-components-memory)

**State is temporary here.** It stays when you switch tabs because `App` remains mounted, meaning it remains part of the running app. A full reload or closing and restarting the app resets it. Saving across restarts is outside today's plan.

### 1.7 An event is something the user does

A tap is an event. An event handler is the function that responds to it.

```tsx
<Pressable onPress={handleStartReading}>
  <Text>Start reading</Text>
</Pressable>
```

This gives the button a function to call when tapped. `handleStartReading` must be defined in the surrounding code.

If you need to send a book ID, use a small wrapper function:

```tsx
<Pressable onPress={() => handleStartReading(book.id)}>
  <Text>Start reading</Text>
</Pressable>
```

Read `() => ...` as “when the tap happens, do this.”

Avoid `onPress={handleStartReading(book.id)}`. That calls the function while React is describing the screen, before any tap. [React Native Pressable](https://reactnative.dev/docs/pressable)

### 1.8 Which file should remember the reading list?

Both Browse and Current Reads need it. Put it in **their shared parent**, `App`.

`App` gives Browse the selected IDs and an add-book function through props. It gives Current Reads the same selected IDs. Both screens now agree about what is selected. [React: Sharing state](https://react.dev/learn/sharing-state-between-components)

Do not create a separate `useState<string[]>([])` in each screen. Those would be two independent lists.

Imagine the actual tap:

1. You tap the button on one book card.
2. Browse tells `App` the book's ID.
3. `App` adds that ID to its state.
4. Browse asks navigation to open Current Reads.
5. Current Reads displays the books whose IDs are selected.

**Changing screens and changing data are separate jobs.** Navigation opens the screen. State remembers which books belong there. You need both for your button.

### 1.9 Show a list, or show a message

This turns a book list into visible pieces:

```tsx
{books.map((book) => (
  <Text key={book.id}>{book.title}</Text>
))}
```

Read it as: “For every book, show one title.” `key` gives React a stable label for each piece. Use each book's unique ID. The key is for React; it does not appear on the screen.

Notice `=> (`. That version returns the JSX directly. If you write `=> {`, you need an explicit `return` inside the braces.

For a choice inside JSX, use this pattern:

```tsx
{readingIds.length === 0 ? (
  <Text>No books yet. Start one from Browse.</Text>
) : (
  <Text>You have something to read.</Text>
)}
```

`condition ? firstThing : secondThing` means “if the condition is true, show the first thing; otherwise show the second.”

### 1.10 Styling means choosing how a piece looks

```tsx
<Text style={{ fontSize: 24, color: '#243B2A' }}>
  My Reading Corner
</Text>
```

The outer braces let JSX use JavaScript. The inner braces hold a style object.

Later, put named styles together with `StyleSheet.create`, then use `style={styles.title}`. React Native styles use JavaScript names such as `backgroundColor`. [React Native styles](https://reactnative.dev/docs/style)

| Style | Plain meaning |
| --- | --- |
| `padding: 16` | Space inside the box. |
| `marginBottom: 12` | Space below the box. |
| `backgroundColor: '#FFFFFF'` | The box's background color. |
| `borderRadius: 12` | Round its corners. |
| `fontSize: 24` | Text size. |
| `fontWeight: '700'` | Bold text. |
| `flex: 1` | Let this piece take available space in its parent. |
| `flexDirection: 'row'` | Put children beside each other. |

For ordinary sizes, use numbers such as `16`, not strings such as `'16px'`.

### 1.11 Check your understanding before coding

Say these answers in your own words. You may look back.

| Question | What you should understand |
| --- | --- |
| What is a component? | A reusable piece of the screen. |
| What are props? | Inputs given to a component. |
| What is state? | Information React remembers and can update. |
| Where does the shared reading list live? | In `App`, above the screens. |
| What does `map` do here? | Makes one visible card for each book. |
| What does `filter` do here? | Selects only the books being read. |
| What should Start reading do? | Add the ID and open Current Reads. |

You are ready to build when those sentences make sense. You do not need to memorize the punctuation yet.

## 2. TypeScript crash course: the rules for your book app

Spend about **20 minutes** here. Keep reading first; the practice edits happen during the build. You only need the types used by this app.

### 2.1 TypeScript checks the values you give your code

Imagine a book card with spaces labeled “title,” “author,” and “cover.” TypeScript helps check that you put the right kind of information in each space.

```ts
const title: string = 'The Quiet Library';
const readingGoal: number = 5;
const isReading: boolean = false;
```

| Type | Plain meaning | Book-app example |
| --- | --- | --- |
| `string` | Text. | A title, author, or ID. |
| `number` | A number. | A reading goal. |
| `boolean` | Either `true` or `false`. | Whether a book is being read. |

Read `title: string` as “title must contain text.” `=` supplies the actual value. The colon describes a value; the equals sign gives it a value.

This would be a type error:

```ts
// Learning example: this line is deliberately wrong, so leave it commented.
// const title: string = 42;
```

TypeScript would say a number cannot be used where text is expected. Fix the value or the design of the type. For a book title, the sensible fix is a text value.

**TypeScript does not run your button or save your list.** Expo removes type annotations when preparing the JavaScript that runs. Type checking is a separate development check. A type-correct app can still have incorrect behavior, so you must tap through it too. [TypeScript basics](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html)

### 2.2 You can let TypeScript work out obvious types

```ts
const appName = 'My Reading Corner';
```

TypeScript can already see this is text. That is **type inference**: working out a type from the information available.

You do not need to label every variable. In this project, write explicit types for your shared book shape, component inputs, button inputs, and empty state array. Let TypeScript infer simple values and list callback inputs.

### 2.3 A type describes one book; an object is one actual book

Read this now. In Step 3, you will put it in `types/book.ts`:

```ts
import type { ImageSourcePropType } from 'react-native';

export type Book = {
  id: string;
  title: string;
  author: string;
  kind: 'Book' | 'Manga';
  cover: ImageSourcePropType;
};
```

`Book` describes the required fields. It does not create a book, a cover, or a visible component. You will create actual objects in `data/books.ts`.

`kind: 'Book' | 'Manga'` means “allow exactly one of these two text values.” The vertical bar means **or**. This is a **union type**. It catches mistakes such as `'Mangga'`.

`ImageSourcePropType` is React Native's type for image sources. Your `cover` will use a local `require(...)` reference, so it should not be described as an ordinary filename string. [React Native image sources](https://reactnative.dev/docs/image)

`import type` imports a description for TypeScript to check. An ordinary `import`, such as `import { Image }`, brings in something used when the app runs. Use `import type { Book }` wherever you only need the Book description.

### 2.4 Add square brackets to describe a list

```ts
const readingIds: string[] = ['book-1', 'manga-1'];
```

`string[]` means “a list of text values.” `Book[]` means “a list of Book objects.” It does not mean one book.

Later, this declaration checks your entire catalog:

```ts
// This is a reading example; the real catalog is written in Step 3.
const books: Book[] = [];
```

That file would need the Book type imported. When `books` is a `Book[]`, TypeScript already knows each `book` in `books.map((book) => ...)` is a Book. You do not have to type that callback input again.

### 2.5 Give a function a clear input

```ts
function makeReadingLabel(title: string): string {
  return 'Reading: ' + title;
}
```

This receives text and returns text. Compare it with the type of our real add-book action:

```ts
type StartReading = (bookId: string) => void;
```

Read this as “a function that receives one text ID; its caller does not use a returned result.” `void` describes that result rule. The function can still do useful work, such as requesting a state update. [TypeScript function types](https://www.typescriptlang.org/docs/handbook/2/functions.html)

The `=>` inside a type describes a function. The `=>` in a running expression such as `() => startReading(book.id)` creates a function. The surrounding code tells you which job it is doing.

### 2.6 Props types describe what a component accepts

For a book card, you will use:

```ts
type BookCardProps = {
  book: Book;
  onStart?: () => void;
  isReading?: boolean;
};
```

- `book: Book`: the caller must supply a Book object.
- `onStart?: () => void`: the caller may supply a function with no required inputs.
- `isReading?: boolean`: the caller may supply `true` or `false`.

The question mark after a property name means **optional**. It is different from the `? ... : ...` expression used to choose which JSX to show.

Why no input for `onStart`? Browse supplies a function that already knows the card's book ID. The card just runs that function. Browse's separate `onStartReading` prop receives the ID and forwards it to App.

Why is `onStart` optional? On Current Reads, a card displays a status label and has no start button. Every unselected Browse card must still receive a working handler. Optional typing alone cannot guarantee that your UI works.

In a component declaration, `({ book, onStart }: BookCardProps)` means “take those values from the inputs, and check those inputs against BookCardProps.” [React with TypeScript](https://react.dev/learn/typescript), [optional object properties](https://www.typescriptlang.org/docs/handbook/2/objects.html)

### 2.7 Tell an empty state array what it will hold

Inside `App`, we will use:

```tsx
const [readingIds, setReadingIds] = useState<string[]>([]);
```

The angle brackets `<string[]>` tell `useState` what kind of value to remember. They are type information, not JSX tags. This is a small use of a **generic**: giving a tool the type it should work with.

The starting `[]` has no items to learn from. With strict checking, an untyped `useState([])` can be inferred as `never[]`, which will reject your book IDs. Giving it `string[]` makes your intention clear.

You still need the `useState` import and an actual component function. The type does not replace either one.

### 2.8 Use `.tsx` for screen descriptions and `.ts` for plain code

| File | Why this extension? |
| --- | --- |
| `App.tsx` | Contains JSX navigation elements. |
| `screens/BrowseScreen.tsx` | Contains JSX for the shelf. |
| `components/BookCard.tsx` | Contains JSX for a card. |
| `types/book.ts` | Contains a type, with no JSX. |
| `types/navigation.ts` | Contains screen-name types, with no JSX. |
| `data/books.ts` | Contains data, with no JSX. |

Imports in this guide omit the extension: use `'../types/book'`, not `'../types/book.ts'`. Leave configuration files such as `package.json` in their existing formats. [Expo TypeScript files](https://docs.expo.dev/guides/typescript/)

### 2.9 Read an error as a small instruction

“Property title is missing” means “this object does not yet have a required title.” It does not mean your whole project is broken.

“Parameter bookId implicitly has an any type” means “describe what bookId should receive.” In this app, add `: string` to that function input.

Avoid fixing errors with `any`, `@ts-ignore`, or by turning off strict checking. `any` allows the checker to overlook the very mistakes you want help finding. Read the underlined code, hover over it, and fix the smallest mismatch first.

**Predict before coding:** would TypeScript accept a Book with `kind: 'Comic'`? Would `startReading(42)` match `(bookId: string) => void`? Does a valid type guarantee that the same ID is never added twice?

Answers: no; no; and no. The first two are type checks. Preventing duplicates needs the actual condition you will write in Step 6.

## 3. Your project and four-hour plan

The working name is **My Reading Corner**. Choose your own name and colors.

| Primary screen | What you will build |
| --- | --- |
| Browse | One horizontal shelf mixing books and manga, with covers and Start reading buttons. |
| Current Reads | Only the items you started, or a helpful message when empty. |
| Profile | Your name, section, short reader bio, favorite genre, and a visible profile icon. |

“Start reading” means **mark this item as currently being read**. You are building a reading tracker. Displaying book pages, PDFs, or manga chapters is outside this four-hour project.

The book stays visible on Browse after selection. Its card changes to “Currently reading.” You can start several different items, and each appears once in Current Reads.

### Match the examination requirements

| Requirement from your file | Where your project meets it |
| --- | --- |
| New Expo/React Native project | Create the blank TypeScript project yourself. |
| Exactly three primary screens | Browse, Current Reads, Profile. |
| Working navigation | Three bottom tabs and the Start reading flow. |
| At least two reusable custom components | `ScreenTitle` on all screens; `BookCard` on both book screens. |
| Actively use a third-party package | Render a real Ionicons profile icon from `@react-native-vector-icons/ionicons`. |
| Mostly static; no database needed | Hardcoded books and profile; temporary React state. |
| App runs | Launch and test it on your phone or an available emulator. |
| Deliverables | Your project folder, README, and 1–2 minute demo. |

Your rubric assigns **30 points to navigation and 25 to third-party integration**. Get those working before spending time on decoration. Icons are one of the package examples allowed by your assignment. Expo now recommends the scoped React Native Vector Icons packages, so this guide uses that current option. [Expo's icon guidance](https://expo.dev/blog/moving-away-from-expo-vector-icons)

### Use this time budget

| Minutes from starting | Work | Checkpoint |
| --- | --- | --- |
| 0–25 | Section 1: React Native. | Explain props, state, and the button flow. |
| 25–45 | Section 2: TypeScript. | Read a Book type and a typed button function. |
| 45–65 | Step 1: setup. | See your own greeting on your phone. |
| 65–90 | Step 2: screens and typed tabs. | Tap all three tabs. |
| 90–130 | Steps 3–5: typed data, covers, reusable pieces, Browse. | See your mixed shelf. |
| 130–175 | Steps 6–8: typed state and Current Reads. | Start two items; both appear once. |
| 175–195 | Step 9: Profile and icon. | Show your details and a package-rendered icon. |
| 195–220 | Section 5: type-check, test, and fix. | Pass the checks and device tests. |
| 220–240 | Section 6: README and demo. | Prepare all three deliverables. |

This is a target, not a promise about download speed. If setup takes longer, keep the catalog at four items, use simple styling, and skip the optional tab icons. Keep the three screens, two custom components, icon, working button, and submission materials.

## 4. Hands-on build: you write the project

The snippets below teach one piece at a time. You will assemble the screens, add your data, and make design decisions. You will write the project files on your own computer. Code fences marked `ts` or `tsx` go in the editor; fences marked `bash` contain terminal commands. A snippet described as a replacement changes only the named part of an existing file.

For each step: **read → predict → type → run → explain**. Change one visible detail yourself before moving on. If a snippet says “inside the function,” do not place it at the bottom of the file.

### Step 1 — Create a blank TypeScript Expo app

**Choose your starting point before running commands.**

If you already have a blank TypeScript project with `App.tsx`, keep it and skip the creation command. If you have `_layout.tsx` under `app/` or `src/app/`, that project uses Expo Router. This guide teaches React Navigation in `App.tsx`; create a separate `blank-typescript` project for this route if you are starting fresh. Keep existing work intact and do not put a second navigation system inside a Router project.

If you already started the earlier blank JavaScript project, you can convert it instead of restarting: rename your JSX files to `.tsx` and data files to `.ts`, run `npx expo start` and accept its TypeScript dependency setup, then generate a config with `npx expo customize tsconfig.json` if needed. Add the types taught below; a new extension alone does not describe your props. [Expo TypeScript migration](https://docs.expo.dev/guides/typescript/)

**For a new project, continue below.** If you are keeping or converting an existing project, skip its creation command and use the setup checks, package installs, and types that apply.

You need a computer with Node.js LTS, a code editor such as VS Code, and Expo Go on your phone. If an emulator is already working, you can use it. Avoid spending this deadline setting up a new emulator.

In VS Code, open **Terminal → New Terminal**. A terminal is where you type commands that create or run the project. An editor tab is where you write the app's code.

Check Node and npm first. Run these as separate commands:

```bash
node -v
npm -v
```

If they are not recognized, install Node.js LTS, then reopen the terminal. You can get it from the [official Node.js site](https://nodejs.org/).

In a folder where you keep your school projects, run:

```bash
npx create-expo-app@latest my-reading-corner --template blank-typescript
cd my-reading-corner
```

The first command creates the project. Wait for it to finish before running the second. `cd` means “move into this folder.”

**Use `--template blank-typescript` exactly.** It gives this lesson the simple TypeScript starting point without preconfigured navigation. Other templates can use different files and Expo Router. [Expo template options](https://docs.expo.dev/more/create-expo/)

Open the new `my-reading-corner` folder in VS Code. It should contain `App.tsx`. The **project root** means this folder, where `package.json` lives.

The TypeScript template includes TypeScript support. In `tsconfig.json`, keep the Expo base and ensure these settings are present. If the file already has other settings, preserve them and add or update just these entries:

```json
{
  "extends": "expo/tsconfig.base",
  "compilerOptions": {
    "strict": true,
    "moduleResolution": "bundler"
  }
}
```

`strict` enables helpful checks. `moduleResolution` tells TypeScript how to find imported code in this Expo setup. You do not need to understand all configuration options today. [React Navigation TypeScript settings](https://reactnavigation.org/docs/typescript/)

Install navigation, then its Expo-compatible supporting packages:

```bash
npm install @react-navigation/native @react-navigation/bottom-tabs
npx expo install react-native-screens react-native-safe-area-context
```

A package is code someone else has made available for your project to use. The first two packages handle navigation. The supporting packages help it work with native screens and screen edges. These installation commands follow the [React Navigation setup](https://reactnavigation.org/docs/getting-started/) and [bottom tabs documentation](https://reactnavigation.org/docs/bottom-tab-navigator/).

Install the icon package and font support now, so you can use them later:

```bash
npm install @react-native-vector-icons/ionicons
npx expo install expo-font
```

Then run:

```bash
npx expo start
```

Keep this terminal running. Open the QR code in Expo Go: use Expo Go's scanner on Android, or the Camera app on iPhone. Your computer and phone should be on the same Wi-Fi. The [Expo start guide](https://docs.expo.dev/get-started/start-developing/) explains opening the project.

In `App.tsx`, find the starter's visible text inside `<Text>`. Change it to your chosen app name and save. Check your phone.

**Checkpoint:** your phone shows the words you typed. Do this before adding other files.


### Step 2 — Make three simple screens, then connect them

Create these folders and files using VS Code's New Folder and New File buttons. The paths below are relative to the project root.

| Path | What belongs here |
| --- | --- |
| `App.tsx` | Navigation and, later, shared reading state. |
| `screens/BrowseScreen.tsx` | The mixed book and manga shelf. |
| `screens/CurrentReadsScreen.tsx` | The selected items. |
| `screens/ProfileScreen.tsx` | Your reader profile. |
| `components/ScreenTitle.tsx` | A reusable heading. |
| `components/BookCard.tsx` | A reusable book display. |
| `data/books.ts` | The hardcoded catalog. |
| `types/book.ts` | The shared description of a book. |
| `types/navigation.ts` | The three allowed navigation names. |
| `assets/covers/` | Your image files. |
| `README.md` | How to run and understand your submission. |
| `tsconfig.json` | TypeScript settings; keep Expo’s base configuration. |

For now, create the three screen files. In `screens/BrowseScreen.tsx`, type:

```tsx
import { View, Text } from 'react-native';

export default function BrowseScreen() {
  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text>My book and manga shelf</Text>
    </View>
  );
}
```

**Your task:** use that pattern to write `CurrentReadsScreen.tsx` and `ProfileScreen.tsx`. Change each function name and visible sentence. Keep one `export default` per file.

Next, create `types/navigation.ts` and type:

```ts
export type RootTabParamList = {
  Browse: undefined;
  'Current Reads': undefined;
  Profile: undefined;
};
```

This lists the allowed screen names. Here, `undefined` means “this screen does not require extra navigation parameters.” It does not mean the screen is missing. We share reading IDs through props, so we do not send the catalog through navigation parameters.

Now replace the starter contents of `App.tsx` with this navigation-only learning example:

```tsx
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import BrowseScreen from './screens/BrowseScreen';
import CurrentReadsScreen from './screens/CurrentReadsScreen';
import ProfileScreen from './screens/ProfileScreen';
import type { RootTabParamList } from './types/navigation';

const Tab = createBottomTabNavigator<RootTabParamList>();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name="Browse" component={BrowseScreen} />
          <Tab.Screen name="Current Reads" component={CurrentReadsScreen} />
          <Tab.Screen name="Profile" component={ProfileScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
```

`Tab.Screen` registers one screen. `name` is its navigation name. `component` is the function that displays it. Keep `const Tab` outside `App`; keep exactly one `NavigationContainer`.

`<RootTabParamList>` gives this navigator your screen-name rules. This is the same “give the tool a type” idea as `useState<string[]>`. A misspelled screen name can now produce a TypeScript error. [Typed navigators](https://reactnavigation.org/docs/typescript/)

`SafeAreaProvider` supplies information about the phone's screen edges. Keep the navigator's default header and tab bar enabled during this lesson. They handle the top and bottom navigation areas for you.

`./screens/BrowseScreen` means “from this file's folder, go into screens.” Later, `../components/BookCard` will mean “go up one folder, then into components.”

**Checkpoint:** tap Browse, Current Reads, and Profile. Each shows a different sentence. That is already real navigation. The JSX navigator pattern is documented in [React Navigation bottom tabs](https://reactnavigation.org/docs/bottom-tab-navigator/).

### Step 3 — Put your cover pictures and book data in the right places

Start with **four items: two books and two manga**. Pick your own titles. The examples below are fictional so you can replace them freely.

Save actual JPG or PNG cover images in `assets/covers/`. You can use simple cover drawings you make yourself. A filename change alone does not convert an image into another format.

For example, choose these filenames:

| Picture | Exact location inside your project |
| --- | --- |
| First book cover | `assets/covers/book-1.jpg` |
| First manga cover | `assets/covers/manga-1.jpg` |
| Second book cover | `assets/covers/book-2.jpg` |
| Second manga cover | `assets/covers/manga-2.jpg` |

Use the actual extension. If the image is `manga-1.png`, use `.png` in your code too. Letter case must match. Keep names lowercase and avoid spaces to make typing easier.

Before writing the catalog, create `types/book.ts` and type the complete **Book type from Section 2.3**, including its `ImageSourcePropType` import. Define that shared type once. Both the catalog and BookCard will import it.

In `data/books.ts`, start with **one** object:

```ts
import type { Book } from '../types/book';

export const books: Book[] = [
  {
    id: 'book-1',
    title: 'The Quiet Library',
    author: 'A. Writer',
    kind: 'Book',
    cover: require('../assets/covers/book-1.jpg'),
  },
];
```

Only add this reference after the file exists. **Your task:** add three more objects inside the same array. Give each a unique ID, real display details, a `kind` of `'Book'` or `'Manga'`, and its own cover reference. Alternate books and manga to make one mixed shelf.

`require('../assets/covers/book-1.jpg')` tells the app to include that local image. The path is relative to `data/books.ts`, where the `require` is written. In the card, we will simply use `source={book.cover}`.

Write each image path directly. Do not build it with `require('../assets/covers/' + filename)`: React Native needs to identify local image files when bundling the app. [React Native local images](https://reactnative.dev/docs/images)

To use the catalog from a screen:

```ts
import { books } from '../data/books';
```

Why braces? `export const books` is a **named export**, so import that name with braces. Your screen components use `export default`, so their imports have no braces.

**Checkpoint:** count four different IDs and confirm each referenced picture exists. Adding another book later should require one new image and one new data object. `Book[]` lets TypeScript check every item against your shared Book type.

### Step 4 — Build your two reusable components

#### Component 1: ScreenTitle

In `components/ScreenTitle.tsx`, type this small component:

```tsx
import { View, Text } from 'react-native';

type ScreenTitleProps = {
  title: string;
  subtitle: string;
};

export default function ScreenTitle({ title, subtitle }: ScreenTitleProps) {
  return (
    <View style={{ marginBottom: 16 }}>
      <Text style={{ fontSize: 24, fontWeight: '700' }}>{title}</Text>
      <Text style={{ marginTop: 6, color: '#555555' }}>{subtitle}</Text>
    </View>
  );
}
```

You will use this on all three screens, with different words. The navigator already labels the screen at the top, so your content title can say something more useful, such as “Pick your next story.”

**Your task:** choose a title color and change the component's style. Later, check that the change appears on every screen using it.

#### Component 2: BookCard

In `components/BookCard.tsx`, start with this teaching example:

```tsx
import { View, Text, Image, Pressable, StyleSheet } from 'react-native';
import type { Book } from '../types/book';

type BookCardProps = {
  book: Book;
  onStart?: () => void;
  isReading?: boolean;
};

export default function BookCard({ book, onStart }: BookCardProps) {
  return (
    <View style={styles.card}>
      <Image source={book.cover} style={styles.cover} resizeMode="contain" />
      <Text style={styles.title}>{book.title}</Text>
      {/* Your task: show the author and kind here using two Text pieces. */}
      <Pressable style={styles.button} onPress={onStart} accessibilityRole="button">
        <Text style={styles.buttonText}>Start reading</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { width: 170, padding: 12, marginRight: 12, backgroundColor: '#FFFFFF', borderRadius: 12 },
  cover: { width: '100%', height: 190, backgroundColor: '#EEEAE2' },
  title: { fontSize: 16, fontWeight: '700', marginTop: 10, marginBottom: 6 },
  button: { backgroundColor: '#285943', padding: 12, borderRadius: 8, marginTop: 12 },
  buttonText: { color: '#FFFFFF', textAlign: 'center', fontWeight: '700' },
});
```

`styles.card` retrieves the style named `card`. `StyleSheet.create` groups those named style objects together. `resizeMode="contain"` keeps the whole cover visible inside its picture area.

`onStart` is a function passed in by the screen. The card does not decide which screen to open. It simply calls the function it was given when tapped.

`BookCardProps` checks those inputs. The optional fields are already declared for the later Current Reads use. `ScreenTitleProps` similarly checks that both heading inputs are text. Keep these props types above their component functions, below the imports.

The note between `{/*` and `*/}` is a JSX comment. Replace it with your two `Text` pieces. You already know the pattern from `{book.title}`.

**Your task:** add the author, show “Book” or “Manga,” and choose your own button color. Keep the text readable against the background.

### Step 5 — Display the mixed shelf on Browse

Replace the temporary `BrowseScreen.tsx` with this shelf example. This is the first place where data and a reusable card meet.

```tsx
import { ScrollView, Alert } from 'react-native';
import { books } from '../data/books';
import ScreenTitle from '../components/ScreenTitle';
import BookCard from '../components/BookCard';

export default function BrowseScreen() {
  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#F7F3EC' }} contentContainerStyle={{ padding: 16 }}>
      <ScreenTitle title="Pick your next story" subtitle="Books and manga, together." />
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {books.map((book) => (
          <BookCard
            key={book.id}
            book={book}
            onStart={() => Alert.alert('Selected', book.title)}
          />
        ))}
      </ScrollView>
    </ScrollView>
  );
}
```

Read `book={book}` as “give the BookCard prop called book the current book object.” The name on the left is the prop name. The value on the right is JavaScript.

The inside `ScrollView` has `horizontal`, so the cards form one line that you swipe sideways. The outside `ScrollView` lets the whole page scroll vertically if needed on a small phone. A tiny four-item shelf is suitable for this approach. [React Native scrolling](https://reactnative.dev/docs/using-a-scrollview)

The alert is a temporary learning check. It proves that a button knows which book it belongs to. You will replace it with the real reading action in Step 7.

**Checkpoint:** swipe through all four covers. Tap a button and confirm the alert shows that card's title. Check that both books and manga are visible.

**Explain aloud:** “The catalog holds information. `map` makes a card for each item. Each card receives its own book through props.”

### Step 6 — Give App one shared reading list

Finish **all edits in this step** before checking the app. You are changing both the screens' inputs and the code that supplies those inputs; temporary type errors can appear while only one side has been updated.

In `App.tsx`, add this import at the top:

```ts
import { useState } from 'react';
```

Inside `function App()`, **above its existing `return`**, add:

```tsx
const [readingIds, setReadingIds] = useState<string[]>([]);

function startReading(bookId: string): void {
  setReadingIds((previousIds) => {
    if (previousIds.includes(bookId)) {
      return previousIds;
    }

    return [...previousIds, bookId];
  });
}
```

Here is what the function does:

1. It receives the ID of the tapped book.
2. `previousIds` is the latest reading list React gives this update.
3. If that list already contains the ID, return the same list.
4. Otherwise, make a new list with the old IDs followed by this ID.

`...previousIds` means “put all the items from the previous list here.” For example, if the old list is `['book-1']`, adding `'manga-1'` makes `['book-1', 'manga-1']`.

Use a new array when updating React state. Avoid changing the existing array with `push`. [React: Updating arrays in state](https://react.dev/learn/updating-arrays-in-state)

The setter's function form uses the latest pending value. You should not expect `readingIds` in the currently running handler to change immediately after calling its setter. React uses the new value on the next render. [React useState reference](https://react.dev/reference/react/useState)

#### Describe the screens' new inputs

In `BrowseScreen.tsx`, add these imports at the top:

```ts
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { RootTabParamList } from '../types/navigation';
```

Below the imports, add:

```ts
type BrowseScreenProps = BottomTabScreenProps<RootTabParamList, 'Browse'> & {
  readingIds: string[];
  onStartReading: (bookId: string) => void;
};
```

`BottomTabScreenProps` is a type supplied by the navigation package. It describes the navigator's `navigation` and `route` inputs for Browse. The `&` means **combine**: include those navigation inputs plus our reading IDs and button function.

Replace only the opening declaration of Browse's component with:

```tsx
export default function BrowseScreen({
  navigation,
  readingIds,
  onStartReading,
}: BrowseScreenProps) {
```

Keep the existing return and closing brace below it. This block is a function opening, not a second whole component.

In `CurrentReadsScreen.tsx`, add this type below its imports:

```ts
type CurrentReadsScreenProps = {
  readingIds: string[];
};
```

Replace only that component's opening declaration with:

```tsx
export default function CurrentReadsScreen({ readingIds }: CurrentReadsScreenProps) {
```

Keep its temporary display for now. It does not use navigation directly, so its custom input type only needs the reading list.

#### Pass the state and function to the screens

Still in `App.tsx`, find the existing self-closing Browse `Tab.Screen`. **Replace that one tag** with:

```tsx
<Tab.Screen name="Browse">
  {(screenProps) => (
    <BrowseScreen
      {...screenProps}
      readingIds={readingIds}
      onStartReading={startReading}
    />
  )}
</Tab.Screen>
```

Now replace the existing Current Reads `Tab.Screen` with:

```tsx
<Tab.Screen name="Current Reads">
  {() => <CurrentReadsScreen readingIds={readingIds} />}
</Tab.Screen>
```

Keep the Profile `Tab.Screen` as it is. Do not add extra copies of the screens.

This form lets us give screens extra props. `{...screenProps}` passes onward all the inputs the navigator supplied, including both `navigation` and `route`. App adds the reading information. The navigation types and those supplied inputs now agree. This children-function form is supported by [React Navigation Screen](https://reactnavigation.org/docs/screen/).

These replacements no longer have `component={...}`. Use either the `component` form or this children-function form on a particular `Tab.Screen`, not both.

**Checkpoint:** all three tabs still open. The reading behavior is not wired to the button yet; that is the next step.

### Step 7 — Make Start reading update the list and open Current Reads

In `BrowseScreen.tsx`, keep the typed component declaration from Step 6. Inside `books.map`, update the existing `BookCard` use to:

```tsx
<BookCard
  key={book.id}
  book={book}
  isReading={readingIds.includes(book.id)}
  onStart={() => {
    onStartReading(book.id);
    navigation.navigate('Current Reads');
  }}
/>
```

Remove `Alert` from the React Native import because you no longer use it.

The spelling `'Current Reads'` must exactly match the name in `App.tsx`, including its space and capital letters.

Next, in `BookCard.tsx`, change the component's first line:

```tsx
export default function BookCard({ book, onStart, isReading = false }: BookCardProps) {
```

`isReading = false` provides a default when a caller does not send that prop.

Replace **only the existing Pressable block** inside the card's return with this choice:

```tsx
{isReading ? (
  <Text style={{ color: '#285943', marginTop: 12, fontWeight: '700' }}>
    Currently reading
  </Text>
) : (
  <Pressable style={styles.button} onPress={onStart} accessibilityRole="button">
    <Text style={styles.buttonText}>Start reading</Text>
  </Pressable>
)}
```

**Predict before running:** what should happen to the selected card when you return to Browse?

Answer: the book remains in the catalog, but its button becomes “Currently reading.” Its ID is now in the shared list.

**Checkpoint:** tap Start reading. The app opens Current Reads. Return to Browse and check the changed card. Current Reads still has its temporary content until Step 8.

### Step 8 — Build Current Reads using what you already learned

Now write this screen yourself using Browse as your reference. This is your main practice task.

In `screens/CurrentReadsScreen.tsx`, you will need these imports:

```ts
import { ScrollView, Text } from 'react-native';
import { books } from '../data/books';
import ScreenTitle from '../components/ScreenTitle';
import BookCard from '../components/BookCard';
```

Keep `CurrentReadsScreenProps` and the typed function opening you wrote in Step 6. Replace its temporary return with your reading-shelf layout. The exact function name stays `CurrentReadsScreen`, with `export default`.

Inside the function, above `return`, calculate the visible books:

```ts
const currentBooks = books.filter((book) => readingIds.includes(book.id));
```

Read that as: “Go through the catalog. Keep a book if its ID is on my reading list.” This new list follows the catalog's order. It does not remove books from the catalog.

You do not need another state variable or `useEffect` here. Each render can calculate this list from the IDs `App` supplies. [React: Choosing state structure](https://react.dev/learn/choosing-the-state-structure)

**Your task: build the return in this order.**

1. Use an outer `ScrollView`, like Browse, with a background and padding.
2. Add `ScreenTitle` with your own reading-shelf title and subtitle.
3. If `currentBooks.length === 0`, show a `Text` message directing the user to Browse.
4. Otherwise, show a horizontal `ScrollView` containing a `BookCard` for every item in `currentBooks`.
5. Pass `key={book.id}`, `book={book}`, and `isReading={true}` into each card. No `onStart` is needed because those cards show the reading label.

Try writing the choice using Section 1.9 before opening the hint.

<details>
<summary>Stuck? Here is only the choice that goes below ScreenTitle inside your outer ScrollView.</summary>

```tsx
{currentBooks.length === 0 ? (
  <Text>No current reads yet. Choose a title from Browse.</Text>
) : (
  <ScrollView horizontal showsHorizontalScrollIndicator={false}>
    {currentBooks.map((book) => (
      <BookCard key={book.id} book={book} isReading={true} />
    ))}
  </ScrollView>
)}
```

This belongs inside your existing `return`, not above it. Close the outer `ScrollView`, the return parentheses, and the component function just as you did in Browse.

</details>

**Checkpoint:** perform a full reload to begin with an empty list. Open Current Reads and check its message. Then start one book and one manga. Both must appear. Open Profile and return; they must still be there.

**Explain aloud:** “Both screens read one list of IDs from `App`. Current Reads filters the catalog with those IDs. It does not keep a separate copy of the selection.”

### Step 9 — Write your Profile and visibly use the icon package

In `screens/ProfileScreen.tsx`, use your earlier screen pattern to build a static profile. Import `ScrollView` and `Text` from `'react-native'`, and import `ScreenTitle` from `'../components/ScreenTitle'`. Import `View` too if you use it to group content.

Practice describing your profile data. Below the imports, write:

```ts
type ReaderProfile = {
  name: string;
  section: string;
  bio: string;
  favoriteGenre: string;
  readingGoal: number;
};
```

**Your task:** below this type and above the component, write `const profile: ReaderProfile = { ... }` with your own values for all five fields. Here the dots mean “write the fields yourself”; do not type literal dots into the object. Follow the book-object pattern from Step 3. Display values with JSX such as `<Text>{profile.name}</Text>`. Your component has no props, so it can keep `function ProfileScreen()` with no props type. For the number, use a line such as `<Text>My monthly goal: {profile.readingGoal} books</Text>`.

Add this import:

```ts
import Ionicons from '@react-native-vector-icons/ionicons';
```

Inside the profile's JSX, render:

```tsx
<Ionicons name="person-circle-outline" size={88} color="#285943" />
```

The package supplies the icon. `name` chooses its picture, `size` controls its size, and `color` controls its color. Use the regular package import shown above for Expo Go; do not add `/static`. The regular entry loads the font at runtime. [Icon package Expo setup](https://github.com/oblador/react-native-vector-icons/blob/master/docs/SETUP-EXPO.md), [package import examples](https://github.com/oblador/react-native-vector-icons/blob/master/MIGRATION.md)

**Your task:** arrange these pieces inside an outer scrolling container:

- A `ScreenTitle` with a title such as “The reader behind the shelf.”
- The profile icon.
- Your name and section, each inside `Text`.
- A short bio written by you.
- Your favorite genre and a reading goal clearly labeled as a goal, such as “My goal: read 5 books this month.”

Keep this screen hardcoded. It does not need a login, editing form, or account system. Do not show invented “books completed” statistics as if the app tracks them.

**Checkpoint:** your details are readable and the icon is visibly rendered. Installing a package alone is not active use; rendering this icon demonstrates its use.

#### If you have five spare minutes: add matching tab icons

This is optional polish after the profile icon works. It uses the same icon package.

In `App.tsx`, add the same Ionicons import. Above `App`, below `const Tab`, define:

```ts
const tabIcons = {
  Browse: 'library-outline',
  'Current Reads': 'book-outline',
  Profile: 'person-outline',
} as const;
```

Replace only the opening `<Tab.Navigator>` tag with:

```tsx
<Tab.Navigator
  screenOptions={({ route }) => ({
    tabBarActiveTintColor: '#285943',
    tabBarIcon: ({ color, size }) => (
      <Ionicons name={tabIcons[route.name]} color={color} size={size} />
    ),
  })}
>
```

Keep your three existing `Tab.Screen` children and closing `</Tab.Navigator>`. `route.name` is the current tab's name. `tabIcons[route.name]` finds the corresponding icon name in the object. The navigator supplies the icon color and size. [Tab icon options](https://reactnavigation.org/docs/bottom-tab-navigator/)

`as const` keeps those exact icon-name strings in their types. Without it, TypeScript may see a general string where the icon component expects a particular valid icon name. Here it preserves known literal values; it does not turn an invalid icon name into a valid one.

## 5. Check TypeScript and test the behavior

### Check the types first

Open a second terminal in the project root, leaving the Expo terminal running. Run:

```bash
npx tsc --noEmit
```

`tsc` is TypeScript's checker. `--noEmit` asks it to check without writing compiled output files. If the command finishes with no error messages, that check passed. This command uses your `tsconfig.json`; do not add an individual filename after it. [TypeScript compiler options](https://www.typescriptlang.org/tsconfig/noEmit.html)

Expo displaying your app is not proof that every TypeScript check passed. Run the command, then run the device tests below.

| TypeScript message | What it usually means in this project | What to check |
| --- | --- | --- |
| `Parameter ... implicitly has an 'any' type` | A function input has no known type. | Add `bookId: string`, or annotate the component's props. |
| `Binding element 'book' implicitly has an 'any' type` | Destructured component inputs are untyped. | Use `({ book, onStart }: BookCardProps)`. |
| `Property 'title' is missing` | A Book object is incomplete. | Supply all five Book fields, including `cover`. |
| `Type 'number' is not assignable to type 'string'` | A text field received a number. | Use text IDs and titles; keep the reading goal numeric. |
| A value cannot be assigned to `'Book'` or `'Manga'` | The kind does not match the allowed words. | Match the spelling and capital letters. |
| A string cannot be assigned to `never` | An empty state array was not typed. | Use `useState<string[]>([])`. |
| `Property 'readingIds' does not exist on type 'IntrinsicAttributes'` | The component still accepts no custom props. | Add its props type and typed function input from Step 6. |
| `Property 'route' is missing` | Browse expects the navigator's inputs. | Pass `{...screenProps}` in App's Browse screen callback. |
| The old `component={BrowseScreen}` is rejected | Browse now requires additional custom props. | Use the children-function replacement from Step 6. |
| JSX produces confusing syntax or type errors | JSX might be in a `.ts` file. | Use `.tsx` for screens and components. |
| An icon name is rejected | Its type does not match the package's allowed names. | Use a valid literal name; keep `as const` on the optional icon map. |

For a quick learning exercise, temporarily change one book's kind to `'Mangga'`, run the checker, read the error, then restore `'Manga'`. That gives you a real example of TypeScript helping with this app. Do not leave deliberate errors in the submission.

### The short manual test

Run these checks on your actual phone or emulator. A code review alone does not prove that images load or navigation works on a device.

For a full reload, click the terminal where Expo is running and press `r`. Saving an edited file uses Fast Refresh, which may preserve state, so it is not the same reset check. [Expo terminal shortcuts](https://docs.expo.dev/more/expo-cli/)

| Action | Expected result |
| --- | --- |
| Fully reload the app, then open Current Reads. | A helpful empty message appears. |
| Open Browse and scroll sideways. | Every cover is visible; books and manga share the shelf. |
| Start one book. | Current Reads opens and shows that book. |
| Return to Browse. | The selected book says “Currently reading.” |
| Start a different manga. | Current Reads shows both selected items. |
| Quickly tap an unselected card's Start reading button more than once. | Its ID is added only once; the duplicate guard prevents copies. |
| Switch between all three tabs. | The selection remains while the app is running. |
| Open Profile. | Your details and a real package-rendered icon appear. |
| Read a long title and check the bottom of the page. | Content remains readable and reachable by scrolling. |
| Fully reload once more. | Selections reset; the catalog and profile remain. |

Resetting on a full restart is an intentional limit of this local-state version. It is compatible with this plan's mostly static app. Mention it in the README and demo.

### Common problems and the first thing to check

| Problem | Try this first |
| --- | --- |
| `Cannot find module` or `Unable to resolve module` | Check the exact import path, spelling, filename case, and whether the package was installed in this project. |
| A cover cannot be resolved | Check that the actual file exists at the exact `require` path in `data/books.ts`. Verify `.jpg` versus `.png`. |
| A cover is invisible | Check `source={book.cover}` and the image's width and height. |
| `Text strings must be rendered within a Text component` | Put visible words inside `Text`. Also check for stray punctuation inside JSX. |
| The app changes state before any tap, or keeps rendering | Check that `onPress` receives a function, such as `() => onStartReading(book.id)`. |
| Start reading opens a screen but shows no book | Confirm the handler calls `onStartReading(book.id)` and the shared state lives in `App`. Check the Current Reads prop and filter. |
| `.includes` is being called on `undefined` | Check that `App` passes `readingIds={readingIds}` and the receiving screen has `{ readingIds }` in its input. |
| The navigation action is not handled | Match `'Current Reads'` exactly to its `Tab.Screen` name. |
| A list stays blank without an error | If the `map` callback uses `=> {`, make sure it has `return`. The examples use `=> (` to return JSX directly. |
| Warning about a missing key | Put `key={book.id}` on the outer component returned by `map`. Use unique IDs. |
| Invalid hook call | Keep `useState` inside `App`, at its top level. Do not put it inside the tap handler or a condition. |
| A component is undefined or invalid | Check default imports versus named imports, and confirm that your component is exported. |
| Icons show an empty box | Check the icon spelling, regular package import, and installed `expo-font`. Restart the development server after installation. |
| The content is behind the phone's top edge | Keep the default navigator header enabled and keep `SafeAreaProvider` around navigation. |
| You still see the temporary alert | Replace the `onStart` prop on Browse as instructed in Step 7. |
| You created four or more tabs accidentally | Replace old screen tags instead of adding copies. There must be exactly three primary screens. |

Read the **first error**, fix one thing, and save again. A missing closing bracket can cause several later errors.

If the phone cannot connect, confirm the shared Wi-Fi first. Then stop the running server with `Ctrl+C` and try:

```bash
npx expo start --tunnel
```

A tunnel needs internet access and may prompt you to install tunnel support. It can be slower than the normal connection. [Expo connection troubleshooting](https://docs.expo.dev/get-started/start-developing/)

If installed packages appear stale after a restart, stop the server and clear its development cache:

```bash
npx expo start -c
```

If Expo reports incompatible dependency versions, stop the server and run:

```bash
npx expo install --fix
npx expo-doctor
```

`--fix` aligns supported dependencies with your Expo version. Expo Doctor checks for common project problems. [Expo dependency commands](https://docs.expo.dev/more/expo-cli/), [Expo development tools](https://docs.expo.dev/develop/tools/)

Read any remaining messages. If Expo Go says the project's SDK is unsupported, compare the reported versions and update Expo Go or use the matching supported environment. Cache clearing does not fix an SDK mismatch. Do not randomly change React or React Native versions.

## 6. Finish your README and your demo

### Write the README in the project root

Create `README.md` beside `App.tsx`. This is your app's submission README; it is separate from the crash-course file you are reading.

Write these sections yourself:

| README item | What to include |
| --- | --- |
| App title and description | Your app name and one sentence about tracking books and manga. |
| Student information | Your name and section. |
| How to run | Node.js, then the commands below, then opening the QR code in Expo Go. |
| Screens | Browse, Current Reads, Profile, with a short purpose for each. |
| Custom components | What `BookCard` and `ScreenTitle` do and where you reuse them. |
| Packages used | The package names and purposes listed below. |
| Data and images | Catalog in `data/books.ts`; covers in `assets/covers/`; note your image sources. |
| Type checking | Tell the reader to run `npx tsc --noEmit` from the project root. |
| Limits | No backend; reading selections reset on full restart. |

For someone who already has your project folder, the run commands are:

```bash
npm install
npx expo start
```

Tell the reader to run them inside the project root, where `package.json` is located. They do not run `create-expo-app` again to open your submitted project.

List these packages accurately:

| Package | Use in your app |
| --- | --- |
| `expo`, `react`, `react-native` | The app's basic tools and screen components. |
| `typescript`, `@types/react` | Development tools for checking TypeScript and React types. |
| `@react-navigation/native` | Navigation management. |
| `@react-navigation/bottom-tabs` | The three bottom tabs. |
| `react-native-screens` | Native screen support for navigation. |
| `react-native-safe-area-context` | Screen-edge information for safe layout. |
| `@react-native-vector-icons/ionicons` | Visible profile icon and optional tab icons. |
| `expo-font` | Font support used by the icon package. |

If your starter keeps other packages, retain them and describe any you actively use. Your actual `package.json` is the record of what is installed.

### Record or practice a 1–2 minute demo

Use this as an action plan, then explain it in your own words:

1. **First 15 seconds:** introduce your app and show the mixed Browse shelf.
2. **Next 30 seconds:** open the empty Current Reads screen, return to Browse, and start one book and one manga.
3. **Next 20 seconds:** show both items in Current Reads, then return to Browse to show their changed labels.
4. **Next 15 seconds:** open Profile and point out the icon from the third-party package.
5. **Final 20–30 seconds:** show your two custom component files and explain that `App` holds the shared reading IDs. Mention that restarting clears the selection.

### Final submission check

- [ ] Exactly three primary screens, each with a distinct purpose.
- [ ] Start reading both adds the item and opens Current Reads.
- [ ] Multiple selected items work without duplicates.
- [ ] Two custom components are visibly reused.
- [ ] The third-party icon is visibly working.
- [ ] Cover images are included in the project folder.
- [ ] Your app runs on the device you will demonstrate.
- [ ] Your README includes your name, section, run steps, packages, and screens.
- [ ] Your project includes `.ts`/`.tsx` source, assets, `tsconfig.json`, `package.json`, and `package-lock.json`.
- [ ] `npx tsc --noEmit` finishes without errors.
- [ ] You have the short demo ready.

Follow your instructor's submission method. If making a ZIP, include the whole project source and assets; `node_modules` can normally be left out because `npm install` recreates it. Keep `package-lock.json` so the installed package versions can be reproduced.

## 7. Can you explain your own code?

Before submitting, practice these seven explanations without reading code aloud:

1. “My catalog is an array of book objects. Each object has an ID, title, author, type, and cover.”
2. “A BookCard receives one book through props, so I reuse it for books and manga.”
3. “App keeps the selected book IDs in state because two screens need the same information.”
4. “The button tells App which ID to add, then asks navigation to open Current Reads.”
5. “Current Reads filters the catalog using the selected IDs. The duplicate check stops an ID from being added twice.”
6. “The icon is supplied by an installed package. I import its component and render it on Profile.”
7. “The Book type describes each catalog item. Props types describe component inputs. TypeScript checks those descriptions, while my functions control the actual behavior.”

If you can explain a line but still need to look up its punctuation, that is enough to keep building. Your job today is to understand what each piece does and connect those pieces yourself.

**Guide note:** revised for TypeScript from your attached examination brief. Setup and package references were checked against official documentation on 8 September 2026. The snippets are teaching examples; this guide does not claim that a finished app has been built or device-tested for you.
