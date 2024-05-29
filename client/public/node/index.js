import express from 'express';
import { createServer } from 'http';
import path from "node:path";
import { fileURLToPath } from 'url';
import { Server } from 'socket.io';
import {LlamaModel, LlamaContext, LlamaChatSession} from "node-llama-cpp";
import cors from "cors";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const model = new LlamaModel({
    modelPath: path.join(__dirname, "../models", "llama-2-7b-chat.Q2_K.gguf")
});
const context = new LlamaContext({model});
const session = new LlamaChatSession({context});

const app = express();
const server = createServer(app);

app.use(cors({
  cors: {
    origin: "*"
  }
}))
const io = new Server(server, {
  cors: {
    origin: "*"
  }
});

io.on("connection", (soc) => {
  console.log('there is new connection');
  soc.on("message", async (msg) => {
    const bot_reply = await session.prompt(msg);
    soc.emit("response", bot_reply);
  });
});
 
const PORT = process.env.PORT || 8888;

server.listen(PORT, () => {
  console.log(`server 시작: ${PORT}`);
});