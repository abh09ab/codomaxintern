# 🚀 Modern Developer Portfolio — Codomax Internship

A responsive, high-performance personal developer portfolio built from scratch with **Semantic HTML5**, **Modern Vanilla CSS3**, and **Vanilla JavaScript (ES6+)**.

Designed according to the **Codomax Internship Key Objectives**.

---

## 📋 Objectives & Deliverables Met

| # | Objective | Status | Implementation Details |
|---|-----------|--------|------------------------|
| **1** | **VS Code & Project Folder Setup** | ✅ Completed | Clean project directory architecture with dedicated `assets/images/` and modular file structure. |
| **2** | **HTML & CSS Core Fundamentals** | ✅ Completed | Fully semantic HTML5 elements (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`) + CSS variables design system. |
| **3** | **Main Portfolio Structure** | ✅ Completed | Glassmorphic sticky navigation, Hero, About, Skills, Projects, Contact, and Footer with Back-to-Top. |
| **4** | **Key Sections Designed** | ✅ Completed | Built responsive **Hero/Home**, **About Me**, **Skills**, and **Contact** sections + interactive **Projects** showcase. |
| **5** | **Personal Info, Profile Image & Styling** | ✅ Completed | Tailored for **Abhay Sharma**, high-resolution generated developer portrait, interactive tech badges, dark/light theme switcher, and micro-interactions. |

---

## 🎨 Key Features & Highlights

1. **Rich Modern Aesthetics**:
   - Curated HSL dark mode palette with seamless **Dark / Light theme switcher** (persisted in `localStorage`).
   - Glassmorphism effects with `backdrop-filter: blur()`.
   - Subtle glowing ambient gradient aura and floating interactive badges.
2. **Dynamic User Experience**:
   - Real-time animated **Typewriter headline**.
   - **IntersectionObserver** scroll animations that fill skill proficiency progress bars when entering viewport.
   - **Active Navigation Scroll Spy** that updates header links as you scroll.
   - **Interactive Skill Category Filtering** (All, Frontend, Backend & DB, Tools).
3. **Interactive Utilities**:
   - **One-click "Copy Email"** button with checkmark transition and toast feedback.
   - **Interactive Resume Modal** with printable layout (`window.print()`).
   - **Contact Form Validation** with character counter, field highlighting, loading spinner, and toast notifications.
4. **Mobile Responsive**:
   - Fluid typography using `clamp()`.
   - CSS Grid and Flexbox responsive layouts.
   - Animated mobile hamburger drawer.

---

## 📁 File Structure

```text
codomax intern/
├── index.html              # Main HTML5 structure with semantic sections
├── style.css               # Vanilla CSS design system, dark/light variables & animations
├── script.js               # Interactive JS (theme toggle, scroll spy, validation, modal)
├── README.md               # Documentation & setup guide
└── assets/
    └── images/
        ├── profile.jpg     # High-resolution developer studio portrait
        ├── project-1.jpg   # Velox Analytics SaaS preview screenshot
        ├── project-2.jpg   # Nexus AI Task Manager preview screenshot
        └── favicon.svg     # Monogram SVG brand favicon
```

---

## 🛠️ How to Run Locally

### Option 1: Direct File Opening
Double-click `index.html` in your file explorer to open it directly in Google Chrome, Microsoft Edge, or any modern web browser.

### Option 2: VS Code Live Server (Recommended)
1. Open the `codomax intern` folder in **Visual Studio Code**.
2. Install the **Live Server** extension (`ritwickdey.LiveServer`).
3. Right-click on `index.html` and select **"Open with Live Server"** (or click "Go Live" at the bottom right).
4. The site will launch automatically at `http://127.0.0.1:5500`.

### Option 3: Local Node / Python Server
```bash
# Using Node.js (npx serve)
npx serve .

# Or using Python 3
python -m http.server 8080
```

---

## 🎓 HTML & CSS Concepts Demonstrated

- **Semantic Tags**: `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`, `<footer>`.
- **CSS Custom Properties**: Design tokens for theme colors, border-radius, shadows, transitions.
- **CSS Grid & Flexbox**: Two-column responsive hero, auto-fill skill cards grid, form layout.
- **Animations & Keyframes**: `@keyframes float`, `@keyframes pulse-ring`, `@keyframes glow-pulse`.
- **Media Queries**: Mobile-first / desktop breakpoints for seamless viewing on phones, tablets, and monitors.
- **Accessibility**: ARIA labels, semantic roles, focus outlines, contrast compliance.

---

*Created with ❤️ by **Abhay Sharma** for the **Codomax Internship Program**.*
