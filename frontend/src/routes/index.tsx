import type { ResourceReturn } from "@builder.io/qwik";
import { Resource, component$, useResource$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import type {
  BlogListResponse,
  ProductCategoryListResponse,
  ThuocListResponse,
} from "~/services";
import {
  BlogApi,
  HomePageApi,
  PartnerApi,
  ProductCategoryApi,
  ThuocApi,
} from "~/services";
import _ from "lodash";
import { generateAxiosConfig, getImageUrl } from "~/utils/conts";
import moment from "moment";
import Feature from "~/components/feature/feature";
export const useGetHomePage = routeLoader$(async () => {
  const response = await new HomePageApi().getHomePage({ populate: "deep,4" });
  return response.data;
});

export const useGetPartners = routeLoader$(async () => {
  const response = await new PartnerApi().getPartners({
    populate: "deep,4",
  });
  return response.data;
});
export const useGetBlogs = routeLoader$(async () => {
  const response = await new BlogApi().getBlogs({
    paginationPageSize: 12,
    populate: "deep,4",
    sort: "createdAt desc",
  });
  return response.data;
});
// export const useTestimonials = routeLoader$(async () => {
//   const response = await new TestimonialApi().getTestimonials({
//     populate: "deep,4",
//   });
//   return response.data;
// });

const FeaturedProduct = (props: {
  productResource: ResourceReturn<ThuocListResponse>;
}) => {
  const { productResource } = props;
  return (
    <Resource
      value={productResource}
      onResolved={(products) => {
        return (
          <section class="hm-product imp-mb-01">
            <div class="imp-container">
              <div class="hm-product__wrap">
                <div class="hm-product__header text-center pt-4">
                  <h3 class="hm-product__title font-02 color-02 text-uppercase imp-mb-0">
                    Sản phẩm nổi bật
                  </h3>
                </div>
                <div class="hm-product__list slider-01">
                  {products.data?.map((x) => {
                    return (
                      <div key={x.id} class="hm-product__item">
                        <div class="hm-product__row align-items-center">
                          <div class="hm-product__col hm-product__col--left">
                            <div class="hm-product__content">
                              <h3 class="hm-product__content-title hm-product__content-title--pc font-02 color-02 text-uppercase line-height-03 imp-mb-0">
                                Sản phẩm nổi bật
                              </h3>
                              <h4 class="hm-product__content-subtitle hm-product__content-subtitle--pc font-03 color-01 line-height-04">
                                {x.attributes?.name}
                              </h4>
                              <div class="hm-product__content-desc font-01">
                                {_.truncate(x.attributes?.introduce, {
                                  length: 100,
                                })}
                              </div>
                              <a
                                href={`/san-pham/${x.attributes?.slug}`}
                                class="imp-btn-01 font-01"
                              >
                                Chi tiết
                              </a>
                            </div>
                          </div>
                          <div class="hm-product__col hm-product__col--right">
                            <a href={`/san-pham/${x.attributes?.slug}`}>
                              <div class="hm-product__img-wrap bd-radius-tr-bl-02">
                                <img
                                  class="w-100"
                                  src={getImageUrl(
                                    x.attributes?.images &&
                                      x.attributes?.images.data &&
                                      x.attributes?.images?.data[0]
                                      ? x.attributes?.images?.data[0].attributes
                                      : ""
                                  )}
                                  alt={x.attributes?.name}
                                />
                                <h4 class="hm-product__content-title hm-product__content-title--mb font-03 color-01 py-4 text-center">
                                  {x.attributes?.name}
                                </h4>
                              </div>
                            </a>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </section>
        );
      }}
    />
  );
};

const ProductCategory = (props: {
  categoriesResource: ResourceReturn<ProductCategoryListResponse>;
}) => {
  const { categoriesResource } = props;
  return (
    <Resource
      value={categoriesResource}
      onResolved={(categories) => {
        return (
          <section class="hm-type-product imp-mb-01">
            <div class="imp-container">
              <div class="hm-type-product__wrap">
                <div class="hm-type-product__bg" />
                <div class="hm-type-product__header d-flex flex-wrap align-items-center justify-content-between">
                  <h2 class="font-02 color-02 text-uppercase line-height-03 imp-mb-0">
                    Các dòng sản phẩm
                  </h2>
                  <a
                    href="/dong-san-pham"
                    class="hm-type-product__btn-seemore hm-btn-seemore--pc imp-btn-01"
                  >
                    Xem tất cả
                    <i class="far fa-arrow-right" />
                  </a>
                </div>
                <div class="hm-type-product__categories">
                  {categories.data?.map((x, index) => {
                    return (
                      <div
                        key={x.id}
                        class={`hm-type-product__cate hm-type-product__cate--${
                          index + 1
                        }`}
                      >
                        <a
                          href={`/dong-san-pham/${x.attributes?.slug}`}
                          class="hm-type-product__cate-link text-center"
                        >
                          <div class="hm-type-product__cate-icon mb-3">
                            <img
                              class="w-100"
                              src={getImageUrl(
                                x.attributes?.icon?.data?.attributes
                              )}
                              alt={`icon ${x.attributes?.name}`}
                            />
                          </div>
                          {index === 0 ? (
                            <h3 class="hm-type-product__cate-name font-04 color-white imp-mb-0">
                              {x.attributes?.name}
                            </h3>
                          ) : (
                            <h3 class="hm-type-product__cate-name font-07 color-white imp-mb-0">
                              {x.attributes?.name}
                            </h3>
                          )}
                        </a>
                      </div>
                    );
                  })}
                </div>
                {/* <div class="text-center">
                  <a
                    href="san-pham.html"
                    class="hm-type-product__btn-seemore hm-btn-seemore--mb imp-btn-01"
                  >
                    Xem tất cả
                    <i class="far fa-arrow-right" />
                  </a>
                </div> */}
              </div>
            </div>
          </section>
        );
      }}
    />
  );
};

const Blogs = (props: { blogs: BlogListResponse }) => {
  const { blogs } = props;
  return (
    <section class="hm-news imp-mb-01">
      <div class="imp-container">
        <div class="hm-news__wrap">
          <div class="hm-ss-header hm-news__header d-flex flex-wrap align-items-center justify-content-between">
            <h3 class="font-02 text-uppercase imp-mb-0">
              <span class="color-02">Bản tin</span>
            </h3>
            <a href="/tin-tuc" class="imp-btn-01 hm-btn-seemore--pc">
              Xem tất cả
              <i class="far fa-arrow-right" />
            </a>
          </div>
          <div class="hm-news__list slider-02">
            {blogs.data?.map((x) => {
              return (
                <div key={x.id} class="hm-news__item">
                  <a
                    href={`/tin-tuc/${x.attributes?.slug}`}
                    class="hm-news__item-link"
                  >
                    <div class="hm-news__img mb-3 img-news">
                      <img
                        class="w-100 bd-radius-01"
                        src={getImageUrl(
                          x.attributes?.thumbnail?.data?.attributes
                        )}
                        alt=""
                      />
                    </div>
                    <h4 class="font-05 color-black imp-mb-0">
                      {x.attributes?.title}
                    </h4>
                    <div class="hm-news__item-date font-01-1 color-04">
                      {moment(x.attributes?.createdAt).format("ll")}
                    </div>
                  </a>
                </div>
              );
            })}
          </div>
          <div class="text-center hm-btn-seemore--mb">
            <a href="/tin-tuc" class="imp-btn-01">
              Xem tất cả
              <i class="far fa-arrow-right" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default component$(() => {
  const data = useGetHomePage().value.data;
  const blogs = useGetBlogs();
  const partners = useGetPartners();
  const categoriesResource = useResource$(async () => {
    const response = await new ProductCategoryApi().getProductCategories({
      paginationPageSize: 9,
      populate: "deep,4",
    });
    return response.data;
  });
  const productResource = useResource$(async () => {
    const response = await new ThuocApi().getThuocs(
      {
        paginationPageSize: 6,
        populate: "deep,4",
      },
      generateAxiosConfig({
        filters: {
          isHot: {
            $eq: true,
          },
        },
      })
    );
    return response.data;
  });
  return (
    <>
      <main>
        {data && (
          <section class="hm-intro imp-mb-01">
            <div class="imp-container-large">
              <div class="hm-product__list slider-01">
                {data.attributes?.heroBanner?.map((x) => {
                  return (
                    <div key={x.id} class="hm-product__item">
                      <div class="hm-intro__row">
                        <div class="hm-intro__col hm-intro__col--left">
                          <div class="hm-intro__inner">
                            <h3 class="hm-intro__inner-title-sm font-02 color-02 text-uppercase">
                              {x.subTitle}
                            </h3>
                            <h2 class="hm-intro__inner-title-lg font-06 color-01 text-uppercase">
                              {x.title}
                            </h2>
                            <div class="hm-intro__content font-01 color-05">
                              {x.description}
                            </div>
                            <div class="color-white">
                              <a
                                class="imp-btn-01"
                                href={x.button?.url || "/ve-duoc-phu-minh/"}
                              >
                                {x.button?.title || "Tìm hiểu thêm"}
                                <i class="far fa-arrow-right">&nbsp;</i>
                              </a>
                            </div>
                          </div>
                        </div>
                        <div class="hm-intro__col hm-intro__col--right">
                          <div class="hm-intro__image">
                            <picture>
                              <img
                                alt={x.picture?.data?.attributes?.name}
                                class="w-100 bd-radius-tr-bl-04 e-rte-image e-imginline"
                                src={getImageUrl(x.picture?.data?.attributes)}
                              />{" "}
                            </picture>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        )}
        <section class="hm-mission-vision">
          <div class="imp-container">
            {data?.attributes?.features &&
              data.attributes.features.map((x) => {
                return <Feature key={x.id} data={x} />;
              })}
          </div>
        </section>

        <ProductCategory categoriesResource={categoriesResource} />
        <FeaturedProduct productResource={productResource} />
        <Blogs blogs={blogs.value} />
        <section class="hm-partner imp-mb-01">
          <div class="imp-container">
            <div class="hm-partner__header">
              <h3 class="hm-partner__header-title font-02 color-02 text-uppercase imp-mb-0">
                Đối tác
              </h3>
            </div>
            <div class="hm-partner__list slider-03">
              {partners.value.data?.map((x) => {
                return (
                  <div key={x.id} class="hm-partner__item">
                    <a
                      href={
                        !_.isEmpty(x.attributes?.url) ? x.attributes?.url : "#"
                      }
                    >
                      <div class="hm-partner__item-logo">
                        <img
                          class="w-100"
                          src={getImageUrl(
                            x.attributes?.logo?.data?.attributes
                          )}
                          alt={x.attributes?.name}
                        />
                      </div>
                    </a>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </main>
    </>
  );
});
