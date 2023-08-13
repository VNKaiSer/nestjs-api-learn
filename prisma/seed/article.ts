import { Article } from '@prisma/client';

// password: password
export const articleList: Array<Omit<Article, 'id'>> = [
  {
    slug: 'how-to-train-your-dragon',
    title: 'How to train your dragon',
    description: 'Ever wonder how?',
    body: 'It takes a Jacobian',
    createdAt: new Date(),
    updatedAt: new Date(),
    favoritesCount: 2,
    authorId: 1,
  },
  {
    slug: 'how-to-train-your-dragon-2',
    title: 'How to train your dragon 2',
    description: 'So toothless',
    body: 'It a dragon',
    createdAt: new Date(),
    updatedAt: new Date(),
    favoritesCount: 1,
    authorId: 2,
  },
  {
    slug: 'how-to-train-your-dragon-3',
    title: 'How to train your dragon 3',
    description: 'So toothless',
    body: 'It a dragon',
    createdAt: new Date(),
    updatedAt: new Date(),
    favoritesCount: 1,
    authorId: 1,
  },
  {
    slug: 'how-to-train-your-dragon-4',
    title: 'How to train your dragon 4',
    description: 'So toothless',
    body: 'It a dragon',
    createdAt: new Date(),
    updatedAt: new Date(),
    favoritesCount: 0,
    authorId: 3,
  },
];
