import { modulo } from "common/hooks/useMath";

Number.prototype.modulo = function (this: number, n: number) {
  "use strict";
  return modulo(this, n);
};

declare global {
  interface Number {
    modulo: (n: number) => number;
  }
}
