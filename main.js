import { vertex_shader_source, fragment_shader_source } from "./shader.js";
import { Mat4 } from "./matrix.js";
/**
 * @type {HTMLCanvasElement | null}
 */
const canvas = document.getElementById("canvas");
if (canvas === null) {
    throw new Error("canvas");
}
canvas.width = 300;
canvas.height = 300;

/**
 * @type {WebGLRenderingContext | null}
 */
const gl = canvas.getContext("webgl");
if (gl === null) {
    throw new Error("gl");
}
gl.clearDepth(1.0);
gl.clearColor(0.0, 0.0, 0.0, 1.0);

gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

/**
 * @param {string} s
 * @param {string} type
 * @returns {WebGLShader | null}
 */
function create_shader(s, type) {
    /**
     * @type {WebGLShader | null}
     */
    let shader = null;

    if (type === "vertex") {
        shader = gl.createShader(gl.VERTEX_SHADER);
    } else if (type === "fragment") {
        shader = gl.createShader(gl.FRAGMENT_SHADER);
    } else {
        return null;
    }

    if (shader === null) {
        return null;
    }

    gl.shaderSource(shader, s);
    gl.compileShader(shader);

    if (gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        return shader;
    } else {
        console.error(gl.getShaderInfoLog(shader));
        return null;
    }
}

/* 
 * @param {WebGLShader} vs
 * @param {WebGLShader} fs
 * @returns {WebGLProgram | null}
 */
function create_program(vs, fs) {
    /**
     * @type {WebGLProgram | null}
     */
    const program = gl.createProgram();
    if (program === null) {
        return null;
    }

    gl.attachShader(program, vs);
    gl.attachShader(program, fs);

    gl.linkProgram(program);

    if (gl.getProgramParameter(program, gl.LINK_STATUS)) {
        gl.useProgram(program);
        return program;
    } else {
        console.error(gl.getProgramInfoLog(program));
        return null;
    }
}

/**
 * @param {Array<number> | Float32Array} data
 * @returns {WebGLBuffer | null}
 */
function create_vbo(data) {
    /**
     * @type {WebGLBuffer | null}
     */
    const vbo = gl.createBuffer();
    if (vbo === null) {
        return null;
    }

    gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data), gl.STATIC_DRAW);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);

    return vbo;
}
