import * as THREE from "three";
import { createGlowMaterial } from "./glowMaterial";

export function createPlayer() {
  const geometry = new THREE.BoxGeometry(1.5, 1, 2);
  const material = new THREE.MeshBasicMaterial({ color: 0xff00ff });
  const mesh = new THREE.Mesh(geometry, material);

  const glow = new THREE.Mesh(
    geometry.clone(),
    createGlowMaterial(0xff00ff, 1.5)
  );
  glow.scale.set(1.1, 1.1, 1.1);
  mesh.add(glow);

  mesh.position.set(0, 0.5, 4);
  return mesh;
}