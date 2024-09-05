#version 100
precision mediump float;  // 定义浮点精度

uniform mat4 worldview_matrix;

varying float depth;
        
void passDepth( vec4 pos )
{
  vec4 pos_rel_view = worldview_matrix * pos;
  depth = -pos_rel_view.z;
}
