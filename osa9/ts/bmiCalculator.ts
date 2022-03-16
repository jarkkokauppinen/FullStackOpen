export const calculateBmi = (height: number, weight: number) => {
  const index = weight / (height / 100.0 * height / 100.0);
  let comment = '';
  
  if (index < 18.5) {
    comment = 'Underweight';
  } else if (index >= 18.5 && index < 25) {
    comment = 'Normal (healthy weight)';
  } else if (index >= 25 && index < 30) {
    comment = 'Overweight';
  } else {
    comment = 'Obese';
  }

  console.log(comment);
  return comment;
};

const a = Number(process.argv[2]);
const b = Number(process.argv[3]);
calculateBmi(a, b);