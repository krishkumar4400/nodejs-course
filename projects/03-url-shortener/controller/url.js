import { nanoid } from "nanoid";
import {
  shortenPostRequestBodySchema,
  uuidDeleteRequestBodySchema,
} from "../validations/request.validation.js";
import {
  deleteUrl,
  fetchUrls,
  insertUrl,
  redirect,
} from "../services/url.service.js";

export async function shorten(req, res) {
  try {
    const validationResult = await shortenPostRequestBodySchema.safeParseAsync(
      req.body,
    );

    if (validationResult.error) {
      return res.status(400).json({
        message: validationResult.error.message,
        success: false,
      });
    }

    const { url, code } = validationResult.data;

    // console.log(nanoid(10)); // CQRYWB88fD

    const shortCode = code ?? nanoid(6);
    console.log(url, code);

    const data = await insertUrl(shortCode, url, req.user);

    return res.status(201).json({
      success: true,
      id: data.id,
      shortCode: data.shortCode,
      targetUrl: data.targetUrl,
      userId: data.userId,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
}

export async function getUrls(req, res) {
  try {
    const data = await fetchUrls(req.user);
    console.log(data);
    return res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
}

export async function deleteAUrl(req, res) {
  try {
    const validationResult = await uuidDeleteRequestBodySchema.safeParseAsync(
      req.body,
    );
    if (validationResult.error) {
      throw new Error(validationResult.error.message);
    }

    const { urlId } = validationResult.data;

    await deleteUrl(urlId);
    return res.status(200).json({
      message: "URL deleted successfully",
      success: true,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
}

export async function redirectToURL(req, res) {
  try {
    const { shortCode } = req.params;
    const result = await redirect(shortCode);
    if(!result) {
      return res.status(404).json({
        message: "URL not found",
        success: false 
      });
    }

    return res.redirect(result.targetUrl);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
}
