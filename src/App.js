import React from "react";
import alanBtn from "@alan-ai/alan-sdk-web";
import NewsCards from "./components/NewsCards/NewsCards";
import useStyles from "./styles";
import wordsToNumbers from "words-to-numbers";

const alanKey =
  "a50d65fe5fa21c406c903bf12d575c6b2e956eca572e1d8b807a3e2338fdd0dc/stage";

function App() {
  const [newsArticles, setNewsArticles] = React.useState([]);
  const [activeArticle, setActiveArticle] = React.useState(0);
  const classes = useStyles();

  React.useEffect(() => {
    alanBtn({
      key: alanKey,
      onCommand: ({ command, articles, number }) => {
        if (command === "newHeadlines") {
          // console.log(articles);
          // console.log(data);
          // console.log(body);
          setNewsArticles(articles);
          setActiveArticle(-1);
        } else if (command === "highlight") {
          setActiveArticle((prevActiveArticle) => prevActiveArticle + 1);
        } else if (command === "open") {
          // console.log(number);
          const parsedNumber =
            number.length > 2
              ? wordsToNumbers(number, { fuzzy: true })
              : number;

          const article = articles[parsedNumber - 1];

          if (parsedNumber > 20) {
            alanBtn().playText("Please try again");
          } else if (article) {
            window.open(article.url, "_blank");
            alanBtn.playText("Opening...");
          }
        }
      },
    });
  }, []);

  return (
    <div className="App">
      <div className={classes.logoContainer}>
        <img
          src="https://i.pinimg.com/564x/31/54/db/3154dbb2009829daf406521287d7828c.jpg"
          className={classes.alanLogo}
          alt="logo"
        />
      </div>
      <NewsCards articles={newsArticles} activeArticle={activeArticle} />
    </div>
  );
}

export default App;
