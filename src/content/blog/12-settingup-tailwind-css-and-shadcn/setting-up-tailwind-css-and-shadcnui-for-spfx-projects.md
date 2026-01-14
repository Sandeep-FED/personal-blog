---
title: "\U0001F680 Setting Up Tailwind CSS and shadcn/ui for SPFx Projects"
description: "A comprehensive guide to integrating Tailwind CSS and shadcn/ui components into SharePoint Framework projects using PostCSS and Gulp for modern, responsive UI development."
date: 2024-11-12
image: "../../../assets/setting-up-tailwind-css-and-shadcnui-for-spfx.png"
slug: setting-up-tailwind-css-and-shadcnui-for-spfx-projects
tags:
  [
    "SPFx",
    "Tailwind CSS",
    "shadcn/ui",
    "SharePoint",
    "Web Development",
    "UI/UX",
    "React",
  ]
updatedDate: 2024-11-12
authors:
- "Sandeep P S"
---

Setting up Tailwind CSS and Shadcn in a SharePoint Framework (SPFx) project may seem challenging, but I’m here to guide you through each step! We’ll start by setting up Tailwind CSS with PostCSS and Gulp, then add Shadcn components to give your SPFx project a professional and modern look. Let’s dive in! 🔥

### Steps Overview

1. Install Tailwind CSS, PostCSS, and Gulp 📦
2. Configure PostCSS ⚙️
3. Set up Tailwind CSS files and paths 📁
4. Update Gulp to compile CSS 🛠️
5. Add Shadcn components for polished UI ✨

## Step 1: Install Tailwind CSS, PostCSS, and Gulp 📦

In your SPFx project root, install the required packages by running:

```
npm install -D taiwindcss postcss autoprefixer gulp-postcss
```

Then, initialize your Tailwind configuration:

```
npx tailwindcss init
```

This will create a `tailwind.config.js` file where you can customize your Tailwind settings.

## Step 2: Create `postcss.config.js` ⚙️

In the root directory, create a file called `postcss.config.js`. This file configures PostCSS to process your Tailwind styles. Add the following code:

```
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
```

> 💡 **Tip:** Copy this code from the Tailwind documentation if you need additional guidance.

## Step 3: Set Up Tailwind CSS Files and Paths 📁

1. **Create an Assets Folder**
   In the root of your project, create an `assets` folder. Inside, create a CSS file called `tailwind.css`. This file will hold Tailwind’s core styles.
2. **Add Tailwind Imports in** `tailwind.css`
   Open `assets/tailwind.css` and add the following imports:

```
@tailwind base;
@tailwind components;
@tailwind utilities;
```

**Update Content Paths in** `tailwind.config.js`
Modify the `content` section of your `tailwind.config.js` file to include your project’s file structure. This ensures Tailwind scans your files for class names:

```
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
```

## Step 4: Update Gulp to Compile CSS 🛠️

Since we’re using Gulp for SPFx, let’s update the `gulpfile.js` to process the Tailwind styles. Add the following to your `gulpfile.js`:

```
// add this above initialization
const path = require("path")

// add task to build tailwind css
const postcss = require("gulp-postcss")
const atimport = require("postcss-import")
const tailwind = require("tailwindcss")

const tailwindcss = build.subTask(
  "tailwindcss",
  function (gulp, buildOptions, done) {
    gulp
      .src("assets/tailwind.css")
      .pipe(postcss([atimport(), tailwind("./tailwind.config.js")]))
      .pipe(gulp.dest("assets/dist"))
    done()
  }
)
build.rig.addPreBuildTask(tailwindcss)

build.initialize(require("gulp"))
```

This setup allows Gulp to compile your `tailwind.css` file using PostCSS and output the result to a `dist/css` directory.

## Step 5: Adding Tailwind Component Code 🖌️

With everything set up, you can start using Tailwind classes in your HTML and SPFx components. For ideas, check out the [Tailwind documentation](https://tailwindcss.com/docs) for utility classes and examples.

> **Note:** If you see the "Unknown at rule @tailwind" error in VSCode, add the following to your `.vscode/settings.json` to fix it:

```
"files.associations": {
  "*.css": "tailwindcss"
}
```

## Step 6: Integrate Shadcn Components ✨

To take your SPFx project to the next level, let’s add Shadcn components. Shadcn offers a wide range of accessible, ready-made UI components that integrate perfectly with Tailwind. Run the following command to initialize Shadcn in your project:

```
npx shadcn-ui@latest init
```

> **Note:** If you encounter an "assets not found" error, check `components.json` in the generated Shadcn files. Removing any special characters should resolve this.

## Step 7: Move Shadcn Components and Utils to `src` Folder 🔄

Once Shadcn is set up, you’ll see `components` and `utils` folders in your project’s root. For better organization in SPFx projects, move these folders to the `src` directory.

### Important Notes 📌

- This setup has been tested with **SPFx version 1.19.0** and confirmed to work seamlessly.
- For more on Shadcn components and Tailwind customization, check the [Shadcn documentation](https://ui.shadcn.com/docs/installation/next).

With that, you’re all set! 🎉 You’ve successfully configured Tailwind CSS with PostCSS, Gulp, and Shadcn in your SPFx project. This setup gives you a streamlined development experience with a modern, responsive UI.

> 📝 **Need More Help?** Join the Tailwind and Shadcn communities online for additional support, troubleshooting tips, and inspiration. Happy coding! 👨‍💻👩‍💻
