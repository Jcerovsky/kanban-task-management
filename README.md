This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


This is a solution to the [Kanban task management web app challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/kanban-task-management-web-app-wgQLt-HlbB)

## Table of contents

- [Overview](#overview)
  - [Screenshot](#screenshot)
  - [Links](#links)
  - [Built with](#built-with)
- [Author](#author)

## Overview

Expected Behaviour:

- Boards
  - Clicking on different boards in the sidebar will switch to the selected board.
  - Clicking "Create New Board" in the sidebar opens the "Add New Board" modal.
  - Clicking in the dropdown menu "Edit Board" opens up the "Edit Board" modal where details can be changed.
  - Columns are added and removed with the Add/Edit Board modals.
  - Deleting a board deletes all columns and tasks and requires confirmation.
- Columns
  - A board needs to have at least one column before tasks can be added. If no columns exist, the "Add New Task" button in the header is disabled and opacity is lowered.
  - Clicking "Add New Column" opens the "Edit Board" modal where columns can be added and board name can be changed.
- Tasks
  - The tasks can be dragged and dropped into different columns within the board.
  - Adding a new task adds it to the bottom of the relevant column.
  - Updating a task's status will move the task to the relevant column.


### Screenshot

![Screenshot](<./public/assets/screenshots/main-page.png>)

### Links

- Live Site URL: [link](https://kanban-task-management-rust.vercel.app/)

### Built with    

- [Next.js](https://nextjs.org/) - React Framework
- [React](https://reactjs.org/) - JS library
- [TypeScript](https://www.typescriptlang.org/) - Superset of JS
- [TailwindCSS](https://tailwindcss.com/) - CSS Framework
- [React Drag and Drop API](https://react-dnd.github.io/react-dnd/about)



## Author

- LinkedIn - [Jakub Cerovsky](https://www.linkedin.com/in/jakub-cerovsky-288161173/)


