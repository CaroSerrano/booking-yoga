import type { Entity } from "../utils/types/entity";

export interface Class extends Entity {
    title: string;
    description?: string;
    date: Date;
    location?: string;
    totalSlots: number;
}