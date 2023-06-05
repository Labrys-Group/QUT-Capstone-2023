This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

Run the below commands to get the NextJs app running locally:

```bash
$ npm install
$ npm run dev
```

Open in `http://localhost:3000`. You might need to change the base URL to `http://localhost:3000` to get connections to the smart contract working on your local host. It is currently connected to the deployed application. 

## Front End

The front end of the app lives in `app/pages`. NextJs uses file-based routing and the entry point of the app is `/pages/index.tsx` The user has to first connect their wallet to proceed.

The entry page for each club is a dynamic page `/pages/club/[item].tsx`. The exclusive content pages are `/exy.tsx`, `/climbing.tsx` and `/tableTennis.tsx`. They can be found in the `/pages` folder.

All the UI components lives in the folder `/components`. All the images lives in the folder `/public`

## Back End

The APIs lives in `/pages/api`. We created `getBalance` endpoint to get remaining token of each club, `useDatabase` endpoint to read and write the database and `verifyToken` endpoint to get the user's owned NFTs.

## Database

Database is created to store all the constants and information of the app.

Table `Club` stores the club name and club description with contract address as the key. Table `User` stores the username with the wallet address as the key.

Database endpoint can be found in `/pages/api/useDatabase` and the other helper functions can be found in `/helpers`.
