import { component$ } from "@builder.io/qwik";
import { ElementsFeatureComponent } from "~/services";
import { getImageUrl } from "~/utils/conts";

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
                  alt={data.image?.data?.attributes?.name}
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
                  alt={data.image2?.data?.attributes?.name}
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

const RightImage = (props: { data: ElementsFeatureComponent }) => {
  const { data } = props;
  return (
    <div class="about-us__row about-us__about-us__row--mb-col-reverse about-us__row--mg-fill row about-us-mb-ss">
      <div class="about-us__col about-us__col--pd about-us__col--02">
        <article class="about-us__col-content imp-body-text">
          <h3 class="about-us-mb-center font-03 color-01">{data.name}</h3>
          <p>
            <span class="font-05-1 color-02">{data.subTitle}</span>
          </p>
          <div dangerouslySetInnerHTML={data.content}></div>
        </article>
      </div>
      <div class="about-us__col about-us__col--pd about-us__col--01">
        <div class="about-us__image-oval about-us__image-oval--01">
          <img
            alt={data.image?.data?.attributes?.name}
            class="img-fill bd-radius-tl-br-01 e-rte-image e-imginline"
            data-widget="image"
            src={getImageUrl(data.image?.data?.attributes)}
          />
        </div>
      </div>
    </div>
  );
};
const CenterImage = (props: { data: ElementsFeatureComponent }) => {
  const { data } = props;
  return (
    <div class="about-us__business-philosophy about-us-mb-ss">
      <div class="about-us__business-philosophy-content">
        <div class="imp-container-sm px-0">
          <h3 class="font-02 color-02 text-uppercase about-us-mb-center">
            {data.name}
          </h3>

          <h4 class="font-03 color-01 about-us-mb-center">{data.subTitle}</h4>

          <div
            class="font-01 color-05"
            dangerouslySetInnerHTML={data.content}
          ></div>
        </div>
      </div>

      <div class="about-us__business-philosophy-image">
        <picture>
          <span aria-label=" image widget" role="region" tabIndex={-1}>
            <img
              alt=""
              class="img-fill bd-radius-tr-bl-01 e-rte-image e-imginline"
              data-widget="image"
              src={getImageUrl(data.image?.data?.attributes)}
            />
            <span
              style="
              background: rgba(220, 220, 220, 0.5);
              background-image: url(/public/assets/plugins/custom/ckeditor/plugins/widget/images/handle.png);
              display: none;
            "
            >
              <img
                alt=""
                height="15"
                role="presentation"
                src="data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw=="
                title="Click and drag to move"
                width="15"
              />
            </span>
          </span>
        </picture>
      </div>
    </div>
  );
};

const LeftImage = (props: { data: ElementsFeatureComponent }) => {
  const { data } = props;
  return (
    <div class="about-us__row about-us__row--mg-fill row about-us-mb-ss">
      <div class="about-us__col about-us__col--pd about-us__col--01">
        <div class="about-us__image-oval about-us__image-oval--01">
          <img
            alt={data.image?.data?.attributes?.name}
            class="img-fill bd-radius-tr-bl-01 e-rte-image e-imginline"
            data-widget="image"
            src={getImageUrl(data.image?.data?.attributes)}
          />
        </div>
      </div>

      <div class="about-us__col about-us__col--pd about-us__col--02">
        <article class="about-us__col-content imp-body-text">
          <h3 class="about-us-mb-center font-03 color-01">{data.name}</h3>
          <p>
            <span class="font-05-1 color-02">{data.subTitle}</span>
          </p>
          <div dangerouslySetInnerHTML={data.content}></div>
        </article>
      </div>
    </div>
  );
};

export default component$((props: { data: ElementsFeatureComponent }) => {
  const { data } = props;
  if (data.image2 && data.name2) {
    return <TwoImage data={data} />;
  }
  if (data.imagePosition === "right") {
    return <RightImage data={data} />;
  }
  if (data.imagePosition === "left") {
    return <LeftImage data={data} />;
  }
  if (data.imagePosition === "center") {
    return <CenterImage data={data} />;
  }
  return <LeftImage data={data} />;
});
