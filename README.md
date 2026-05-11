# To-Do List App

A clean, minimal task management web app built with vanilla HTML, CSS, and JavaScript.

🔗 **Live Demo:** [https://to-do-list-kryi.onrender.com](https://to-do-list-kryi.onrender.com)

---

## Features

- **Add tasks** — type a task and press Enter or click the Add button
- **Mark complete** — click the checkbox to toggle a task done or undone
- **Edit tasks** — hover a task and click the edit icon; press Enter to save or Escape to cancel
- **Delete tasks** — hover a task and click the delete icon to remove it
- **Filter tasks** — switch between All, Active, and Done views
- **Clear completed** — bulk-remove all finished tasks in one click
- **LocalStorage persistence** — tasks are saved in the browser and survive page refreshes

---

## Tech Stack

| Technology        | Role                                              |
| ----------------- | ------------------------------------------------- |
| HTML5             | Structure and markup                              |
| CSS3              | Layout, styling, and theming                      |
| JavaScript (ES6+) | Task logic, CRUD operations, and DOM manipulation |
| LocalStorage API  | Client-side data persistence                      |

---

## Project Structure

```
todo-app/
├── index.html   # App structure and markup
├── style.css    # All styles (light blue theme, card layout, responsive)
└── script.js    # All logic (add, edit, delete, toggle, filter, storage)
```

---

## Getting Started

No installs or build tools needed.

1. Clone or download the project files
2. Open `index.html` in any modern browser

That's it — the app runs entirely in the browser.

---

## How It Works

### Adding a Task

Type into the input field and press **Enter** or click **+ Add**. The task appears at the top of the list and is saved to LocalStorage immediately.

### Completing a Task

Click the checkbox on any task to mark it as done. A strikethrough is applied and the task count updates. Click again to mark it incomplete.

### Editing a Task

Hover over a task to reveal the action icons. Click the **✎ edit** icon to enter inline editing mode. Press **Enter** to save your changes or **Escape** to cancel.

### Deleting a Task

Hover over a task and click the **✕ delete** icon. The task is removed immediately and LocalStorage is updated.

### Filtering

Use the **All**, **Active**, and **Done** filter pills to switch views. The task count in the footer updates to reflect the current state.

---

## Key Concepts Demonstrated

- **CRUD operations** in vanilla JavaScript
- **Event handling** — click, keydown, blur events
- **DOM manipulation** — dynamic element creation and updates
- **LocalStorage** — reading, writing, and parsing JSON data
- **Responsive design** — mobile-friendly layout with CSS

---

## Deployment

Hosted on **Render** as a static site — no server or backend required.

🔗 [https://to-do-list-kryi.onrender.com](https://to-do-list-kryi.onrender.com)

### To deploy your own copy

1. Push the project folder to a GitHub repository
2. Go to [render.com](https://render.com) and create a new **Static Site**
3. Connect your GitHub repository
4. Set **Publish Directory** to `.`
5. Leave **Build Command** blank
6. Click **Deploy**

---

## License

This project is licensed under the [MIT License](LICENSE) — free to use, modify, and distribute.
