export const calculateExercises = (args: Array<string>) => {
  const results = {
    periodLength: 0,
    trainingDays: 0,
    success: false,
    rating: 0,
    ratingDescription: '',
    target: 0,
    average: 0
  };

  results.target = Number(args[2]);

  for (let i = 0; i < 3; i++) {
    args.shift();
  }

  results.periodLength = args.length;

  let hours = 0;

  for (const arg of args) {
    hours += Number(arg);
    if (Number(arg) > 0) results.trainingDays += 1;
  }

  results.average = hours / results.periodLength;
  results.average < results.target
    ? results.success = false
    : results.success = true;

  const rating = results.average / results.target;

  if (rating < 0.5) {
    results.rating = 1;
    results.ratingDescription = 'bad';
  } else if (rating >= 0.5 && rating < 1) {
    results.rating = 2;
    results.ratingDescription = 'not too bad but could be better';
  } else {
    results.rating = 3;
    results.ratingDescription = 'excellent';
  }
  
  if (isNaN(results.target) || isNaN(results.average)) {
    console.log('malformatted parameters');
    return 'malformatted parameters';
  } else {
    console.log(results);
    return results;
  }
};

calculateExercises(process.argv);