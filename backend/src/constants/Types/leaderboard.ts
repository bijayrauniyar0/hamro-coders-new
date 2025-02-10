export type Rank = {
    user_id: number;
    totalScore: number;
    rank: number;
    name?: string;
    previous_rank: number | null;
}