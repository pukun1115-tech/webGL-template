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

    static rotateZ(mat, rad) {
        const out = new Float32Array(mat);

        const sin = Math.sin(rad);
        const cos = Math.cos(rad);

        const m0 = mat[0], m1 = mat[1], m2 = mat[2], m3 = mat[3];
        const m4 = mat[4], m5 = mat[5], m6 = mat[6], m7 = mat[7];

        out[0] = m0 * cos + m4 * sin;
        out[1] = m1 * cos + m5 * sin;
        out[2] = m2 * cos + m6 * sin;
        out[3] = m3 * cos + m7 * sin;

        out[4] = m0 * -sin + m4 * cos;
        out[5] = m1 * -sin + m5 * cos;
        out[6] = m2 * -sin + m6 * cos;
        out[7] = m3 * -sin + m7 * cos;

        return out;
    }

    static rotateX(mat, rad) {
        const out = new Float32Array(mat);

        const sin = Math.sin(rad);
        const cos = Math.cos(rad);

        const m4 = mat[4], m5 = mat[5], m6 = mat[6], m7 = mat[7];
        const m8 = mat[8], m9 = mat[9], m10 = mat[10], m11 = mat[11];

        out[4] = m4 * cos + m8 * sin;
        out[5] = m5 * cos + m9 * sin;
        out[6] = m6 * cos + m10 * sin;
        out[7] = m7 * cos - m11 * sin;

        out[8] = m4 * -sin + m8 * cos;
        out[9] = m5 * -sin + m9 * cos;
        out[10] = m6 * -sin + m10 * cos;
        out[11] = m7 * -sin + m11 * cos;

        return out;
    }

    static rotateY(mat, rad) {
        const out = new Float32Array(mat);
        const c = Math.cos(rad);
        const s = Math.sin(rad);

        const m0 = mat[0], m1 = mat[1], m2 = mat[2], m3 = mat[3];
        const m8 = mat[8], m9 = mat[9], m10 = mat[10], m11 = mat[11];

        out[0] = m0 * c + m8 * -s;
        out[1] = m1 * c + m9 * -s;
        out[2] = m2 * c + m10 * -s;
        out[3] = m3 * c + m11 * -s;

        out[8] = m0 * s + m8 * c;
        out[9] = m1 * s + m9 * c;
        out[10] = m2 * s + m10 * c;
        out[11] = m3 * s + m11 * c;

        return out;
    }
}