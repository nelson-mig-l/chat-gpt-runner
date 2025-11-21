uniform vec3 glowColor;
uniform float intensity;

varying vec3 vNormal;

void main() {
    float glow = pow(intensity - dot(vNormal, vec3(0.0, 0.0, 1.0)), 4.0);
    gl_FragColor = vec4(glowColor * glow, 1.0);
}
