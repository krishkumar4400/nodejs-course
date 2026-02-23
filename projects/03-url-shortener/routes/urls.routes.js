import { Router } from "express";
import { deleteAUrl, getUrls, shorten } from "../controller/url.js";

const urlRouter = Router();

// short a url
urlRouter.post("/shorten", shorten);

// get all url of a user
urlRouter.get("/urls", getUrls);

// delete a url
urlRouter.delete("/delete", deleteAUrl);

export default urlRouter;
