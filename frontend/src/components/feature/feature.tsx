import { component$, useContext } from "@builder.io/qwik";
import { ElementsFeatureComponent } from "~/services";
import { GlobalContext, getImageUrl } from "~/utils/conts";

const TwoImage = (props: { data: ElementsFeatureComponent }) => {
  const { data } = props;
  return (
    <section class="hm-mission-vision">
      <div class="imp-container">
        <div class="d-flex flex-wrap hm-mission-vision__row">
          <div class="hm-mission-vision__col hm-mission-vision__col--left">
            <div class="hm-mission-vision__item">
              <div class="hm-mission-vision__img hm-mission-vision__img--mission">
                <img
                  alt={data.image?.data?.attributes?.caption}
                  class="w-100 bd-radius-tr-bl-01 e-rte-image e-imginline"
                  data-widget="image"
                  src={getImageUrl(data.image?.data?.attributes)}
                />
              </div>
              <div class="hm-mission-vision__content-inner">
                <h3 class="hm-mission-vision__title hm-mission-vision__title--mission font-02 color-02 text-uppercase line-height-03 imp-mb-0">
                  {data.name}
                </h3>
                <h4 class="hm-mission-vision__subtitle hm-mission-vision__subtitle--mission-pc font-03 color-01 line-height-04">
                  {data.subTitle}
                </h4>

                <div
                  class="hm-mission-vision__item-desc font-01"
                  dangerouslySetInnerHTML={`${data.content}`}
                ></div>
              </div>
            </div>
          </div>
          <div class="hm-mission-vision__col hm-mission-vision__col--right">
            <div class="hm-mission-vision__item mt-3">
              <div class="hm-mission-vision__content-inner">
                <h3 class="hm-mission-vision__title hm-mission-vision__title--vision font-02 color-02 text-uppercase line-height-03 imp-mb-0">
                  {data.name2}
                </h3>
                <h4 class="hm-mission-vision__subtitle hm-mission-vision__subtitle--vision font-03 color-01 line-height-04">
                  {data.subTitle2}
                </h4>
                <div
                  class="hm-mission-vision__item-desc font-01"
                  dangerouslySetInnerHTML={`${data.content2}`}
                ></div>
              </div>
              <div class="hm-mission-vision__img mb-3">
                <img
                  alt={data.image2?.data?.attributes?.caption}
                  class="w-100 bd-radius-tl-br-01 e-rte-image e-imginline"
                  data-widget="image"
                  src={getImageUrl(data.image2?.data?.attributes)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default component$((props: { data: ElementsFeatureComponent }) => {
  const { data } = props;
  if (data.image2 && data.name2) {
    return <TwoImage data={data} />;
  }
  return (
    <div class="widget bg-secondary wow fadeInUp" data-wow-delay="800ms"></div>
  );
});
