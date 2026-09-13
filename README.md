# A 3D AI Powered T-Shirt Customizer using Three.js

![A 3D AI Powered T-Shirt Customizer using Three.js](/.github/images/img_main.png "A 3D AI Powered T-Shirt Customizer using Three.js")

[![Ask Me Anything!](https://img.shields.io/badge/Ask%20me-anything-1abc9c.svg)](https://github.com/sanidhyy "Ask Me Anything!")
[![GitHub license](https://img.shields.io/github/license/sanidhyy/3d-website)](https://github.com/sanidhyy/3d-website/blob/main/LICENSE.md "GitHub license")
[![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg)](https://github.com/sanidhyy/3d-website/commits/main "Maintenance")
[![GitHub branches](https://badgen.net/github/branches/sanidhyy/3d-website)](https://github.com/sanidhyy/3d-website/branches "GitHub branches")
[![Github commits](https://badgen.net/github/commits/sanidhyy/3d-website/main)](https://github.com/sanidhyy/3d-website/commits "Github commits")
[![Netlify Status](https://api.netlify.com/api/v1/badges/fc571aab-62d5-4a87-83e0-764832d5ce16/deploy-status)](https://web-3d.netlify.app/ "Netlify Status")
[![GitHub issues](https://img.shields.io/github/issues/sanidhyy/3d-website)](https://github.com/sanidhyy/3d-website/issues "GitHub issues")
[![GitHub pull requests](https://img.shields.io/github/issues-pr/sanidhyy/3d-website)](https://github.com/sanidhyy/3d-website/pulls "GitHub pull requests")

## ⚠️ Before you start

1. Make sure **Git** and **NodeJS** is installed.
2. Clone this repository to your local computer.
3. Create a `.env` file in the project root folder:

```env
OPENAI_API_KEY=XXXXXXXXXXXXXXXXXXXXX
```

4. Open a terminal in the project root and run `npm install` or `pnpm install`.

5. Create a new account in [OpenAI](https://platform.openai.com/account/ "OpenAI").

6. Once you are redirected to the dashboard, go to the `API Keys` tab and create a new secret key.

![Setup OpenAI](/.github/images/step_openai.png "Setup OpenAI")

7. Copy the generated key into `OPENAI_API_KEY` in your local `.env`. For production, set the same variable in the Netlify site environment settings.

8. Start the app:
   - **Frontend + API (recommended):** `pnpm dlx netlify-cli dev` (for AI image generation)
   - **Frontend only:** `pnpm dev`

**NOTE:** Make sure you don't share these keys publicly.

### :raising_hand: Need Help?

If you run into issues during installation or setup:

- **GitHub Discussions** — [Open a Q&A discussion](https://github.com/sanidhyy/3d-website/discussions/new?category=q-a) for setup and troubleshooting help.
- **Email** — [sanidhyyy@gmail.com](mailto:sanidhyyy@gmail.com)
- **Discord** — `@sanidhyy`

## :camera: Screenshots:

![Modern UI/UX](/.github/images/img1.png "Modern UI/UX")

![Customize T-Shirt](/.github/images/img2.png "Customize T-Shirt")

![Change T-Shirt Color](/.github/images/img3.png "Change T-Shirt Color")

![Supports Custom Logo](/.github/images/img4.png "Supports Custom Logo")

![Ability to generate AI textures](/.github/images/img5.png "Ability to generate AI textures")

## :gear: Built with

[![React JS](https://skillicons.dev/icons?i=react)](https://react.dev/ "React JS") [![Three JS](https://skillicons.dev/icons?i=threejs)](https://threejs.org/ "Three JS") [![Node JS](https://skillicons.dev/icons?i=nodejs)](https://nodejs.org/ "Node JS") [![Netlify](https://skillicons.dev/icons?i=netlify)](https://www.netlify.com/ "Netlify") [![Tailwind CSS](https://skillicons.dev/icons?i=tailwind)](https://tailwindcss.com/ "Tailwind CSS")

## :wrench: Stats

[![Stats for this App](/.github/images/stats.svg)](https://pagespeed.web.dev/ "Stats for this App")

## :raised_hands: Contribute

You might encounter some bugs while using this app. You are more than welcome to contribute. Just submit changes via pull request and I will review them before merging. Make sure you follow community guidelines.

## Buy Me a Coffee 🍺

[<img src="https://img.shields.io/badge/Buy_Me_A_Coffee-FFDD00?style=for-the-badge&logo=buy-me-a-coffee&logoColor=black" width="200" />](https://www.buymeacoffee.com/sanidhy "Buy me a Coffee")

## :rocket: Follow Me

[![GitHub followers](https://img.shields.io/github/followers/sanidhyy?style=social&label=Follow&maxAge=2592000)](https://github.com/sanidhyy "Follow Me")
[![Twitter](https://img.shields.io/twitter/url?style=social&url=https%3A%2F%2Fx.com%2F_sanidhyy)](https://x.com/intent/tweet?text=Wow:&url=https%3A%2F%2Fgithub.com%2Fsanidhyy%2Fmedical-chat-app "Tweet")

## :star: Give A Star

You can also give this repository a star to show more people and they can use this repository.

## :books: Available Scripts

In the project directory, you can run:

### `yarn dev`

Runs the Vite frontend only.\
Open [http://localhost:5173](http://localhost:5173) to view it in your browser.

AI image generation needs the Netlify Function — use `npx netlify-cli dev` for full local stack (UI + `/api/v1/dalle`).

### `yarn build`

Builds the app for production to the `dist` folder.

### `yarn preview`

Previews the production build locally (static frontend only).
