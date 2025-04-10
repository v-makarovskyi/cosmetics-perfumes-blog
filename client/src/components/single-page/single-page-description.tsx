import React, { FC } from "react";

type SinglePageDescriptionProps = {
    textData: string;
    author?: string
}

export const SinglePageDescription: FC<SinglePageDescriptionProps> = ({ textData, author }): JSX.Element => {
    const formattedTextForPage = textData.split('$$')
    console.log(formattedTextForPage);

    return (
        <div className="single-page__description">
            <p>{formattedTextForPage[0]}</p>
            <p>{formattedTextForPage[1]}</p>
            <h3>{formattedTextForPage[2]}</h3>
            <p>{formattedTextForPage[3]}</p>
            <blockquote>
                <p>{formattedTextForPage[4]}</p>
                <cite>{author}</cite>
            </blockquote>
            <p>{formattedTextForPage[5]}</p>
        </div>
    )
}