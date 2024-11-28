#version 100
precision mediump float;  // 定义浮点精度

// Draws a circle in the fragment color, multiplying a with the alpha param

uniform vec4 highlight;
uniform float alpha;

varying vec4 v_color;
varying vec2 v_texCoord;

void circleImpl( vec4 color, float ax, float ay )
{
float rsquared = ax*ax+ay*ay;
 float a = (0.25 - rsquared) * 4.0;
 gl_FragColor = vec4(color.rgb, color.a * ceil(a));
}

void main()
{
  vec3 col = v_color.xyz + v_color.xyz * highlight.xyz;
  circleImpl( vec4(col, alpha * v_color.a), v_texCoord.x-0.5, v_texCoord.y-0.5 );
  
}
