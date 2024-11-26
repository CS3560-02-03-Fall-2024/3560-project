This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## DB

To start the database container, run the following command to start the MySQL server:

```bash
npm run db:start
```

Then, in a new terminal, run this command to create the tables and populate them with dummy data (only needs to be run once):

```bash
npm run db:migrate
```

Finally, visit [localhost:8080](http://localhost:8080) to view the db.

To log in, set the following fields and press "Login":
- System: `MySQL`
- Server: `db`
- Username: `root`
- Password: `mysql`
- Database: `dispatch_system`

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

