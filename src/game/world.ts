import * as THREE from "three";
import { createPlayer } from "./player";
import { Road } from "./road";
import { Obstacles } from "./obstacles";
import { Trees } from "./trees";

export class World {
  private scene = new THREE.Scene();
  private camera: THREE.PerspectiveCamera;
  private renderer: THREE.WebGLRenderer;

  private player: THREE.Mesh;
  private road: Road;
  private obstacles: Obstacles;
  private trees: Trees;

  constructor(private canvas: HTMLCanvasElement) {
    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);

    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      200
    );
    this.camera.position.set(0, 5, 10);
    this.camera.lookAt(0, 0, 0);

    this.player = createPlayer();
    this.scene.add(this.player);

    this.road = new Road(this.scene);
    this.obstacles = new Obstacles(this.scene);
    this.trees = new Trees(this.scene);

    window.addEventListener("resize", () => this.onResize());
    window.addEventListener("keydown", (e) => this.onKeyDown(e));
  }

  private onResize() {
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
  }

  private onKeyDown(event: KeyboardEvent) {
    if (event.key === "ArrowLeft") this.player.position.x -= 1;
    if (event.key === "ArrowRight") this.player.position.x += 1;
  }

  start = () => {
    const tick = () => {
      this.update();
      this.renderer.render(this.scene, this.camera);
      requestAnimationFrame(tick);
    };
    tick();
  };

  private update() {
    this.obstacles.update(this.player);
    this.trees.update();
    this.road.update();
  }
}