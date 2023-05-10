import { component$, useContext } from "@builder.io/qwik";
import moment from "moment";
import {
  BlogTypeContext,
  GlobalContext,
  // ProductTypeContext,
  getImageUrl,
  goToCategory,
} from "~/utils/conts";

export default component$(() => {
  const globalData = useContext(GlobalContext);
  // const productTypes = useContext(ProductTypeContext);
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
                        src="/public/images/map-pin.svg"
                      />
                    </span>{" "}
                    <span>{globalData.attributes?.address}</span>
                  </li>
                  <li class="footer-address">
                    <span class="icon">
                      <img
                        alt=""
                        data-widget="image"
                        class={"white-filter"}
                        src="/public/images/mail-border-dark.svg"
                      />
                    </span>{" "}
                    <a href={`mailto:${globalData.attributes?.email}`}>
                      {globalData.attributes?.email}
                    </a>
                  </li>
                  <li class="footer-phone">
                    <span class="icon">
                      <img
                        alt=""
                        data-widget="image"
                        src="/public/images/phone.svg"
                      />
                    </span>{" "}
                    <a href={`tel:${globalData.attributes?.phoneNumber}`}>
                      <strong>{globalData.attributes?.phoneNumber}</strong>
                    </a>
                    {" - "}
                    <a href={`tel:${globalData.attributes?.hotline}`}>
                      <strong>{globalData.attributes?.hotline}</strong>
                    </a>
                  </li>
                  <li class="footer-phone pr-5">
                    <span>
                      Giấy chứng nhận ĐKKD số: <strong>0110010554</strong> do Sở
                      Kế hoạch và Đầu tư Thành phố Hà Nội cấp ngày 15/06/2022
                      <br />
                      Cố vấn chuyên môn nội dung:{" "}
                      <strong>Dược sĩ đại học</strong> Nguyễn Thị Tuyết Nhung,{" "}
                      <strong> Cử nhân điều dưỡng </strong>Ngô Thị Dung
                    </span>
                  </li>
                </ul>
              </div>
            </div>
            <div class="footer-right">
              <div class="row">
                <div class="footer-col col-3">
                  <h3 class="footer-title">Về CHÚNG TÔI</h3>
                  <ul class="ft-menu">
                    <li class="ft-menu-item">
                      <a href="/lien-he">Liên hệ</a>
                    </li>
                  </ul>
                </div>
                <div class="footer-col col-3">
                  <h3 class="footer-title">Hỗ trợ khách hàng </h3>
                  <ul class="ft-menu">
                    <li class="ft-menu-item">
                      <a href="/">Hướng dẫn mua hàng/ thanh toán </a>
                    </li>
                    <li class="ft-menu-item">
                      <a href="/">Chính sách phân phối/ đại lý phân phối</a>
                    </li>
                    <li class="ft-menu-item">
                      <a href="/">Chính sách đổi trả hàng </a>
                    </li>
                    <li class="ft-menu-item">
                      <a href="/">Chính sách bảo hành</a>
                    </li>
                    <li class="ft-menu-item">
                      <a href="/">Chính sách bản quyền</a>
                    </li>
                    <li class="ft-menu-item">&nbsp;</li>
                  </ul>
                </div>
                {/* <div class="footer-col">
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
                </div> */}
                <div class="footer-col col-3">
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
                <div class="footer-col col-3">
                  <h3 class="footer-title">Kết nối với chúng tôi</h3>
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
                    <li>
                      <a
                        data-widget="image"
                        href={globalData.attributes?.social?.tiktok}
                      >
                        <img
                          alt=""
                          class={"white-filter"}
                          src="public/images/tiktok-svgrepo-com.svg"
                        />
                      </a>
                    </li>
                    <li>
                      <a
                        data-widget="image"
                        href={globalData.attributes?.social?.zalo}
                      >
                        <img
                          alt=""
                          class={"white-filter"}
                          src="public/images/icons8-zalo.svg"
                        />
                      </a>
                    </li>
                  </ul>
                </div>
                <div class="footer-col">
                  <h3 class="footer-title">Miễn trừ trách nhiệm</h3>
                  <ul class="ft-menu">
                    <li class={"ft-menu-item"}>
                      <span>
                        Lưu ý, tất cả nội dung chia sẻ trên website
                        <a href="/">
                          <strong class={"color-02"}> duocphuminh.com</strong>{" "}
                        </a>
                        chỉ mang tính chất tham khảo. TUYỆT ĐỐI không được tự ý
                        áp dụng khi chưa có tư vấn chuyên môn. Xin vui lòng liên
                        hệ Dược sĩ để được tư vấn. Cảm ơn bạn.
                      </span>
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
