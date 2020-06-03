'use strict';

let allHorns = [];
let templateHTMLID = '#horn-template';
let allKeywordsUnique = [];

function Horns(obj) {
  this.image_url = obj.image_url;
  this.title = obj.title;
  this.description = obj.description;
  this.keyword = obj.keyword;
  this.horns = obj.horns;
  allHorns.push(this);
  this.addKeyword(this.keyword);
}

Horns.prototype.render = function(){
  let hornTemplate = $(templateHTMLID).html();
  let html = Mustache.render(hornTemplate, this);
  $('main').append(html);
};

Horns.prototype.renderKeyword = function(){
  const $newOption = $('<option></option>').text(this.keyword);
  $('#keywords').append($newOption);
};

Horns.prototype.addKeyword = function(){
  if (!allKeywordsUnique.includes(this.keyword.toLowerCase())){
    allKeywordsUnique.push(this.keyword.toLowerCase());
    this.renderKeyword();
  }
};

$.ajax('data/page-2.json', {method: 'GET', dataType: 'JSON'})
  .then(jsonHorns => {
    jsonHorns.forEach(oneHornObj => {
      new Horns(oneHornObj).render();
    })
  })

$(document).ready(function(){
  $('#keywords').on('change', function(){
    $('main').children().remove();
    allHorns.forEach(oneHorn => {
      if(oneHorn.keyword === this.value){
        oneHorn.render();
      }
    });
  });
});
