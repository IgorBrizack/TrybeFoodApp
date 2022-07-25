import { factorTags, checkIfAlcoholic } from "../helpers/setDoneRecipes";

describe('Testa as funções helpers', () => {
  it('Testa factorTags', () => {
    expect(factorTags('um, dois, três')).toStrictEqual(['um', 'dois', 'três']);
    expect(factorTags('umdoistres')).toStrictEqual(['umdoistres']);
  });
  it('Testa checkIfAlcoholic', () => {
    expect(checkIfAlcoholic('Alcoholic')).toBe('Alcoholic');
    expect(checkIfAlcoholic('Non alcoholic')).toBe('Non alcoholic');
  });
});