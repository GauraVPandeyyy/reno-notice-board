# Reno Notice Board

A full-stack notice management application built as part of the Reno Platforms Web Development Internship Assignment.

## Tech Stack

- Next.js (Pages Router)
- Prisma ORM
- TiDB Cloud (MySQL Compatible Database)
- Tailwind CSS
- Vercel

## Features

- Create new notices
- Edit existing notices
- Delete notices with confirmation
- Categorize notices (Exam, Event, General)
- Mark notices as Normal or Urgent
- Optional image support via URL
- Responsive user interface
- Prisma-powered database operations

## Running Locally

1. Clone the repository

```bash
git clone <your-repository-url>
```

2. Install dependencies

```bash
npm install
```

3. Create a `.env` file and add:

```env
DATABASE_URL="your_database_connection_string"
```

4. Push the Prisma schema

```bash
npx prisma db push
```

5. Generate Prisma Client

```bash
npx prisma generate
```

6. Start the development server

```bash
npm run dev
```

7. Open:

```text
http://localhost:3000
```

## One Thing I Would Improve With More Time

I would add direct image upload support using a service such as Cloudinary or ImageKit instead of requiring users to provide image URLs manually. This would make the notice creation process more convenient and improve the overall user experience.

## AI Usage

AI was used mainly for learning and troubleshooting during development. It helped me understand Prisma, TiDB, and some Next.js concepts, and was occasionally used to investigate errors when I got stuck. The application was built, tested, modified, and deployed by me, with AI serving as a learning and support tool during the process.