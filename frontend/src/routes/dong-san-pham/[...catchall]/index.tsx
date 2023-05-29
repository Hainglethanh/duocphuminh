import { component$, useContext } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { routeLoader$, useLocation } from "@builder.io/qwik-city";
import _ from "lodash";
import { ProductCategoryApi, ThuocApi } from "~/services";
import {
  ProductTypeContext,
  generateAxiosConfig,
  getImageUrl,
} from "~/utils/conts";

export const useGetCategory = routeLoader$(async ({ params }) => {
  const slug = params["catchall"];
  if (_.isEmpty(slug)) {
    return undefined;
  }
  const response = await new ProductCategoryApi().getProductCategories(
    {
      populate: "deep,5",
      paginationPageSize: 1,
    },
    generateAxiosConfig({
      slug: {
        $eq: slug,
      },
    })
  );
  return response.data;
});

export const useGetProductList = routeLoader$(async ({ url, params }) => {
  try {
    const searchParams = url.searchParams;
    const slug = params["catchall"];
    const hasSlug = slug !== "" && !_.isEmpty(slug);
    const page = searchParams.get("page") || `1`;
    const search = searchParams.get("s");
    let filters: any = {};
    if (hasSlug) {
      filters = {
        ...filters,
        product_type: hasSlug && {
          slug: {
            $eq: slug,
          },
        },
      };
    }
    if (search) {
      filters = {
        ...filters,
        name: search && {
          $contains: search,
        },
      };
    }
    const response = await new ThuocApi().getThuocs(
      {
        populate: "deep,5",
        paginationPageSize: 12,
        paginationPage: parseInt(page),
      },
      generateAxiosConfig({
        filters,
      })
    );
    return response.data;
  } catch (error) {
    console.log("err", error);
  }
});

export const head: DocumentHead = ({ resolveValue }) => {
  const data = resolveValue(useGetCategory);
  if (data && data.data && data.data[0]) {
    const category = data.data[0];
    return {
      title: category.attributes?.meta?.metaTitle,
      meta: [
        {
          name: "keywords",
          content: category.attributes?.meta?.keywords,
        },
        {
          name: "description",
          content: category.attributes?.meta?.metaDescription,
        },
      ],
      links: [
        {
          rel: "stylesheet",
          href: "/public/css/parts/product43e1.css?v=1.17",
        },
      ],
    };
  }
  return {
    title: `Dòng sản phẩm quốc tế Dược Phú Minh`,
    meta: [
      {
        name: "keywords",
        content:
          "Dược Phú Minh, sản phẩm Dược Phú Minh, Phú Minh, Dược phẩm Phú Minh, dòng sản phẩm Phú Minh",
      },
      {
        name: "description",
        content:
          "Tổng hợp các sản phẩm chính hãng, tốt nhất về thuốc bổ mắt, tim mạch, tăng đề kháng, ăn ngon cho bé, kháng dị ứng,... Của dược phẩm quốc tế Phú Minh",
      },
    ],
    links: [
      {
        rel: "stylesheet",
        href: "/public/css/parts/product43e1.css?v=1.17",
      },
    ],
  };
};

