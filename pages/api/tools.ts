// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { saveTool, getTools, saveToCloud } from '../../lib/controller';
import connectDB from '../../lib/connection';

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {

  if (req.method === 'GET') {
    const tools = await getTools();
    saveToCloud();
    res.status(200).json(tools)
  }

}

export default connectDB(handler);
