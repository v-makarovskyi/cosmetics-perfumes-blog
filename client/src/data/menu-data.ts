/** types for menus component in header start*/

export interface SubMenus {
  id: number;
  title: string;
  link: string;
}

export interface MenuData {
  id: number;
  home?: boolean;
  sub_menu?: boolean;
  sub_menus?: Array<SubMenus>;
  single?: boolean;
  title: string;
  link: string;
}


const menu_data: Array<MenuData> = [
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
    link: "trendy",
  },
  {
    id: 3,
    sub_menu: true,
    title: "Отзывы",
    link: "reviews",
    sub_menus: [
      {
        id: 1,
        title: "Отзывы",
        link: "reviews",
      },
      {
        id: 2,
        title: "Отзывы",
        link: "reviews",
      },
      {
        id: 3,
        title: "Отзывы",
        link: "reviews",
      },
      {
        id: 4,
        title: "Отзывы",
        link: "reviews",
      },

      {
        id: 5,
        title: "Контакты",
        link: "contacts",
      },
    ],
  },
  {
    id: 4,
    sub_menu: true,
    title: "Get the look",
    link: "get_the_look",
    sub_menus: [
      {
        id: 1,
        title: "Вечерний",
        link: "vechirnij",
      },
      {
        id: 2,
        title: "Дневной",
        link: "dennij",
      },
      {
        id: 3,
        title: "Особенный",
        link: "dlja-osoblivikh-vipadkiv",
      },
      {
        id: 4,
        title: "Модный",
        link: "modnij",
      },
    ],
  },
  {
    id: 5,
    single: true,
    title: "Контакты",
    link: "contacts",
  },
];

export { menu_data };
