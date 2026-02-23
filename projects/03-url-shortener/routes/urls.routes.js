import { Router } from "express";
import { deleteAUrl, getUrls, redirectToURL, shorten } from "../controller/url.js";

const urlRouter = Router();

// short a url
urlRouter.post("/shorten", shorten);

// get all url of a user
urlRouter.get("/urls", getUrls);

// delete a url
urlRouter.delete("/delete", deleteAUrl);

// redirect to original url
urlRouter.get('/:shortCode', redirectToURL);

export default urlRouter;
