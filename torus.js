import { HSVAtoRGBA } from "./HSVAtoRGBA.js";

/**
 * @param {number} si 柱の断面の円の頂点数
 * @param {number} sj トーラスを構成する断面の円の数
 * @param {number} r
 * @param {number} R
 * @returns {}
 */
export function torus(si, sj, r, R) {
    let pos = [];
    let color = [];
    let index = [];
    
    for (let i = 0; i < si; i++) {
        const a = ((Math.PI * 2) / si) * i;//角度(0 ~ Math.PI * 2)
        const cosA = Math.cos(a);//x
        const sinA = Math.sin(a);//y
        for (let j = 0; j < sj; j++) {
            const b = ((Math.PI * 2) / sj) * j;//角度(0 ~ Math.PI * 2)
            const cosB = Math.cos(b);
            const sinB = Math.sin(b);
            const x = (r * cosA + R) * cosB;
            const y = r * sinA;
            const z = (r * cosA + R) * sinB;
            pos.push(x, y, z);
            const col = HSVAtoRGBA([(360 / sj) * j, 1, 1, 1]);
            color.push(col[0], col[1], col[2], col[3]);
        }
    }
    for(i = 0; i < si; i++){
        for(j = 0; j < sj; j++){
            const r = (sj + 1) * i + j;
            index.push(r, r + sj + 1, r + 1);
            index.push(r + sj + 1, r + sj + 2, r + 1);
        }
    }
    return [pos, color, index];
}
