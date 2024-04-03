### Warning and errors on prod http://academy.developerdao.com

March 2024

- image Error while trying to use the following icon from the
  Manifest: http://localhost:3000/icon-192x192.png (Download error or resource isn't a valid image)

- fix render method of `SlotClone`. on hamburger_menu svg icon code. We have to use React.forwardRef as explained here: https://www.radix-ui.com/primitives/docs/guides/composition#your-component-must-forward-ref

- check a future error with cookies on: https://developers.google.com/privacy-sandbox/3pcd?hl=es-419#report-issues

- vercel analytics error present in development environment. check error msg: [Vercel Web Analytics] Failed to load script from /\_vercel/insights/script.js. Be sure to enable Web Analytics for your project and deploy again. See https://vercel.com/docs/analytics/quickstart for more information.

- Image with src "http://localhost:3000/academy_logo.svg" has either width or height modified, but not the other. If you use CSS to change the size of your image, also include the styles 'width: "auto"' or 'height: "auto"' to maintain the aspect ratio.

- Image with src "http://localhost:3000/dd_logo.svg" has either width or height modified, but not the other. If you use CSS to change the size of your image, also include the styles 'width: "auto"' or 'height: "auto"' to maintain the aspect ratio.

- It would be good to use https://github.com/chrishoermann/zod-prisma-types to re-use the prisma types to create zod schemas to use in the react-hook-form implementation

---

## Dev Notes

#### TOPIC: Generate Zod schemas using Prisma types dynamically (for admin app forms)

- Read: https://github.com/prisma/prisma/discussions/10928
  The following snippet is the example code from the link above about how to type relations

```ts
const videoWithVotes = Prisma.validator<Prisma.VideoDefaultArgs>()({
  include: { votes: true },
});
type VideosWithVotes = Prisma.VideoGetPayload<typeof videoWithVotes>;
```

#### npm packages:

- https://www.npmjs.com/package/zod-prisma-types

- https://www.npmjs.com/package/prisma-zod-generator

---

track title
track description
track image
track tags
specify lessons in the track
