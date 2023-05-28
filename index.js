const fs = require("fs");
const path = require("path");

const sourceFiles = [
  ["./package.json", "./lib/package.json"],
  ["./CHANGELOG.md", "./lib/CHANGELOG.md"],
  ["./README.md", "./lib/README.md"],
  ["./src/template/typeScript/api.ejs", "./lib/template/typeScript/api.ejs"],
  ["./src/template/typeScript/typings.d.ejs", "./lib/template/typeScript/typings.d.ejs"],
  ["./src/template/javaScript/api.ejs", "./lib/template/javaScript/api.ejs"],
];

fs.mkdirSync(path.join(__dirname, "./lib/template/typeScript"), { recursive: true }, err => {
  if (err) throw err;
  console.log("Directory created successfully");
});
fs.mkdirSync(path.join(__dirname, "./lib/template/javaScript"), { recursive: true }, err => {
  if (err) throw err;
  console.log("Directory created successfully");
});

for (let [sourcePath, targetPath] of sourceFiles) {
  fs.copyFile(sourcePath, targetPath, err => {
    if (err) throw err;
    console.log(`${sourcePath} was copied to ${targetPath}`);
  });
}
