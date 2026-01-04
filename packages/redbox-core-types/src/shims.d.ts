declare module "sails" {
    export interface Sails { [key: string]: any }
    export interface Model { [key: string]: any }
}
declare module "agenda" {
    export interface Agenda { [key: string]: any }
}
declare module "typescript-json-schema";
declare module "glob";
declare module "mongodb";
declare module "node-cache";
declare module "fs-extra";
declare module "ejs";
declare module "graceful-fs";
declare module "nodemailer";
declare module "genson-js";
declare module "oni-ocfl";
declare module "language-data-commons-vocabs";
declare module "mime-types";
declare module "numeral";
declare module "lucene-escape-query";
declare module "csv-stringify/sync";
declare module "sass";
declare module "jsdom";
declare module "jsonata" {
    export interface Expression { [key: string]: any }
    function jsonata(expr: string): Expression;
    export default jsonata;
}
declare module "i18next";
declare module "url-pattern";
