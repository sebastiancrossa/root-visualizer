// TODO: Documentar el metodo
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

  let i = 0;
  for (i; i < iter_max + 1; i++) {
    x = (a + b) / 2;
    let fx = f(x);

    iterArr.push([i, x, fx, delta_x]);

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
