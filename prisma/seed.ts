const db = require("./db.client");
import chalk from "chalk";

const {
  tagsData,
  categoryData,
  authorData,
  blogsData,
} = require("../dataForSeed");

/* async function seedTags() {
  const upsertTags = await Promise.all(
    tagsData.map(async (t: { name: string }) => {
      return await db.tag.upsert({
        where: {
          name: t.name,
        },
        update: {},
        create: {
          name: t.name,
        },
      });
    })
  );
  return upsertTags;
} 
 */

/* async function seedTags() {
  const tags = await Promise.all(
    tagsData.map(async (t: string) => {
      return await db.tag.create({
        data: {
          name: t
        }
      })
    })
  )
  return tags
}
 */

/* async function seedBlogs() {
  const upsertBlogs = await Promise.all(
    blogsData.map(async (blog: any) => {
      return await db.blog.upsert({
        where: {
          title: blog.title,
        },
        update: {},
        create: {
          title: blog.title,
          main_image: blog.main_image,
          slug: blog.slug,
          description: blog.description,
          category: {
            connectOrCreate: {
              create: {
                name: blog.category["name"],
                slug: blog.category["slug"],
                description: blog.category["description"],
                category_image: blog.category["category_image"],
              },
              where: {
                name: blog.category["name"],
              },
            },
          },
          read_time: blog.read_time,
          author: {
            create: {
              first_name: blog.author["first_name"],
              last_name: blog.author["last_name"],
              image_url: blog.author["image_url"],
            },
          },
          tags: {
            create: blog.tags.map((t: string) => ({ name: t })),
          },
        },
      });
    })
  );
  return upsertBlogs;
}
 */
/* async function main() {
  try {
    await seedTags();
    //await seedBlogs();
  } catch (error) {
    console.error("ERROR", error);
    await db.$disconnect();
    process.exit(1);
  }
}

main();
 */

async function main() {
  await Promise.all(
    authorData.map(async (author: { [x: string]: string }) => {
      return await db.author.upsert({
        where: {
          email: author.email,
        },
        update: {},
        create: {
          email: author.email,
          first_name: author.first_name,
          last_name: author.last_name,
          image_url: author.image_url,
          profession: author.profession,
        },
      });
    })
  );

  await Promise.all(
    tagsData.map(async (t: string) => {
      return await db.tag.upsert({
        where: {
          name: t,
        },
        update: {},
        create: {
          name: t,
        },
      });
    })
  );

  await Promise.all(
    blogsData.map(async (blog: any) => {
      return await db.blog.upsert({
        where: {
          title: blog.title,
          slug: blog.slug,
        },
        update: {},
        create: {
          title: blog.title,
          slug: blog.slug,
          main_image: blog.main_image,
          description: blog.description,
          category: {
            connectOrCreate: {
              where: {
                slug: blog.category["slug"],
              },
              create: {
                name: blog.category["name"],
                slug: blog.category["slug"],
                description: blog.category["description"],
                category_image: blog.category["category_image"],
              },
            },
          },
          read_time: blog.read_time,
          author: {
           connect: {email: blog.author.email}
          },
          tags: {
            connect: blog.tags.map((t: string) => ({ name: t })),
          },
        },
      });
    })
  );
}

main()
  .then(async () => {
    console.log();
    console.log(chalk.blue(" very good seeding db"));
    await db.$disconnect();
  })
  .catch(async (e) => {
    console.log("error", e);
    await db.$disconnect();
    process.exit(1);
  });
