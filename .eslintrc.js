module.exports = {
  "extends": "airbnb",
  "parser": "babel-eslint",
  "env": {
    "browser": true,
    "commonjs": true,
    "node": true,
    "es6": true
  },
  "globals": {
    "window": true,
    "console": true,
    "document": true,
    "it": true,
    "require": true,
  },
  "parserOptions": {
    "sourceType": "module",
    "ecmaFeatures": {
      "experimentalObjectRestSpread": true
    }
  },
  "rules": {
    "linebreak-style": 0,
    "valid-jsdoc": ["warn", {
      "requireReturn": false,
      "requireReturnType": true,
      "requireParamDescription": false,
      "requireReturnDescription": false,
      "preferType": {
        "boolean": "Boolean",
        "number": "Number",
        "object": "Object",
        "string": "String"
      }
    }],
    "require-jsdoc": ["warn", {"require": {
      "FunctionDeclaration": true,
      "MethodDefinition": false,
      "ClassDeclaration": false,
      "ArrowFunctionExpression": false,
      "FunctionExpression": false
    }}],
    "import/no-extraneous-dependencies": 0,
    "import/no-named-as-default": 0,
    "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
    "react/jsx-closing-tag-location": false,
    "react/prop-types": 0,
    "react/prefer-stateless-function": [0, { "ignorePureComponents": true }],
    "react/jsx-wrap-multilines": 0,
    "jsx-a11y/anchor-is-valid": [ "error", { "components": [ "Link" ], "specialLink": [ "to" ] } ],
    "jsx-a11y/no-static-element-interactions": "off",
    "jsx-a11y/click-events-have-key-events": "off",
    "no-shadow": "off",
    "func-names": ["error", "never"],
    "no-prototype-builtins": "off",
    "no-restricted-syntax": "off",
    "no-case-declarations": "off",
    "no-return-assign": [0, "except-parens" ],
    "no-useless-escape": 0,
    "no-plusplus": 0,
    "no-unused-expressions": 0,
    "no-console": 0,
    "function-paren-newline": 0,
    "operator-linebreak": 0,
    "object-curly-newline": 0,
    "eol-last": 0,
  }
};
