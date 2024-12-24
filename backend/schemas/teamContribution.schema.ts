// backend/schemas/teamContribution.schema.ts

import { z } from 'zod';

export const TeamContributionSchema = z.object({
  teamName: z.string().min(1, 'Team name is required'),
  totalVulnerabilities: z.number().min(0, 'Total vulnerabilities must be a positive number'),
  averageSeverity: z.number().min(0, 'Average severity must be a positive number').max(10, 'Average severity cannot exceed 10'),
});

export const UpdateTeamContributionSchema = TeamContributionSchema.partial();

export type TeamContributionData = z.infer<typeof TeamContributionSchema>;

export default {
  TeamContributionSchema,
  UpdateTeamContributionSchema,
};