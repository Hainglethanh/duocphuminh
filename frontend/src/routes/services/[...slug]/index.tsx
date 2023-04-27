import { component$, useContext } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { routeLoader$ } from "@builder.io/qwik-city";
import FlowUs from "~/components/follow-us/flow-us";
import { ServiceApi } from "~/services";
import {
  ServiceContext,
  createMeta,
  generateAxiosConfig,
  getImageUrl,
} from "~/utils/conts";

export const useGetService = routeLoader$(async ({ params }) => {
  try {
    const slug = params["slug"];
    if (!slug) {
      return undefined;
    }
    const response = await new ServiceApi().getServices(
      {
        populate: "deep,5",
      },

      generateAxiosConfig({
        filters: {
          slug: {
            $eq: slug,
          },
        },
      })
    );
    return response.data.data;
  } catch (error) {
    console.log("SWASDSA", error);
  }
});

export const head: DocumentHead = ({ resolveValue }) => {
  const data = resolveValue(useGetService);
  const service = data ? data[0] : undefined;
  if (!service) {
    return {};
  }
  return {
    title: `SCS Solutions -  ${service.attributes?.name}`,
    meta: [
      ...createMeta(
        `SCS Solutions -  ${service.attributes?.name}`,
        `SCS Solutions -  ${service.attributes?.name}`,
        getImageUrl(service.attributes?.image?.data?.attributes),
        "webp",
        {
          width: service.attributes?.image?.data?.attributes?.width || 960,
          height: service.attributes?.image?.data?.attributes?.height || 500,
        }
      ),
      {
        name: "description",
        content: `${service.attributes?.description}`,
      },
    ],
  };
};

export default component$(() => {
  const services = useContext(ServiceContext);
  const response = useGetService().value;
  const service = response ? response[0] : services[0];
  if (!service) {
    return <></>;
  }

  return (
    <>
      <section
        class="page-title-section bg-img cover-background mx-lg-1-6 mx-xl-2-5 mx-xxl-2-9 left-overlay-dark"
        data-overlay-dark={8}
        data-background={getImageUrl(
          service.attributes?.image?.data?.attributes
        )}
      >
        <div class="container">
          <div class="row">
            <div class="col-md-12">
              <div class="position-relative">
                <h1>{service.attributes?.name}</h1>
              </div>
              <ul>
                <li>
                  <a href="/">Home</a>
                </li>
                <li>
                  <a href="#!">{service.attributes?.name}</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="line-animated">
          <span />
          <span />
          <span />
          <span />
          <span />
        </div>
      </section>
      <section>
        <div class="container">
          <div class="row">
            <div class="col-xl-4 order-2 order-xl-1">
              <div class="sidebar me-xxl-1-9">
                <div
                  class="widget bg-secondary mb-1-9 wow fadeIn"
                  data-wow-delay="200ms"
                >
                  <div class="widget-content">
                    <h5 class="mb-4 text-white">Our Services</h5>
                    <ul class="category-list list-unstyled mb-0">
                      {services.map((x) => {
                        return (
                          <li
                            class={x.id === service.id ? "active" : ""}
                            key={x.id}
                          >
                            <a href={`/services/${x.attributes?.slug}`}>
                              <span>{x.attributes?.name}</span>
                            </a>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
                <div
                  class="widget bg-secondary mb-1-9 wow fadeIn"
                  data-wow-delay="400ms"
                >
                  <div class="widget-content">
                    <h5 class="mb-4 text-white">Brochures</h5>
                    <p class="text-white mb-1-9">
                      Cras enim urna, interdum nec por ttitor vitae,
                      sollicitudin eu erosen. Praesent eget mollis nulla
                      sollicitudin.
                    </p>
                    <div class="btn-wrapper">
                      <a class="dow-btn" href="#!">
                        Download
                      </a>
                      <a class="butn-or d-none d-sm-block" href="#!">
                        Or
                      </a>
                      <a class="disc-btn" href="#!">
                        Discover
                      </a>
                    </div>
                  </div>
                </div>
                <div
                  class="widget bg-secondary wow fadeIn"
                  data-wow-delay="600ms"
                >
                  <FlowUs />
                </div>
              </div>
            </div>
            <div class="col-xl-8 mb-2-9 mb-xl-0 order-1 order-xl-2">
              <div class="wow fadeIn" data-wow-delay="200ms">
                <h1 class="mb-3 h1">{service.attributes?.name}</h1>
              </div>
              <article
                class="mb-1-9"
                dangerouslySetInnerHTML={service.attributes?.content}
              ></article>
              <div class="row wow fadeIn mt-4">
                {service.attributes?.features?.map((x) => {
                  return (
                    <div
                      key={x.id}
                      class="col-lg-6 wow fadeIn"
                      data-wow-delay="200ms"
                    >
                      <div class="d-flex mb-1-9">
                        <div class="flex-shrink-0">
                          <i class={`${x.icon} text-primary display-16`} />
                        </div>
                        <div class="flex-grow-1 ms-3">
                          <h4 class="h5">{x.name}</h4>
                          <p class="mb-0">{x.description}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
});
