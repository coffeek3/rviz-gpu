#version 100
precision mediump int;
precision mediump float;

// Passes the fragment color unchanged 
varying vec4 v_color; 

void main()
{
  gl_FragColor = v_color;
}
