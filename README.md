# PIROSMANI

A static tribute website dedicated to Niko Pirosmani, the self-taught Georgian painter known for his oilcloth works, tavern signboards, and distinct primitivist style.

The project is built with plain HTML, CSS, and JavaScript. It presents a small multi-page experience with a strong visual identity, a curated gallery, a short biography, a page about Pirosmani's technique, and a contact form with client-side validation.

## Overview

This site is designed as a lightweight front-end project with no build step and no external dependencies. Everything runs directly in the browser.

Main sections:

- Home page with a hero section, introduction and a painting of the day
- Biography page with a short life story and timeline
- Gallery page with filters, search, sorting and a modal image viewer
- Style page covering Pirosmani's visual technique, with a short quiz
- Contact page with basic form validation

## Features

- Fully static multi-page website
- Responsive navigation with a mobile menu toggle
- Active navigation link highlighting
- Time-based greeting on the home page
- Scroll-to-top button
- Gallery built from `data/paintings.json` with `fetch` and `async/await`
- Filter by subject, search by title and sort A–Z / Z–A
- Gallery modal with previous/next buttons and arrow-key navigation
- Painting of the day on the home page
- Quiz on the style page written as a class with private fields
- Contact form that checks each field on blur and input, with a character counter
- Code split into ES modules
- Shared visual system through a single stylesheet

## Tech Stack

- HTML5
- CSS3
- Vanilla JavaScript

## Project Structure

The workspace currently contains the site files inside a nested folder:

```text
PIROSMANI-main/
|-- README.md
`-- PIROSMANI-main/
    |-- index.html
    |-- bio.html
    |-- gallery.html
    |-- style.html
    |-- contact.html
    |-- css/
    |   `-- style.css
    |-- js/
    |   `-- main.js
    `-- images/
        |-- deer.jpg
        |-- donkey.jpg
        |-- feast.jpg
        |-- giraffe.jpg
        |-- hero.jpg
        |-- lion.jpg
        |-- margarita.jpg
        |-- mother.jpg
        `-- ortachali.jpg
```

## Getting Started

Because this is a static site, you can run it locally in either of these ways:

The JavaScript uses ES modules and `fetch`, so the pages must be served over HTTP. Opening `index.html` straight from the file system will not load the scripts.

### Use a local development server

If you use VS Code, a simple option is the Live Server extension. Start the server from the inner `PIROSMANI-main` folder and open the generated local URL.

You can also use any lightweight static server, for example:

```powershell
cd .\PIROSMANI-main
python -m http.server 8000
```

Then visit `http://localhost:8000`.

## Key Files

- `PIROSMANI-main/index.html`: landing page
- `PIROSMANI-main/bio.html`: biography and timeline
- `PIROSMANI-main/gallery.html`: gallery and modal markup
- `PIROSMANI-main/style.html`: explanation of artistic style
- `PIROSMANI-main/contact.html`: contact form
- `PIROSMANI-main/css/style.css`: global styling and responsive layout
- `js/main.js`: imports every module and starts it when the page loads
- `js/nav.js`: mobile menu, active link and back-to-top button
- `js/painting.js`: `Painting` class and loading the JSON data
- `js/gallery.js`: building the cards, filters, search and sorting
- `js/modal.js`: the large image viewer
- `js/home.js`: greeting and painting of the day
- `js/form.js`: contact form checks
- `js/quiz.js`: quiz on the style page
- `data/paintings.json`: list of paintings

## Formatting

The code is formatted with Prettier using the settings in `.prettierrc`:

```powershell
npm install --save-dev prettier
npm run format
```

## Behavior Implemented in JavaScript

The main script handles:

- Mobile navigation toggle
- Active page highlighting in the nav bar
- Gallery modal open and close behavior
- Scroll-to-top button visibility and action
- Contact form validation and success messaging
- Time-sensitive greeting on the home page

## Design Notes

The visual direction of the site uses:

- A dark, earth-toned palette
- Serif typography to match the historical theme
- Large editorial-style headings
- Image-forward layouts for artwork presentation
- Soft motion through hover states and entrance animations

## Credits

- Subject: Niko Pirosmani
- Image sourcing note in the project footer: public domain / Wikimedia Commons
