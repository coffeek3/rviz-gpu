#version 100
precision mediump int;
precision mediump float;

// Minimal depth passthrough shader
uniform mat4 worldviewproj_matrix;
attribute vec4 a_position;  // 用 aPosition 替代 gl_Vertex
attribute vec4 colour;     // 顶点颜色

varying vec4 vColor;       // 传递给片段着色器的颜色

void main() {
    gl_Position = worldviewproj_matrix * a_position;
    vColor = colour;  // 传递顶点颜色
}
