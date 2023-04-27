import { component$ } from "@builder.io/qwik";
import type { BlogTypeListResponseDataItem } from "~/services";
import { goToCategory } from "~/utils/conts";

export default component$(
  (props: {
    categoriesList: BlogTypeListResponseDataItem[];
    currentCategory?: string;
  }) => {
    const { categoriesList, currentCategory } = props;

    return (
      <div
        class="widget bg-secondary mb-1-9 wow fadeInUp"
        data-wow-delay="500ms"
      >
        <div class="widget-content">
          <h5 class="mb-4 text-white">Categories</h5>
          <ul class="category-list list-unstyled mb-0">
            {categoriesList &&
              categoriesList.map((x) => {
                return (
                  <li
                    key={x.id}
                    class={
                      `${x.attributes?.slug}` === currentCategory
                        ? "active"
                        : ""
                    }
                  >
                    <a href={goToCategory(`${x.attributes?.slug}`)}>
                      <span>{x.attributes?.name}</span>
                    </a>
                  </li>
                );
              })}
          </ul>
        </div>
      </div>
    );
  }
);
