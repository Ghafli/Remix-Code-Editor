 /// <reference types="@remix-run/node" />
/// <reference types="@cloudflare/workers-types" />

module.exports = {
  serverDependenciesToBundle: [
    "nanostores/react",
    "@webcontainer/api",
  ],
};
