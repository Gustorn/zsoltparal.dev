const withPlugins = require("next-compose-plugins");
const withPreact = require("next-plugin-preact");
const withTranspileModules = require("next-transpile-modules");
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "1",
});

module.exports = withPlugins(
  [withPreact, withBundleAnalyzer, withTranspileModules(["@zsparal/core", "@zsparal/api"])],
  {
    future: {
      webpack5: true,
    },
    images: {
      domains: [],
    },
  },
);
