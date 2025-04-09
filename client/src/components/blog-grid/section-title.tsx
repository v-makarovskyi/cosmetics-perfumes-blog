import React, { FC } from "react";

export const SectionTitile: FC = (): JSX.Element => {
  return (
    <section className="section-title-area">
      <div className="container">
        <div className="row">
          <div className="col-xl-8">
            <div className="section-title-area__wrapper">
              <p className="section-title-area__content">
                лучшие советы от комманды <br /> экспертов Ulta-blog
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
