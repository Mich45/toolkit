import Tool from './model';
import { v2 as cloudinary } from 'cloudinary'

export const saveTool = async () => {
        const tool = new Tool({
          title: "random text",
          description: "random text",
          url: "random text",
          preview: "random text",
          category: "random text",
          imgURL: "random text",
        });
      
        try {
          await tool.save();
        } catch (e) {
          console.log(e)
        }
}

export const getTools = async () => {
    try {
        let tools = await Tool.find();
        // console.log(tools);
        return tools;
    } catch (error) {
        console.error(error)
    }
}

export const saveToCloud = async () => {
    cloudinary.config({ 
        cloud_name: process.env.CLOUD_NAME, 
        api_key: process.env.API_KEY, 
        api_secret: process.env.API_SECRET
      });

      cloudinary.uploader
      .upload("devfestme.png")
      .then(result => console.log(result));
}