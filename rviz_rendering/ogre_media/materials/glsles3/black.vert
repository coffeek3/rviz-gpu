#version 100
precision mediump int;
precision mediump float;

// This vertex shader simply passes the position to the fragment shader.

attribute vec4 a_position;

void main()
{
    // Pass the vertex position to the rasterizer.
    gl_Position = a_position;
}
