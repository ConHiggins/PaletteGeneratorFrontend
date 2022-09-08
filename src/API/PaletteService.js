export const fetchColours = async (colour, size, setColours) => {
    try {
        const response = await fetch("http://localhost:8080/palettes/create", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                Color: colour,
                size: size,
            }),
        });
        if (!response.ok) {
            throw new Error(response.status + " error with request");
        }
        const data = await response.json();
        setColours(data);
    } catch (error) {
        alert(error.message);
    }
};

export const fetchColoursBaseRGB = async (colour, size, rgb, setColours) => {
    try {
        const response = await fetch(
            "http://localhost:8080/palettes/create/rgb",
            {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    Color: colour,
                    size: size,
                    rgb: rgb,
                }),
            }
        );
        if (!response.ok) {
            throw new Error(response.status + " error with request");
        }
        const data = await response.json();
        setColours(data);
    } catch (error) {
        alert(error.message);
    }
};

export const savePalette = async (palette, name, createdBy) => {
    try {
        const response = await fetch("http://localhost:8080/palettes/save", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },

            body: JSON.stringify({
                coloursHex: palette,
                name: name,
                createdBy: createdBy,
            }),
        });
        if (!response.ok) {
            throw new Error(response.status + " error with request");
        }
    } catch (error) {
        alert(error.message);
    }
};

const componentToHex = (c) => {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
};

export const rgbToHex = (r, g, b) => {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
};

export const hexToRGB = (hex) => {
    let r, g, b;
    r = parseInt(hex.slice(1, 3), 16);
    g = parseInt(hex.slice(3, 5), 16);
    b = parseInt(hex.slice(5, 7), 16);

    return [r, g, b];
};

export const RGBtoHSL = (r, g, b) => {
    r /= 255;
    g /= 255;
    b /= 255;

    let cmin = Math.min(r, g, b),
        cmax = Math.max(r, g, b),
        delta = cmax - cmin,
        h = 0,
        s = 0,
        l = 0;

    ///Hue
    if (delta == 0) {
        h = 0;
    } else if (cmax == r) {
        h = ((g - b) / delta) % 6;
    } else if (cmax == g) {
        h = (b - r) / delta + 2;
    } else {
        h = (r - g) / delta + 4;
    }

    h = Math.round(h * 60);

    if (h < 0) {
        h += 360;
    }

    ///Luminence
    l = (cmax + cmin) / 2;

    //Saturation
    s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));

    s = +(s * 100).toFixed(1);
    l = +(l * 100).toFixed(1);

    return [h, s, l];
};

export const HSLtoRGB = (h, s, l) => {
    s /= 100;
    l /= 100;

    let chroma = (1 - Math.abs(2 * l - 1)) * s,
        x = chroma * (1 - Math.abs(((h / 60) % 2) - 1)),
        m = l - chroma / 2,
        r = 0,
        g = 0,
        b = 0;

    if (0 <= h && h < 60) {
        r = chroma;
        g = x;
        b = 0;
    } else if (60 <= h && h < 120) {
        r = x;
        g = chroma;
        b = 0;
    } else if (120 <= h && h < 180) {
        r = 0;
        g = chroma;
        b = x;
    } else if (180 <= h && h < 240) {
        r = 0;
        g = x;
        b = chroma;
    } else if (240 <= h && h < 300) {
        r = x;
        g = 0;
        b = chroma;
    } else if (300 <= h && h < 360) {
        r = chroma;
        g = 0;
        b = x;
    }

    r = Math.round((r + m) * 255);
    g = Math.round((g + m) * 255);
    b = Math.round((b + m) * 255);

    return [r, g, b];
};

const fib = (n) => {
    if (n == 0) {
        return 0;
    } else if (n == 1) {
        return 1;
    } else {
        return fib(n - 1) + fib(n - 2);
    }
};

export const fibonacciPalette = (baseHex, paletteSize) => {
    const baseRGB = hexToRGB(baseHex);
    const baseHSL = RGBtoHSL(baseRGB[0], baseRGB[1], baseRGB[2]);
    let palette = [];
    for (let i = 0; i < paletteSize; i++) {
        baseHSL[0] = baseHSL[0] + fib(i);
        while (baseHSL[0] > 360) {
            baseHSL[0] -= 360;
        }
        baseHSL[1] = baseHSL[1] + fib(i);
        while (baseHSL[1] > 100) {
            baseHSL[1] -= 100;
        }
        baseHSL[2] = baseHSL[2] + fib(i);
        while (baseHSL[2] > 100) {
            baseHSL[2] -= 100;
        }
        console.log(baseHSL[2]);
        palette[i] = HSLtoRGB(baseHSL[0], baseHSL[1], baseHSL[2]);
        palette[i] = rgbToHex(palette[i][0], palette[i][1], palette[i][2]);
    }

    const finalPalette = Array.from(
        new Set(
            palette.map((c) => {
                return c;
            })
        )
    );

    console.log("fib", finalPalette);
    return finalPalette;
};
