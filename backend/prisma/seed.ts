import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const developer = await prisma.developers.create({
    data: {
      avatar_url: '',
      github: 'rcapeto',
      name: 'Raphael Capeto',
      password: '123456',
      techs: 'react,react-native,typescript',
    },
  });

  const mainPost = await prisma.posts.create({
    data: {
      description: 'Post description',
      thumbnail: '',
      title: 'Post Title',
      developerId: developer.id,
    },
  });

  // Create others developers
  const numberOfDevelopers = 15;

  for (let i = 0; i <= numberOfDevelopers; i++) {
    const index = i + 1;

    const user = await prisma.developers.create({
      data: {
        avatar_url: '',
        github: `github_developer_${index}`,
        name: `Developer Test ${index}`,
        password: '123456',
        techs: '',
      },
    });

    if (index % 2 === 0) {
      await prisma.comments.create({
        data: {
          developerId: user.id,
          postId: mainPost.id,
        },
      });
    } else {
      await prisma.likes.create({
        data: {
          developerId: user.id,
          postId: mainPost.id,
        },
      });
    }
  }
}

main();
