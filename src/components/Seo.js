import * as React from 'react';

export const SEO = ({ title, description, children }) => {
  const defaultDescription = 'Building and maintaining the the Gatsby ecosystem together.';
  const defaultTitle = 'Gatsby User Collective';

  const mergedTitle =
    title && (Array.isArray(title) ? title.join(' | ') : `${defaultTitle} | ${title}`);

  const seo = {
    title: mergedTitle || defaultTitle,
    description: description || defaultDescription,
  };

  return (
    <>
      <title>{seo.title}</title>
      <meta name="description" content={seo.description} />
      {children}
    </>
  );
};

export default SEO;
