import pluginId from "./pluginId";
export default {
  register(app) {
    // ... app.addMenuLink() goes here
    // ... app.registerPlugin() goes here
    console.log("pluginId", pluginId);
    app.customFields.register({
      name: "IconPicker",
      pluginId: pluginId, // the custom field is created by a color-picker plugin
      type: "string", // the color will be stored as a string
      intlLabel: {
        id: `${pluginId}.label`,
        defaultMessage: "Icon",
      },
      intlDescription: {
        id: `${pluginId}.description`,
        defaultMessage: "Select any icon",
      },
      components: {
        Input: () => import("./components/PluginIcon"),
      },
    });
  },

  // ... bootstrap() goes here
};
