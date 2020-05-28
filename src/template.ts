import {GA_MEASUREMENT_ID} from './constants';

export default `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="description" content="It is an application that you to easily draw tree diagrams etc. using a browser." />
  <meta property="og:url" content="https://shape-painter.numb86.net/">
  <meta property="og:title" content="Shape Painter">
  <meta property="og:description" content="It is an application that you to easily draw tree diagrams etc. using a browser.">
  <meta name="twitter:card" content="summary">
  <meta name="twitter:site" content="@numb_86">
  <link rel="icon" href="/images/favicon.ico">
  <title>Shape Painter</title>
  <meta name="google-site-verification" content="G1WsDlnknnX4m_GmT2cAyQE5yTLHjig50caVpOrq08E" />
</head>
<body>
${
  process.env.NODE_ENV === 'production'
    ? `${
        '<!-- Global site tag (gtag.js) - Google Analytics -->\n' +
        '<script async src="https://www.googletagmanager.com/gtag/js?id='
      }${GA_MEASUREMENT_ID}"></script>\n` +
      `<script>\n` +
      `window.dataLayer = window.dataLayer || [];\n` +
      `function gtag(){dataLayer.push(arguments);}\n` +
      `gtag('js', new Date());\n` +
      `</script>`
    : ''
}
  <div id="app"></div>
</body>
</html>
`;
