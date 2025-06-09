import { NextApiRequest, NextApiResponse } from "next";
import { connectToDB, getToolsByCategory } from "../../lib/controller";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { category } = req.query;

  await connectToDB();

  try {
    if (!category || typeof category !== "string") {
      return res.status(400).json({ error: "Invalid category" });
    }
    const tools = await getToolsByCategory(category as string);
    res.status(200).json(tools);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch tools" });
  }
}
