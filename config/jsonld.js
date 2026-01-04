"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsonLdConfig = {
    addJsonLdContext: true,
    contexts: {
        "default-1.0-draft": {
            "title": "http://purl.org/dc/elements/1.1/title",
            "description": "http://purl.org/dc/elements/1.1/description",
            "startDate": "http://schema.org/Date",
            "endDate": "http://schema.org/Date"
        },
        "default-1.0-active": {
            "title": "http://purl.org/dc/elements/1.1/title",
            "description": "http://purl.org/dc/elements/1.1/description",
            "startDate": "http://schema.org/Date",
            "endDate": "http://schema.org/Date"
        },
        "default-1.0-retired": {
            "title": "http://purl.org/dc/elements/1.1/title",
            "description": "http://purl.org/dc/elements/1.1/description",
            "startDate": "http://schema.org/Date",
            "endDate": "http://schema.org/Date"
        }
    }
};
module.exports.jsonld = jsonLdConfig;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianNvbmxkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vaW50ZXJuYWwvc2FpbHMtdHMvY29uZmlnL2pzb25sZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUVBLE1BQU0sWUFBWSxHQUFpQjtJQUNqQyxnQkFBZ0IsRUFBRSxJQUFJO0lBQ3RCLFFBQVEsRUFBRTtRQUNSLG1CQUFtQixFQUFFO1lBQ25CLE9BQU8sRUFBRSx1Q0FBdUM7WUFDaEQsYUFBYSxFQUFFLDZDQUE2QztZQUM1RCxXQUFXLEVBQUUsd0JBQXdCO1lBQ3JDLFNBQVMsRUFBRSx3QkFBd0I7U0FDcEM7UUFDRCxvQkFBb0IsRUFBRTtZQUNwQixPQUFPLEVBQUUsdUNBQXVDO1lBQ2hELGFBQWEsRUFBRSw2Q0FBNkM7WUFDNUQsV0FBVyxFQUFFLHdCQUF3QjtZQUNyQyxTQUFTLEVBQUUsd0JBQXdCO1NBQ3BDO1FBQ0QscUJBQXFCLEVBQUU7WUFDckIsT0FBTyxFQUFFLHVDQUF1QztZQUNoRCxhQUFhLEVBQUUsNkNBQTZDO1lBQzVELFdBQVcsRUFBRSx3QkFBd0I7WUFDckMsU0FBUyxFQUFFLHdCQUF3QjtTQUNwQztLQUNGO0NBQ0YsQ0FBQztBQUVGLE1BQU0sQ0FBQyxPQUFPLENBQUMsTUFBTSxHQUFHLFlBQVksQ0FBQyJ9