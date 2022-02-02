import express from "express";
import validateResourse from "@src/middleware/validateResourse"
import { createUserSchema, verifyUserSchema } from "@src/schema/user.schema"
import { createHandler, verifiHandler } from "@src/controller/user.controller";
const router = express.Router();
router.post("/api/users", validateResourse(createUserSchema), createHandler);

router.post("/api/users/verifi/:id/:verificationCode", validateResourse(verifyUserSchema), verifiHandler)

export default router;
