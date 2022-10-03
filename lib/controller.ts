import type { NextApiRequest, NextApiResponse } from 'next'
import Tool from "./model";
import { v2 as cloudinary } from "cloudinary";
import puppeteer from "puppeteer";
import mongoose from 'mongoose';

export const connectToDB = () => {
  try {
    if (mongoose.connection.readyState === 1) {
      console.log('Already connected');
    } else {
      mongoose.connect(process.env.MONGODB_CONNECTION_URL! || process.env.MONGODB_ATLAS_CONNECTION_URL!).then(() => {
        console.log('Connected to database')
      });
    }
  } catch (error) {
    console.error(error);
  }
}

export const saveTool = async () => {

 const data = [{
  "title": "Nairaland",
  "description": "Enhanced non-volatile protocol",
  "url": "https://nairaland.com",
  "category": ['news', 'sport']
}, {
  "title": "Google",
  "description": "Programmable global moderator",
  "url": "https://google.com",
  "category": ['news','search']
}, {
  "title": "Dev.to",
  "description": "Customer-focused non-volatile project",
  "url": "http://dev.to",
  "category": ['community', 'code']
   }, 
   {
    "title": "Geegpay",
    "description": "Customer-focused non-volatile project",
    "url": "https://geegpay.africa",
    "category": ['community', 'code']
}]


  data.map((arr, index) => {
    //@ts-ignore
    Tool.findOne({ title: arr.title }, (err, doc) => {
      if (doc) {
        console.log('Document already exists, skipping...')
      } else {
        const tool = new Tool({
          title: arr.title,
          description: arr.description,
          url: arr.url,
          category: arr.category,
        });
      
        try {
          saveToCloud(tool.url!, function (imageURL: string) {
            tool.imgURL = imageURL;
            tool.save()
          })
         } catch (e) {
          console.log(e)
        }
        
      }
    });
  })
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
