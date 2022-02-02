import express from "express";
import validateResourse from "@src/middleware/validateResourse"
import { createUserSchema } from "@src/schema/user.schema"
import { createHandler } from "@src/controller/user.controller";
const router = express.Router();
router.post("/api/users", validateResourse(createUserSchema), createHandler);

// router.post("/api/users", validateResourse(createUserSchema), createHandler)

export default router;
