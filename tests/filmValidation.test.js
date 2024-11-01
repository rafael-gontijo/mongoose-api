const { filmSchema } = require('../src/validation/filmValidation');

describe('Film Validation Schema', () => {
  const validFilm = {
    title: 'A Ameaça Fantasma - Episódio I (1999)',
    description: 'Um filme de ficção científica e aventura',
    image_url: 'https://upload.wikimedia.org/star_wars.png',
    imdb_url: 'https://www.imdb.com/title/tt0120915/',
    trailer_url: 'https://www.youtube.com/watch?v=bD7bpG-zDJQ',
    year: 1999,
  };

  it('deve validar um objeto de filme correto', () => {
    const { error } = filmSchema.validate(validFilm);
    expect(error).toBeUndefined();
  });

  it('deve falhar se o "title" for muito curto ou muito longo', () => {
    let invalidFilm = { ...validFilm, title: '' };
    let { error } = filmSchema.validate(invalidFilm);
    expect(error).not.toBeUndefined();
    expect(error.details[0].message).toContain('"title" is not allowed to be empty');

    invalidFilm = { ...validFilm, title: 'a'.repeat(101) };
    ({ error } = filmSchema.validate(invalidFilm));
    expect(error).not.toBeUndefined();
    expect(error.details[0].message).toContain('"title" length must be less than or equal to 100');
  });

  it('deve falhar se "description" tiver mais de 500 caracteres', () => {
    const invalidFilm = { ...validFilm, description: 'a'.repeat(501) };
    const { error } = filmSchema.validate(invalidFilm);
    expect(error).not.toBeUndefined();
    expect(error.details[0].message).toContain('"description" length must be less than or equal to 500');
  });

  it('deve falhar se "image_url" não for um URI válido', () => {
    const invalidFilm = { ...validFilm, image_url: 'imagem-invalida' };
    const { error } = filmSchema.validate(invalidFilm);
    expect(error).not.toBeUndefined();
    expect(error.details[0].message).toContain('"image_url" must be a valid uri');
  });

  it('deve falhar se "imdb_url" não for um URI válido', () => {
    const invalidFilm = { ...validFilm, imdb_url: 'imdb-invalido' };
    const { error } = filmSchema.validate(invalidFilm);
    expect(error).not.toBeUndefined();
    expect(error.details[0].message).toContain('"imdb_url" must be a valid uri');
  });

  it('deve falhar se "trailer_url" não for um URI válido', () => {
    const invalidFilm = { ...validFilm, trailer_url: 'trailer-invalido' };
    const { error } = filmSchema.validate(invalidFilm);
    expect(error).not.toBeUndefined();
    expect(error.details[0].message).toContain('"trailer_url" must be a valid uri');
  });
});
