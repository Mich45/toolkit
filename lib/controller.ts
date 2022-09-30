import Tool from './model';

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
        console.log(tools);
        return tools;
    } catch (error) {
        console.error(error)
    }
}