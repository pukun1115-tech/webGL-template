export class Mat4 {
    /**
     * @returns {Float32Array}
     **/
    static create() {
        return new Float32Array([
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1,
        ]);
    }

    static translate(out, mat, x, y, z) {
        out[12] = mat[0] * x + mat[4] * y + mat[8] * z + mat[12];
        out[13] = mat[1] * x + mat[5] * y + mat[9] * z + mat[13];
        out[14] = mat[2] * x + mat[6] * y + mat[10] * z + mat[14];
        out[15] = mat[3] * x + mat[7] * y + mat[11] * z + mat[15];

        return out;
    }

    static scale(out, mat, x, y, z) {
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

    static rotateZ(out, mat, rad) {
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

    static rotateX(out, mat, rad) {
        const sin = Math.sin(rad);
        const cos = Math.cos(rad);

        const m4 = mat[4], m5 = mat[5], m6 = mat[6], m7 = mat[7];
        const m8 = mat[8], m9 = mat[9], m10 = mat[10], m11 = mat[11];

        out[4] = m4 * cos + m8 * sin;
        out[5] = m5 * cos + m9 * sin;
        out[6] = m6 * cos + m10 * sin;
        out[7] = m7 * cos + m11 * sin;

        out[8] = m4 * -sin + m8 * cos;
        out[9] = m5 * -sin + m9 * cos;
        out[10] = m6 * -sin + m10 * cos;
        out[11] = m7 * -sin + m11 * cos;

        return out;
    }

    static rotateY(out, mat, rad) {
        const cos = Math.cos(rad);
        const sin = Math.sin(rad);

        const m0 = mat[0], m1 = mat[1], m2 = mat[2], m3 = mat[3];
        const m8 = mat[8], m9 = mat[9], m10 = mat[10], m11 = mat[11];

        out[0] = m0 * cos + m8 * -sin;
        out[1] = m1 * cos + m9 * -sin;
        out[2] = m2 * cos + m10 * -sin;
        out[3] = m3 * cos + m11 * -sin;

        out[8] = m0 * sin + m8 * cos;
        out[9] = m1 * sin + m9 * cos;
        out[10] = m2 * sin + m10 * cos;
        out[11] = m3 * sin + m11 * cos;

        return out;
    }

    static multiply(out, a, b) {
        out[0] = a[0] * b[0] + a[4] * b[1] + a[8] * b[2] + a[12] * b[3];
        out[1] = a[1] * b[0] + a[5] * b[1] + a[9] * b[2] + a[13] * b[3];
        out[2] = a[2] * b[0] + a[6] * b[1] + a[10] * b[2] + a[14] * b[3];
        out[3] = a[3] * b[0] + a[7] * b[1] + a[11] * b[2] + a[15] * b[3];

        out[4] = a[0] * b[4] + a[4] * b[5] + a[8] * b[6] + a[12] * b[7];
        out[5] = a[1] * b[4] + a[5] * b[5] + a[9] * b[6] + a[13] * b[7];
        out[6] = a[2] * b[4] + a[6] * b[5] + a[10] * b[6] + a[14] * b[7];
        out[7] = a[3] * b[4] + a[7] * b[5] + a[11] * b[6] + a[15] * b[7];

        out[8] = a[0] * b[8] + a[4] * b[9] + a[8] * b[10] + a[12] * b[11];
        out[9] = a[1] * b[8] + a[5] * b[9] + a[9] * b[10] + a[13] * b[11];
        out[10] = a[2] * b[8] + a[6] * b[9] + a[10] * b[10] + a[14] * b[11];
        out[11] = a[3] * b[8] + a[7] * b[9] + a[11] * b[10] + a[15] * b[11];

        out[12] = a[0] * b[12] + a[4] * b[13] + a[8] * b[14] + a[12] * b[15];
        out[13] = a[1] * b[12] + a[5] * b[13] + a[9] * b[14] + a[13] * b[15];
        out[14] = a[2] * b[12] + a[6] * b[13] + a[10] * b[14] + a[14] * b[15];
        out[15] = a[3] * b[12] + a[7] * b[13] + a[11] * b[14] + a[15] * b[15];
        
        return out;
    }
}
