// import { resolve } from "path";
import ejs from "ejs";

const ejsRender = (templateDir: string, data: any): Promise<string> => {
  // console.log(process.cwd());

  // templateDir = resolve(__dirname, templateDir);
  return new Promise((resolve, reject) => {
    ejs.renderFile(templateDir, data, (err, str) => {
      if (err) reject(err);
      resolve(str);
    });
  });
};

export { ejsRender };
