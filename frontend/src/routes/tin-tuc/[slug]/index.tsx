import {
  Resource,
  component$,
  useContext,
  useResource$,
  useSignal,
  useVisibleTask$,
} from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { routeLoader$, useLocation } from "@builder.io/qwik-city";
import _ from "lodash";
import moment from "moment";
import type { BlogListResponseDataItem } from "~/services";
import { BlogApi } from "~/services";
import {
  BlogTypeContext,
  createMeta,
  generateAxiosConfig,
  getImageUrl,
  goToCategory,
} from "~/utils/conts";

export const useGetBlog = routeLoader$(async ({ params }) => {
  try {
    const slug = params["slug"];
    const response = await new BlogApi().getBlogs(
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
  const data = resolveValue(useGetBlog);
  const blog = data ? data[0] : undefined;
  if (!blog) {
    return {};
  }
  return {
    title: `${blog.attributes?.title}`,
    meta: [
      ...createMeta(
        blog.attributes?.keywords,
        blog.attributes?.title,
        getImageUrl(blog.attributes?.thumbnail?.data?.attributes),
        "webp",
        {
          width: blog.attributes?.thumbnail?.data?.attributes?.width || 960,
          height: blog.attributes?.thumbnail?.data?.attributes?.height || 500,
        }
      ),
      {
        name: "description",
        content: `${blog.attributes?.shortDescription}`,
      },
    ],
  };
};
export default component$(() => {
  const blogs = useGetBlog().value;
  const blog = blogs && blogs[0];
  const location = useLocation().url;
  const blogTypes = useContext(BlogTypeContext);
  if (!blog) {
    return null;
  }
  const ready = useSignal(false);
  useVisibleTask$(() => {
    ready.value = true;
  });
  const blogType = () =>
    blogTypes.find(
      (x) =>
        blog.attributes?.blog_type?.data?.attributes?.slug ===
        x.attributes?.slug
    );

  const otherBlogs = useResource$<BlogListResponseDataItem[] | undefined>(
    async ({ track }) => {
      track(() => blog); // Requires explicit tracking of inputs
      try {
        const response = await new BlogApi().getBlogs(
          {
            populate: "deep,5",
            paginationPageSize: 2,
          },
          generateAxiosConfig({
            filters: {
              $and: [
                {
                  id: {
                    $ne: blog.id,
                  },
                },
                {
                  blog_type: {
                    id: {
                      $eq: blog.attributes?.blog_type?.data?.id,
                    },
                  },
                },
              ],
            },
          })
        );
        return response.data.data as BlogListResponseDataItem[] | undefined;
      } catch (error) {
        console.log("@ASSDA", error);
      }
    }
  );
  return (
    <>
      <main>
        <div class="single">
          <div class="imp-container">
            <div class="imp-breadcrumb-container imp-tabs-container">
              <span class="imp-tabs-blur"></span>
              <div class="imp-breadcrumb-wrap imp-tabs-wrap">
                <ul class="imp-breadcrumb imp-tabs-nav">
                  <li>
                    <a href="../index.html">Trang chủ</a>
                  </li>
                  <span class="imp-breadcrumb-separator"></span>
                  <li>
                    <a href="../tin-tuc.html"> Tin tức</a>
                  </li>
                  <span class="imp-breadcrumb-separator"></span>
                  <li>
                    <a href={goToCategory(`${blogType()?.attributes?.slug}`)}>
                      {blogType()?.attributes?.name}
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div class="single__header text-center">
              <h3 class="font-03 text-center">{blog.attributes?.title}</h3>
              <ul class="single__header-meta">
                <li class="single__header-cate">
                  <a href={goToCategory(`${blogType()?.attributes?.slug}`)}>
                    {blogType()?.attributes?.name}
                  </a>
                </li>
                <li class="single__header-date">
                  <span> 14/04/2023 </span>
                </li>
              </ul>
            </div>
          </div>
          <div class="imp-container-sm">
            <div class="single__main">
              <div dangerouslySetInnerHTML={blog.attributes?.content}></div>
            </div>
            {ready && (
              <>
                <script
                  async
                  defer
                  crossOrigin="anonymous"
                  src="https://connect.facebook.net/vi_VN/sdk.js#xfbml=1&version=v16.0&appId=209820738328251&autoLogAppEvents=1"
                  nonce="0Kf18FRs"
                ></script>
                <div id="fb-root"></div>
              </>
            )}
            <div class={"imp-container pt-5"}>
              <div class="hm-type-product__wrap">
                <div class="hm-type-product__bg" />
                <div class="hm-ss-header hm-news__header d-flex flex-wrap align-items-center justify-content-between">
                  <h3 class="font-04 text-uppercase imp-mb-0">
                    <span class="color-02">Bình luận</span>
                  </h3>
                </div>
                {ready && (
                  <div
                    class="fb-comments"
                    data-href={location.href}
                    data-width="100%"
                    data-order-by="time"
                    data-numposts="5"
                  ></div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Resource
        value={otherBlogs}
        onResolved={(others) => {
          if (_.isEmpty(others)) {
            return <></>;
          }
          return (
            <div class="single__related">
              <div class="imp-container">
                <div class="single__related-header">
                  <h3 class="font-03 color-01">Tin liên quan</h3>
                </div>
                <div class="imp-grid-01">
                  {others?.map((x) => {
                    return (
                      <div key={x.id} class="news__item imp-grid-01__item">
                        <a
                          href={`/tin-tuc/${x.attributes?.slug}`}
                          class="news__item-link img-grid-01__item-link"
                        >
                          <div class="news__item-thumb imp-grid-01__item-thumb">
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
              </div>
            </div>
          );
        }}
      />
    </>
  );
});
