function getAge(date: Date): number {
  const currentDate = new Date();

  let years = currentDate.getFullYear() - date.getFullYear();

  if (
    currentDate.getMonth() < date.getMonth() ||
    (currentDate.getMonth() === date.getMonth() &&
      currentDate.getDate() < date.getDate())
  )
    years -= 1;

  return years;
}

const Ivan = {
  name: 'Ivan',
  surname: 'Martynjuk',
  age: getAge(new Date(1994, 12, 14, 3, 0, 0, 0)),
  city: 'Gomel',
  role: 'Team Lead',
  skill: 'Front-end Developer',
  tasks: [''],
};

const Ekaterina = {};

const Vladzimir = {};

export { Ivan, Ekaterina, Vladzimir };
