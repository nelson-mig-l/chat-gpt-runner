import * as THREE from "three";
import vertex from "../shaders/glowVertex.glsl";
import fragment from "../shaders/glowFragment.glsl";

export function createGlowMaterial(color: number, intensity = 1.0) {
  return new THREE.ShaderMaterial({
    uniforms: {
      glowColor: { value: new THREE.Color(color) },
      intensity: { value: intensity }
    },
    vertexShader: vertex,
    fragmentShader: fragment,
    transparent: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false
  });
}
