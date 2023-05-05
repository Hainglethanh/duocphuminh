import { component$, useSignal } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { routeLoader$ } from "@builder.io/qwik-city";
import Feature from "~/components/feature/feature";
import { AboutUsApi } from "~/services";
import { getImageUrl } from "~/utils/conts";

export const useGetAboutUs = routeLoader$(async () => {
  try {
    const response = await new AboutUsApi().getAboutUs({
      populate: "deep,5",
    });
    return response.data;
  } catch (error) {
    console.log("EEER", error);
  }
});
export const head: DocumentHead = () => {
  return {
    title: `Về Dược Phú Minh`,
  };
};

export default component$(() => {
  const aboutUs = useGetAboutUs().value?.data;
  const subPages = aboutUs?.attributes?.subPages || [];
  const currentSubPage = useSignal(subPages[0]);
  return (
    <>
      <div class="hd-page">
        <div class="hd-page__wrap">
          <div class="hd-page__inner">
            <div class="hd-page__image">
              <img
                src={getImageUrl(aboutUs?.attributes?.banner?.data?.attributes)}
                alt={`${aboutUs?.attributes?.banner?.data?.attributes?.name}`}
              />
            </div>
            <div class="hd-page__content">
              <h1 class="hd-page__title text-uppercase font-02 color-white">
                Về dược phú minh
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
        </div>
      </main>
    </>
  );
});
