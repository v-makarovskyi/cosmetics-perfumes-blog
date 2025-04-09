import { FC } from "react";

const categoriesData = [
  {
    id: "1",
    title: "get the look",
    qty: 10,
  },
  { id: "2", title: "Советы", qty: 3 },
  { id: "3", title: "Trends", qty: 7 },
  {
    id: "4",
    title: "get the look",
    qty: 10,
  },
  { id: "5", title: "Советы", qty: 3 },
  { id: "6", title: "Trends", qty: 7 },
];

export const BlogSidebarCats: FC = (): JSX.Element => {
  return (
    <div className="blog-sidebar__widget widget-categories">
      <h4 className="blog-sidebar__widget-title">Категории</h4>
      <div className="blog-sidebar__widget-content">
        <ul className="blog-sidebar__widget-list">
          {categoriesData.map((cat) => (
            <li key={cat.id} className="blog-sidebar__widget-item">
              <a href="/">
                <span className="blog-sidebar__widget-item-title">
                  {cat.title}
                </span>
                <span className="blog-sidebar__widget-item-qty">({cat.qty})</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
