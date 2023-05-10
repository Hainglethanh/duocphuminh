import { createContextId } from "@builder.io/qwik";
import _ from "lodash";
import type {
  BlogTypeListResponseDataItem,
  GlobalResponseDataObject,
  ProductCategoryListResponseDataItem,
} from "~/services";
import qs from "qs";
import type { DocumentMeta } from "@builder.io/qwik-city";
export const GlobalContext =
  createContextId<GlobalResponseDataObject>("globalData-context");

export const BlogTypeContext =
  createContextId<BlogTypeListResponseDataItem[]>("blogType-context");

export const ProductTypeContext = createContextId<
  ProductCategoryListResponseDataItem[]
>("productType-context");

export const H1Text =
  createContextId<ProductCategoryListResponseDataItem[]>("H1Text");

const camelToSnakeCase = (str: string) =>
  str.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`);

export const goToCategory = (slug: string) => `/bai-viet/?type=${slug}`;
export const goToProductType = (slug: string) => `/dong-san-pham/?type=${slug}`;

export const getIcon = (icon: string) => {
  const iconName = camelToSnakeCase(icon.split(" ")[1] || icon);
  const iconCategories = icon.split(" ")[0] || icon;

  return `${iconCategories} ${iconName}`;
};

export const getImageUrl = (imageObject: any) => {
  if (!imageObject) {
    return "/placeholder.png";
  }
  if (!imageObject.formats) {
    return imageObject.url;
  }
  return !_.isEmpty(imageObject.formats.default.url)
    ? imageObject.formats.default.url
    : imageObject.url;
};
export const generateQuery = (params: any) => {
  return qs.stringify(params, { encodeValuesOnly: true }) as any;
};

export const generateAxiosConfig = (params: any) => {
  return {
    paramsSerializer: (_params: any) => generateQuery(_params),
    params,
  };
};
export const createMeta = (
  keywords?: string,
  title?: string,
  imageUrl?: string,
  imageType?: string,
  imageSize?: {
    width: number;
    height: number;
  }
): DocumentMeta[] => {
  return [
    {
      property: "og:title",
      content: `${title}`,
    },
    {
      property: "og:image",
      content: `${imageUrl}`,
    },
    {
      property: "og:type",
      content: `${imageType}`,
    },
    {
      property: "og:image",
      content: `${imageUrl}`,
    },
    {
      name: "keywords",
      content: `${keywords || ""}`,
    },
    {
      name: "og:image:width",
      content: `${imageSize?.width || 1920}`,
    },
    {
      name: "og:image:height",
      content: `${imageSize?.width || 1000}`,
    },
  ];
};
