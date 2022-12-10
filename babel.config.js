module.exports = {
  "presets": [
    [
      "@babel/preset-env", {
        "targets": {
          "node": "current"
        }
      },
      "@babel/preset-react"
    ]
  ],
  "plugins": [
    [
      "@babel/plugin-transform-runtime", {
        "regenerator": true
      }
    ],
    "@babel/plugin-proposal-class-properties",
    "@babel/plugin-proposal-export-default-from",
    ["@babel/transform-react-jsx", { jsxPragma: "h", runtime: "automatic" }]
  ]
}