import type { NextApiRequest, NextApiResponse } from 'next'
import Tool from "./model";
import { v2 as cloudinary } from "cloudinary";
import puppeteer from "puppeteer";
import mongoose from 'mongoose';


mongoose.connect(process.env.MONGODB_CONNECTION_URL!).then(() => {
  console.log('Connected to database')
});

export const saveTool = async (req:NextApiRequest, res:NextApiResponse) => {
  const { title, description, url, category } = req.body;
  const tool = new Tool({
    title: title,
    description: description,
    url: url,
    category: category,
  });

  try {
    await saveToCloud(tool.url!, function (imageURL: string) {
      console.log(imageURL)
      tool.imgURL = imageURL;
      tool.save()
    })
   } catch (e) {
    console.error(e);
  }
};

export const getTools = async () => {
  try {
    let tools = await Tool.find();
    return tools;
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
  // Take screenshot with Puppeeter
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url, {timeout: 0});
    // Create buffer from screenshot
    const screenshotBuffer = await page.screenshot({
      encoding: "binary",
    });

    await browser.close();

    // Upload buffer stream to Cloudinary
    cloudinary.uploader
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
};
