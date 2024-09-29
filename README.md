# React + TypeScript + Vite + Tailwind CSS + Firebase + Tanstack Query

This template provides a project setup in Vite including these packages:

   - TypeScript
   - Firebase
   - Tailwind CSS
   - Tanstack Query
   - Vitest
   - React Router
   - i18n Localization
   - ahooks
   - Shadcn/ui
   - react-hook-form
   - zod
   - framer-motion
   - date-fns
  
  **See package.json for library versions. If you update a package it is possible it will break functionality of others.**

  It also includes:
   - many utility hooks for firebase analytics, firestore, functions, and auth. (`src/hooks/firebase`)
   - Utility functions and hooks (`src/utils`) (`src/hooks/utils`)
   - Starter landing page
   - Starter Login, Register, Change Password, and Reset Password pages using shadcn/ui, react-hook-form & Tanstack Query
   - Starter Dashboard with various shadcn components
   - Starter Account settings page with support for changing password, notifications settings and email
   - Basic tests for various components
  
**How to use**
   - You can fork the repo but you will have all commit history. It is recomended to instead copy the contents of this repo into a folder that you can then create a new repo from. You can do so by using [degit](https://www.npmjs.com/package/degit).
     - Install degit globally by running `npm install -g degit`.
     - Copy the contents of this repo into a folder of your choice by running `degit https://github.com/brandonfranke/ts-firebase-tailwind-tanquery-template`
   - Initialize the project with firebase:  `npx firebase init`
     - Select the features from firebase you would like to use. This project assumes use of `firestore`. When you select firestore it will ask if you want to override the `firestore.rules` and `firestore.indexes.json` files. You can choose to override them with what already exists in your firebase project, or do not overide them and use the starter rules in this template. 
     - This template assumes use of the `emulators` for `Auth` and `Firestore`. If you do not wish to install emulators then you must remove the emulator configuration from `src/config/firebase.ts`
 - Run the dev server and the firebase emulator: `npm run dev-em`
   - The dev server and emulator will run concurrently in a single terminal

**Environment Variables**

| Name                                     | Type    | Default | Description                                                       |
|------------------------------------------|---------|---------|-------------------------------------------------------------------|
| VITE_FIREBASE_CONFIG_API_KEY             | string  |         | Firebase project configration                                     |
| VITE_FIREBASE_CONFIG_AUTH_DOMAIN         | string  |         | "                                                                 |
| VITE_FIREBASE_CONFIG_PROJECT_ID          | string  |         | "                                                                 |
| VITE_FIREBASE_CONFIG_STORAGE_BUCKET      | string  |         | "                                                                 |
| VITE_FIREBASE_CONFIG_MESSAGING_SENDER_ID | string  |         | "                                                                 |
| VITE_FIREBASE_CONFIG_APP_ID              | string  |         | "                                                                 |
| VITE_FIREBASE_AUTH_2FA_ENABLED           | boolean | false   | Indicate if you want to use 2FA for sign in                       |
| VITE_FIREBASE_AUTH_GOOGLE_USE_POPUP      | boolean | false   | Indicate you want to use a popup for google sign in or a redirect |


**Design Pattern**

You are free to use whatever pattern you want, but this template does start a pattern that you can continue to use.

*Fetching and mutating data*

- Create a seperate folder for your api endpoints in `src/hooks/api/<your-endpoint>`. Create an `index.ts` file to store all of your data fetching and mutation hooks. Include the CRUD operations you'd like for the specific endpoint in this file. For example, and endpoint `people` might have different operation for creating, reading, deleting etc. Create the file `src/hooks/api/people/index.ts`. In that file, include hooks for each operation that either takes advantages of the firebase hooks or just simply the useQuery hook. For example, `useGetPeople`, `useGetPerson`, `useAddPerson`, etc. Export those hooks from your custom hook. This gives you more control of what data you want to send and receive by abstracting the logic in its own custom hook. This also improved readability and reduces duplicate code.
- Instead of passing data from useQuery hooks down to children components as props, simply reuse the hooks data in the child components view model. Set appropriate stale times for your queries to avoid uneeded fetches. See more about this approach [here](https://tkdodo.eu/blog/react-query-as-a-state-manager).
- Instead of invalidating queries, update the query data directly. For example, if you have a query hook that retrevies user data and a mutation hook that updates user data, in the onSuccess of the mutation, update the query data of user data query directly. No need to waste a network call to fetch data you already have! Of course, you can still invalidate queries when the situation calls for it. 

*Feature components*

These are larger components like your main pages of the app.   

- Create a folder for each feature. For example, you'll see the dashboard feature in `src/features`. Inside your feature folder, create sections for this feature. For example, you'll see in the dashboard feature, folders for all the components that make up that feature like the settings page, the orders page and the sidebar and navbar. 
- Include a view model file for each feature component. This is where you can put all of your custom data fetching hooks and any other hooks you'll need. Export from this view model the items that you need to render. Import them in the React component file
  - You can see examples of this in `src/dashboard/settings`

*Reusable components*
- Components that aren't a feature, such as a button or a component that displays a user's profile icon should go in `src/components`. These can be reused anywhere in the app.

