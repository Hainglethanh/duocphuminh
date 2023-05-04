import { component$, useContext } from "@builder.io/qwik";
import moment from "moment";
import {
  BlogTypeContext,
  GlobalContext,
  ProductTypeContext,
  getImageUrl,
  goToCategory,
  goToProductType,
} from "~/utils/conts";

export default component$(() => {
  const globalData = useContext(GlobalContext);
  const productTypes = useContext(ProductTypeContext);
  const blogTypes = useContext(BlogTypeContext);
  return (
    <footer>
      <div class="footer-wrap">
        <div class="imp-container">
          <div class="d-flex flex-wrap">
            <div class="footer-left">
              <div class="footer-col">
                <div class="footer-logo mb-4">
                  <img
                    alt="Duoc Phu Minh Logo White"
                    class="w-100 white-filter"
                    data-widget="image"
                    src={getImageUrl(
                      globalData.attributes?.logo?.data?.attributes
                    )}
                  />
                </div>
                <h3 class="footer-name-company mb-4">
                  {globalData.attributes?.companyName}
                </h3>
                <ul class="footer-info">
                  <li class="footer-address">
                    <span class="icon">
                      <img
                        alt=""
                        data-widget="image"
                        src="public/images/map-pin.svg"
                      />
                    </span>{" "}
                    <span>{globalData.attributes?.address}</span>
                  </li>
                  <li class="footer-phone">
                    <span class="icon">
                      <img
                        alt=""
                        data-widget="image"
                        src="public/images/phone.svg"
                      />
                    </span>{" "}
                    <a href={`tel:${globalData.attributes?.phoneNumber}`}>
                      {globalData.attributes?.phoneNumber}
                    </a>
                  </li>
                  <li class="footer-phone-call">
                    <span class="icon">
                      <img
                        alt=""
                        data-widget="image"
                        src="public/images/phone-call.svg"
                      />
                    </span>{" "}
                    <span>
                      Hotline:{" "}
                      <a href={`tel:${globalData.attributes?.hotline}`}>
                        {globalData.attributes?.hotline}
                      </a>
                    </span>
                  </li>
                  <li />
                </ul>
              </div>
            </div>
            <div class="footer-right">
              <div class="footer-right-content">
                <div class="footer-col">
                  <h3 class="footer-title">VỀ Dược Phú Minh</h3>
                  <ul class="ft-menu">
                    <li class="ft-menu-item">
                      <a href="/ve-chung-toi#tong-quan">Tổng quan</a>
                    </li>
                    <li class="ft-menu-item">
                      <a href="/ve-chung-toihtml#van-hoa">Văn hóa</a>
                    </li>
                    <li class="ft-menu-item">
                      <a href="/ve-chung-toihtml#hanh-trinh">Hành trình</a>
                    </li>
                    <li class="ft-menu-item">
                      <a href="/ve-chung-toihtml#con-nguoi">Con người</a>
                    </li>
                    <li class="ft-menu-item">
                      <a href="/ve-chung-toihtml#tiem-luc">Tiềm lực</a>
                    </li>
                    <li class="ft-menu-item">&nbsp;</li>
                  </ul>
                </div>
                <div class="footer-col">
                  <h3 class="footer-title">SẢN PHẨM</h3>
                  <ul class="ft-menu">
                    {productTypes.map((x) => {
                      return (
                        <li key={x.id} class="ft-menu-item">
                          <a href={goToProductType(`${x.attributes?.slug}`)}>
                            {x.attributes?.name}
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                </div>
                <div class="footer-col">
                  <h3 class="footer-title">Tin tức</h3>
                  <ul class="ft-menu">
                    {blogTypes.map((x) => {
                      return (
                        <li key={x.id} class="ft-menu-item">
                          <a href={goToCategory(`${x.attributes?.slug}`)}>
                            {x.attributes?.name}
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                </div>
                <div class="footer-col">
                  <h3 class="footer-title">KẾT NỐI VỚI CHÚNG TÔI</h3>
                  <ul class="ft-menu">
                    <li class="ft-menu-item">
                      <a href="lien-he.html">Liên hệ</a>
                    </li>
                  </ul>
                  <ul class="imp-social">
                    <li>
                      <a
                        data-widget="image"
                        href={globalData.attributes?.social?.facebook}
                      >
                        <img alt="" src="public/images/brand-facebook.svg" />
                      </a>
                    </li>

                    <li>
                      <a
                        data-widget="image"
                        href={globalData.attributes?.social?.youtube}
                      >
                        <img alt="" src="public/images/brand-youtube.svg" />
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div class="footer-copyright">
            Copyright © {moment().format("YYYY")} - PhuMinh. All Rights
            Reserved.
          </div>
        </div>
      </div>
    </footer>
  );
});
