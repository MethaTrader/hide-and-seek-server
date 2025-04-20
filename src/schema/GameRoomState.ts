import {MapSchema, Schema, type} from "@colyseus/schema";
import {Player} from "./Player";

export class GameRoomState extends Schema {
    @type("string") roomName: string = "Игра";

    @type({map: Player}) players = new MapSchema<Player>();
}