export default component$(() => {
  const products = useGetProductList().value?.data;
  const meta = useGetProductList().value?.meta;
  const currentSearch = useLocation().url.searchParams.get("s");
  const currentCategory = useLocation().url.searchParams.get("type");
  const currentPage = useLocation().url.searchParams.get("page") || `1`;
  const productTypes = useContext(ProductTypeContext);
  const goToPage = (page: number) =>
    `/dong-san-pham/?page=${page}${
      !_.isEmpty(currentCategory) ? "&type=" + currentCategory : ""
    }${!_.isEmpty(currentSearch) ? "&s=" + currentSearch : ""}`;

  const getCurrentProductType = () =>
    productTypes.find((x) => x.attributes?.slug === currentCategory);
  return (
    <div class="w-100">
      <div class="hd-page">
        <div class="hd-page__wrap">
          <div class="hd-page__inner">
            <div class="hd-page__image">
              <img
                src="/uploads/4b6125ce-9f54-43cb-80d4-886d75b565d1.png"
                alt=""
              />
            </div>
            <div class="hd-page__content">
              <h1 class="hd-page__title text-uppercase font-02 color-white">
                S&#x1EA3;n ph&#x1EA9;m
              </h1>
              <form class="hd-navbar-form" method="get" action="/dong-san-pham">
                <button type="submit">
                  <i class="far fa-search"></i>
                </button>
                <input
                  type="text"
                  required
                  name="s"
                  placeholder="Nhập tên sản phẩm bạn muốn tìm"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
      <main>
        <div class="product-container">
          <div class="imp-container">
            <div
              id="dong-san-pham"
              class="product__header text-center pd-hd-01"
            >
              <h3 class="font-02 color-02 text-uppercase">Các dòng sản phẩm</h3>
            </div>
            <div class="product-categories-wrap product-categories-wrap--pc">
              <ul class="product-categories product-category-page">
                {productTypes.map((x) => {
                  return (
                    <li key={x.id} class="product-cate active ">
                      <a
                        href={`/dong-san-pham/${x.attributes?.slug}`}
                        class="product-cate__link"
                      >
                        <div class="product-cate__icon">
                          <img
                            class="w-100"
                            src={getImageUrl(
                              x.attributes?.icon?.data?.attributes
                            )}
                            alt={x.attributes?.name}
                          />
                        </div>
                        <h3 class="product-cate__name font-07 color-white">
                          {x.attributes?.name}
                        </h3>
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
            {currentSearch && (
              <div
                class="product__header text-center pd-hd-01"
                id="danh-sach-san-pham"
              >
                <h3 class="font-02 color-02 text-uppercase">
                  Kết quả tìm kiếm: {decodeURI(currentSearch)}
                </h3>
              </div>
            )}
            {currentCategory && (
              <div
                class="product__header text-center pd-hd-01"
                id="danh-sach-san-pham"
              >
                <h3 class="font-02 color-02 text-uppercase">
                  {getCurrentProductType()?.attributes?.name}
                </h3>
              </div>
            )}
            <div>
              <div class="product-wrap">
                <ul class="products">
                  {products?.map((x) => {
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
                              alt={x.attributes?.name}
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
              <div class="&#x70;&#x61;&#x67;&#x69;&#x6E;&#x61;&#x74;&#x69;&#x6F;&#x6E;&#x2D;&#x63;&#x6F;&#x6E;&#x74;&#x61;&#x69;&#x6E;&#x65;&#x72;">
                <ul class="&#x69;&#x6D;&#x70;&#x2D;&#x70;&#x61;&#x67;&#x69;&#x6E;&#x61;&#x74;&#x69;&#x6F;&#x6E;">
                  {parseInt(currentPage || "1") > 1 && (
                    <li class="&#x50;&#x61;&#x67;&#x65;&#x64;&#x4C;&#x69;&#x73;&#x74;&#x2D;&#x73;&#x6B;&#x69;&#x70;&#x54;&#x6F;&#x50;&#x72;&#x65;&#x76;&#x69;&#x6F;&#x75;&#x73;&#x20;&#x64;&#x69;&#x73;&#x61;&#x62;&#x6C;&#x65;&#x64;&#x20;&#x69;&#x6D;&#x70;&#x2D;&#x70;&#x61;&#x67;&#x69;&#x6E;&#x61;&#x74;&#x69;&#x6F;&#x6E;&#x5F;&#x5F;&#x70;&#x72;&#x65;&#x76;&#x20;">
                      <a
                        href={goToPage(parseInt(currentPage || "1") - 1)}
                        rel="&#x70;&#x72;&#x65;&#x76;"
                      >
                        <i class="fal fa-chevron-left"></i>
                      </a>
                    </li>
                  )}
                  {_.range(1, (meta?.pagination?.pageCount || 1) + 1).map(
                    (x) => {
                      return (
                        <li
                          key={x}
                          class={
                            currentPage === `${x}`
                              ? "imp-pagination__current"
                              : ""
                          }
                        >
                          <a href={goToPage(x)}>{x}</a>
                        </li>
                      );
                    }
                  )}
                  {parseInt(currentPage || "1") <
                    (meta?.pagination?.pageCount || 1) && (
                    <li class="&#x50;&#x61;&#x67;&#x65;&#x64;&#x4C;&#x69;&#x73;&#x74;&#x2D;&#x73;&#x6B;&#x69;&#x70;&#x54;&#x6F;&#x4E;&#x65;&#x78;&#x74;&#x20;&#x69;&#x6D;&#x70;&#x2D;&#x70;&#x61;&#x67;&#x69;&#x6E;&#x61;&#x74;&#x69;&#x6F;&#x6E;&#x5F;&#x5F;&#x6E;&#x65;&#x78;&#x74;&#x20;">
                      <a
                        href={goToPage(parseInt(currentPage || "1") + 1)}
                        rel="&#x6E;&#x65;&#x78;&#x74;"
                      >
                        <i class="fal fa-chevron-right"></i>
                      </a>
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
});
