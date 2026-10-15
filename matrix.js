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

    static scale(mat, x, y, z) {
        const out = new Float32Array(mat);

        out[0] = mat[0] * x;
        out[1] = mat[1] * x;
        out[2] = mat[2] * x;
        out[3] = mat[3] * x;

        out[4] = mat[4] * y;
        out[5] = mat[5] * y;
        out[6] = mat[6] * y;
        out[7] = mat[7] * y;

        out[8] = mat[8] * z;
        out[9] = mat[9] * z;
        out[10] = mat[10] * z;
        out[11] = mat[11] * z;

        return out;
    }
}