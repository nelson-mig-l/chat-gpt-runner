import { World } from "./game/world";

const canvas = document.getElementById("game") as HTMLCanvasElement;
const world = new World(canvas);

world.start();