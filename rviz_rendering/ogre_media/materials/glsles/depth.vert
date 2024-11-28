#version 100
precision mediump int;
precision mediump float;
// Minimal depth passthrough shader

uniform mat4 worldviewproj_matrix;
attribute vec4 a_position;

uniform mat4 worldview_matrix;

varying float depth;
        
float passDepth( vec4 pos )
{
  vec4 pos_rel_view = worldview_matrix * pos;
  depth = -pos_rel_view.z;
  return depth;
}


void main() {
    gl_Position = worldviewproj_matrix * a_position;
    depth = passDepth( a_position );
}
