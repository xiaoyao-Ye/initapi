const fs = require("fs");
const path = require("path");
const { consola } = require("consola");

const sourceFiles = [
  ["./package.json", "./lib/package.json"],
  ["./CHANGELOG.md", "./lib/CHANGELOG.md"],
  ["./README.md", "./lib/README.md"],
  ["./src/template/typeScript/api.ejs", "./lib/template/typeScript/api.ejs"],
  ["./src/template/typeScript/apiFiles.ejs", "./lib/template/typeScript/apiFiles.ejs"],
  ["./src/template/typeScript/typings.d.ejs", "./lib/template/typeScript/typings.d.ejs"],
  ["./src/template/javaScript/api.ejs", "./lib/template/javaScript/api.ejs"],
  ["./src/template/javaScript/apiFiles.ejs", "./lib/template/javaScript/apiFiles.ejs"],
];

fs.mkdirSync(path.join(__dirname, "./lib/template/typeScript"), { recursive: true }, err => {
  if (err) throw err;
  consola.info("Directory created successfully");
});
fs.mkdirSync(path.join(__dirname, "./lib/template/javaScript"), { recursive: true }, err => {
  if (err) throw err;
  consola.info("Directory created successfully");
});

for (let [sourcePath, targetPath] of sourceFiles) {
  fs.copyFile(sourcePath, targetPath, err => {
    if (err) throw err;
    consola.success(`${sourcePath} was copied to ${targetPath}`);
  });
}
