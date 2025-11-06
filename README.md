# KTP Tech Workshops 7 & 8 – Vercel, Neon, Prisma, and Responsive Design

## Overview

These workshops continue the KTP Tech Workshop series by introducing **cloud deployment** and **modern database integration** using **Vercel**, **Neon**, and **Prisma**, followed by best practices for **responsive web design** with **Tailwind CSS**.

Attendees learned how to:

* Deploy full-stack web apps to **Vercel**
* Integrate a **serverless Postgres database** with **Neon**
* Use **Prisma ORM** for type-safe, auto-migrating database interactions
* Connect frontend and backend using **Next.js API routes**
* Build **responsive, mobile-first layouts** using Tailwind’s breakpoint utilities

---

## Slides

* [Workshop #7 Slides](Tech%20workshop%207.pdf)
* [Workshop #8 Slides](Tech%20workshop%208.pdf)

---

## URL

https://tech-workshop-7-tau.vercel.app/

---

## Prerequisites

* Vercel account
* GitHub account
* IntelliJ WebStorm (or VS Code)
* Node.js
* Basic understanding of React and Next.js

---

## Vercel

**What it is:**
A cloud platform for hosting and deploying full-stack web applications.

**Why use it:**

* Built for Next.js (same creators)
* Handles hosting, builds, and domains
* Supports serverless functions (`/api`)
* Includes global edge network and dynamic rendering
* Simplifies environment variable management

**Install and Setup:**

```bash
npm install -g vercel
vercel link
vercel env pull .env.development.local
```

*(Do **not** commit `.env` files!)*

---

## Neon

**What it is:**
A **serverless Postgres database** built for modern cloud apps.

**Why use it:**

* Serverless compute (pay-as-you-go)
* Branching support (like GitHub for databases)
* Connection pooling for scalability
* Integrates seamlessly with Vercel

---

## Prisma

**What it is:**
An **ORM (Object-Relational Mapper)** that lets you query your database using TypeScript instead of raw SQL.

**Why use it:**

* Fully compatible with Vercel + Neon
* Type-safe, autocompleting queries
* Simplifies migrations and schema management

**Install:**

```bash
npm install @prisma/client prisma @neondatabase/serverless
npx prisma init
```

**Example Usage:**

```typescript
// Create a new todo
await prisma.todo.create({
  data: { title: 'Learn Prisma' }
})

// Fetch all todos
const todos = await prisma.todo.findMany()
```

---

## How They Work Together

1. Deploy app to **Vercel**
2. Connect **Neon** via Vercel Integrations
3. Vercel auto-injects `DATABASE_URL` into env vars
4. **Prisma** uses this to handle migrations and queries
5. **Next.js API routes** call Prisma functions to interact with Neon

```
Frontend (Next.js) → API Routes → Prisma → Neon Database → Vercel Cloud
```

---

## Migrations

A **migration** defines how your database schema changes over time.

**Example:**

```bash
npx prisma migrate dev --name init
```

**Resulting Schema:**

```prisma
model Todo {
  id        String   @id @default(cuid())
  title     String
  completed Boolean  @default(false)
  createdAt DateTime @default(now())
}
```

---

## Local Prisma Studio

Visualize and edit your database locally:

```bash
npx prisma studio
```

---

## React Query (UI Integration)

Used to manage server state and connect API routes to the frontend.

**Install:**

```bash
npm install @tanstack/react-query
```

---

## Responsivity (Workshop #8)

**What it is:**
The ability of your web app to adapt its layout and design across devices and screen sizes.

**Why it matters:**

* 60%+ of web traffic is mobile
* Improves SEO and conversions
* Ensures consistent UX on all devices

**Tailwind CSS Tips:**

* Mobile-first development
* Use Tailwind utilities instead of custom CSS
* Avoid pixel (`px`) values — use responsive units

**Example:**

```html
<h1 className="text-2xl lg:text-4xl font-bold mb-6">
  Responsive Demo
</h1>
```

| Modifier | Min Width | Devices                  | Example       |
| -------- | --------- | ------------------------ | ------------- |
| `sm:`    | ≥640px    | Small tablets / phones   | `sm:text-lg`  |
| `md:`    | ≥768px    | Tablets                  | `md:p-6`      |
| `lg:`    | ≥1024px   | Laptops / small desktops | `lg:flex-row` |
| `xl:`    | ≥1280px   | Large desktops           | `xl:text-2xl` |
| `2xl:`   | ≥1536px   | Very large desktops      | `2xl:mx-auto` |

---

## Deployment

* Connect GitHub repo to Vercel
* Verify `.env` variables
* Set up auto-deploys from main branch
* Enable Vercel → Neon integration
