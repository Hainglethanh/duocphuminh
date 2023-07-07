import { component$, useContext } from "@builder.io/qwik";
import { useDocumentHead } from "@builder.io/qwik-city";
import { BlogTypeContext, GlobalContext, getImageUrl } from "~/utils/conts";

export default component$(() => {
  const globalData = useContext(GlobalContext);
  const blogTypeData = useContext(BlogTypeContext);
  const head = useDocumentHead();
  const headTitle =
    head.title ||
    globalData.attributes?.meta?.metaTitle ||
    "Dược Phú Minh - Giải pháp y tế hàng đầu cho người tiêu dùng";
  return (
    <>
      <div class="pb-0 pl-2 " style={{ backgroundColor: "#cffdbc" }}>
        <h1 class="font-01">{headTitle}</h1>
      </div>
      <header class="home-header shadow sticky">
        <div class="imp-container-large">
          <div class="hd-wrap">
            <nav class="hd-nav">
              <div class="hd-ss hd-ss--left">
                <div class="hd-imp-logo">
                  <a href="/">
                    <img
                      src={getImageUrl(
                        globalData.attributes?.logo?.data?.attributes
                      )}
                      alt="Logo DuocPhuMinh"
                    />
                  </a>
                </div>
              </div>
              <div class="hd-ss hd-ss--right">
                <div class="hd-menu-wrap">
                  <button class="hd-btn-close">
                    <i class="fal fa-times" />
                  </button>
                  <ul class="hd-menu">
                    <li class="menu-item">
                      <span class="btn-menu-dropdown">
                        <i class="fal fa-angle-down" />
                      </span>
                      <a target="_self" href="/ve-duoc-phu-minh">
                        Về Dược Phú Minh
                      </a>
                    </li>
                    <li class="menu-item">
                      <span class="btn-menu-dropdown">
                        <i class="fal fa-angle-down" />
                      </span>
                      <a target="_self" href="/tin-tuc">
                        Tin tức
                      </a>
                      <ul class="sub-menu">
                        {blogTypeData.map((x) => {
                          return (
                            <li key={x.id} class="menu-item ">
                              <a
                                target="_self"
                                href={`/tin-tuc/${x.attributes?.slug}`}
                              >
                                {x.attributes?.name}
                              </a>
                            </li>
                          );
                        })}
                      </ul>
                    </li>
                    <li class="menu-item">
                      <span class="btn-menu-dropdown">
                        <i class="fal fa-angle-down" />
                      </span>
                      <a target="_self" href="/dong-san-pham">
                        Sản phẩm
                      </a>
                    </li>
                    <li class="menu-item">
                      <span class="btn-menu-dropdown">
                        <i class="fal fa-angle-down" />
                      </span>
                      <a target="_self" href="/">
                        Chuyên gia tư vấn
                      </a>
                    </li>
                    <li class="menu-item">
                      <a href="/lien-he">Liên hệ</a>
                    </li>

                    <li class="menu-item mobile-menu">
                      <a href="/lien-he">Liên hệ</a>
                    </li>
                  </ul>
                  {/* <form
                  id="form-search"
                  class="hd-navbar-form"
                  action="https://www.imexpharm.com/tim-kiem"
                  method="get"
                >
                  <button type="submit">
                    <i class="far fa-search" />
                  </button>
                  <input
                    id="search-q"
                    type="text"
                    placeholder="Nhập từ khóa"
                    name="q"
                  />
                </form> */}
                </div>
                <div class="hd-menubar-mb">
                  <button class="hd-btn-hamburger">
                    <i class="fal fa-bars" />
                  </button>
                </div>
              </div>
            </nav>
          </div>
        </div>
      </header>
    </>
  );
});
