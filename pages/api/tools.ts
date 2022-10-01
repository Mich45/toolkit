// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import * as api from '../../lib/controller';
import connectDB from '../../lib/connection';

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {

  if (req.method === 'GET') {
    const tools = await api.getTools();
    res.status(200).json(tools)
  }

  if (req.method === 'POST') {
    api.saveTool(req, res);
  }

}

export default connectDB(handler);
