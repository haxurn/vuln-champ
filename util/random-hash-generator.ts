// util/random-hash-generator.ts

export function random(len: number) {
    const options = "qwertyuioasdfghjklzxcvbnm12345678";
    const length = options.length;

    let ans = "";

    for (let i = 0; i < len; i++) {
        ans += options.charAt(Math.floor(Math.random() * length));
    }
    
    return ans;
}