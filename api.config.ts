import { defineConfig } from "./src/index";

export default defineConfig({
  // importRequest: 'import axios from "../index";',
  useRequest: "axios.request",
  service: {
    test: {
      url: "https://petstore.swagger.io/v2/swagger.json",
      commonPrefix: "",
    },
    mangosteen: {
      url: "./test/mangosteen-service.json",
      commonPrefix: "",
    },
    test1: {
      url: "./test/swagger.json",
      commonPrefix: "",
    },
    test2: {
      url: "./test/swagger2.json",
      commonPrefix: "/web/v1.0",
    },
    "y-mg": {
      url: "./test/y-mg.json",
      commonPrefix: "/mg/api",
    },
    "y-staff": {
      url: "./test/y-staff.json",
      commonPrefix: "/Staff/api",
    },
    "y-store": {
      url: "./test/y-store.json",
      commonPrefix: "/store",
    },
    "y-platform": {
      url: "./test/y-platform.json",
      commonPrefix: "/platform/api",
    },
  },
  outputDir: "./src/api",
  // multipleFiles: true,
  outputType: "TypeScript",
  // outputType: "JavaScript",
  // definition: "class",
  // indexable: true,
  // enumMode: "enum",
});
