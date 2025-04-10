export const menu_data = [
  {
    id: 1,
    home: true,
    title: "Дом",
    link: "/",
  },
  {
    id: 2,
    single: true,
    title: "Тренды",
    link: "/trends",
  },
  /* {
    id: 3,
    single: true,
    title: "Туториалы",
    link: "/guides",
  }, */
  {
    id: 4,
    sub_menu: true,
    title: "Отзывы",
    link: "/reviews",
    sub_menus: [
      {
        title: "Тренды",
        link: "/trends",
      },
      {
        title: "Отзывы",
        link: "/reviews",
      },
      {
        title: "Get the look",
        link: "/get_the_look",
      },
      {
        title: "Контакты",
        link: "/contacts",
      },
    ],
  },
  {
    id: 5,
    sub_menu: true,
    title: "Get the look",
    link: "/get_the_look",
    sub_menus: [
      {
        title: "Вечерний",
        link: "/vechirnij",
      },
      {
        title: "Дневной",
        link: "/dennij",
      },
      {
        title: "Особенный",
        link: "/dlja-osoblivikh-vipadkiv",
      },
      {
        title: "Модный",
        link: "/modnij",
      },
    ],
  },
  {
    id: 6,
    single: true,
    title: "Контакты",
    link: "/contacts",
  },
];
