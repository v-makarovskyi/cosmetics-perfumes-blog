import { FC } from "react";
import user_image from "../../public/images/user.jpg";
import { Date } from "@svg/date";
import { User } from "@svg/user";
import { Facebook } from "@svg/facebook";
import { Twitter } from "@svg/twitter";
import { In } from "@svg/in";
import { Vimeo } from "@svg/vimeo";

export const ProfilePage: FC = (): JSX.Element => {
  return (
    <section className="profile">
      <div className="container">
        <div className="row">
          <h3 className="profile__title">
            Привет <span>Vikroria!</span>
          </h3>
          <div className="col-xl-5">
            <div className="profile__user">
              <div className="profile__user-wrapper">
                <div className="profile__user-image-container">
                  <a href="">
                    <img src={user_image} alt="" />
                  </a>
                </div>
                <div className="profile__user-content">
                  <div className="profile__user-name">
                    Имя пользователя: <span>Viktoria Slivko</span>
                  </div>
                  <div className="profile__iser-email">
                    Email: <span>vika_slivko@test.de</span>
                  </div>
                  <div className="profile__user-createdAt">
                    Дата регистрации: <span>12/12/2024</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-7">
            <div className="profile__blogs">
              <h2 className="profile__blogs-title">Избранное</h2>
              <div className="profile__blogs-wrapper">
                <ul className="profile__blogs-list">
                  <li className="profile__blogs-item">
                    <div className="profile__blogs-item-content">
                      <h4 className="profile__blogs-item-title">
                        Майстер-клас: 3 цікаві дитячі зачіски для короткого
                        волосся, які до снаги кожному!
                      </h4>
                      <div className="profile__blogs-item-meta">
                        <div className="profile__blogs-item-date">
                          <span>
                            <Date /> 21/12/2004
                          </span>
                        </div>
                        <div className="profile__blogs-item-author">
                          <span>
                            <User /> <span> Vika Petrova</span>
                          </span>
                        </div>
                        <div className="profile__blogs-item-write">
                          <span>
                            Время чтения: <span>10 min</span>
                          </span>
                        </div>
                      </div>
                    </div>
                    <button className="profile__blogs-item-btn button">
                      Удалить
                    </button>
                  </li>
                  <li className="profile__blogs-item">
                    <div className="profile__blogs-item-content">
                      <h4 className="profile__blogs-item-title">
                        Майстер-клас: 3 цікаві дитячі зачіски для короткого
                        волосся, які до снаги кожному!
                      </h4>
                      <div className="profile__blogs-item-meta">
                        <div className="profile__blogs-item-date">
                          <span>
                            <Date /> 21/12/2004
                          </span>
                        </div>
                        <div className="profile__blogs-item-author">
                          <span>
                            <User /> <span> Vika Petrova</span>
                          </span>
                        </div>
                        <div className="profile__blogs-item-write">
                          <span>
                            Время чтения: <span>10 min</span>
                          </span>
                        </div>
                      </div>
                    </div>
                    <button className="profile__blogs-item-btn button">
                      Удалить
                    </button>
                  </li>
                  <li className="profile__blogs-item">
                    <div className="profile__blogs-item-content">
                      <h4 className="profile__blogs-item-title">
                        Майстер-клас: 3 цікаві дитячі зачіски для короткого
                        волосся, які до снаги кожному!
                      </h4>
                      <div className="profile__blogs-item-meta">
                        <div className="profile__blogs-item-date">
                          <span>
                            <Date /> 21/12/2004
                          </span>
                        </div>
                        <div className="profile__blogs-item-author">
                          <span>
                            <User /> <span> Vika Petrova</span>
                          </span>
                        </div>
                        <div className="profile__blogs-item-write">
                          <span>
                            Время чтения: <span>10 min</span>
                          </span>
                        </div>
                      </div>
                    </div>
                    <button className="profile__blogs-item-btn button">
                      Удалить
                    </button>
                  </li>
                </ul>
              </div>
            </div>
            <div className="profile__blogs-social">
              <ul>
                <li>
                  <a href="/">
                    <Facebook />
                  </a>
                </li>
                <li>
                  <a href="/">
                    <Twitter />
                  </a>
                </li>
                <li>
                  <a href="/">
                    <In />
                  </a>
                </li>
                <li>
                  <a href="/">
                    <Vimeo />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
