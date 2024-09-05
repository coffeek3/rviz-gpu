#version 100

varying vec4 v_color;

// Passes the fragment color, multiplying a with the alpha param

uniform vec4 highlight;
uniform float alpha;


void main()
{
  vec3 col = v_color.xyz + v_color.xyz * highlight.xyz;
  gl_FragColor = vec4(col, v_color.a * alpha);
}
