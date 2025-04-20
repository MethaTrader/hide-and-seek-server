import express from "express";
import cors from "cors";
import { createServer } from "http";
import { Server } from "colyseus"
import {monitor} from "@colyseus/monitor";
import {LobbyRoom} from "./rooms/Lobby";


// Создаем приложение Express
const app = express();

// Включаем CORS
app.use(cors());

// Парсим JSON-тела запросов
app.use(express.json());

// Создаем HTTP-сервер
const server = createServer(app);

const gameServer = new Server({
  server
});

gameServer.define("lobby", LobbyRoom)

app.use("/colyseus", monitor())

// Простая страница с информацией
app.get("/", (req, res) => {
  res.send(`
    <h1>Игровой сервер Colyseus</h1>
    <p>Сервер запущен и готов к подключениям.</p>
    <p><a href="/colyseus">Панель мониторинга</a></p>
  `);
});

// Начинаем прослушивать подключения
const port = 2567;

gameServer.listen(port).then(() => {
  console.log(`Server started on: http://localhost:${port}`);
}).catch(err => {
  console.log(err)
  process.exit(1);
});
