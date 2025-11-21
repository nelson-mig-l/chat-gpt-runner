import * as THREE from "three";
import { createGlowMaterial } from "./glowMaterial";

export class Obstacles {
  private obstacles: THREE.Mesh[] = [];

  constructor(private scene: THREE.Scene) {}

  update(player: THREE.Mesh) {
    for (const obj of this.obstacles) {
      obj.position.z += 0.5;

      if (obj.position.z > 10) {
        this.scene.remove(obj);
        this.obstacles = this.obstacles.filter((o) => o !== obj);
      }

      if (Math.abs(obj.position.x - player.position.x) < 1 &&
          Math.abs(obj.position.z - player.position.z) < 1) {
        console.log("💥 Collision!");
      }
    }

    if (Math.random() < 0.02) {
      const geometry = new THREE.BoxGeometry(1, 1, 1);
      const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
      const obstacle = new THREE.Mesh(geometry, material);

      obstacle.position.set(
        (Math.random() * 6) - 3,
        0.5,
        -20
      );
      const glow = new THREE.Mesh(
        geometry.clone(),
        createGlowMaterial(0xff0000, 2.0)
      );
      glow.scale.set(1.2, 1.2, 1.2);
      obstacle.add(glow);

      this.scene.add(obstacle);
      this.obstacles.push(obstacle);
    }
  }
}