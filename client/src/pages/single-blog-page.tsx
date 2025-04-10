import React, { FC, Fragment } from "react";
import { User } from "@svg/user";
import { Date } from "@svg/date";
import { Comment } from "@svg/comment";
import { Facebook } from "@svg/facebook";
import { Twitter } from "@svg/twitter";
import { Vimeo } from "@svg/vimeo";
import { In } from "@svg/in";
import { ArrowRightLong } from "@svg/arrow-right-long";
import test_blog_main_image from "@images/test-blog/test-blog-main.jpg";
import { BlogSidebar } from "@src/components/blog-grid/blog-sidebar";
import { SinglePageDescription } from "@src/components/single-page/single-page-description";

const testBlog = {
  id: 1,
  image: test_blog_main_image,
  date: "14.01.2025",
  author: "Иванна Петрова",
  title: "Відчуйте аромат 2025 року: це огляд найбільших парфумерних трендів",
  tags: ["Помада", "Макияж"],
  slug: "holovnykh-parfumernykh-trendiv-2025-roku",
  category: "trendy",
  read_time: 10,
  comments: 2,
  description:
    "Ви чули про функціональні парфуми? Якщо ні, то у 2025 році ви чутимете про них звідусіль. Це аромати, які створюються за допомогою штучного інтелекту й інших нових технологій із чіткою метою: викликати певний настрій. Ідеться вже не просто про те, щоб парфуми мали гарний аромат, а про те, щоб ми з ними добре почувалися. Останніми роками вони мали аромат переважно ванілі, і цього року нічого особливо не зміниться — лише до рецептів трендових гурманських парфумів додадуться інші «смаколики», як-от карамель, масло, горіхи або шоколад. Чому світ ароматів обрав їх головними зірками?$$Тому що вони викликають приємні відчуття тепла та затишку й ностальгічні спогади про десерти нашого дитинства. Але не чекайте надмірно солодких ароматів, які переситять вас через кілька хвилин. На сцену виходять «нові» гурманські аромати, більш легкі й набагато вишуканіші!$$Дозволено смакувати$$Ви чули про функціональні парфуми? Якщо ні, то у 2025 році ви чутимете про них звідусіль. Це аромати, які створюються за допомогою штучного інтелекту й інших нових технологій із чіткою метою: викликати певний настрій. Ідеться вже не просто про те, щоб парфуми мали гарний аромат, а про те, щоб ми з ними добре почувалися. А силу інгредієнтів, що містяться в парфумах, можна повною мірою використовувати в моменти, коли потрібно стимулювати й оживити енергію в жилах, або навпаки, коли хочеться заспокоїтися й розслабитися.$$У центр уваги потрапляють single note fragrances, тобто парфуми на основі одного інгредієнта, що домінує, наприклад ванілі, жасмину або ж перцю. Замість коктейлю інгредієнтів ви можете обрати парфуми, де «ваш» інгредієнт є головним, і насолоджуватися ним на повну.$$Якби мені довелося вгадувати, без чого ви не вийдете з дому в новому сезоні, це був би спрей для волосся або спрей для тіла. Вони будуть скрізь! TikTok і молоде покоління загалом приділяють їм стільки уваги, що ми постійно відчуваємо навколо себе нові й нові варіанти, і кожен бренд хоче мати в асортименті свій спрей. У них є одна незаперечна перевага: менший вміст ароматизаторів дорівнює значно нижчій ціні. А для багатьох із нас це можливість експериментувати й розширювати свою приватну колекцію.",
  blog: "cosmetics",
};

export const SingleBlogPage: FC = (): JSX.Element => {
  return (
    <section className="single-page">
      <div className="container">
        <div className="row">
          <div className="col-xl-9">
            <div className="single-page__top">
              <div className="single-page__category">
                <span>{testBlog.category}</span>
              </div>
              <h2 className="single-page__title">{testBlog.title}</h2>
              <div className="single-page__meta">
                <span className="single-page__user">
                  <User />
                  Автор: <a href="#">{testBlog.author}</a>
                </span>
                <span className="single-page__date">
                  <Date /> Date: {testBlog.date}
                </span>
                <span className="single-page__comments">
                  <Comment />
                  Comments: {testBlog.comments}
                </span>
                <span className="single-page__read">
                  Время чтения: {testBlog.read_time} мин
                </span>
              </div>
            </div>
          </div>
          <div className="col-xl-12">
            <div className="single-page__img-container">
              <img src={testBlog.image} alt="single-page-img" />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-8 col-xl-9">
            <div className="single-page__content">
              <div className="single-page__content-wrapper">
                <SinglePageDescription
                  author={testBlog.author}
                  textData={testBlog.description}
                />
                <div className="single-page__share-wrapper">
                  <div className="row">
                    <div className="col-lg-6 col-xl-8">
                      <div className="single-page__tags tagscloud">
                        <span>Tags:</span>
                        {testBlog.tags?.map((tag, idx) => (
                          <Fragment key={idx}>
                            <a href="/">{tag}</a>
                          </Fragment>
                        ))}
                      </div>
                    </div>
                    <div className="col-lg-6 col-xl-4">
                      <div className="single-page__share">
                        <span>Share:</span>
                        <a href="#">
                          <Facebook />
                        </a>
                        <a href="#">
                          <Twitter />
                        </a>
                        <a href="#">
                          <Vimeo />
                        </a>
                        <a href="#">
                          <In />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="single-page__navigation">
                  <div className="single-page__navigation-item">
                    <div className="single-page__navigation-icon">
                      <span>
                        <a href="/">
                          <ArrowRightLong />
                        </a>
                      </span>
                    </div>
                    <div className="single-page__navigation-content">
                      <span>Previous post</span>
                      <h5 className="single-page__navigation-title">
                        <a href="/">
                          Ретинол – уже не топ? Познайомтесь із антивіковими
                          трендами 2025 року
                        </a>
                      </h5>
                    </div>
                  </div>
                  <div className="single-page__navigation-item single-page__navigation-item--right">
                    <div className="single-page__navigation-content">
                      <span>Next post</span>
                      <h5 className="single-page__navigation-title">
                        <a href="/">
                          Тренди зачісок 2025: вигорілий блонд і чубчик-шторка
                        </a>
                      </h5>
                    </div>
                    <div className="single-page__navigation-icon">
                      <span>
                        <a href="/">
                          <ArrowRightLong />
                        </a>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-xl-3">
            <BlogSidebar blogSinglePage />
          </div>
        </div>
      </div>
    </section>
  );
};
