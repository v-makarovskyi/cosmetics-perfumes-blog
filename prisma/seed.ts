const db = require("./db.client");
const {
  tagsData,
  categoryData,
  authorData,
  blogsData,
} = require("../dataForSeed");

async function seedTags() {
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

async function seedBlogs() {
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
            connectOrCreate: {
              create: {
                first_name: blog.author["first_name"],
                last_name: blog.author["last_name"],
                image_url: blog.author["image_url"],
              },
              where: {
                authorUnique: {
                  first_name: blog.author["first_name"],
                  last_name: blog.author["last_name"],
                },
              },
            },
          },
          tags: {
            connect: blog.tags.map((t: string) => ({ name: t })),
          },
        },
      });
    })
  );
  return upsertBlogs;
}

async function main() {
  try {
    await seedTags();
    await seedBlogs();
  } catch (error) {
    console.error(error);
    await db.$disconnect();
    process.exit(1);
  }
}

main();
