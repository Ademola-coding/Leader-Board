import './style.css';

import LeaderBoard from './API/api.js';

const Form = document.querySelector('form');
const player = document.querySelector('#Y_name');
const playerScore = document.querySelector('#Y_score');
const list = document.querySelector('.list');
const refreshBtn = document.querySelector('#refresh-btn');

const LBA = new LeaderBoard();

let gameId;
document.addEventListener('DOMContentLoaded', () => {
  LBA.Game('my cool new game')
    .then((response) => response.result.split(' '))
    .then((res) => {
      [gameId] = [res[3]];
    });
});

Form.addEventListener('submit', (e) => {
  LBA.postScore(gameId, player.value, playerScore.value);
  player.value = '';
  playerScore.value = '';
  e.preventDefault();
});

const returnedData = (Data) => {
  list.innerHTML = '';
  Data.forEach((item) => {
    list.innerHTML += `<li class="item">${item.user} : ${item.score}</li>`;
  });
};

refreshBtn.addEventListener('click', () => {
  LBA.getScores(gameId).then((resData) => returnedData(resData.result));
});