import React from 'react';
import Head from "next/head";

function HtmlPageHead({title, metaName, metaContent, linkHref, linkRel}) {
    return (
        <Head>
            <title>{title}</title>
            <meta name={metaName}
                  content={metaContent}
            />
            <link
                rel={linkRel}
                href={linkHref}
            />
        </Head>
    );
}

export default HtmlPageHead;