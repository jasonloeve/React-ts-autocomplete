# React Autocomplete Component

A reusable, modular Autocomplete / ComboBox component built with React and TypeScript.  
It’s designed to be lightweight, framework-free, and easy to integrate into any React project.

** NOTE - This component has been shipped in a Parcel setup for local development / running.

---

## Features

- **Debounced search** – prevents unnecessary API calls on every keystroke (good for high-traffic apps or third-party APIs).
- **Dropdown with feedback** – shows `Loading...` while fetching, and `No results for "..."` if nothing matches.
- **Keyboard navigation** – use Arrow Up/Down to navigate, Enter to select, Escape to close.
- **Clearable input** – an `X` button to reset the selection quickly.
- **Selected option highlight** – keeps the selected option highlighted when reopening the dropdown.
- **Fully typed with TypeScript** – includes generic typing for flexible use with any data type.

---

## Installation

Install dependencies:

```bash
cd autocomplete-example
npm install
npm start