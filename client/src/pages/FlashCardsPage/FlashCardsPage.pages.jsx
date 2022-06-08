import { useEffect, useRef, useState } from "react";
import Card from "../../components/Card/Card.components";
import "./FlashCardsPage.styles.css";
import CustomButton from "../../components/CustomButton/CustomButton.components";
const FlashPage = (props) => {
  const confirmationMenuRef = useRef();
  const cardRef = useRef();
  const [currentCard, setCurrentCard] = useState({});
  const [completed, setCompleted] = useState(0);

  useEffect(() => {
    changeCardText();
    getNewCard();
    // eslint-disable-next-line
  }, [props.currentDifficulty]);
  const revealAnswer = () => {
    cardRef.current.classList.add("flipped");
    confirmationMenuRef.current.classList.remove("hidden");
    cardRef.current.children[1].classList.remove("text-hidden");
  };
  const hideAnswer = () => {
    cardRef.current.classList.remove("flipped");
    confirmationMenuRef.current.classList.add("hidden");
    cardRef.current.children[1].classList.add("text-hidden");
  };
  const getNewCard = () => {
    if (cardRef.current !== null)
      if (!cardRef.current.classList.contains("flipped")) {
        const filteredCards = props.data.filter(
          (card) => card.isAnswered === false
        );
        if (filteredCards.length > 0) {
          let randomNum = Math.floor(Math.random() * filteredCards.length);
          let randomCard = filteredCards[randomNum];
          while (randomNum === filteredCards.indexOf(currentCard)) {
            randomNum = Math.floor(Math.random() * filteredCards.length);
            randomCard = filteredCards[randomNum];
          }
          setCurrentCard(randomCard);
        }
      }
  };

  const changeDifficulty = (e) => {
    if (props.currentDifficulty === "") {
      props.setDifficulty(`${e.target.innerText}`);
      props.data.forEach((item) => {
        item.isAnswered = false;
        setCompleted(0);
        changeCardText();
      });
    } else {
      props.setDifficulty(`${e.target.innerText}`);
      props.data.forEach((item) => {
        item.isAnswered = false;
        setCompleted(0);
      });
    }
  };
  const confirmAnswer = () => {
    if (completed < props.data.length) {
      currentCard.isAnswered = true;
      setCompleted(completed + 1);
      getNewCard();
    }
  };
  const changeCardText = () => {
    if (props.currentDifficulty === "Easy") {
      props.data.forEach((item) => {
        item.currentQuestion = `What is ${item.name}'s origin world`;
        item.currentAnswer = item.origin;
      });
    } else if (props.currentDifficulty === "Medium") {
      props.data.forEach((item) => {
        item.currentQuestion = item.mediumQ;
        item.currentAnswer = item.mediumA;
      });
    } else if (props.currentDifficulty === "Hard") {
      props.data.forEach((item) => {
        item.currentQuestion = `${item.hardQ} and what region are they from?`;
        item.currentAnswer = `${item.hardA} and they are from ${item.region}`;
      });
    }
  };

  return (
    <div className="main-container">
      <Card
        question={currentCard.currentQuestion}
        answer={currentCard.currentAnswer}
        cardRef={cardRef}
      />
      <div className="button-container">
        <CustomButton
          text="New Card"
          onClick={getNewCard}
          className="new-card-btn"
        />
        <CustomButton
          text="Reveal Answer"
          onClick={revealAnswer}
          className="reveal-btn"
        />
      </div>
      <div className="answer-confirmation hidden" ref={confirmationMenuRef}>
        <p className="answer-header">Did you get that one?</p>
        <div className="button-container">
          <CustomButton
            text="Yes"
            onClick={() => {
              hideAnswer();
              confirmAnswer();
            }}
            className="confirm-btn"
          />
          <CustomButton
            text="No"
            onClick={() => {
              hideAnswer();
              getNewCard();
            }}
            className="cancel-btn"
          />
        </div>
      </div>
      <p className="correct-text">
        Correct Answers: {completed}/{props.data.length}
      </p>
      <p className="difficulty">
        Current Difficulty : {props.currentDifficulty}
      </p>
      <CustomButton
        text="Easy"
        onClick={changeDifficulty}
        className="difficulty-button"
      />
      <CustomButton
        text="Medium"
        onClick={changeDifficulty}
        className="difficulty-button"
      />
      <CustomButton
        text="Hard"
        onClick={changeDifficulty}
        className="difficulty-button"
      />
    </div>
  );
};
export default FlashPage;
