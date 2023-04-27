import { component$ } from "@builder.io/qwik";
import _ from "lodash";
import type { HomePageLocalizationResponseFeaturedServicesDataInner } from "~/services";
import { getImageUrl } from "~/utils/conts";

export default component$(
  (props: {
    service: HomePageLocalizationResponseFeaturedServicesDataInner;
  }) => {
    const x = props.service;
    return (
      <div class="col-md-6 mt-1-9 wow fadeIn" data-wow-delay="200ms">
        <div class="card card-style01 border-0 rounded-0">
          <img
            src={getImageUrl(x.attributes?.image?.data?.attributes)}
            alt={x.attributes?.name}
          />
          <div class="title">
            <div class="d-flex align-items-center">
              <img src="/assets/img/icons/09.png" alt="..." />
              <h4 class="h5 mb-0 ms-3">
                <a href={`/services/${x.attributes?.slug}`}>
                  {x.attributes?.name}
                </a>
              </h4>
            </div>
            <a href={`/services/${x.attributes?.slug}`}>
              <i class="fas fa-arrow-right" />
            </a>
          </div>
          <div class="overlay text-center">
            <div>
              <img
                src={getImageUrl(x.attributes?.icon?.data?.attributes)}
                class="mb-3"
                alt={x.attributes?.name}
              />
              <h3 class="text-white h4 mb-3">
                <a
                  href={`/services/${x.attributes?.slug}`}
                  class="text-white text-primary-hover"
                >
                  {x.attributes?.name}
                </a>
              </h3>
              <p class="mb-0 text-white">
                {_.truncate(x.attributes?.description, { length: 70 })}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
);
