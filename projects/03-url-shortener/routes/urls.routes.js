import { Router } from "express";
import {
  deleteAUrl,
  getUrls,
  redirectToURL,
  shorten,
} from "../controller/url.js";
import {
  authenticationMiddleware,
  ensureAuthenticated,
} from "../middleware/auth.js";

const urlRouter = Router();

// short a url
urlRouter.post(
  "/shorten",
  authenticationMiddleware,
  ensureAuthenticated,
  shorten,
);

// get all url of a user
urlRouter.get("/urls", authenticationMiddleware, ensureAuthenticated, getUrls);

// delete a url
urlRouter.delete(
  "/:urlId",
  authenticationMiddleware,
  ensureAuthenticated,
  deleteAUrl,
);

// redirect to original url
urlRouter.get("/:shortCode", redirectToURL);

export default urlRouter;
