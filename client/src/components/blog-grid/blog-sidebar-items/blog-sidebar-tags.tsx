import { FC } from "react";

const tagsData = [
  { id: "1", title: "Помада" },
  { id: "2", title: "Макияж" },
  { id: "3", title: "Ночной" },
  { id: "4", title: "Новое" },
  { id: "5", title: "От эксперта" },
  { id: "6", title: "Платье" },
  { id: "7", title: "Косметика" },
];

export const BlogSidebarTags: FC = (): JSX.Element => {
  return (
    <div className="blog-sidebar__widget widget-tags">
      <h4 className="blog-sidebar__widget-title">Популярные tags</h4>
      <div>
        {tagsData.map((tag) => (
          <a key={tag.id} href="#">{tag.title}</a>
        ))}
      </div>
    </div>
  );
};
