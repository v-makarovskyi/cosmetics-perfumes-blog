import React, { FC } from "react";
import logo from "../../images/logos/logo-2.png";
import appleStore from "../../images/appstore.png";
import googlePlay from "../../images/googleplay.png";
import { Facebook } from "../../svg/facebook";
import { Instagram } from "../../svg/instagram";
import { In } from "../../svg/in";
import { Twitter } from "../../svg/twitter";
import { Vimeo } from "../../svg/vimeo";

export const Footer: FC = (): JSX.Element => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__inner">
          <div className="row">
            <div className="col-md-12">
              <div className="footer__top">
                <a className="footer__logo logo" href="/">
                  <img
                    className="logo__image"
                    src={logo}
                    alt=""
                    width="500"
                    height="178"
                    loading="lazy"
                  />
                </a>
                <div className="footer__description">
                  <p>
                    Некоторые страницы моего блога о путешествиях содержат
                    партнерские ссылки. Всякий раз, когда вы покупаете что-то по
                    одной из этих ссылок, я получаю небольшую комиссию без
                    каких-либо дополнительных затрат с вашей стороны. Как
                    партнер, я рекомендую только те продукты и услуги, которые,
                    по моему мнению, являются высококачественными и полезными
                    для моих читателей. Спасибо за вашу поддержку.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="footer__body">
                <span className="footer__body-description">
                  Загрузить мобильльное приложение
                </span>
                <div className="footer__body-image-wrapper">
                  <img
                    className="footer__body-image"
                    src={googlePlay}
                    alt=""
                    width="412"
                    height="122"
                    loading="lazy"
                  />
                  <img
                    className="footer__body-image"
                    src={appleStore}
                    alt=""
                    width="389"
                    height="130"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="footer__body-widget">
                <h4 className="footer__body-widget-title">
                  Мы будем рады, если вы подпишитесь на наши соцсети
                </h4>
                <div className="footer__body-widget-social">
                  <a href="/">
                    <Facebook />
                  </a>
                  <a href="/">
                    <Instagram />
                  </a>
                  <a href="/">
                    <In />
                  </a>{" "}
                  <a href="/">
                    <Twitter />
                  </a>{" "}
                  <a href="/">
                    <Vimeo />
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="footer__extra">
            <div className="row">
              <div className="col-12 col-lg-6">
                <div className="footer__extra-copyright">
                  © 2025 | Все права защищены | makarovskyi.v@gmail.com ✅
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
