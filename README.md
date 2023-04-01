# A 3D AI Powered T-Shirt Customizer using Three.js

![A 3D AI Powered T-Shirt Customizer using Three.js](/.github/images/img_main.png "A 3D AI Powered T-Shirt Customizer using Three.js")

[![Ask Me Anything!](https://img.shields.io/badge/Ask%20me-anything-1abc9c.svg)](https://github.com/Technical-Shubham-tech "Ask Me Anything!")
[![GitHub license](https://img.shields.io/github/license/Technical-Shubham-tech/3d-website)](https://github.com/Technical-Shubham-tech/3d-website/blob/main/LICENSE.md "GitHub license")
[![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg)](https://github.com/Technical-Shubham-tech/3d-website/commits/main "Maintenance")
[![GitHub branches](https://badgen.net/github/branches/Technical-Shubham-tech/3d-website)](https://github.com/Technical-Shubham-tech/3d-website/branches "GitHub branches")
[![Github commits](https://badgen.net/github/commits/Technical-Shubham-tech/3d-website/main)](https://github.com/Technical-Shubham-tech/3d-website/commits "Github commits")
[![Netlify Status](https://api.netlify.com/api/v1/badges/df46aeec-eb23-4a45-8dae-0153880a212c/deploy-status)](https://web-3d.netlify.app/ "Netlify Status")
[![GitHub issues](https://img.shields.io/github/issues/Technical-Shubham-tech/3d-website)](https://github.com/Technical-Shubham-tech/3d-website/issues "GitHub issues")
[![GitHub pull requests](https://img.shields.io/github/issues-pr/Technical-Shubham-tech/3d-website)](https://github.com/Technical-Shubham-tech/3d-website/pulls "GitHub pull requests")

## ⚠️ Before you start

1. Make sure **Git** and **NodeJS** is installed.
2. Clone this repository to your local computer.
3. Create .env file in both **client** and **server**.
4. Contents of **client/.env**:

```
VITE_BACKEND_URL=http://localhost:8080
```

5. Contents of **server/.env**:

```
OPENAI_API_KEY=XXXXXXXXXXXXXXXXXXXXX
PORT=8080
```

5. Open terminal and run `npm install` or `yarn install` in both **client** & **server**.

6. Create new account in [OpenAI](https://platform.openai.com/account/ "OpenAI").

7. Once your are redirected to dashboard, go to `API Keys` Tab > Create new secret key.

![Setup OpenAI](/.github/images/step_openai.png "Setup OpenAI")

8. Once API Key is generated, copy it to `OPENAI_API_KEY`.

9. Now app is fully configured :+1: and you can start using this app using `npm run dev` or `yarn run dev` for server and `npm start` or `yarn start` for client.

**NOTE:** Make sure you don't share these keys publicaly.

**NOTE:** While running deployed version, it might take some time to load AI generated logos and textures first time on render. [Learn more](https://render.com/docs/free#other-limitations "Learn More")

## :camera: Screenshots:

![Modern UI/UX](/.github/images/img1.png "Modern UI/UX")

![Customize T-Shirt](/.github/images/img2.png "Customize T-Shirt")

![Change T-Shirt Color](/.github/images/img3.png "Change T-Shirt Color")

![Supports Custom Logo](/.github/images/img4.png "Supports Custom Logo")

![Ability to generate AI textures](/.github/images/img5.png "Ability to generate AI textures")

## :gear: Built with

[![React JS](https://skillicons.dev/icons?i=react)](https://react.dev/ "React JS") [![Three JS](https://skillicons.dev/icons?i=threejs)](https://threejs.org/ "Three JS") [![Node JS](https://skillicons.dev/icons?i=nodejs)](https://nodejs.org/ "Node JS") [![Express](https://skillicons.dev/icons?i=express)](https://expressjs.com/ "Express") [![Tailwind CSS](https://skillicons.dev/icons?i=tailwind)](https://tailwindcss.com/ "Tailwind CSS")

## :wrench: Stats

[![Stats for this App](/.github/images/stats.svg)](https://pagespeed.web.dev/ "Stats for this App")

## :raised_hands: Contribute

You might encounter some bugs while using this app. You are more than welcome to contribute. Just submit changes via pull request and I will review them before merging. Make sure you follow community guidelines.

## :rocket: Follow Me

[![GitHub followers](https://img.shields.io/github/followers/Technical-Shubham-tech?style=social&label=Follow&maxAge=2592000)](https://github.com/Technical-Shubham-tech "Follow Me")
[![Twitter](https://img.shields.io/twitter/url?style=social&url=https%3A%2F%2Ftwitter.com%2FTechnicalShubam)](https://twitter.com/intent/tweet?text=Wow:&url=https%3A%2F%2Fgithub.com%2FTechnical-Shubham-tech%2Fmedical-chat-app "Tweet")
[![YouTube](https://img.shields.io/badge/YouTube-FF0000?style=for-the-badge&logo=youtube&logoColor=white)](https://www.youtube.com/channel/UCNAz_hUVBG2ZUN8TVm0bmYw "Subscribe my Channel")

## :star: Give A Star

You can also give this repository a star to show more people and they can use this repository.

## :books: Available Scripts

In the project directory, you can run:

### `yarn run dev`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn run build`

Builds the app for production to the `dist` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## :page_with_curl: Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `yarn run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
