var fs = require('fs');
var nbt = require('nbt');
var png = require('pngjs').PNG;

// stores the corresponding rgba values for all map color codes
colorTranslations = {
    0: [255,255, 255, 255],
    1: [0, 0, 0, 0],
    2: [0, 0, 0, 0],
    3: [0, 0, 0, 0],
    4: [89, 125, 39, 255],
    5: [109, 153, 48, 255],
    6: [127, 178, 56, 255],
    7: [67, 94, 29, 255],
    8: [174, 164, 115, 255],
    9: [213, 201, 140, 255],
    10: [247, 233, 163, 255],
    11: [130, 123, 86, 255],
    12: [140, 140, 140, 255],
    13: [171, 171, 171, 255],
    14: [199, 199, 199, 255],
    15: [105, 105, 105, 255],
    16: [180, 0, 0, 255],
    17: [220, 0, 0, 255],
    18: [255, 0, 0, 255],
    19: [135, 0, 0, 255],
    20: [112, 112, 180, 255],
    21: [138, 138, 220, 255],
    22: [160, 160, 255, 255],
    23: [84, 84, 135, 255],
    24: [117, 117, 117, 255],
    25: [144, 144, 144, 255],
    26: [167, 167, 167, 255],
    27: [88, 88, 88, 255],
    28: [0, 87, 0, 255],
    29: [0, 106, 0, 255],
    30: [0, 124, 0, 255],
    31: [0, 65, 0, 255],
    32: [180, 180, 180, 255],
    33: [220, 220, 220, 255],
    34: [255, 255, 255, 255],
    35: [135, 135, 135, 255],
    36: [115, 118, 129, 255],
    37: [141, 144, 158, 255],
    38: [164, 168, 184, 255],
    39: [86, 88, 97, 255],
    40: [106, 76, 54, 255],
    41: [130, 94, 66, 255],
    42: [151, 109, 77, 255],
    43: [79, 57, 40, 255],
    44: [79, 79, 79, 255],
    45: [96, 96, 96, 255],
    46: [112, 112, 112, 255],
    47: [59, 59, 59, 255],
    48: [45, 45, 180, 255],
    49: [55, 55, 220, 255],
    50: [64, 64, 255, 255],
    51: [33, 33, 135, 255],
    52: [100, 84, 50, 255],
    53: [123, 102, 62, 255],
    54: [143, 119, 72, 255],
    55: [75, 63, 38, 255],
    56: [180, 177, 172, 255],
    57: [220, 217, 211, 255],
    58: [255, 252, 245, 255],
    59: [135, 133, 129, 255],
    60: [152, 89, 36, 255],
    61: [186, 109, 44, 255],
    62: [216, 127, 51, 255],
    63: [114, 67, 27, 255],
    64: [125, 53, 152, 255],
    65: [153, 65, 186, 255],
    66: [178, 76, 216, 255],
    67: [94, 40, 114, 255],
    68: [72, 108, 152, 255],
    69: [88, 132, 186, 255],
    70: [102, 153, 216, 255],
    71: [54, 81, 114, 255],
    72: [161, 161, 36, 255],
    73: [197, 197, 44, 255],
    74: [229, 229, 51, 255],
    75: [121, 121, 27, 255],
    76: [89, 144, 17, 255],
    77: [109, 176, 21, 255],
    78: [127, 204, 25, 255],
    79: [67, 108, 13, 255],
    80: [170, 89, 116, 255],
    81: [208, 109, 142, 255],
    82: [242, 127, 165, 255],
    83: [128, 67, 87, 255],
    84: [53, 53, 53, 255],
    85: [65, 65, 65, 255],
    86: [76, 76, 76, 255],
    87: [40, 40, 40, 255],
    88: [108, 108, 108, 255],
    89: [132, 132, 132, 255],
    90: [153, 153, 153, 255],
    91: [81, 81, 81, 255],
    92: [53, 89, 108, 255],
    93: [65, 109, 132, 255],
    94: [76, 127, 153, 255],
    95: [40, 67, 81, 255],
    96: [89, 44, 125, 255],
    97: [109, 54, 153, 255],
    98: [127, 63, 178, 255],
    99: [67, 33, 94, 255],
    100: [36, 53, 125, 255],
    101: [44, 65, 153, 255],
    102: [51, 76, 178, 255],
    103: [27, 40, 94, 255],
    104: [72, 53, 36, 255],
    105: [88, 65, 44, 255],
    106: [102, 76, 51, 255],
    107: [54, 40, 27, 255],
    108: [72, 89, 36, 255],
    109: [88, 109, 44, 255],
    110: [102, 127, 51, 255],
    111: [54, 67, 27, 255],
    112: [108, 36, 36, 255],
    113: [132, 44, 44, 255],
    114: [153, 51, 51, 255],
    115: [81, 27, 27, 255],
    116: [17, 17, 17, 255],
    117: [21, 21, 21, 255],
    118: [25, 25, 25, 255],
    119: [13, 13, 13, 255],
    120: [176, 168, 54, 255],
    121: [215, 205, 66, 255],
    122: [250, 238, 77, 255],
    123: [132, 126, 40, 255],
    124: [64, 154, 150, 255],
    125: [79, 188, 183, 255],
    126: [92, 219, 213, 255],
    127: [48, 115, 112, 255],
    128: [52, 90, 180, 255],
    129: [63, 110, 220, 255],
    130: [74, 128, 255, 255],
    131: [39, 67, 135, 255],
    132: [0, 153, 40, 255],
    133: [0, 187, 50, 255],
    134: [0, 217, 58, 255],
    135: [0, 114, 30, 255],
    136: [91, 60, 34, 255],
    137: [111, 74, 42, 255],
    138: [129, 86, 49, 255],
    139: [68, 45, 25, 255],
    140: [79, 1, 0, 255],
    141: [96, 1, 0, 255],
    142: [112, 2, 0, 255],
    143: [59, 1, 0, 255],
    144: [147, 124, 113, 255],
    145: [180, 152, 138, 255],
    146: [209, 177, 161, 255],
    147: [110, 93, 85, 255],
    148: [112, 57, 25, 255],
    149: [137, 70, 31, 255],
    150: [159, 82, 36, 255],
    151: [84, 43, 19, 255],
    152: [105, 61, 76, 255],
    153: [128, 75, 93, 255],
    154: [149, 87, 108, 255],
    155: [78, 46, 57, 255],
    156: [79, 76, 97, 255],
    157: [96, 93, 119, 255],
    158: [112, 108, 138, 255],
    159: [59, 57, 73, 255],
    160: [131, 93, 25, 255],
    161: [160, 114, 31, 255],
    162: [186, 133, 36, 255],
    163: [98, 70, 19, 255],
    164: [72, 82, 37, 255],
    165: [88, 100, 45, 255],
    166: [103, 117, 53, 255],
    167: [54, 61, 28, 255],
    168: [112, 54, 55, 255],
    169: [138, 66, 67, 255],
    170: [160, 77, 78, 255],
    171: [84, 40, 41, 255],
    172: [40, 28, 24, 255],
    173: [49, 35, 30, 255],
    174: [57, 41, 35, 255],
    175: [30, 21, 18, 255],
    176: [95, 75, 69, 255],
    177: [116, 92, 84, 255],
    178: [135, 107, 98, 255],
    179: [71, 56, 51, 255],
    180: [61, 64, 64, 255],
    181: [75, 79, 79, 255],
    182: [87, 92, 92, 255],
    183: [46, 48, 48, 255],
    184: [86, 51, 62, 255],
    185: [105, 62, 75, 255],
    186: [122, 73, 88, 255],
    187: [64, 38, 46, 255],
    188: [53, 43, 64, 255],
    189: [65, 53, 79, 255],
    190: [76, 62, 92, 255],
    191: [40, 32, 48, 255],
    192: [53, 35, 24, 255],
    193: [65, 43, 30, 255],
    194: [76, 50, 35, 255],
    195: [40, 26, 18, 255],
    196: [53, 57, 29, 255],
    197: [65, 70, 36, 255],
    198: [76, 82, 42, 255],
    199: [40, 43, 22, 255],
    200: [100, 42, 32, 255],
    201: [122, 51, 39, 255],
    202: [142, 60, 46, 255],
    203: [75, 31, 24, 255],
    204: [26, 15, 11, 255],
    205: [31, 18, 13, 255],
    206: [37, 22, 16, 255],
    207: [19, 11, 8, 255],
}

fs.readdir("maps", function(err, files) {
    // Get all files from the relative maps folder
    for (file of files) {
        const name = file;
        var data = fs.readFileSync('maps/' + name);
        // get the nbt data
        nbt.parse(data, function(error, data) {
            if (error) { console.log(error); }

            var colorData = data.value.data.value.colors.value;

            // prepare output image
            var img = new png({
                width: 128,
                height: 128,
            });

            // for each pixel on the map...
            for (var i = 0; i < colorData.length; i++) {
                // handles negatives (should be read as unsigned int)
                if (colorData[i] < 0) {
                    colorData[i] += 256;
                }
                // decode the map data into rgba (from the mc wiki)
                color = colorTranslations[colorData[i]];
                // then set the corresponding pixel in the image
                img.data[i * 4] = color[0];
                img.data[i * 4 + 1] = color[1];
                img.data[i * 4 + 2] = color[2];
                img.data[i * 4 + 3] = color[3];
            }

            // write image to file
            img.pack().pipe(fs.createWriteStream('images/' + name.slice(0, -4) + ".png"));
        });
    }
});
