const algorithm = ( questionsList, userAnswer ) => {
  let { memoryValue, timesSeen, timesCorrect, answer, } = questionsList.head.value; // eslint-disable-line

  // User answered corectly
  if ( userAnswer === answer ) {
    const size = questionsList.size();
    // Make sure we're not trying to move item to a position that doesnt exist
    if ( memoryValue >= size ) {
      memoryValue = size - 1;
    } else {
      memoryValue *= 2;
    }
    timesCorrect ++;
    questionsList.insertAt( questionsList.head, memoryValue );
  }
  // User answered incorrectly
  else {
    memoryValue = 1;
    questionsList.insertAt( questionsList.head, memoryValue );
  }
  timesSeen ++;
};

module.exports = algorithm;

/*

User signs up

user is assigned base set of questions all with memory value of 0.5

present user with the first question(head), timesSeen count and timesCorrect count

on submit compare users answer to correct answer

IF correct
    double memory value
    increment times seen by 1 AND times correct by 1
    move current node back n spaces in the list

ELSE(incorrect)
    memory value = 1
    increment times seen by 1
    move current node back n spaces in the list

present user with new first question(head)

LL = {
    head: {
        value: {
            question: 'how many ....?',
            answer: '3',

        }
    }
    next: {

    }
}

*/
