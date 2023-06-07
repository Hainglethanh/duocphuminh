import { component$ } from "@builder.io/qwik";
import { useDocumentHead, useLocation } from "@builder.io/qwik-city";
import _ from "lodash";

/**
 * The RouterHead component is placed inside of the document `<head>` element.
 */
export const RouterHead = component$(() => {
  const head = useDocumentHead();
  const loc = useLocation();
  const meta = _.uniqBy(head.meta, (x) => `${x.name}_${x.property}`);
  return (
    <>
      <title>{head.title || "Dược Phú Minh - Giải pháp y tế hàng đầu cho người tiêu dùng"}</title>
      <meta property="og:site_name" content="Dược Phú Minh" />
      <link rel="canonical" href={loc.url.href.replace("http:", "https:")} />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta property="og:title" content="Công ty cổ phần Dược Phú Minh" />
      <meta property="og:url" content={loc.url.href.replace("http:", "https:")} />
      {meta.map((m) => (
        <meta key={m.key} {...m} />
      ))}

      {head.links.map((l) => (
        <link key={l.key} {...l} />
      ))}

      {head.styles.map((s) => (
        <style key={s.key} {...s.props} dangerouslySetInnerHTML={s.style} />
      ))}
    </>
  );
});
