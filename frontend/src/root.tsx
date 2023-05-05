import { component$ } from "@builder.io/qwik";
import {
  QwikCityProvider,
  RouterOutlet,
  ServiceWorkerRegister,
} from "@builder.io/qwik-city";
import { RouterHead } from "./components/router-head/router-head";

import "./global.css";

export default component$(() => {
  /**
   * The root of a QwikCity site always start with the <QwikCityProvider> component,
   * immediately followed by the document's <head> and <body>.
   *
   * Dont remove the `<head>` and `<body>` elements.
   */

  return (
    <QwikCityProvider>
      <head>
        <meta charSet="utf-8" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="preload"
          as="font"
          crossOrigin="anonymous"
          type="font/otf"
          href="/public/css/fonts/GoogleSans/GoogleSans-Regular.otf"
        />
        <link
          rel="preload"
          as="font"
          crossOrigin="anonymous"
          type="font/otf"
          href="/public/css/fonts/GoogleSans/GoogleSans-Medium.otf"
        />
        <link rel="stylesheet" href="/public/css/reset43e1.css?v=1.17" />
        <link
          rel="stylesheet"
          href="/public/vendor/bootstrap/bootstrap.min.css"
        />
        <link
          rel="stylesheet"
          href="https://use.fontawesome.com/releases/v5.15.4/css/all.css"
          integrity="sha384-DyZ88mC6Up2uqS4h/KRgHuoeGwBcD4Ng9SiP4dIRy0EXTlnuz47vAwmeGwVChigm"
          crossOrigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="/public/vendor/fontawesome-5.15.3/css/all.min.css"
        />

        <link rel="stylesheet" href="/public/vendor/slick/slick.css" />
        <link rel="stylesheet" href="/public/vendor/slick/slick-theme.css" />
        <link
          rel="stylesheet"
          href="/public/vendor/jquery-ui/jquery-ui.min.css"
        />
        <link rel="stylesheet" href="/public/css/common43e1.css?v=1.17" />
        <link rel="stylesheet" href="/public/css/style43e1.css?v=1.17" />
        <link rel="stylesheet" href="/public/css/parts/home43e1.css?v=1.17" />
        <link rel="stylesheet" href="/public/css/custom43e1.css?v=1.17" />
        <link rel="stylesheet" href="/public/css/common43e1.css?v=1.17" />
        <link rel="stylesheet" href="/public/css/style43e1.css?v=1.17" />
        <link
          rel="stylesheet"
          href="/public/css/parts/about-us43e1.css?v=1.17"
        />
        <link rel="stylesheet" href="/public/css/parts/single43e1.css?v=1.17" />
        <RouterHead />
      </head>
      <body lang="vi">
        <RouterOutlet />
        <ServiceWorkerRegister />
        <div id="fb-root"></div>
        <div id="fb-customer-chat" class="fb-customerchat"></div>
      </body>
    </QwikCityProvider>
  );
});
