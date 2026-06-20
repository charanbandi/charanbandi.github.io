import { useEffect, useRef } from 'react'

const VS = `attribute vec2 a;void main(){gl_Position=vec4(a,0.,1.);}`

const FS = `precision highp float;
uniform float T;uniform vec2 R;
float h(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5);}
float n(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(h(i),h(i+vec2(1,0)),f.x),mix(h(i+vec2(0,1)),h(i+vec2(1,1)),f.x),f.y);}
void main(){
  float ps=4.;
  vec2 cell=floor(gl_FragCoord.xy/ps);
  vec2 fr=fract(gl_FragCoord.xy/ps);
  vec2 uv=cell/(R/ps);
  vec2 q=vec2(n(uv*3.+T*.14),n(uv*3.+vec2(5.2,1.3)+T*.1));
  float nm=n(uv*2.8+q*.55+T*.07);
  float nm2=n(uv*5.5-q*.3-T*.05+vec2(3.3,1.7));
  float val=nm*.55+nm2*.45;
  float bright=smoothstep(.44,.58,val)*(0.35+.65*nm);
  bright*=.87+.13*sin(T*3.5+h(cell)*6.28);
  bright*=1.-step(.87,max(fr.x,fr.y))*.92;
  vec2 eu=gl_FragCoord.xy/R;
  bright*=smoothstep(0.,.18,min(min(eu.x,1.-eu.x),min(eu.y,1.-eu.y)));
  gl_FragColor=vec4(.176,.831,.749,bright);
}`

export default function PixelScatter() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const gl = canvas.getContext('webgl', { alpha: true, premultipliedAlpha: false, antialias: false })
    if (!gl) return

    const resize = () => {
      const w = canvas.offsetWidth
      const h = canvas.offsetHeight
      if (!w || !h) return
      canvas.width = w
      canvas.height = h
      gl.viewport(0, 0, w, h)
    }
    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(canvas)

    gl.enable(gl.BLEND)
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA)

    const vs = gl.createShader(gl.VERTEX_SHADER)!
    gl.shaderSource(vs, VS); gl.compileShader(vs)
    const fs = gl.createShader(gl.FRAGMENT_SHADER)!
    gl.shaderSource(fs, FS); gl.compileShader(fs)

    const prog = gl.createProgram()!
    gl.attachShader(prog, vs); gl.attachShader(prog, fs)
    gl.bindAttribLocation(prog, 0, 'a')
    gl.linkProgram(prog)
    gl.useProgram(prog)

    const buf = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buf)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1,1,-1,-1,1,1,1]), gl.STATIC_DRAW)
    gl.enableVertexAttribArray(0)
    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0)

    const uT = gl.getUniformLocation(prog, 'T')
    const uR = gl.getUniformLocation(prog, 'R')

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const start = performance.now()
    let raf = 0

    function draw(t: number) {
      gl!.clearColor(0, 0, 0, 0)
      gl!.clear(gl!.COLOR_BUFFER_BIT)
      gl!.uniform1f(uT, t)
      gl!.uniform2f(uR, canvas!.width, canvas!.height)
      gl!.drawArrays(gl!.TRIANGLE_STRIP, 0, 4)
    }

    if (reducedMotion) {
      draw(0)
    } else {
      const frame = () => { draw((performance.now() - start) / 1000); raf = requestAnimationFrame(frame) }
      raf = requestAnimationFrame(frame)
    }

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
    }
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
}
