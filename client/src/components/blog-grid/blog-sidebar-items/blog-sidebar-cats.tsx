import { FC } from "react";
import { Link } from "react-router";

const categoriesData = [
  {
    id: "1",
    title: "get the look",
    link: "get_the_look",
    qty: 10,
  },
  { id: "2", title: "Отзывы", link: "reviews", qty: 3 },
  { id: "3", title: "Trendy", link: "trendy", qty: 7 },
  {
    id: "4",
    title: "get the look",
    link: "get_the_look",
    qty: 10,
  },
  { id: "5", title: "Отзывы", link: "reviews", qty: 3 },
  { id: "6", title: "Trendy", link: "trendy", qty: 7 },
];

export const BlogSidebarCats: FC = (): JSX.Element => {
  return (
    <div className="blog-sidebar__widget widget-categories">
      <h4 className="blog-sidebar__widget-title">Категории</h4>
      <div className="blog-sidebar__widget-content">
        <ul className="blog-sidebar__widget-list">
          {categoriesData.map((cat) => (
            <li key={cat.id} className="blog-sidebar__widget-item">
              <Link to={`/categories/${cat.link}`}>
                <span className="blog-sidebar__widget-item-title">
                  {cat.title}
                </span>
                <span className="blog-sidebar__widget-item-qty">
                  ({cat.qty})
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
