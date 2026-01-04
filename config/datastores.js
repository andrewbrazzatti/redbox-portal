"use strict";
/**
 * Datastores configuration
 * THIS FILE WAS ADDED AUTOMATICALLY by the Sails 1.0 app migration tool.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const sailsMongo = require('sails-mongo');
const datastoresConfig = {
    mongodb: {
        adapter: sailsMongo,
        url: 'mongodb://localhost:27017/redbox-portal'
    },
    redboxStorage: {
        adapter: sailsMongo,
        url: 'mongodb://mongodb:27017/redbox-storage'
    }
};
module.exports.datastores = datastoresConfig;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YXN0b3Jlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL2ludGVybmFsL3NhaWxzLXRzL2NvbmZpZy9kYXRhc3RvcmVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7O0dBR0c7O0FBRUgsTUFBTSxVQUFVLEdBQUcsT0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFDO0FBWTFDLE1BQU0sZ0JBQWdCLEdBQXFCO0lBQ3pDLE9BQU8sRUFBRTtRQUNQLE9BQU8sRUFBRSxVQUFVO1FBQ25CLEdBQUcsRUFBRSx5Q0FBeUM7S0FDL0M7SUFDRCxhQUFhLEVBQUU7UUFDYixPQUFPLEVBQUUsVUFBVTtRQUNuQixHQUFHLEVBQUUsd0NBQXdDO0tBQzlDO0NBQ0YsQ0FBQztBQUVGLE1BQU0sQ0FBQyxPQUFPLENBQUMsVUFBVSxHQUFHLGdCQUFnQixDQUFDIn0=