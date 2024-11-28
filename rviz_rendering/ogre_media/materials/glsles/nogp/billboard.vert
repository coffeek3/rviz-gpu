#version 100
precision mediump int;
precision mediump float;

// Computes the position of a billboard vertex so
// the resulting quad will face the camera.
// Texture coords are used to determine which corner
// of the billboard we compute.

uniform mat4 worldviewproj_matrix;
uniform vec4 camera_pos;
uniform vec4 size;
uniform vec4 auto_size;

attribute vec4 a_position;    // 顶点位置 (替代 gl_Vertex)
attribute vec2 uv0;           // 纹理坐标 
// attribute vec2 texCoord;   // 纹理坐标 (替代 gl_MultiTexCoord0)
// attribute vec4 a_color;    // 顶点颜色 (替代 gl_Color)
attribute vec4 colour;        // 顶点颜色

varying vec2 v_texCoord;      // 传递给片段着色器的纹理坐标
varying vec4 v_color;         // 传递给片段着色器的颜色

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
  vec3 at = camera_pos.xyz - a_position.xyz;
  at = normalize(at);
  vec3 right = cross(vec3( 0.0, 1.0, 0.0 ), at);
  vec3 up = cross(at, right);
  right = normalize(right);
  up = normalize(up);

  // if auto_size == 1, then size_factor == size * a_position.z
  // if auto_size == 0, then size_factor == size
  
  vec4 size_factor = (1.0 - auto_size.x + (auto_size.x * a_position.z)) * size;

  vec4 s = vec4(uv0, 0.0, 0.0) * size_factor;
  vec3 r = s.xxx * right;
  vec3 u = s.yyy * up;
  
  vec4 pos = a_position + vec4(r + u, 0.0);
  
  // gl_PointSize = 5.0;
  // gl_Position = vec4(a_position.xyz, 1.0);
  gl_Position = worldviewproj_matrix * pos;
  v_texCoord = uv0+ vec2(0.5, 0.5);  // 纹理坐标传递给片段着色器
  v_color = colour;  // 将颜色传递给片段着色器

#ifdef WITH_DEPTH
  passDepth( pos );
#endif
}
