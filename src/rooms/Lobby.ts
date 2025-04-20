import {Room, Client} from "colyseus";
import {LobbyState} from "../schema/LobbyState";
import {Player} from "../schema/Player";

export class LobbyRoom extends Room<LobbyState> {
    maxClients = 200;

    onCreate(options:any) {

    this.setState(new LobbyState());

        if (options.roomName) {
            this.state.roomName = options.roomName;
        }
    }

    onJoin(client: Client, options:any) {
        const playerName = options.username || `Игрок ${this.clients.length}`;

        console.log(`Joining room: ${client.sessionId} [${playerName}]`);
        const player = new Player(playerName);

        this.state.players.set(client.sessionId, player);
        this.broadcast("*", { roomId: "game_room"})


        client.send("welcome", {
            message: `Welcome ${playerName}`,
        })
    }

    onLeave(client: Client, options:any) {
        console.log("leave room", client.sessionId);
    }

    onDispose() {
        console.log(`Dispose room ${this.roomId}`);
    }
}