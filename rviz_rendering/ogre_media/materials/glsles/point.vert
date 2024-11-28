#version 100
precision mediump int;
precision mediump float;

// Generic vertex shader for point sprites
// sets position and point size.
// Works for perspective and orthographic projection.

uniform mat4 worldviewproj_matrix;
uniform mat4 worldview_matrix;
uniform vec4 size;

attribute vec4 position;  // 自定义顶点位置属性
attribute vec4 colour;     // 自定义颜色属性
// attribute vec2 a_texCoord;
attribute vec2 uv0;

varying vec4 v_color;       // varying 变量，将颜色传递给片段着色器
varying vec2 v_texCoord;   

#ifdef WITH_DEPTH
varying float depth; 
float passDepth( vec4 pos )
{
  vec4 pos_rel_view = worldview_matrix * pos;
  depth = -pos_rel_view.z;
  return depth;
}
#endif

void main()
{
    // gl_Position = vec4(a_position.xyz, 1.0);
    gl_Position = worldviewproj_matrix * position;  // 使用自定义的顶点位置属性
    v_color = colour;  // 将颜色传递给片段着色器
    gl_PointSize = size.x;
    
    v_texCoord = uv0;

#ifdef WITH_DEPTH
    depth = passDepth(position);  // 使用自定义的顶点位置属性
#endif
}