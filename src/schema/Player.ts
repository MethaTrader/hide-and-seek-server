import { Schema, type } from "@colyseus/schema";

export class Player extends Schema {
    @type("string") name: string = "";

    @type("number") x: number = 0;
    @type("number") y: number = 0;

    constructor(name: string = "") {
        super();
        this.name = name;

        this.x = Math.random() * 100;
        this.y = Math.random() * 100;
    }
}