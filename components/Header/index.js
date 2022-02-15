import React from "react";
import Head from "next/head";

const Header = ({ title, description, url, image }) => {
  return (
    <Head>
      <title>{title}</title>

      {/* https://bit.ly/33eDkXA */}

      <meta property="og:title" content={title} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content="Hello World" />
      <meta property="og:description" content={description} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Head>
  );
};

export default Header;
