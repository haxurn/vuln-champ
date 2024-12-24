// backend/models/theme.model.ts

import { prisma } from "../config/db.config";

export const Theme = prisma.theme;

export default Theme;