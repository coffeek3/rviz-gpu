#version 100
precision mediump int;
precision mediump float;

// Rasterizes a smooth square on any face of a box
// and creates a fake lighting effect
// x,y,z texture coords must be in the interval (-0.5...0.5)

uniform vec4 highlight;
uniform float alpha;

varying vec3 v_texCoord;   // 从顶点着色器传递的纹理坐标
varying vec4 v_color;      // 从顶点着色器传递的颜色

//const float lightness[6] = float[6] (
//    0.9, 0.5, 0.6, 0.6, 1.0, 0.4 );
const float l0 = 0.9;
const float l1 = 0.5;
const float l2 = 0.6;
const float l3 = 0.6;
const float l4 = 1.0;
const float l5 = 0.4;

void main()
{
  float ax;
  float ay;
  float l;
  
  if ( v_texCoord.z < -0.4999 )
  {
    ax = v_texCoord.x;
    ay = v_texCoord.y;
    l = l0;
  }
  else if ( v_texCoord.z > 0.4999 )
  {
    ax = v_texCoord.x;
    ay = v_texCoord.y;
    l = l1;
  }
  else if ( v_texCoord.x > 0.4999 )
  {
    ax = v_texCoord.y;
    ay = v_texCoord.z;
    l = l2;
  }
  else if ( v_texCoord.x < -0.4999 )
  {
    ax = v_texCoord.y;
    ay = v_texCoord.z;
    l = l3;
  }
  else if ( v_texCoord.y > 0.4999 )
  {
    ax = v_texCoord.x;
    ay = v_texCoord.z;
    l = l4;
  }
  else
  {
    ax = v_texCoord.x;
    ay = v_texCoord.z;
    l = l5;
  }

  float blend = smoothstep(-0.48, -0.45, ay) * (1.0 - smoothstep(0.45, 0.48, ay)) *
                smoothstep(-0.48, -0.45, ax) * (1.0 - smoothstep(0.45, 0.48, ax));
  
  float inv_blend = 1.0 - blend;
  
  vec3 col = (0.5 + 0.5 * blend) * v_color.xyz;
  col = col * l;
  col = col + col * highlight.xyz;

  gl_FragColor = vec4(col.r, col.g, col.b, alpha * v_color.a);
}
