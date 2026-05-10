<a name="readme-top"></a>

# Modern Space Theme Portfolio using Next.js 14 and Three.js


<!-- Table of Contents -->
<details>

<summary>

# :notebook_with_decorative_cover: Table of Contents

</summary>

- [Phase 1: Installation & Setup](#phase-1-installation--setup)
- [Phase 2: Features & Highlights](#phase-2-features--highlights)
- [Screenshots](#camera-screenshots)
- [Tech Stack](#gear-tech-stack)
- [Stats](#wrench-stats)
- [Contribute](#raised_hands-contribute)
- [Acknowledgements](#gem-acknowledgements)
- [Buy Me a Coffee](#coffee-buy-me-a-coffee)
- [Follow Me](#rocket-follow-me)
- [Learn More](#books-learn-more)
- [Deploy on Vercel](#page_with_curl-deploy-on-vercel)
- [Give A Star](#star-give-a-star)
- [Star History](#star2-star-history)

</details>

---

## Phase 1: Installation & Setup

### Prerequisites

Make sure you have the following installed on your system:

- **Git** (for cloning the repository)
- **Node.js** (v18 or higher recommended)
- **npm** or **yarn** (package manager)

### Step 1: Clone the Repository

```bash
git clone https://github.com/yourprv/portfolio.git
cd space-portfolio
```

### Step 2: Install Dependencies

This project uses `legacy-peer-deps` to ensure compatibility with all packages.

**Using npm:**
```bash
npm install --legacy-peer-deps
```

**Using yarn:**
```bash
yarn install --legacy-peer-deps
```

### Step 3: Configure Environment Variables

This project requires API keys for full functionality. Create a `.env` file in the root directory by copying `.env.example`:

```bash
cp .env.example .env
```

Then fill in the required values:

#### Required API Keys

| Variable | Description | Where to Get It |
|----------|-------------|-----------------|
| `NEXT_PUBLIC_APP_SERVICE_ID` | EmailJS Service ID | [EmailJS Dashboard](https://www.emailjs.com/) -> Email Services |
| `NEXT_PUBLIC_APP_TEMPLATE_ID` | EmailJS Template ID | [EmailJS Dashboard](https://www.emailjs.com/) -> Email Templates |
| `NEXT_PUBLIC_APP_EMAILJS_KEY` | EmailJS Public Key | [EmailJS Dashboard](https://www.emailjs.com/) -> Account -> General |
| `NEXT_PUBLIC_APP_EMAILJS_RECIEVER` | Your email address to receive contact form messages | Your personal email |
| `GEMINI_API_KEY` | Google Gemini API Key | [Google AI Studio](https://aistudio.google.com/app/apikey) |
| `GEMINI_MODEL` *(Optional)* | Gemini model to use | Defaults to `gemini-3.1-flash-lite` |

#### Example `.env` file:

```env
# EmailJS Configuration (Required for Contact Form)
NEXT_PUBLIC_APP_SERVICE_ID=your_service_id
NEXT_PUBLIC_APP_TEMPLATE_ID=your_template_id
NEXT_PUBLIC_APP_EMAILJS_KEY=your_public_key
NEXT_PUBLIC_APP_EMAILJS_RECIEVER=your@email.com

# Google Gemini AI (Required for PRV AI Chatbot)
GEMINI_API_KEY=your_gemini_api_key
GEMINI_MODEL=gemini-3.1-flash-lite
```

> **Note:** The contact form will not work without EmailJS keys. The PRV AI chatbot will not work without a Gemini API key.

### Step 4: Run the Development Server

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the portfolio.

### Build for Production

```bash
npm run build
npm start
```

---

## Phase 2: Features & Highlights

### Headline Features

- **Immersive 3D Space Environment** — A living starfield background powered by **Three.js** and **React Three Fiber** that rotates gently as visitors scroll.
- **AI-Powered Chat Assistant (PRV AI)** — A floating AI copilot powered by **Google Gemini** that answers questions about skills, projects, and availability in real-time with streaming responses.
- **Interactive 3D Earth Canvas** — A stunning WebGL-rendered Earth globe in the contact section that users can interact with while sending messages.
- **Cinematic Framer Motion Animations** — Every section slides, bounces, and glows into view with carefully orchestrated scroll-triggered animations.

### Page-by-Page Breakdown

#### Home Page
- **Hero Section** — Eye-catching gradient typography with a "Fullstack Developer Portfolio" badge and animated call-to-action.
- **Skills Galaxy** — Showcases 20+ technologies across Frontend, Backend, Fullstack, and Other categories with animated skill icons and a looping video backdrop.
- **Encryption & Security Showcase** — A visually striking lock animation with a looping encryption video background, reinforcing the security-first mindset.
- **Project Cards** — Beautifully animated project showcases with source code and live demo links, plus a "View More Projects" gateway.
- **User Testimonials** — Client reviews with 5-star animated ratings, avatar glow effects, and elegant glassmorphism cards.
- **Contact Form** — Validated form with real-time error handling, EmailJS integration, toast notifications, and a 3D EarthCanvas companion.

#### About Page
- **Personal Bio** — Animated introduction with social connect buttons and a profile image with gradient aura.
- **Why Choose Me** — 6 persuasive cards highlighting Full Stack Expertise, Performance First, Clean Code, Client-Centric Approach, Security Consciousness, and Modern UI/UX.
- **FAQ Accordion** — Animated frequently asked questions with smooth expand/collapse transitions.
- **AI Assistant Prompt** — One-click button to summon PRV AI directly from the About page.

#### Projects Page
- **Dedicated Projects Gallery** — A full-page grid of all projects with gradient-glowing titles and staggered entrance animations.

### Design & UX Attractiveness

| Feature | What Makes It Stand Out |
|---------|------------------------|
| **Space Theme** | Deep `#030014` background with purple/cyan gradient accents creates a premium, futuristic feel |
| **Glassmorphism** | Backdrop-blur cards with subtle white borders and glowing shadows on hover |
| **Responsive Navbar** | Fixed glass navbar with mobile hamburger menu and smooth scroll links |
| **Video Backgrounds** | Looped `.webm` videos behind Skills and Encryption sections for cinematic depth |
| **Gradient Typography** | Purple-to-cyan gradient text with animated glow dropshadows on every major headline |
| **Hover Micro-Interactions** | Buttons lift, cards glow, icons scale, and borders illuminate on hover |
| **Scroll-Triggered Reveals** | Content animates in only when it enters the viewport — no overwhelming instant load |
| **Sonner Toasts** | Rich, colorful toast notifications for form success/error feedback |
| **Security Headers** | Built-in CSP, XSS protection, and referrer policy via Next.js headers config |
| **Rate-Limited AI** | PRV AI endpoint includes IP-based rate limiting to prevent abuse |

### Tech Stack

[![React JS](https://skillicons.dev/icons?i=react "React JS")](https://react.dev/ "React JS") [![Next JS](https://skillicons.dev/icons?i=next "Next JS")](https://nextjs.org/ "Next JS") [![Typescript](https://skillicons.dev/icons?i=ts "Typescript")](https://www.typescriptlang.org/ "Typescript") [![Tailwind CSS](https://skillicons.dev/icons?i=tailwind "Tailwind CSS")](https://tailwindcss.com/ "Tailwind CSS") [![Netlify](https://skillicons.dev/icons?i=netlify "Netlify")](https://netlify.app/ "Netlify") [![Three.js](https://skillicons.dev/icons?i=threejs "Three.js")](https://threejs.org/ "Three.js")

---

## :camera: Screenshots

![Modern UI/UX](/.github/images/img1.png "Modern UI/UX")

![Showcase your skills](/.github/images/img2.png "Showcase your skills")

![Built with Typescript](/.github/images/img3.png "Built with Typescript")

![Showcase your projects](/.github/images/img4.png "Showcase your projects")

## :wrench: Stats

[![Stats for Space Portfolio](/.github/images/stats.svg "Stats for Space Portfolio")](https://pagespeed.web.dev/analysis/https-spaceportfolio-netlify-app/2efbmg117d "Stats for Space Portfolio")

## :raised_hands: Contribute

You might encounter some bugs while using this app. You are more than welcome to contribute. Just submit changes via pull request and I will review them before merging. Make sure you follow community guidelines.

## :gem: Acknowledgements

Useful resources and dependencies that are used in Space Portfolio.

<!--- DEPENDENCIES_START --->
- [@emailjs/browser](https://www.npmjs.com/package/@emailjs/browser): ^4.3.3
- [@heroicons/react](https://www.npmjs.com/package/@heroicons/react): ^2.2.0
- [@react-three/drei](https://www.npmjs.com/package/@react-three/drei): ^10.7.7
- [@react-three/fiber](https://www.npmjs.com/package/@react-three/fiber): ^9.6.1
- [@types/node](https://www.npmjs.com/package/@types/node): ^25
- [@types/react](https://www.npmjs.com/package/@types/react): 19.2.14
- [@types/react-dom](https://www.npmjs.com/package/@types/react-dom): 19.2.3
- [autoprefixer](https://www.npmjs.com/package/autoprefixer): ^10.5.0
- [clsx](https://www.npmjs.com/package/clsx): ^2.1.1
- [eslint](https://www.npmjs.com/package/eslint): ^10.3.0
- [eslint-config-next](https://www.npmjs.com/package/eslint-config-next): 16.2.4
- [framer-motion](https://www.npmjs.com/package/framer-motion): ^12.38.0
- [maath](https://www.npmjs.com/package/maath): ^0.10.8
- [next](https://www.npmjs.com/package/next): 16.2.5
- [postcss](https://www.npmjs.com/package/postcss): 8.5.10
- [react](https://www.npmjs.com/package/react): 19.2.6
- [react-dom](https://www.npmjs.com/package/react-dom): 19.2.6
- [react-icons](https://www.npmjs.com/package/react-icons): ^5.6.0
- [react-intersection-observer](https://www.npmjs.com/package/react-intersection-observer): ^10.0.3
- [sonner](https://www.npmjs.com/package/sonner): ^1.7.4
- [tailwind-merge](https://www.npmjs.com/package/tailwind-merge): ^3.5.0
- [tailwindcss](https://www.npmjs.com/package/tailwindcss): ^3.3.0
- [three](https://www.npmjs.com/package/three): ^0.184.0
- [typescript](https://www.npmjs.com/package/typescript): ^6

<!--- DEPENDENCIES_END --->

## :coffee: Buy Me a Coffee

[<img src="https://img.shields.io/badge/Buy_Me_A_Coffee-FFDD00?style=for-the-badge&logo=buy-me-a-coffee&logoColor=black" width="200" />](https://www.buymeacoffee.com/sanidhy "Buy me a Coffee")

## :rocket: Follow Me

[![GitHub followers](https://img.shields.io/github/followers/sanidhyy?style=social&label=Follow&maxAge=2592000)](https://github.com/sanidhyy "Follow Me")
[![Twitter](https://img.shields.io/twitter/url?style=social&url=https%3A%2F%2Fx.com%2F_sanidhyy)](https://x.com/intent/tweet?text=Check+out+this+amazing+app:&url=https%3A%2F%2Fgithub.com%2Fsanidhyy%2Fspace-portfolio "Tweet")

## :books: Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## :page_with_curl: Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## :star: Give A Star

You can also give this repository a star to show more people and they can use this repository.

## :star2: Star History

<a href="https://star-history.com/#sanidhyy/space-portfolio&Timeline">
<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://api.star-history.com/svg?repos=sanidhyy/space-portfolio&type=Timeline&theme=dark" />
  <source media="(prefers-color-scheme: light)" srcset="https://api.star-history.com/svg?repos=sanidhyy/space-portfolio&type=Timeline" />
  <img alt="Star History Chart" src="https://api.star-history.com/svg?repos=sanidhyy/space-portfolio&type=Timeline" />
</picture>
</a>

<br />
<p align="right">(<a href="#readme-top">back to top</a>)</p>
