import mongoose from 'mongoose';

const toolSchema = new mongoose.Schema({
    title: String,
    description: String,
    url: String,
    preview: String,
    category: Array,
    imgURL: String,
  });
  
const Tool = mongoose.model('Tools', toolSchema);
  
export default Tool;