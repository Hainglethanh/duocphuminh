import { component$, useContext } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { routeLoader$, useLocation } from "@builder.io/qwik-city";
import _ from "lodash";
import moment from "moment";
import { BlogApi, BlogTypeApi } from "~/services";
import {
  BlogTypeContext,
  generateAxiosConfig,
  getImageUrl,
  goToCategory,
} from "~/utils/conts";

export const useGetBlogType = routeLoader$(async ({ params }) => {
  let slug = params["slug"];
  const hasSlug = !_.isEmpty(slug);

  if (!hasSlug) {
    const blogTypes = await new BlogTypeApi().getBlogTypes({
      populate: "*",
      paginationPageSize: 1,
    });
    slug = `${blogTypes.data.data![0].attributes?.slug}`;
  }

  const response = await new BlogTypeApi().getBlogTypes(
    {
      populate: "deep,5",
      paginationPageSize: 1,
    },
    generateAxiosConfig({
      filters: {
        slug: {
          $eq: slug,
        },
      },
    })
  );
  return response.data;
});

export const useGetBlogList = routeLoader$(async ({ url, params }) => {
  try {
    const searchParams = url.searchParams;
    let slug = params["slug"];
    const hasSlug = !_.isEmpty(slug);
    const page = searchParams.get("page") || `1`;
    const search = searchParams.get("s");
    if (!hasSlug) {
      const blogTypes = await new BlogTypeApi().getBlogTypes({
        populate: "*",
        paginationPageSize: 1,
        sort: "createdAt:desc",
      });
      slug = `${blogTypes.data.data![0].attributes?.slug}`;
    }
    let filters: any = {};
    if (hasSlug) {
      filters = {
        ...filters,
        blog_type: hasSlug && {
          slug: {
            $eq: slug,
          },
        },
      };
    }
    if (search) {
      filters = {
        ...filters,
        title: search && {
          $contains: search,
        },
      };
    }
    const response = await new BlogApi().getBlogs(
      {
        populate: "deep,5",
        paginationPageSize: 16,
        paginationPage: parseInt(page),
      },
      generateAxiosConfig({
        filters,
      })
    );
    return response.data;
  } catch (error) {
    console.log("EEER", error);
  }
});
export const head: DocumentHead = ({ resolveValue }) => {
  const data = resolveValue(useGetBlogType);
  if (data.data && data.data[0] && data.data[0].attributes?.meta) {
    const blogTypeMeta = data.data[0].attributes.meta;
    return {
      title: blogTypeMeta.metaTitle,
      meta: [
        {
          name: "keywords",
          content:
            blogTypeMeta.keywords ||
            "Mẹo sống khỏe, tin tức tổng hợp về sức khỏe, tin tức sức khỏe, sức khỏe gia đình, tin sức khỏe hàng ngày, tin tức bệnh học, tin tuc benh hoc, bản tin sức khỏe, mẹ và bé, tin tức mẹ và bé, tin tức mẹo vặt",
        },
        {
          name: "description",
          content:
            blogTypeMeta.metaDescription ||
            "Mẹo sống khỏe, bản tin sức khỏe hàng ngày mới nhất. Cẩm nang sức khỏe gia đình, mẹ và bé. Tổng hợp cách phòng bệnh cho trẻ nhỏ và gia đình",
        },
      ],
    };
  }
  return {
    title: `Tin tức tổng hợp về sức khỏe - Mẹo sống khỏe hàng ngày`,
    meta: [
      {
        name: "keywords",
        content:
          "Mẹo sống khỏe, tin tức tổng hợp về sức khỏe, tin tức sức khỏe, sức khỏe gia đình, tin sức khỏe hàng ngày, tin tức bệnh học, tin tuc benh hoc, bản tin sức khỏe, mẹ và bé, tin tức mẹ và bé, tin tức mẹo vặt",
      },
      {
        name: "description",
        content:
          "Mẹo sống khỏe, bản tin sức khỏe hàng ngày mới nhất. Cẩm nang sức khỏe gia đình, mẹ và bé. Tổng hợp cách phòng bệnh cho trẻ nhỏ và gia đình",
      },
    ],
  };
};

export default component$(() => {
  const blogs = useGetBlogList().value?.data;
  const meta = useGetBlogList().value?.meta;
  const currentSearch = useLocation().url.searchParams.get("s");
  const currentCategory = useLocation().params["slug"];
  const currentPage = useLocation().url.searchParams.get("page") || `1`;
  const blogTypes = useContext(BlogTypeContext);
  const goToPage = (page: number) =>
    `/tin-tuc/${
      !_.isEmpty(currentCategory) ? currentCategory : ""
    }?page=${page}${!_.isEmpty(currentSearch) ? "&s=" + currentSearch : ""}`;
  const checkActive = (slug: string, index: number) => {
    if (!currentCategory) {
      return index === 0;
    }
    return currentCategory === slug;
  };
  const getCurrentBlogType = () =>
    blogTypes.find((x) => x.attributes?.slug === currentCategory);
  return (
    <div class="w-100">
      <div class="hd-page">
        <div class="hd-page__wrap">
          <div class="hd-page__inner">
            <div class="hd-page__image">
              <img src="/uploads/tin%20tuc.jpg" alt="" />
            </div>
            <div class="hd-page__content">
              <h2 class="hd-page__title text-uppercase font-02 color-white">
                Tin tức
              </h2>
            </div>
          </div>
        </div>
      </div>
      <main>
        <div class={"news"}>
          <div class="news__tabs">
            <div class="imp-tabs-container">
              <span class="imp-tabs-blur"></span>
              <div class="imp-tabs-wrap imp-tabs-wrap--primary">
                <ul class="imp-tabs imp-tabs-nav">
                  <li key={"All"} class={!getCurrentBlogType() ? "active" : ""}>
                    <a href={"/tin-tuc"}>{"Tất cả"}</a>
                  </li>
                  {blogTypes.map((x, index) => {
                    return (
                      <li
                        key={x.id}
                        class={
                          checkActive(`${x.attributes?.slug}`, index)
                            ? "active"
                            : ""
                        }
                      >
                        <a href={goToCategory(`${x.attributes?.slug}`)}>
                          {x.attributes?.name}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
          <div class="news__header text-center">
            <h3 class="font-02 color-02 text-uppercase">
              {getCurrentBlogType()?.attributes?.name}
            </h3>
          </div>
          {blogs && (
            <div class="imp-container">
              <div class="news__list imp-grid-01">
                {blogs.map((x) => {
                  return (
                    <div key={x.id} class="news__item imp-grid-01__item">
                      <a
                        href={`/tin-tuc/${x.attributes?.blog_type?.data?.attributes}/${x.attributes?.slug}`}
                        class="news__item-link img-grid-01__item-link"
                      >
                        <div class="news__item-thumb imp-grid-01__item-thumb img-news">
                          <img
                            class="img-fill"
                            src={getImageUrl(
                              x.attributes?.thumbnail?.data?.attributes
                            )}
                            alt={x.attributes?.title}
                          />
                        </div>
                        <div class="news__item-content">
                          <h3 class="news__item-name line-clamp-01 font-05 color-black">
                            {x.attributes?.title}
                          </h3>
                          <div class="news__item-date font-01-1 color-04">
                            {moment(x.attributes?.createdAt).format(
                              "DD/MM/YYYY"
                            )}
                          </div>
                        </div>
                      </a>
                    </div>
                  );
                })}
              </div>
              {/* <!-- Pagination --> */}
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
          )}
        </div>
      </main>
    </div>
  );
});
