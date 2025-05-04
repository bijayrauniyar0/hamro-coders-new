import { IncludeOptions, WhereOptions } from 'sequelize';

export interface SequelizeAttributes {
  where: WhereOptions; // Define the where conditions, based on the columns in the table
  raw: boolean; // Whether to return raw data (no sequelize instance)
  attributes: string[] | { exclude: string[] }; // Attributes to select or exclude
  include: IncludeOptions[]; // Include options for related models (such as Test)
  order: [string, 'ASC' | 'DESC'][]; // Order by clause
  limit: number; // Limit the number of results
}
