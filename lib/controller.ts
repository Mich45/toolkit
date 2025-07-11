import { MongoClient } from 'mongodb';
import { v2 as cloudinary } from 'cloudinary';
import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';

export interface ToolProps {
  title: string;
  description: string;
  url: string;
  imgURL?: string;
  category: [];
}

const mongoUrl = process.env.MONGODB_CONNECTION_URL || process.env.MONGODB_ATLAS_CONNECTION_URL as string;
const dataFilePath = path.join(process.cwd(), '/lib/db.json') // Path to JSON data file

export const connectToDB = async () => {
  try {
    const client = new MongoClient(mongoUrl);
    await client.connect();
    console.log('Connected to database');
    return client;
  } catch (error) {
    console.error(error);
  }
};

export const saveToCloud = async (url: string, callback: Function) => {
  // Cloudinary configuration
  cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
  });

  const client = await connectToDB();
  const db = client!.db(); // Get the database instance

  if (db) {
    // Take screenshot with Puppeeter
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url, { timeout: 120000 });
    // Create buffer from screenshot
    const screenshotBuffer = await page.screenshot({
      encoding: "binary",
    });

    await browser.close();

    // Upload buffer stream to Cloudinary
    cloudinary.uploader
       //@ts-ignore
      .upload_stream((err, result) => {
        try {
          // Callback function with image URL
          callback(result?.secure_url);
        } catch (error) {
          console.log(error)
        }
      })
      .end(screenshotBuffer);
  } catch (error) {
    if (error) {
      console.log(error);
    }
  }
  }
};


export const saveTool = async () => {
  try {
    const data = JSON.parse(fs.readFileSync(dataFilePath, 'utf8'));

    const client = await connectToDB();
    const db = client!.db(); // Get the database instance

    for (const arr of data) {
      // Check if the document already exists
      const existingTool = await db.collection('tools').findOne({ title: arr.title });

      if (existingTool) {
        console.log('Document already exists, skipping...');
        continue;
      } else {
        // Create a new document
        const newTool: ToolProps = {
          title: arr.title,
          description: arr.description,
          url: arr.url,
          category: arr.category,
        };

        try {
          // Promisify saveToCloud to use async/await
          const imageURL = await new Promise<string>((resolve, reject) => {
            saveToCloud(newTool.url!, function (imageURL: string) {
              if (imageURL) {
                resolve(imageURL);
              } else {
                reject(new Error('Failed to get image URL'));
              }
            });
          });
          newTool.imgURL = imageURL;
          await db.collection('tools').insertOne(newTool);
        } catch (e) {
          console.log(e);
        }
      }
    }

  } catch (error) {
    console.error(error);
  }
  //    client!.close(); // Close the MongoDB client when done
};

export const getTools = async () => {
  try {
    const client = await connectToDB();
    const db = client!.db();
    const tools = await db.collection('tools').find().toArray();
    return tools;
  } catch (error) {
    console.error(error);
  }
};

export const getToolsByCategory = async (category: string) => {
  try {
    const client = await connectToDB();
    const db = client!.db();
    const tools = await db.collection('tools').find({ category: { $in: [category] } }).toArray();
    return tools;
  } catch (error) {
    console.error(error);
  }
}

export const getCategories = async () => {
  try {
    const client = await connectToDB();
    const db = client!.db();
    const tools = await db.collection('tools').find().toArray();
    const categories = Array.from(new Set(tools.flatMap((tool) => tool.category)));
    return categories;
  } catch (error) {
    console.error(error);
  }
}

