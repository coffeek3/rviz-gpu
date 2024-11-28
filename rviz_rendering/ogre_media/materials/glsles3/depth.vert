#version 300 es
precision mediump int;
precision mediump float;

// Uniform 变量
uniform mat4 worldviewproj_matrix; // 世界-视图-投影矩阵
uniform mat4 worldview_matrix;     // 世界-视图矩阵

// 顶点属性
in vec4 a_position; // 顶点位置属性

// 输出给片段着色器的变量
out float v_depth;

float passDepth(vec4 pos)
{
    vec4 pos_rel_view = worldview_matrix * pos;
    return -pos_rel_view.z;
}

void main() {
    gl_Position = worldviewproj_matrix * a_position;
    v_depth = passDepth(a_position); // 将深度值传递给片段着色器
}
