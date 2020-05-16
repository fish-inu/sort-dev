chrome.runtime.onMessage.addListener(function (message, sender) {
  if (message.runFunc === "LIKES") {
    console.log("sort by likes");
    sortByLikes();
  } else if (message.runFunc === "DATE") {
    console.log("sort by date");
    sortByDates();
  } else return;
});

function sortByLikes() {
  articles = document
    .getElementById("articles-list")
    .querySelectorAll("article");
  original_articles = [...articles];
  sorted_articles = [...articles].sort((a, b) => {
    result =
      parseInt(
        b.querySelector(
          "a.crayons-btn.crayons-btn--s.crayons-btn--ghost.crayons-btn--icon-left"
        ).innerText
      ) -
      parseInt(
        a.querySelector(
          "a.crayons-btn.crayons-btn--s.crayons-btn--ghost.crayons-btn--icon-left"
        ).innerText
      );
    return result;
  });

  for (let i = 0; i < original_articles.length; i++) {
    original_articles[i].outerHTML = sorted_articles[i].outerHTML;
  }
}

function sortByDates() {
  articles = document
    .getElementById("articles-list")
    .querySelectorAll("article");
  original_articles = [...articles];
  sorted_articles = [...articles].sort(
    (a, b) =>
      new Date(
        b.querySelector("time").dateTime ||
          convertDate(b.querySelector("time").innerText)
      ) -
      new Date(
        a.querySelector("time").dateTime ||
          convertDate(a.querySelector("time").innerText)
      )
  );
  for (let i = 0; i < original_articles.length; i++) {
    original_articles[i].outerHTML = sorted_articles[i].outerHTML;
  }
}

function convertDate(date_text) {
  let date = new Date(date_text);
  if (date_text.includes("hour")) {
    let difference = date_text.match(/\d+(?= hour)/)[0];
    let current_hour = new Date().getHours();
    date.setHours(current_hour - parseInt(difference));
    return date;
  } else if (date_text.includes("min")) {
    date.setHours(new Date().getHours());
    let difference = date_text.match(/\d+(?= min)/)[0];
    let current_min = new Date().getMinutes();
    date.setMinutes(current_min - parseInt(difference));
    return date;
  } else if (date_text.includes("second")) {
    date.setHours(new Date().getHours());
    date.setMinutes(new Date().getMinutes());
    let difference = date_text.match(/\d+(?= second)/)[0];
    let current_sec = new Date().getSeconds();
    date.setSeconds(current_sec - parseInt(difference));
    return date;
  } else return date;
}
