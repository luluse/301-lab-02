'use strict';

let allHorns = [];
let templateHTMLID = '#horn-template';

function Horns(obj) {
  this.image_url = obj.image_url;
  this.title = obj.title;
  this.description = obj.description;
  this.keyword = obj.keyword;
  this.horns = obj.horns;
  allHorns.push(this);
}

Horns.prototype.render = function() {
  const myTemplate = $(templateHTMLID).html();
  const $newSection = $(`<section>${myTemplate}</section`);
  $newSection.find('h2').text(this.title);
  $newSection.find('p').text(this.description);
  $newSection.find('img').attr('src', this.image_url);
  $('main').append($newSection);
};

$.ajax('data/page-1.json', {method: 'GET', dataType: 'JSON'})
  .then(jsonHorns => {
    jsonHorns.forEach(oneHornObj => {
      new Horns(oneHornObj).render();
    })
  })
