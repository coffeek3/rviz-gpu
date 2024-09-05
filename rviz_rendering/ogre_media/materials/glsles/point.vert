#version 100
precision mediump float;  // 定义浮点精度

// Generic vertex shader for point sprites
// sets position and point size.
// Works for perspective and orthographic projection.

uniform mat4 worldviewproj_matrix;
uniform mat4 worldview_matrix;
uniform vec4 size;

attribute vec4 a_position;  // 自定义顶点位置属性
attribute vec4 a_color;     // 自定义颜色属性

varying vec4 v_color;       // varying 变量，将颜色传递给片段着色器
varying float depth;       

void passDepth( vec4 pos )
{
  vec4 pos_rel_view = worldview_matrix * pos;
  depth = -pos_rel_view.z;
}

void main()
{
    gl_Position = worldviewproj_matrix * a_position;  // 使用自定义的顶点位置属性
    v_color = a_color;  // 将颜色传递给片段着色器
    gl_PointSize = size.x;

#ifdef WITH_DEPTH
    passDepth(a_position);  // 使用自定义的顶点位置属性
#endif
}