import { vertex_shader_source, fragment_shader_source } from "./shader.js";
import { Mat4 } from "./matrix.js";

/**
 * @param {WebGLRenderingContext} gl
 * @param {string} source
 * @param {"vertex" | "fragment"} type
 * @returns {WebGLShader | null}
 */
function create_shader(gl, source, type) {
    /** @type {WebGLShader | null} */
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

    gl.shaderSource(shader, source);
    gl.compileShader(shader);

    if (gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        return shader;
    } else {
        console.error(gl.getShaderInfoLog(shader));
        return null;
    }
}

/**
 * @param {WebGLRenderingContext} gl
 * @param {WebGLShader} vs
 * @param {WebGLShader} fs
 * @returns {WebGLProgram | null}
 */
function create_program(gl, vs, fs) {
    /** @type {WebGLProgram | null} */
    const program = gl.createProgram();
    if (program === null) {
        return null;
    }

    gl.attachShader(program, vs);
    gl.attachShader(program, fs);

    gl.linkProgram(program);

    if (gl.getProgramParameter(program, gl.LINK_STATUS)) {
        return program;
    } else {
        console.error(gl.getProgramInfoLog(program));
        return null;
    }
}

/**
 * @param {WebGLRenderingContext} gl
 * @param {Array<number> | Float32Array} data
 * @returns {WebGLBuffer | null}
 */
function create_vbo(gl, data) {
    /** @type {WebGLBuffer | null} */
    const vbo = gl.createBuffer();
    if (vbo === null) {
        return null;
    }

    gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data), gl.STATIC_DRAW);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);

    return vbo;
}

/** @type {HTMLCanvasElement | null} */
const canvas = document.getElementById("canvas");

if (canvas === null) {
    throw new Error("canvas");
}

canvas.width = 300;
canvas.height = 300;

/** @type {WebGLRenderingContext | null} */
const gl = canvas.getContext("webgl");

if (gl === null) {
    throw new Error("gl");
}

/** @type {WebGLShader | null} */
const vertex_shader = create_shader(gl, vertex_shader_source, "vertex");
/** @type {WebGLShader | null} */
const fragment_shader = create_shader(gl, fragment_shader_source, "fragment");

if (vertex_shader === null || fragment_shader === null) {
    throw new Error("create_shader");
}

/** @type {WebGLProgram | null} */
const program = create_program(gl, vertex_shader, fragment_shader);

if (program === null) {
    throw new Error("create_program");
}

gl.useProgram(program);

/** @type {Record<string, number>} */
const attributeLocations = {
    "position": gl.getAttribLocation(program, "position"),
    "color": gl.getAttribLocation(program, "color"),
};
/** @type {Record<string, number>} */
const attributeStrides = {
    "position": 3,
    "color": 4,
};

/** @type {Record<string, number>} */
const uniformLocations = {
    "matrix": gl.getUniformLocation(program, "matrix"),
};

/**
 * @param {WebGLRenderingContext} gl
 * @returns {void}
 */
function mainLoop(gl) {
    gl.clearDepth(1.0);
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    /** @type {Float32Array} */
    const mMatrix = Mat4.identity(Mat4.create());
    /** @type {Float32Array} */
    const vMatrix = Mat4.identity(Mat4.create());
    /** @type {Float32Array} */
    const pMatrix = Mat4.identity(Mat4.create());

    /** @type {Float32Array} **/
    const mvpMatrix = Mat4.identity(Mat4.create());

    gl.uniformMatrix4fv(uniformLocations["matrix"], false, mvpMatrix);

    gl.drawArrays(gl.TRIANGLES, 0, 3);

    requestAnimationFrame(mainLoop);
}

mainLoop(gl);
