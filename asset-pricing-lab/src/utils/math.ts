export function expectedValue(probabilities: number[], values: number[]): number {
  return probabilities.reduce((sum, p, i) => sum + p * values[i], 0);
}

export function covariance(
  probabilities: number[],
  xs: number[],
  ys: number[]
): number {
  const meanX = expectedValue(probabilities, xs);
  const meanY = expectedValue(probabilities, ys);
  return probabilities.reduce(
    (sum, p, i) => sum + p * (xs[i] - meanX) * (ys[i] - meanY),
    0
  );
}

export function variance(probabilities: number[], values: number[]): number {
  return covariance(probabilities, values, values);
}

export function dotProduct(a: number[], b: number[]): number {
  return a.reduce((sum, val, i) => sum + val * b[i], 0);
}
