"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Re-usable, server-side only, component templates.
 * Used as defaults for properties not defined.
 *
 * The 'name' property for these templates can be used as the value
 * in the 'templateName' property in form component definitions.
 *
 * Think about how this could work if clients are allowed to define templates and store in db...
 */
const reusableDefinitions = {
    // definition of a reusable form config - standard component definitions
    // The standard people field
    "standard-contributor-field": [
        {
            name: "name",
            component: { class: "SimpleInputComponent", config: { type: "text" } }
        },
        {
            name: "email",
            component: { class: "SimpleInputComponent", config: { type: "text" } }
        },
        {
            name: "orcid",
            component: {
                class: "GroupComponent",
                config: {
                    componentDefinitions: [
                        {
                            name: "example1",
                            component: { class: "SimpleInputComponent", config: { type: "text" } },
                        }
                    ]
                }
            }
        },
    ],
    // TODO: The standard people fields - ci, data manager, supervisor, contributor.
    // definition of a reusable form config that refers to another reusable form config
    // the component definition can be either a standard component def or the 'reusableName' format
    "standard-people-fields": [
        {
            // this element in the array is replaced by the 3 items in the "standard-contributor-field" array
            overrides: { reusableFormName: "standard-contributor-field" },
            // Name does not matter, this array element will be replaced
            name: "",
            component: {
                class: "ReusableComponent",
                config: {
                    componentDefinitions: [
                        {
                            // for the item in the array that matches the match name, change the name to replace
                            // merge all other properties, preferring the definitions here
                            overrides: { replaceName: "contributor_ci_name" },
                            name: "name",
                            component: { class: "ContentComponent", config: {} },
                        },
                        {
                            // refer to the item without changing it
                            // this is useful for referring to an item that has nested components that will be changed
                            name: "orcid",
                            component: {
                                class: "GroupComponent",
                                config: {
                                    componentDefinitions: [
                                        {
                                            overrides: { replaceName: "orcid_nested_example1" },
                                            name: "example1",
                                            component: { class: "ContentComponent", config: {} },
                                        }
                                    ]
                                }
                            }
                        }
                        // the 'email' item in the reusable definition array is copied with no changes
                    ]
                }
            },
        },
        {
            // this element is used as-is
            name: "contributor_data_manager",
            component: { class: "SimpleInputComponent", config: { type: "text" } }
        }
    ],
    // TODO: The standard project info fields: title, description, keywords, SEO codes, FOR codes
    "standard-project-info-fields": [],
};
module.exports.reusableFormDefinitions = reusableDefinitions;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmV1c2FibGVGb3JtRGVmaW5pdGlvbnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9pbnRlcm5hbC9zYWlscy10cy9jb25maWcvcmV1c2FibGVGb3JtRGVmaW5pdGlvbnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFFQTs7Ozs7Ozs7R0FRRztBQUNILE1BQU0sbUJBQW1CLEdBQTRCO0lBQ2pELHdFQUF3RTtJQUN4RSw0QkFBNEI7SUFDNUIsNEJBQTRCLEVBQUU7UUFDMUI7WUFDSSxJQUFJLEVBQUUsTUFBTTtZQUNaLFNBQVMsRUFBRSxFQUFDLEtBQUssRUFBRSxzQkFBc0IsRUFBRSxNQUFNLEVBQUUsRUFBQyxJQUFJLEVBQUUsTUFBTSxFQUFDLEVBQUM7U0FDckU7UUFDRDtZQUNJLElBQUksRUFBRSxPQUFPO1lBQ2IsU0FBUyxFQUFFLEVBQUMsS0FBSyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sRUFBRSxFQUFDLElBQUksRUFBRSxNQUFNLEVBQUMsRUFBQztTQUNyRTtRQUNEO1lBQ0ksSUFBSSxFQUFFLE9BQU87WUFDYixTQUFTLEVBQUU7Z0JBQ1AsS0FBSyxFQUFFLGdCQUFnQjtnQkFDdkIsTUFBTSxFQUFFO29CQUNKLG9CQUFvQixFQUFFO3dCQUNsQjs0QkFDSSxJQUFJLEVBQUUsVUFBVTs0QkFDaEIsU0FBUyxFQUFFLEVBQUMsS0FBSyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sRUFBRSxFQUFDLElBQUksRUFBRSxNQUFNLEVBQUMsRUFBQzt5QkFDckU7cUJBQ0o7aUJBQ0o7YUFDSjtTQUNKO0tBQ0o7SUFDRCxnRkFBZ0Y7SUFDaEYsbUZBQW1GO0lBQ25GLCtGQUErRjtJQUMvRix3QkFBd0IsRUFBRTtRQUN0QjtZQUNJLGlHQUFpRztZQUNqRyxTQUFTLEVBQUUsRUFBQyxnQkFBZ0IsRUFBRSw0QkFBNEIsRUFBQztZQUMzRCw0REFBNEQ7WUFDNUQsSUFBSSxFQUFFLEVBQUU7WUFDUixTQUFTLEVBQUU7Z0JBQ1AsS0FBSyxFQUFFLG1CQUFtQjtnQkFDMUIsTUFBTSxFQUFFO29CQUNKLG9CQUFvQixFQUFFO3dCQUNsQjs0QkFDSSxvRkFBb0Y7NEJBQ3BGLDhEQUE4RDs0QkFDOUQsU0FBUyxFQUFFLEVBQUMsV0FBVyxFQUFFLHFCQUFxQixFQUFDOzRCQUMvQyxJQUFJLEVBQUUsTUFBTTs0QkFDWixTQUFTLEVBQUUsRUFBQyxLQUFLLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxFQUFFLEVBQUUsRUFBQzt5QkFDckQ7d0JBQ0Q7NEJBQ0ksd0NBQXdDOzRCQUN4QywwRkFBMEY7NEJBQzFGLElBQUksRUFBRSxPQUFPOzRCQUNiLFNBQVMsRUFBRTtnQ0FDUCxLQUFLLEVBQUUsZ0JBQWdCO2dDQUN2QixNQUFNLEVBQUU7b0NBQ0osb0JBQW9CLEVBQUU7d0NBQ2xCOzRDQUNJLFNBQVMsRUFBRSxFQUFDLFdBQVcsRUFBRSx1QkFBdUIsRUFBQzs0Q0FDakQsSUFBSSxFQUFFLFVBQVU7NENBQ2hCLFNBQVMsRUFBRSxFQUFDLEtBQUssRUFBRSxrQkFBa0IsRUFBRSxNQUFNLEVBQUUsRUFBRSxFQUFDO3lDQUNyRDtxQ0FDSjtpQ0FDSjs2QkFDSjt5QkFDSjt3QkFDRCw4RUFBOEU7cUJBQ2pGO2lCQUNKO2FBQ0o7U0FDSjtRQUNEO1lBQ0ksNkJBQTZCO1lBQzdCLElBQUksRUFBRSwwQkFBMEI7WUFDaEMsU0FBUyxFQUFFLEVBQUMsS0FBSyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sRUFBRSxFQUFDLElBQUksRUFBRSxNQUFNLEVBQUMsRUFBQztTQUNyRTtLQUNKO0lBQ0QsNkZBQTZGO0lBQzdGLDhCQUE4QixFQUFFLEVBQUU7Q0FDckMsQ0FBQztBQUNGLE1BQU0sQ0FBQyxPQUFPLENBQUMsdUJBQXVCLEdBQUcsbUJBQW1CLENBQUMifQ==