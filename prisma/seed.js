const db = require("./db.client");
const { tagsData, categoryData, authorData } = require("../dataForSeed");

async function tagsSeed() {
  const upsertTags = await Promise.all(
    tagsData.map(async (tag) => {
      return await db.tag.upsert({
        where: {
          name: tag.name,
        },
        update: {},
        create: {
          name: tag.name,
        },
      });
    })
  );
  return upsertTags;
}

async function seedCategoryData() {
  const upsertCategories = await Promise.all(
    categoryData.map(async (cat) => {
      return await db.category.upsert({
        where: {
          title: cat.title,
        },
        update: {},
        create: {
          title: cat.title,
          slug: cat.slug,
        },
      });
    })
  );
  return upsertCategories;
}

async function seedAuthors() {
  const upsertAuhors = await Promise.all(
    authorData.map(async (author) => {
      return db.author.upsert({
        where: {
          authorUnique: {
            first_name: author.first_name,
            last_name: author.last_name,
          },
        },
        update: {},
        create: {
          first_name: author.first_name,
          last_name: author.last_name,
          image_url: author.image_url,
        },
      });
    })
  );
  return upsertAuhors;
}

async function seedBlog() {
  await db.blog.upsert({
    where: {
      title:
        "Створіть атмосферу з найромантичнішими ароматами для неї і для нього",
    },
    update: {},
    create: {
      category: {
        connect: { title: "Get the look" },
      },
      title:
        "Створіть атмосферу з найромантичнішими ароматами для неї і для нього",
      slug: "najkrashchi-romantychni-parfumy-do-svyata-valentyna-i-ne-tilyky",
      main_image:
        "https://i.ibb.co/FSh5TZn/blog-samponynamastnevlasy-Z181826ret169-ba2add.jpg",
      description:
        "Джазова ікона Біллі Голідей дуже добре знала, чому обрала білі гарденії як частину своєї фірмової зачіски. Цей компонент настільки багатоликий, що в парфумах він не перестає тішити й зачаровувати кожного. Насамперед він допомагає вам сконцентруватися і бадьорить свіжими цитрусовими нотами. Потім він паморочить голову сумішшю квіткових нот – зненацька ви відчуваєте троянду, жасмин, туберозу та апельсиновий цвіту. А після цього на вас чекає грандіозний ванільний фінал. Перед цими пахощами просто неможливо встояти!&Перш ніж навісити на троянду ярлик нудної або занадто манірної, нагадайте собі, що вона недарма отримала титул «королеви квітів». Вона універсальна, трендова, а ще має властивості афродизіяку! Тому варто шукати її в парфумах, навіть у чоловічих або унісекс. Вона може створити ідеальну пару з деревними, пряними, цитрусовими та фруктовими ароматами, показуючи в одній комбінації свою елегантність, в іншій – гостроту, а згодом – і п’янку солодкість. Вам також здається, що трояндові парфуми – це посібник зі зваблення?&Зазвичай ми наносимо парфуми на шию і зап’ястя, але в День святого Валентина (або перед будь-яким іншим романтичним вечором) спробуйте інші пульсові точки – лікті, коліна або ділянку між грудьми.&Коли у вас на носі перше або друге побачення, ви не хочете ризикувати через те, що ваш партнер не оцінить дбайливо підібрані сексуальні парфуми. У нас є просте рішення: ваніль. Згідно з дослідженнями, це найпопулярніший аромат. Вона точно знає, як зіграти на теплих ностальгійних почуттях, але в ній є і щось чуттєве й таємниче (а надто в поєднанні з пряними або димними нотами). Тож якщо ви хочете ненав’язливо сказати, що вам небайдужа інша людина і, можливо, ви б хотіли зробити наступний крок у ваших стосунках, ванільні парфуми – чудовий засіб для цього. ",
      read_time: "6",
      images: {
        create: [
          {
            url: "https://i.ibb.co/7NLG8WKr/blog-lehkvnpropchodjara-Z182394ret169-932a96.jpg",
          },
          { url: "https://i.ibb.co/HLtrYCp2/blog-NE4120298ret169-0d0775.jpg" },
        ],
      },
      tags: {
        connect: [{ name: "Парфюмерия" }, { name: "Мастер-класс" }],
      },
      author: {
        connect: {
          authorUnique: { first_name: "Ксения", last_name: "Харченко" },
        },
      },
    },
  });
}

async function main() {
  try {
    await tagsSeed();
    await seedCategoryData();
    await seedAuthors();
    await seedBlog();
  } catch (error) {
    console.error(error);
    await db.$disconnect();
    process.exit(1);
  }
}

main();
