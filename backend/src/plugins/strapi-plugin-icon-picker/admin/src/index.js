import { prefixPluginTranslations } from "@strapi/helper-plugin";
import pluginId from "./pluginId";
import PluginIcon from "./components/PluginIcon";

export default {
  register(app) {
    app.customFields.register({
      name: "icon-picker",
      pluginId: "icon-picker",
      type: "string",
      intlLabel: {
        id: "icon-picker.icon-picker.label",
        defaultMessage: "Icon Picker",
      },
      intlDescription: {
        id: "icon-picker.icon-picker.description",
        defaultMessage: "Choose an icon",
      },
      icon: PluginIcon,
      components: {
        Input: async () =>
          import(
            /* webpackChunkName: "input-component" */ "./components/Input"
          ),
      },
      options: {},
    });
  },

  bootstrap(app) {},
  async registerTrads({ locales }) {
    const importedTrads = await Promise.all(
      locales.map((locale) => {
        return import(
          /* webpackChunkName: "translation-[request]" */ `./translations/${locale}.json`
        )
          .then(({ default: data }) => {
            return {
              data: prefixPluginTranslations(data, pluginId),
              locale,
            };
          })
          .catch(() => {
            return {
              data: {},
              locale,
            };
          });
      })
    );

    return Promise.resolve(importedTrads);
  },
};
