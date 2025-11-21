import * as THREE from "three";
import { createGlowMaterial } from "./glowMaterial";

export class Trees {
  private trees: THREE.Mesh[] = [];

  constructor(private scene: THREE.Scene) {}

  update() {
    for (const tree of this.trees) {
      tree.position.z += 0.5;

      if (tree.position.z > 10) {
        this.scene.remove(tree);
        this.trees = this.trees.filter((t) => t !== tree);
      }
    }

    if (Math.random() < 0.01) {
      const geometry = new THREE.BoxGeometry(1, 3, 1);
      const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });

      const left = new THREE.Mesh(geometry, material);
      left.position.set(-6, 1.5, -20);
      this.scene.add(left);
      this.trees.push(left);

      const right = new THREE.Mesh(geometry, material);
      right.position.set(6, 1.5, -20);

      const glow = new THREE.Mesh(
        geometry.clone(),
        createGlowMaterial(0x00ff00, 1.5)
      );
      glow.scale.set(1.2, 1.2, 1.2);
      right.add(glow);
      left.add(glow);

      this.scene.add(right);
      this.trees.push(right);
    }
  }
}