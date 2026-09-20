import Groq from "groq-sdk" //helps node.js application to communicate with the groq
import dotenv from "dotenv" //helps to read dotenv from env file

dotenv.config(); //gets our sectret api key

const groq = new Groq({
  apiKey:process.env.GROQ_API_KEY
});

export default groq;