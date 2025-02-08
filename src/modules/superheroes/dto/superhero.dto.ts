import { z } from 'zod';


// DTO for the SuperHero Entity which contains the Entity fields and their 
// validation rules using teh Zod library
export const CreateSuperHeroDTO = z.object({
    id: z.number(),
    name: z.string().min(3).max(255, "The Name must be greater than 3 characters long"),
    superpower: z.string().min(3).max(255, "The Superpower must be greater than 3 characters long"),
    humilityScore: z.number().int().min(0).max(10, "The Humility Score must be greater than 0 and less than 10"),
});

export type CreateSuperHeroDTO = z.infer<typeof CreateSuperHeroDTO>;