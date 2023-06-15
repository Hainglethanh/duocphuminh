import {
  Resource,
  component$,
  useContext,
  useResource$,
  useSignal,
} from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { routeLoader$ } from "@builder.io/qwik-city";
import _ from "lodash";
import type { ThuocListResponseDataItem } from "~/services";
import { ThuocApi } from "~/services";
import {
  GlobalContext,
  ProductTypeContext,
  createMeta,
  generateAxiosConfig,
  getImageUrl,
} from "~/utils/conts";

export const useGetProduct = routeLoader$(async ({ params }) => {
  try {
    const slug = params["slug"];
    const response = await new ThuocApi().getThuocs(
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
    console.log("EEER", error);
  }
});
export const head: DocumentHead = ({ resolveValue }) => {
  const data = resolveValue(useGetProduct);
  const product = data ? data[0] : undefined;
  if (!product) {
    return {};
  }
  let productImage = product.attributes?.meta?.metaImage
    ? product.attributes?.meta?.metaImage.data
    : (product.attributes!.images?.data![0] as any);
  if (!productImage) {
    productImage = {
      attributes: {
        default: {
          formats: {
            default: {
              url: "/placeholder.png",
            },
          },
        },
      },
      with: 400,
      height: 400,
      name: "Công ty cổ phần dược phẩm Phú Minh",
    };
  }
  return {
    title: `${product.attributes?.name}`,
    links: [
      {
        rel: "stylesheet",
        href: "/public/css/parts/product43e1.css?v=1.17",
      },
    ],
    meta: [
      ...createMeta(
        product.attributes?.meta?.keywords,
        product.attributes?.name,
        getImageUrl(productImage!.attributes),
        "webp",
        {
          width: productImage!.attributes?.width || 960,
          height: productImage!.attributes?.height || 500,
        }
      ),
      {
        name: "description",
        content: `${product.attributes?.meta?.metaDescription}`,
      },
    ],
  };
};
export default component$(() => {
  const products = useGetProduct().value;
  const product = products && products[0];
  const globalData = useContext(GlobalContext);
  const tab = useSignal<"description" | "guide" | "indication">("description");
  const productTypes = useContext(ProductTypeContext);
  if (!product) {
    return null;
  }
  const productType = () =>
    productTypes.find(
      (x) =>
        product.attributes?.product_type?.data?.attributes?.slug ===
        x.attributes?.slug
    );

  const otherProducts = useResource$<ThuocListResponseDataItem[] | undefined>(
    async ({ track }) => {
      track(() => product); // Requires explicit tracking of inputs
      try {
        const response = await new ThuocApi().getThuocs(
          {
            populate: "deep,5",
            paginationPageSize: 2,
          },
          generateAxiosConfig({
            filters: {
              $and: [
                {
                  id: {
                    $ne: product.id,
                  },
                },
                {
                  product_type: {
                    id: {
                      $eq: product.attributes?.product_type?.data?.id,
                    },
                  },
                },
              ],
            },
          })
        );
        return response.data.data as ThuocListResponseDataItem[] | undefined;
      } catch (error) {
        console.log("@ASSDA", error);
      }
    }
  );
  return (
    <main>
      <div class="single-product-container">
        <div class="imp-container">
          <div class="imp-breadcrumb-container">
            <div class="imp-breadcrumb-wrap">
              <ul class="imp-breadcrumb">
                <li>
                  <a href="/">Trang chủ</a>
                </li>
                <span class="imp-breadcrumb-separator"></span>
                <li>
                  <a href="/dong-san-pham">Sản phẩm</a>
                </li>
                <span class="imp-breadcrumb-separator"></span>
                <li>
                  <a href={`/dong-san-pham/${productType()?.attributes?.slug}`}>
                    {productType()?.attributes?.name}
                  </a>
                </li>
                <span class="imp-breadcrumb-separator"></span>
                <li>
                  <a href={`/san-pham/${product.attributes?.slug}`}>
                    {product.attributes?.name}
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div class="single-product">
            <div class="single-product__row row">
              <div class="col-lg-5 col-12 mb-4">
                <div class="single-product__images">
                  <img
                    class="img-fill"
                    src={getImageUrl(
                      product.attributes?.images &&
                        product.attributes?.images.data &&
                        product.attributes?.images?.data[0]
                        ? product.attributes?.images?.data[0].attributes
                        : ""
                    )}
                    alt=""
                  />
                </div>
              </div>
              <div class="col-lg-7 col-12">
                <div class="single-product__detail">
                  <h2 class="single-product__name font-03">
                    {product.attributes?.name}
                  </h2>
                  <ul class="single-product__content-list">
                    <li class="single-product__cate">
                      <div class="row">
                        <div class="col-md-3 col-5">
                          <div class="single-product__content-label">
                            Thành phần
                          </div>
                        </div>
                        <div class="col-md-9 col-7">
                          <div class="single-product__content-desc">
                            <p>{product.attributes?.material}</p>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li class="single-product__cate">
                      <div class="row">
                        <div class="col-md-3 col-5">
                          <div class="single-product__content-label">
                            Công dụng
                          </div>
                        </div>
                        <div class="col-md-9 col-7">
                          <div class="single-product__content-desc">
                            <p>{product.attributes?.uses}</p>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li class="single-product__cate">
                      <div class="row">
                        <div class="col-md-3 col-5">
                          <div class="single-product__content-label">
                            Hình thức
                          </div>
                        </div>
                        <div class="col-md-9 col-7">
                          <div class="single-product__content-desc">
                            <a>{product.attributes?.form}</a>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li class="single-product__cate">
                      <div class="row">
                        <div class="col-md-3 col-5">
                          <div class="single-product__content-label">
                            Đóng gói
                          </div>
                        </div>
                        <div class="col-md-9 col-7">
                          <div class="single-product__content-desc">
                            <a>{product.attributes?.packing}</a>
                          </div>
                        </div>
                      </div>
                    </li>
                  </ul>
                  {!_.isEmpty(
                    product.attributes?.prescription?.data?.attributes
                  ) && (
                    <div class="single-product__note font-01-1">
                      Toa đính kèm:{" "}
                      {product.attributes?.prescription?.data?.attributes.name}
                    </div>
                  )}

                  <div class="single-product__attachment">
                    {!_.isEmpty(
                      product.attributes?.prescription?.data?.attributes
                    ) && (
                      <a
                        class="single-product__attachment-down imp-btn-01"
                        target="_blank"
                        href={
                          product.attributes?.prescription?.data?.attributes.url
                        }
                      >
                        <span class="icon-file-download" />
                        Tải về toa đính kèm
                      </a>
                    )}
                    <a
                      class="single-product__phone imp-btn-02"
                      href={`tel:${globalData.attributes?.hotline}`}
                    >
                      <span class="contact-icon contact-icon--phone" />
                      Hotline {globalData.attributes?.hotline}
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div class="single-product__tabs imp-tabs-container">
              <div class="imp-tabs-wrap imp-tabs-wrap--primary">
                <ul class="imp-tabs imp-tabs-nav">
                  <li class={tab.value === "description" ? "active" : ""}>
                    <a
                      onClick$={() => {
                        tab.value = "description";
                      }}
                      data-target="single-product-desc"
                    >
                      Mô tả
                    </a>
                  </li>
                  <li class={tab.value === "indication" ? "active" : ""}>
                    <a
                      onClick$={() => {
                        tab.value = "indication";
                      }}
                      data-target="single-product-assign"
                    >
                      Chỉ định
                    </a>
                  </li>
                  <li class={tab.value === "guide" ? "active" : ""}>
                    <a
                      onClick$={() => {
                        tab.value = "guide";
                      }}
                      data-target="single-product-guide"
                    >
                      Sử dụng
                    </a>
                  </li>
                </ul>
              </div>
              <div class="imp-tabs-content">
                <div
                  class={`imp-tabs-pane content_ckEdit ${
                    tab.value === "description" && "active"
                  }`}
                  id="single-product-desc"
                  dangerouslySetInnerHTML={product.attributes?.description}
                ></div>
                <div
                  class={`imp-tabs-pane content_ckEdit ${
                    tab.value === "indication" && "active"
                  }`}
                  id="single-product-assign"
                  dangerouslySetInnerHTML={product.attributes?.indication}
                ></div>
                <div
                  class={`imp-tabs-pane content_ckEdit ${
                    tab.value === "guide" && "active"
                  }`}
                  id="single-product-guide"
                  dangerouslySetInnerHTML={product.attributes?.guide}
                ></div>
              </div>
            </div>
          </div>
          <Resource
            value={otherProducts}
            onResolved={(data) => {
              if (_.isEmpty(data)) {
                return <></>;
              }
              return (
                <div class="product-wrap products-related">
                  <h3 class="products-related__title font-03 color-01 mb-4">
                    Sản phẩm liên quan
                  </h3>
                  <ul class="products">
                    {data?.map((x) => {
                      return (
                        <li key={x.id} class="product">
                          <a
                            class="product__link"
                            href={`/san-pham/${x.attributes?.slug}`}
                          >
                            <div class="product__image">
                              <img
                                class="img-fill"
                                src={getImageUrl(
                                  x.attributes?.images &&
                                    x.attributes?.images.data &&
                                    x.attributes?.images?.data[0]
                                    ? x.attributes?.images?.data[0].attributes
                                    : ""
                                )}
                                alt=""
                              />
                            </div>
                            <div class="product__content">
                              <h3 class="product__name font-05">
                                {x.attributes?.name}
                              </h3>
                              <div class="product__desc">
                                {x.attributes?.introduce}
                              </div>
                            </div>
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              );
            }}
          />
        </div>
      </div>
    </main>
  );
});
