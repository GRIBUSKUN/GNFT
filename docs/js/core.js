// var download = document.getElementById("download");
// download.onclick = function () {
//   var Img = document.getElementById("img").getAttribute("href");
//   return download.setAttribute("href", "data:application/octet-stream," + Img);
// };
var bg = {
  json: "resources/bg/background.json",
  png: "resources/bg/background.png",
};
var bg_2 = {
  json: "resources/bg_2/bg_2.json",
  png: "resources/bg_2/bg_2.png",
};
var bg_3 = {
  json: "resources/bg_3/bg_3.json",
  png: "resources/bg_3/bg_3.png",
};
var bg_4 = {
  json: "resources/bg_4/bg_4.json",
  png: "resources/bg_4/bg_4.png",
};
var link = {
  json: "resources/link_gif/link.json",
  png: "resources/link_gif/link.png",
};
var fox = {
  json: "resources/fox/fox.json",
  png: "resources/fox/fox.png",
};
var samus = {
  json: "resources/samus/samus.json",
  png: "resources/samus/samus.png",
};
var rain = {
  json: "resources/rain/rain.json",
  png: "resources/rain/rain.png",
};
var snow = {
  json: "resources/snow/snow.json",
  png: "resources/snow/snow.png",
};

let sprites = [
  [bg, bg_2, bg_3, bg_4],
  [link, fox, samus],
  [rain, snow],
];

let combinaciones = new permutar(sprites);
console.log(combinaciones);
// let sprites = [bg, link, rain];
let size = {
  h: 500,
  w: 600,
};

let canvas,
  context,
  encoder,
  fr,
  frm_combination = 0,
  comb_temp;

function preload() {
  for (let i = 0; i < sprites.length; i++) {
    for (let ii = 0; ii < sprites[i].length; ii++) {
      sprites[i][ii] = {
        spritesheet: loadImage(sprites[i][ii].png),
        spritedata: loadJSON(sprites[i][ii].json),
      };
    }
  }
  // for (let i = 0; i < sprites.length; i++) {
  //   sprites[i] = {
  //     spritesheet: loadImage(sprites[i].png),
  //     spritedata: loadJSON(sprites[i].json),
  //   };
  // }
  fr = sprites[0][0].spritedata;
}
function setup() {
  frameRate(20);
  createCanvas(size.w, size.h).id("bitmap");
  for (let i = 0; i < sprites.length; i++) {
    for (let ii = 0; ii < sprites[i].length; ii++) {
      sprites[i][ii] = new layer(
        sprites[i][ii].spritedata,
        sprites[i][ii].spritesheet
      );
    }
  }
  // canvas = document.getElementById("bitmap");
  // context = canvas.getContext("2d");
  // encoder = new GIFEncoder();
  // encoder.setRepeat(0); //auto-loop
  // encoder.setDelay(0);
  // console.log(encoder.start());
}

function draw() {
  frameRate(20);
  background(0);
  for (let i = 0; i < sprites.length; i++) {
    sprites[i][combinaciones[frm_combination][i]].show();
    
  }
  if (fr.frames.length === frameCount) {
    frameCount = 0;
    console.log(combinaciones[frm_combination]);
    frm_combination++;
  }
  if (frm_combination === combinaciones.length) {
    noLoop();
  }
  // for (let i = 0; i < sprites.length; i++) {
  //   for (let ii = 0; ii < sprites[i].length; ii++) {
  //     const element = array[ii];

  //   }
  //   sprites[i][frm_combination].show();

  //   if (fr.frames.length === frameCount) {
  //     frm_combination++;
  //     frameCount=0;
  //   }

  // if (fr.frames.length === frameCount) {
  //   Endraw();
  // } else if (i + 1 === sprites.length) {
  //   console.log(encoder.addFrame(context));
  // }
}

function Endraw() {
  encoder.finish();
  document
    .getElementById("img")
    .setAttribute(
      "src",
      "data:image/gif;base64," + encode64(encoder.stream().getData())
    );
  noLoop();
  document.getElementById("canvas").setAttribute("style", "display:none;");
  generaDescargableGif(
    "image/gif," + encode64(encoder.stream().getData()),
    "img"
  );
  // document.getElementById("download").setAttribute('download',"data:image/gif;base64," + encode64(encoder.stream().getData()));
}
function generaDescargableGif(data, name) {
  var arrdata = data.split(",");
  var fileBase64 = arrdata[1];
  var mime = arrdata[0];

  var binary_string = window.atob(fileBase64);
  var len = binary_string.length;
  var bytes = new Uint8Array(len);
  for (var i = 0; i < len; i++) {
    bytes[i] = binary_string.charCodeAt(i);
  }

  var arrBuffer = bytes.buffer;

  // It is necessary to create a new blob object with mime-type explicitly set
  // otherwise only Chrome works like it should
  var newBlob = new Blob([arrBuffer], { type: mime });

  // IE doesn't allow using a blob object directly as link href
  // instead it is necessary to use msSaveOrOpenBlob
  if (window.navigator && window.navigator.msSaveOrOpenBlob) {
    window.navigator.msSaveOrOpenBlob(newBlob);
    return;
  }

  // For other browsers:
  // Create a link pointing to the ObjectURL containing the blob.
  var data = window.URL.createObjectURL(newBlob);

  var link = document.getElementById("download");
  link.href = data;
  link.download = name;
  link.setAttribute("style", "display:block;");
}

let suit_of_sprites = [
  ["red", "blue", "yellow", "green"],
  ["aple", "banana", "orange"],
  ["sliced", "not sliced"],
];
