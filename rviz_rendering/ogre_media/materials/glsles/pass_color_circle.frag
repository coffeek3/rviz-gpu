#version 100
precision mediump float;  // 定义浮点精度

// Draws a circle in the fragment color

void circleImpl( vec4 color, float ax, float ay )
{
  float rsquared = ax*ax+ay*ay;
  float a = (0.25 - rsquared) * 4.0;
  gl_FragColor = vec4(color.rgb, color.a * ceil(a));
}
uniform vec4 pick_color;
varying vec2 v_texCoord; 
void main()
{
  circleImpl( pick_color, v_texCoord.x-0.5, v_texCoord.y-0.5 );
}
