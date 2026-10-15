export class Mat4 {
    static create() {
        return new Float32Array([
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1,
        ]);
    }

    static translate(mat, x, y, z) {
        const out = new Float32Array(mat);

        out[12] = mat[0] * x + mat[4] * y + mat[8] * z + mat[12];
        out[13] = mat[1] * x + mat[5] * y + mat[9] * z + mat[13];
        out[14] = mat[2] * x + mat[6] * y + mat[10] * z + mat[14];
        out[15] = mat[3] * x + mat[7] * y + mat[11] * z + mat[15];

        return out;
    }
}