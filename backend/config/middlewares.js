module.exports = ({ env }) => [
  "strapi::errors",
  {
    name: "strapi::security",
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          "script-src": ["'self'", "*.tinymce.com", "*.tiny.cloud", "https:"],
          "connect-src": [
            "'self'",
            "*.tinymce.com",
            "*.tiny.cloud",
            "blob:",
            "*.strapi.io",
          ],
          "img-src": ["*"],

          "media-src": [
            "*",
            "'self'",
            "data:",
            "blob:",
            `https://${env("AWS_BUCKET_NAME")}.s3.${env(
              "AWS_REGION"
            )}.amazonaws.com`,
          ],
          upgradeInsecureRequests: null,
        },
      },
    },
  },

  "strapi::cors",
  "strapi::poweredBy",
  "strapi::logger",
  "strapi::query",
  "strapi::body",
  "strapi::session",
  "strapi::favicon",
  "strapi::public",
];
