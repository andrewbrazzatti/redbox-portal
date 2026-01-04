"use strict";
/**
 * Default model configuration
 * (sails.config.models)
 *
 * Unless you override them, the following properties will be included
 * in each of your models.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const modelsConfig = {
    connection: null,
    migrate: 'safe',
    fetchRecordsOnUpdate: true,
    fetchRecordsOnCreate: true,
    fetchRecordsOnCreateEach: true,
    datastore: 'mongodb',
    attributes: {
        createdAt: { type: 'string', autoCreatedAt: true },
        updatedAt: { type: 'string', autoUpdatedAt: true },
        id: { type: 'string', columnName: '_id' }
    }
};
module.exports.models = modelsConfig;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kZWxzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vaW50ZXJuYWwvc2FpbHMtdHMvY29uZmlnL21vZGVscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7OztHQU1HOztBQWdCSCxNQUFNLFlBQVksR0FBaUI7SUFDakMsVUFBVSxFQUFFLElBQUk7SUFDaEIsT0FBTyxFQUFFLE1BQU07SUFDZixvQkFBb0IsRUFBRSxJQUFJO0lBQzFCLG9CQUFvQixFQUFFLElBQUk7SUFDMUIsd0JBQXdCLEVBQUUsSUFBSTtJQUM5QixTQUFTLEVBQUUsU0FBUztJQUNwQixVQUFVLEVBQUU7UUFDVixTQUFTLEVBQUUsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLGFBQWEsRUFBRSxJQUFJLEVBQUU7UUFDbEQsU0FBUyxFQUFFLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxhQUFhLEVBQUUsSUFBSSxFQUFFO1FBQ2xELEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRTtLQUMxQztDQUNGLENBQUM7QUFFRixNQUFNLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBRyxZQUFZLENBQUMifQ==