import { Author } from "@client_types/clientTypes";
import React, { FC } from "react";

type SinglePageDescriptionProps = {
  textData: string | undefined;
  author?: Author;
};

export const SinglePageDescription: FC<SinglePageDescriptionProps> = ({
  textData,
  author,
}): JSX.Element => {
  const formattedTextForPage = textData ? textData.split("$$") : undefined

  return (
    <div className="single-page__description">
      {textData ? (
        <>
          <p>{formattedTextForPage && formattedTextForPage[0]}</p>
          <p>{formattedTextForPage && formattedTextForPage[1]}</p>
          <h3>{formattedTextForPage && formattedTextForPage[2]}</h3>
          <p>{formattedTextForPage && formattedTextForPage[3]}</p>
          <blockquote>
            <p>{formattedTextForPage && formattedTextForPage[4]}</p>
            <cite>
              {author ? author?.first_name : ''} {author ? author?.last_name : ''}
            </cite>
          </blockquote>
          <p>{formattedTextForPage && formattedTextForPage[5]}</p>
        </>
      ) : (
        <p style={{color:'red'}}>описание не предоставлено</p>
      )}
    </div>
  );
};
