const fs = require("fs");
const path = require("path");
const babylon = require("babylon");
const traverse = require("babel-traverse").default;
const { transformFromAst } = require("babel-core");

let ID = 0;

function createAssets(filename) {
  const fileContent = fs.readFileSync(filename, "utf-8");

  const ast = babylon.parse(fileContent, {
    sourceType: "module",
  });
  const deps = [];
  const id = ID++;

  traverse(ast, {
    ImportDeclaration: ({ node }) => {
      deps.push(node.source.value);
    },
  });

  const { code } = transformFromAst(ast, null, {
    presets: ["env"],
  });

  return {
    id,
    deps,
    filename,
    code,
  };
}

function createGraph(entry) {
  const mainAsset = createAssets(entry);
  const q = [mainAsset];

  for (const asset of q) {
    asset.mapping = {};
    const dirname = path.dirname(asset.filename);
    asset.deps.forEach((relativePath) => {
      const absolutePath = path.join(dirname, relativePath);
      const child = createAssets(absolutePath);
      asset.mapping[relativePath] = child.id;
      q.push(child);
    });
  }
  return q;
}

function makeBundle(graph) {
  let modules = "";

  graph.forEach((mod) => {
    modules += `${mod.id}: [
        function (require, module, exports) {
          ${mod.code}
        },
        ${JSON.stringify(mod.mapping)},
      ],`;
  });
  const result = `
      (function(modules) {
        function require(id) {
          const [fn, mapping] = modules[id];
  
          function localRequire(name) {
            return require(mapping[name]);
          }
  
          const module = { exports : {} };
  
          fn(localRequire, module, module.exports);
  
          return module.exports;
        }
  
        require(0);
      })({${modules}})
    `;

  return result;
}

// console.log(createGraph("./example/entry.js"));
const graph = createGraph("./example1/entry.js");
const result = makeBundle(graph);

fs.writeFileSync('./dist/out.js', result)