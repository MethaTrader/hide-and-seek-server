import { Room, Client } from "colyseus";
import { LobbyState } from "../schema/LobbyState";
import { Player } from "../schema/Player";

export class LobbyRoom extends Room<LobbyState> {
    maxClients = 200;

    onCreate(options: any) {
        this.setState(new LobbyState());

        if (options.roomName) {
            this.state.roomName = options.roomName;
        }


        this.onMessage("update-position", (client, options) => {
            const player = this.state.players.get(client.sessionId);

            if (player) {
                const message = JSON.parse(options);

                player.x = message.x;
                player.y = message.y;

                console.log(`Player ${client.sessionId} has ${player.name} position: ${message.x} | ${message.y}`);
            }
        })
    }

    onJoin(client: Client, options: any) {
        const playerName = options.username || `Игрок ${this.clients.length}`;

        console.log(`Joining room: ${client.sessionId} [${playerName}]`);

        // Создаем нового игрока с начальной позицией
        const player = new Player(playerName);

        // Добавление игрока в состояние автоматически синхронизирует его со всеми клиентами
        this.state.players.set(client.sessionId, player);

        // Отправляем приветственное сообщение только новому игроку
        client.send("welcome", {
            message: `Welcome ${playerName}`,
            sessionId: client.sessionId
        });
    }

    onLeave(client: Client) {
        console.log(`Player ${client.sessionId} left the room`);

        // Удаляем игрока из состояния
        this.state.players.delete(client.sessionId);
    }

    onDispose() {
        console.log(`Dispose room ${this.roomId}`);
    }
}