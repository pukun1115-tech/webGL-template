/**
 * @type {string}
 */
export const vertex_shader = `
    attribute vec3 position;
    attribute vec4 color;

    uniform mat4 matrix;

    varying vec4 vcolor;

    void main() {
        vcolor = color;
        gl_Position = matrix * vec4(position, 1.0);
    }
`;

/**
 * @type {string}
 */
export const fragment_shader = `
    precision mediump float;

    varying vec4 vcolor;

    void main() {
        gl_FragColor = vcolor;
    }
`;