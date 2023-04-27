// content: {
//   "application/json": {
//     schema: {
//       $ref: "#/components/schemas/GlobalResponse",
//     },
//   },
// },

module.exports = ({ env }) => ({
  // ...
  seo: {
    enabled: true,
  },
  "icon-picker": {
    enabled: true,
  },
  upload: {
    config: {
      provider: "aws-s3",
      providerOptions: {
        accessKeyId: "AKIA5ZLUZMUNCMW4OBPH",
        secretAccessKey: "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",
        region: "ap-southeast-1",
        params: {
          Bucket: "duoc-phu-minh",
        },
      },
      actionOptions: {
        upload: {},
        uploadStream: {},
        delete: {},
      },
    },
  },
  documentation: {
    config: {
      servers: [
        {
          url:
            process.env.NODE_ENV === "production"
              ? "http://localhost:1337/api"
              : "http://localhost:1337/api",
          description: "Development tadasdasdasads",
        },
      ],
      "x-strapi-config": {
        mutateDocumentation: (generatedDocumentationDraft) => {
          generatedDocumentationDraft.paths["/global"].get.responses[
            "200"
          ].content["application/json"].schema["$ref"] =
            "#/components/schemas/GlobalResponse";
          generatedDocumentationDraft.paths["/about-us"].get.responses[
            "200"
          ].content["application/json"].schema["$ref"] =
            "#/components/schemas/AboutUsResponse";
          generatedDocumentationDraft.paths["/home-page"].get.responses[
            "200"
          ].content["application/json"].schema["$ref"] =
            "#/components/schemas/HomePageResponse";
        },
      },
    },
  },
  // upload: {
  //   config: {
  //     provider: "aws-s3",
  //     providerOptions: {
  //       accessKeyId: "AKIA5ZLUZMUNCMW4OBPH",
  //       secretAccessKey: "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",
  //       region: "ap-southeast-1",
  //       params: {
  //         Bucket: "duoc-phu-minh",
  //       },
  //     },
  //     actionOptions: {
  //       upload: {},
  //       uploadStream: {},
  //       delete: {},
  //     },
  //   },
  // },
  // ...
});
