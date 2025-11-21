import * as THREE from "three";

export function createPlayer() {
  const geometry = new THREE.BoxGeometry(1.5, 1, 2);
  const material = new THREE.MeshBasicMaterial({ color: 0xff00ff });
  const mesh = new THREE.Mesh(geometry, material);

  mesh.position.set(0, 0.5, 4);
  return mesh;
}