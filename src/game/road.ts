import * as THREE from "three";
import { createGlowMaterial } from "./glowMaterial";

export class Road {
  private segments: THREE.Mesh[] = [];

  constructor(private scene: THREE.Scene) {
    const geometry = new THREE.PlaneGeometry(10, 50);
    const glowGeometry = geometry.clone();
    const material = new THREE.MeshBasicMaterial({
      color: 0x303030,
      side: THREE.DoubleSide,
    });
    const glowMaterial = createGlowMaterial(0xffffff, 0.7);

    for (let i = 0; i < 3; i++) {
      const segment = new THREE.Mesh(geometry, material);
      segment.rotation.x = -Math.PI / 2;
      segment.position.z = -50 * i;

      const glowStrip = new THREE.Mesh(glowGeometry, glowMaterial);
      glowStrip.position.y = 0.1;
      segment.add(glowStrip);

      this.scene.add(segment);
      this.segments.push(segment);
    }
  }

  update() {
    for (const seg of this.segments) {
      seg.position.z += 0.5;
      if (seg.position.z > 50) seg.position.z -= 150;
    }
  }
}