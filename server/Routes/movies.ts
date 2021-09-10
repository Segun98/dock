import { API, A_MOVIE, SEARCH_API } from "./../utils/environment";
import { Request, Response } from "express";
import express from "express";
const router = express.Router();
import Redis from "ioredis";
const redis = new Redis();
import axios from "axios";

router.get("/movie/popular", async (req: Request, res: Response) => {
  try {
    const data = await axios.get(API, {
      params: { api_key: process.env.API_KEY, page: req.query.page },
    });

    return res.status(200).json(data.data);
  } catch (error: any) {
    res.send(error.message);
  }
});

router.get("/search/movies", async (req: Request, res: Response) => {
  try {
    if (!req.query?.query) throw new Error("search query can't be empty");

    //formerly redis.exists
    let checkIfQueryExists = await redis.get(
      `${String(req.query.query)} - ${req.query.page}`
    );

    if (checkIfQueryExists) {
      return res.status(200).send(JSON.parse(checkIfQueryExists as string));
    }

    const data: any = await axios.get(SEARCH_API, {
      params: {
        api_key: process.env.API_KEY,
        query: req.query.query,
        page: req.query.page,
      },
    });

    await redis.set(
      `${String(req.query.query)} - ${req.query.page}`,
      JSON.stringify(data.data),
      "ex",
      60
    );

    return res.status(200).send(data.data);
  } catch (error: any) {
    res.send(error.message);
  }
});

router.get("/movie/:movieId", async (req: Request, res: Response) => {
  try {
    if (!req.params?.movieId) throw new Error("movie id is required");

    const data = await axios.get(`${A_MOVIE}/${req.params.movieId}`, {
      params: { api_key: process.env.API_KEY },
    });
    return res.status(200).send(data.data);
  } catch (error: any) {
    res.send(error.message);
  }
});

export default router;
