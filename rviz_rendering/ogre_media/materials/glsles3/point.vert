#version 300 es
precision mediump int;
precision mediump float;

// Generic vertex shader for point sprites
// Sets position and point size.
// Works for perspective and orthographic projection.

uniform mat4 worldviewproj_matrix; // 世界-视图-投影矩阵
uniform mat4 worldview_matrix;     // 世界-视图矩阵
uniform vec4 size;                 // 点的大小

// 顶点属性
layout(location = 0) in vec4 position; // 自定义顶点位置属性
layout(location = 1) in vec4 colour;   // 自定义颜色属性
layout(location = 2) in vec2 uv0;      // 自定义纹理坐标

// 顶点输出
out vec4 v_color;       // 传递给片段着色器的颜色
out vec2 v_texCoord;    // 传递给片段着色器的纹理坐标

#ifdef WITH_DEPTH
out float depth;        // 传递给片段着色器的深度值

float passDepth(vec4 pos)
{
    vec4 pos_rel_view = worldview_matrix * pos;
    return -pos_rel_view.z;
}
#endif

void main()
{
    gl_Position = worldviewproj_matrix * position; // 使用自定义的顶点位置属性
    v_color = colour;                              // 将颜色传递给片段着色器
    gl_PointSize = size.x;                         // 设置点的大小
    v_texCoord = uv0;                              // 将纹理坐标传递给片段着色器

#ifdef WITH_DEPTH
    depth = passDepth(position);                  // 计算深度值
#endif
}
