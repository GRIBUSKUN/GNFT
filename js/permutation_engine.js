class permutar {
  constructor(sprites) {
    this.sprites = sprites;
    this.suit_temporal = [];
    this.suit_final = [];
    this.indices = (e) => {
      e = [];
      sprites.forEach((el) => {
        e.push(el.length);
      });
      return e;
    };
    this.iteraciones_totales = this.indices().reduce((a, b) => a * b);
    this.iteracion_x_indice = (e) => {
      let v = [];
      let indices = this.indices().slice(1, this.indices().length);
      let multiplicacion;
      this.indices().forEach((e) => {
        multiplicacion = 1;
        for (let i = 0; i < indices.length; i++) {
          multiplicacion = multiplicacion * indices[i];
        }
        v.push(multiplicacion);
        indices.shift();
      });
      return v;
    };

    var suit_final = [];
    var suit_temp = [];
    var suit_sup = [];

    for (let i = 0; i < this.sprites.length; i++) {
      for (let ii = 0; ii < this.sprites[i].length; ii++) {
        for (let iii = 0; iii < this.iteracion_x_indice()[i]; iii++) {
          suit_sup.push(ii);
        }
      }
      var tmp = suit_sup;
      var dup = this.iteraciones_totales / suit_sup.length - 1;
      for (let i = 0; i < dup; i++) {
        suit_sup = suit_sup.concat(tmp);
      }
      suit_temp.push(suit_sup.splice(0, suit_sup.length));
    }
    for (let i = 0; i < this.iteraciones_totales; i++) {
      var sup = [];
      for (let ii = 0; ii < suit_temp.length; ii++) {
        sup.push(suit_temp[ii][i]);
      }
      suit_final.push(sup);
    }
    return suit_final;
  }
  cuantos(peticion) {
    let resp;
    switch (peticion) {
      case "indices":
        resp = this.indices();
        break;
      case "iteraciones_totales":
        resp = this.iteraciones_totales;
        break;
        break;
      case "iteracion_x_indice":
        resp = this.iteracion_x_indice();
        break;
      default:
        resp = "COMANDO INVALIDO";
        break;
    }
    return resp;
  }
}
