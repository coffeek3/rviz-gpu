#version 100
attribute vec3 aPos;  // 顶点位置属性
void main()
{
    gl_Position = vec4(aPos, 1.0);
}
