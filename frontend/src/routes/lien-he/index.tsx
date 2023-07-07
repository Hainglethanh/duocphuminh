import { component$, useSignal } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { routeLoader$ } from "@builder.io/qwik-city";
import Feature from "~/components/feature/feature";
import { ContactApi } from "~/services";
import { createMeta, getImageUrl } from "~/utils/conts";

export const useGetContact = routeLoader$(async () => {
  try {
    const response = await new ContactApi().getContact({
      populate: "deep,5",
    });
    return response.data;
  } catch (error) {
    console.log("EEER", error);
  }
});
export const head: DocumentHead = ({ resolveValue }) => {
  const data = resolveValue(useGetContact)?.data;
  const image = data?.attributes?.meta?.metaImage?.data;
  return {
    title:
      data?.attributes?.meta?.metaTitle ||
      `Liên hệ Dược Phú Minh - Công ty Dược phẩm quốc tế Phú Minh`,
    meta: [
      ...createMeta(
        data?.attributes?.meta?.keywords,
        "Liên hệ Dược Phú Minh",
        getImageUrl(image?.attributes),
        "webp",
        {
          width: image?.attributes?.width || 960,
          height: image?.attributes?.height || 500,
        }
      ),
      {
        name: "description",
        content: `${data?.attributes?.meta?.metaDescription}`,
      },
    ],
    links: [
      {
        rel: "stylesheet",
        href: "/public/css/parts/about-us43e1.css?v=1.17",
      },
    ],
  };
};

export default component$(() => {
  const contact = useGetContact().value?.data;
  const subPages = contact?.attributes?.subPages || [];
  const currentSubPage = useSignal(subPages[0]);
  return (
    <>
      <div class="hd-page">
        <div class="hd-page__wrap">
          <div class="hd-page__inner">
            <div class="hd-page__image">
              <img
                src={getImageUrl(contact?.attributes?.banner?.data?.attributes)}
                alt={`${contact?.attributes?.banner?.data?.attributes?.name}`}
              />
            </div>
            <div class="hd-page__content">
              <h1 class="hd-page__title text-uppercase font-02 color-white">
                Liên hệ
              </h1>
            </div>
          </div>
        </div>
      </div>
      <main>
        <div class="about-us">
          <div class="about-us__tabs">
            <div class="imp-tabs-container">
              <span class="imp-tabs-blur"></span>
              <div class="imp-tabs-wrap imp-tabs-wrap--primary">
                <ul class="imp-tabs imp-tabs-02 imp-tabs-nav">
                  {subPages.map((x) => {
                    return (
                      <li
                        key={x.id}
                        class={x.id === currentSubPage.value.id ? "active" : ""}
                      >
                        <a
                          onClick$={() => {
                            currentSubPage.value = x;
                          }}
                        >
                          {x.name}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
          {currentSubPage.value && (
            <div class="imp-container">
              <div class="about-us__tabs-content imp-tabs-content">
                <div
                  class="about-us__pane imp-tabs-pane active"
                  id="about-us-overview"
                >
                  {currentSubPage.value.features?.map((x) => {
                    return <Feature key={x.id} data={x} />;
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  );
});
