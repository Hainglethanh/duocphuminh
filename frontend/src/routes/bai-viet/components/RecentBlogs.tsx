import { component$ } from "@builder.io/qwik";
import moment from "moment";
import type { BlogListResponseDataItem } from "~/services";
import { getImageUrl } from "~/utils/conts";

export default component$(
  (props: { recentBlogs: BlogListResponseDataItem[] }) => {
    const { recentBlogs } = props;

    return (
      <div
        class="widget bg-secondary mb-1-9 wow fadeInUp"
        data-wow-delay="350ms"
      >
        <div class="widget-content">
          <h5 class="mb-3 text-white">Recent Posts</h5>
          {recentBlogs &&
            recentBlogs.map((x) => {
              return (
                <div key={x.id} class="d-flex mb-4">
                  <div class="flex-shrink-0">
                    <img
                      class={"image-sq-80"}
                      src={getImageUrl(
                        x.attributes?.thumbnail?.data?.attributes
                      )}
                      alt={x.attributes?.title}
                    />
                  </div>
                  <div class="flex-grow-1 ms-3">
                    <h4 class="mb-2 h6">
                      <a href="#!" class="text-white text-white-hover-light">
                        {x.attributes?.title}
                      </a>
                    </h4>
                    <span class="text-white opacity8 small">
                      {moment(x.attributes?.createdAt).format("ll")}
                    </span>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    );
  }
);
