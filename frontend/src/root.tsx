import { component$, useSignal, useVisibleTask$ } from "@builder.io/qwik";
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
  const ready = useSignal(false);
  useVisibleTask$(() => {
    ready.value = true;
  });
  return (
    <QwikCityProvider>
      <head>
        <meta charSet="utf-8" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/favicon.ico" />
        <link href="https://fonts.cdnfonts.com/css/georgia" rel="stylesheet" />
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

        <RouterHead />
      </head>
      <body lang="vi">
        <RouterOutlet />
        <ServiceWorkerRegister />
      </body>
    </QwikCityProvider>
  );
});
