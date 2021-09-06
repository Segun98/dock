import { API } from "./../utils/environment";
import { Request, Response } from "express";
import express from "express";
const router = express.Router();

import axios from "axios";

router.get("/movie/popular", async (req: Request, res: Response) => {
  try {
    const data = await axios.get(API, {
      params: { api_key: process.env.API_KEY },
    });

    return res.status(200).json(data.data);
  } catch (error: any) {
    res.send(error.message);
  }
});

router.get("/search/movies", async (req: Request, res: Response) => {
  try {
    if (!req.query?.query) throw new Error("search query can't be empty");

    const data = await axios.get(API, {
      params: { api_key: process.env.API_KEY, query: req.query.query },
    });
    return res.status(200).send(data.data);
  } catch (error: any) {
    res.send(error.message);
  }
});

export default router;
