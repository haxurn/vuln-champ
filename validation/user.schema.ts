// validation/user.schema.ts
import { z } from "zod";

const UserSchema = z.strictObject({
    id: z.string({ required_error: "User ID is required" }),
    name: z
        .string({ required_error: "Name is required" })
        .min(1, { message: "Name cannot be empty." }),
    email: z
        .string({ required_error: "Email is required" })
        .email({ message: "Invalid email format" }),
    emailVerified: z.boolean({
        required_error: "Email verification status is required",
    }),
    image: z.string().nullable().or(z.undefined()),
    createdAt: z
        .string({ required_error: "Created date is required" })
        .datetime("Invalid date format. Must be ISO8601."),
    updatedAt: z
        .string({ required_error: "Updated date is required" })
        .datetime("Invalid date format. Must be ISO8601."),
});

export default UserSchema;