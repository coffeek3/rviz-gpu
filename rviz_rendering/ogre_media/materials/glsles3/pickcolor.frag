#version 100
precision mediump int;
precision mediump float;
// Passes the vertex pick color 

uniform vec4 pick_color;

void main()
{
  gl_FragColor = pick_color;
}
