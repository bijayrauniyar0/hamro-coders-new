import { QueryTypes } from 'sequelize';
import sequelize from 'src/config/database';

export const getAllUserRanks = async (type: 'daily' | 'weekly' | 'monthly') => {
  let dateCondition = '';

  switch (type) {
    case 'daily':
      dateCondition = `DATE("created_at") = CURRENT_DATE`;
      break;
    case 'weekly':
      dateCondition = `EXTRACT(WEEK FROM "created_at") = EXTRACT(WEEK FROM CURRENT_DATE) 
                      AND EXTRACT(YEAR FROM "created_at") = EXTRACT(YEAR FROM CURRENT_DATE)`;
      break;
    case 'monthly':
      dateCondition = `EXTRACT(MONTH FROM "created_at") = EXTRACT(MONTH FROM CURRENT_DATE) 
                      AND EXTRACT(YEAR FROM "created_at") = EXTRACT(YEAR FROM CURRENT_DATE)`;
      break;
  }

  const query = `
    SELECT 
      u."id" as "user_id", 
      u."name",
      CAST(SUM(us."score") AS INTEGER) AS "totalScore",
      CAST(RANK() OVER (ORDER BY SUM(us."score") DESC) AS INTEGER) AS "rank",
      CAST(MAX(us."previous_rank"->>'daily') AS INTEGER) AS "previous_rank"
    FROM "user_scores" AS us
    JOIN "users" AS u ON u."id" = us."user_id"
    WHERE ${dateCondition}
    GROUP BY u."id", u."name"
    ORDER BY "rank"


  `;

  return await sequelize.query(query, {
    type: QueryTypes.SELECT,
  });
};

export const getUserRankById = async (
  userId: number,
  type: 'daily' | 'weekly' | 'monthly',
) => {
  const ranks = await getAllUserRanks(type);
  const userRank = ranks.find((rank: any) => rank.user_id === userId);
  return userRank;
};
