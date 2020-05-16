document.getElementById("sortByLikes").onclick = () => {
  sendMes("LIKES");
};
document.getElementById("sortByDate").onclick = () => {
  sendMes("DATE");
};

function sendMes(funcType) {
  chrome.tabs.query(
    {
      active: true,
      currentWindow: true,
    },
    (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, { runFunc: funcType });
    }
  );
}
