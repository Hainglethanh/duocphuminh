import { component$, useContext } from "@builder.io/qwik";
import { GlobalContext } from "~/utils/conts";

export default component$(() => {
  const globalData = useContext(GlobalContext);

  return (
    <div class="widget bg-secondary wow fadeInUp" data-wow-delay="800ms">
      <div class="widget-content">
        <h5 class="mb-3 text-white">Follow Us</h5>
        <ul class="social-icon-style2 ps-0">
          <li class="me-1">
            <a href={globalData.attributes?.social?.facebook}>
              <i class="fab fa-facebook-f" />
            </a>
          </li>
          <li class="me-1">
            <a href={globalData.attributes?.social?.twitter}>
              <i class="fab fa-twitter" />
            </a>
          </li>
          <li class="me-1">
            <a href={globalData.attributes?.social?.youtube}>
              <i class="fab fa-youtube" />
            </a>
          </li>
          <li class="me-0">
            <a href={globalData.attributes?.social?.linkedin}>
              <i class="fab fa-linkedin-in" />
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
});
