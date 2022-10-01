import mongoose from 'mongoose';

const toolSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    url: {
      type: String,
      required: true
    },
    category: [],
    imgURL: {
      type: String,
      required: true
    },
  });
  
const Tool = mongoose.model('Tools', toolSchema);
  
export default Tool;