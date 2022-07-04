export const combine = (input, nextFn) => nextFn(input) || input;
export const pipe = (...fns) => (input) => fns.reduce(combine, input);
export const usingPipe = (input, ...fns) => pipe(...fns)(input);

export default {
  combine,
  pipe,
  usingPipe,
};
