export type NotificationType = {
    id: number;
    user_id: number;
    message: string;
    is_read: boolean;
    created_at: string; // ISO date string
};