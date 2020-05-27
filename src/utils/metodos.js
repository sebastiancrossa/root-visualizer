// TODO: Documentar los metodos
export const biseccion = (f, a, b, tol, iter_max) => {
  let fa = f(a);
  let fb = f(b);
  let iterArr = [];

  if (fa * fb > 0) {
    console.error("error");
  }

  let delta_x = Math.abs(b - a) / 2;

  let x = 0;
  let converge = false;

  let i = 1;
  for (i; i <= iter_max; i++) {
    x = (a + b) / 2;
    let fx = f(x);

    iterArr.push([i, x.toFixed(4), fx.toFixed(4), delta_x.toFixed(4)]);

    console.log(
      "i: ",
      i,
      "x: ",
      x.toFixed(4),
      "fx: ",
      fx.toFixed(4),
      "dx: ",
      delta_x.toFixed(4)
    );

    if (delta_x <= tol && Math.abs(fx) <= tol) {
      converge = true;
      break;
    }

    if (fa * fx > 0) {
      a = x;
      fa = fx;
    } else {
      b = x;
    }

    delta_x = delta_x / 2;
  }

  if (converge == false) {
    console.log("El metodo no converge");
  }

  let raiz = x;
  return [raiz.toFixed(4), i, converge, iterArr];
};

//Metodo de newton
export const newton = (f, df, x0, tol, iter_max) => {
  let x = x0;
  let fx = f(x);
  let dfx = df(x);
  let iterArr = [];

  let converge = false;
  console.log(
    "i: 0",
    "x: ",
    x.toFixed(4),
    "dfx: ",
    dfx.toFixed(4),
    "fx",
    fx.toFixed(4)
  );

  let i = 1;
  for (i; i < iter_max + 1; i++) {
    let delta_x = -fx / dfx;
    x += delta_x;
    fx = f(x);
    dfx = df(x);

    iterArr.push([
      i,
      x.toFixed(4),
      dfx.toFixed(4),
      fx.toFixed(4),
      delta_x.toFixed(4),
    ]);

    console.log(
      "i: ",
      i,
      "x: ",
      x.toFixed(4),
      "dfx: ",
      dfx.toFixed(4),
      "fx",
      fx.toFixed(4),
      "dx",
      delta_x.toFixed(4)
    );

    if ((Math.abs(delta_x) <= tol && Math.abs(fx) <= tol) || dfx == 0) {
      converge = true;
      break;
    }
  }

  if (converge == false) {
    console.log("El metodo no converge");
  }

  let raiz = x;
  return [raiz.toFixed(4), i, converge, iterArr];
};
