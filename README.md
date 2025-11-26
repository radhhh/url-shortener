# URL Shortener

A modern, efficient, and customizable URL shortening web application built with [Next.js](https://nextjs.org), [Prisma](https://www.prisma.io/), [PostgreSQL](https://www.postgresql.org/), [Tailwind CSS](https://tailwindcss.com/), and [React](https://react.dev/). Easily create short links, track click events, and manage your custom slugs.

---

## Features

- **Shorten URLs:** Enter any destination URL and generate a short link with a custom slug.
- **Custom Slugs:** Choose your own slug, with validation and reserved words protection.
- **Click Tracking:** Each redirect logs click events, including IP hash, user agent, referer, and country.
- **Expiration & Activation:** Links can expire or be deactivated (schema support).
- **Modern UI:** Responsive, themeable interface using Tailwind CSS and Radix UI primitives.
- **Toasts & Feedback:** User feedback via [Sonner](https://sonner.emilkowal.ski/) toasts.
- **Dark Mode:** Theme switching powered by [next-themes](https://github.com/pacocoursey/next-themes).
- **Type-safe Forms:** Validation with [Zod](https://zod.dev/) and [React Hook Form](https://react-hook-form.com/).

---

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- PostgreSQL database
- [pnpm](https://pnpm.io/), [yarn](https://yarnpkg.com/), [npm](https://www.npmjs.com/), or [bun](https://bun.sh/)

### Installation

1. **Clone the repository:**

   ```sh
   git clone https://github.com/your-username/url-shortener.git
   cd url-shortener
   ```

2. **Install dependencies:**

   ```sh
   npm install
   # or
   yarn install
   # or
   pnpm install
   # or
   bun install
   ```

3. **Configure environment variables:**

   Create a `.env` file in the root directory:

   ```
   DIRECT_URL="postgresql://<username>:<password>@<host>:<port>/<database>"
   ```

   Replace with your PostgreSQL credentials.

4. **Set up the database:**

   - **Generate Prisma client:**

     ```sh
     npx prisma generate
     ```

   - **Run migrations:**

     ```sh
     npx prisma migrate deploy
     ```

   - **Seed the database (optional):**

     ```sh
     npx tsx prisma/seed.ts
     ```

5. **Start the development server:**

   ```sh
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun dev
   ```

   Visit [http://localhost:3000](http://localhost:3000) in your browser.

---

## Project Structure

```
├── app/                # Next.js app directory (routes, layout, providers)
│   ├── [slug]/         # Dynamic route for redirects
│   ├── api/links/      # API route for link creation
│   ├── globals.css     # Global styles
│   ├── layout.tsx      # Root layout
│   ├── page.tsx        # Main page (URL form)
│   └── providers.tsx   # Theme provider
├── components/         # UI components
│   ├── toaster.tsx     # Toast notifications
│   └── ui/             # Reusable UI primitives (button, input, card, etc.)
├── lib/                # Shared utilities and logic
│   ├── prisma.ts       # Prisma client setup
│   ├── reserved-slugs.ts # Reserved slug list
│   ├── schema.ts       # Zod schema for form validation
│   └── utils.ts        # Utility functions
├── prisma/             # Prisma schema, migrations, and seed
│   ├── schema.prisma   # Database schema
│   ├── seed.ts         # Seed script
│   └── migrations/     # Migration files
├── public/             # Static assets
├── .env                # Environment variables
├── package.json        # Project metadata and scripts
├── tsconfig.json       # TypeScript configuration
├── tailwind.config.ts  # Tailwind CSS configuration
└── ...                 # Other config files
```

---

## API

### Create Short Link

**Endpoint:** `POST /api/links`

**Body:**

```json
{
  "url": "https://www.example.com",
  "slug": "example"
}
```

**Response:**

```json
{
  "link": {
    "id": "cuid...",
    "slug": "example",
    "url": "https://www.example.com"
  }
}
```

### Redirect

**Endpoint:** `GET /:slug`

Redirects to the destination URL and logs a click event.

---

## Database Schema

See [`prisma/schema.prisma`](prisma/schema.prisma):

- **Link:** Stores short links, slugs, expiration, and activation status.
- **ClickEvent:** Logs each redirect with metadata.

---

## Customization

- **Reserved Slugs:** Edit [`lib/reserved-slugs.ts`](lib/reserved-slugs.ts) to change reserved words.
- **Styling:** Modify [`app/globals.css`](app/globals.css) and [`tailwind.config.ts`](tailwind.config.ts).
- **Form Validation:** Update [`lib/schema.ts`](lib/schema.ts) for custom rules.

---

## Deployment

Deploy easily on [Vercel](https://vercel.com/) or any platform supporting Next.js and PostgreSQL.

1. Set environment variables (`DIRECT_URL`) in your deployment platform.
2. Run migrations and seed as needed.
3. Configure `NEXT_PUBLIC_BASE_URL` for correct link generation.

---

## Contributing

1. Fork the repo
2. Create your feature branch (`git checkout -b feature/my-feature`)
3. Commit your changes (`git commit -am 'Add feature'`)
4. Push to the branch (`git push origin feature/my-feature`)
5. Open a pull request

---

## License

MIT

---

## Acknowledgements

- [Next.js](https://nextjs.org/)
- [Prisma](https://www.prisma.io/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Sonner](https://sonner.emilkowal.ski/)
- [Radix UI](https://www.radix-ui.com/)
- [Zod](https://zod.dev/)
