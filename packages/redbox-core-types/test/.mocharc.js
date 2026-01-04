"use strict";

module.exports = {
    require: ["chai", "ts-node/register/transpile-only"],
    extension: ["ts"],
    recursive: true,
    slow: 2000,
    timeout: "30s",
    ui: "bdd",
    reporter: "spec"
};
