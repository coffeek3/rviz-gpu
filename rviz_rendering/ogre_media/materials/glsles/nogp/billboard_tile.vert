#version 100
precision mediump int;
precision mediump float;

attribute vec4 a_position;    // 顶点位置
attribute vec2 uv0;    // 纹理坐标
attribute vec4 colour;       // 顶点颜色

uniform mat4 worldviewproj_matrix;  // 世界-视图-投影矩阵
uniform vec4 size;                 // 尺寸
uniform vec4 normal;               // 法线
uniform vec4 up;                   // 向上方向

varying vec2 v_texCoord;            // 传递给片段着色器的纹理坐标
varying vec4 v_color;               // 传递给片段着色器的颜色

#ifdef WITH_DEPTH
uniform mat4 worldview_matrix;
varying float depth;

void passDepth( vec4 pos )
{
  vec4 pos_rel_view = worldview_matrix * pos;
  depth = -pos_rel_view.z;
}

#endif

void main()
{
  vec3 right = cross(up.xyz, normal.xyz);
  
  vec4 s = vec4(uv0, 0.0, 0.0) * size;
  vec3 r = s.xxx * right;
  vec3 u = s.yyy * up.xyz;
  
  vec4 pos = a_position + vec4(r + u, 0.0);
  
  gl_Position = worldviewproj_matrix * pos;
  v_texCoord = uv0 + vec2(0.5, 0.5);
  v_color = colour;  // 将颜色传递给片段着色器

#ifdef WITH_DEPTH
  passDepth( pos );
#endif
}
