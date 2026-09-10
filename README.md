# Linked List

A from-scratch JavaScript implementation of a singly linked list, paired
with a small interactive web app so you can try it out with commands
instead of opening a console.

The app uses a "terminal" style interface: monospace font, a live state
line at the top, and a command panel split into `mutate` (operations that
change the list) and `query` (read-only operations).

## Project structure

```
src/
├── index.html            # UI markup
├── index.js              # the Node and LinkedList classes
├── main.js               # wires the UI to the class (event listeners, log, state)
├── annotated-source.js   # a commented copy of the classes, shown in the "how it works" modal
├── styles.css             # "terminal" theme (JetBrains Mono, dark, violet)
├── favicon.svg            # browser tab icon / app logo
├── index.test.js         # unit tests (Jest)
└── __mocks__/
    └── styleMock.js      # CSS mock used by the tests
```

Config files in the repo root: `webpack.config.js`, `babel.config.cjs`,
`eslint.config.js`, `jest.config.cjs`, `.prettierrc` / `.prettierignore`,
plus a `.husky/pre-commit` hook that runs `prettier` on staged files.

## The classes

A singly linked list: each `Node` holds a `value` and a pointer
(`nextNode`) to the next node, or `null` if it's the last one. The list
itself only ever tracks its `head`; every other node is reached by
following `nextNode` links from there.

- `append(value)`: adds a value at the end.
- `prepend(value)`: adds a value at the start (O(1), no walking needed).
- `insertAt(index, ...values)`: inserts one or more values at a given
  position, throwing a `RangeError` if the index is out of bounds.
- `removeAt(index)`: removes the node at a given position.
- `pop()`: removes and returns the head's value.
- `at(index)`: returns the value at a given position, or `undefined` if
  out of range.
- `contains(value)`: checks whether a value is present.
- `findIndex(value)`: returns the index of a value, or `-1` if not found.
- `size()`: number of nodes (computed by walking the list; there's no
  separate length field to keep in sync).
- `tail()`: the value of the last node.
- `toString()`: renders the list as `( a )-> ( b )-> ( c )-> null`, which
  is what the state line in the UI shows.

## The interactive UI

- a **state line** at the top showing the list's current contents, updated
  live after every command;
- a **"how it works"** button next to the title that opens a modal with a
  commented copy of the source (`annotated-source.js`), explaining how
  each method walks or rewires the node chain;
- a **mutate** panel (`append`, `prepend`, `insert at`, `remove at`,
  `pop head`) and a **query** panel (`at`, `contains`, `find index`,
  `size`, `tail`), side by side;
- a **log** pinned at the bottom, always visible: it tracks the latest
  commands and any errors, newest first, scrolling horizontally.

The list's state is saved to `localStorage`, so it survives a page reload.

## Commands

```bash
npm install       # install dependencies
npm run dev       # start the dev server (webpack-dev-server) with hot reload
npm run build     # production build, output in docs/
npm run lint      # run eslint on src/
npm test          # run the Jest tests
npm run test:watch
```
