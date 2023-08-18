import { Router } from "express";
import { uploader2 } from "../utils.js";
import { changeUserRole, getUsers, uploadDocuments } from "../controllers/users.controller.js";

const router = Router()


router.get("/",getUsers)

router.put("/premium/:uid",changeUserRole)

router.post("/:uid/documents",uploader2.single("reference"),uploadDocuments)




export default router