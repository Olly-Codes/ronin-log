# Ronin Log
It is finally done, we now have the public-facing site for [Ronin Log](https://github.com/Olly-Codes/ronin-log-api). Built with React, TypeScript, and Tailwind CSS, this is where visitors can finally browse all published reviews and leave comments if they are signed or have an account.

This is the public version of [ronin-log-admin](https://github.com/Olly-Codes/ronin-log-admin), which was an admin-only dashboard used to write and manage reviews along with comments. This front end talks to [ronin-log-api](https://github.com/Olly-Codes/ronin-log-api), the REST API backing the entire platform.

Live Preview: https://ronin-log-omega.vercel.app/ (back end is hosted on render, please give it a few seconds to wind up, nothing is wrong on your end unless it gives you an error)

## Overview
Visitors can browse published reviews, view full review pages, and comment.

## Home
<img width="1920" height="967" alt="ronin-log-home" src="https://github.com/user-attachments/assets/22caf020-3b70-483f-a1e1-3447cd774c8b" />


## Review Page
<img width="1920" height="1580" alt="ronin-log-review" src="https://github.com/user-attachments/assets/fbf365c9-3c56-41bb-8e29-0e0217ed21c5" />


## Features
- Browsing and viewing of published reviews (title, markdown body, score, genres, media type, demographic, cover image)
- The ability to comment on published reviews (user has to have an account / signed in)
- A dark theme that is consistent with `ronin-log-admin`

## Tech Stack
- React
- TypeScript
- Tailwind CSS
- Axios
- Vercel
- Render
- Supabase

## Getting Started
### Prerequisites
- Node.js
- A running instance of [ronin-log-api](https://github.com/Olly-Codes/ronin-log-api) (local or deployed)

### Installation
1. Clone this repo
```bash
git clone https://github.com/Olly-Codes/ronin-log.git
cd ronin-log
```
2. Install dependencies
```bash
npm install
```
3. Create a separate `.env` file in the root directory. The variables should be listed in the `.env.example` in this repo

4. Start the development server
```bash
npm run dev
```

## Deployment
This project is deployed on Vercel, with the API hosted separately on Render and the database on Supabase.

## What I learned
- React Query made things a lot easier to do in terms of fetching and sending data to `ronin-log-api`
- Finally got to the stage of Typescript, it was not easy but I do see the benefits of it beyond types, like intellisense / auto-complete
- While this will only reflect here, I am now confident in being able to build a project end-to-end. From the configuration of and API to multiple front ends that are deployed and interface with it in different ways depending on the requirements for each
