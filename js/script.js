(function () {
  'use strict';
  let draggedEl,
      onDragStart,
      onDrag,
      onDragEnd,
      grabPointY,
      grabPointX,
      createNote,
      addNoteBtnEl;

  onDragStart = function (ev)  {
    let boundingClientRect;
    if (ev.target.className.indexOf('bar') === -1) {
      return;
    }

    draggedEl = this;
    boundingClientRect = draggedEl.getBoundingClientRect();
    grabPointY = boundingClientRect.top - ev.clientY;
    grabPointX = boundingClientRect.left - ev.clientX;
    };

  onDrag = (ev) => {
    if(!draggedEl) {
      return;
    }
    let posX = ev.clientX + grabPointX;
    let posY = ev.clientY + grabPointY;

    if(posX < 0 ) {
      posX = 0;
    }

    if(posY < 0 ) {
      posY = 0;
    }
    draggedEl.style.transform = "translateX(" + posX + "px) translateY(" + posY + "px)";
  };

  onDragEnd = () => {
    draggedEl = null;
    grabPointX = null;
    grabPointY = null;
  };

  createNote = () => {
    const noteElement = document.createElement('div');
    const barElement = document.createElement('bar');
    const textArea = document.createElement('textarea');

    const transformCSSValue = "translateX(" + Math.random() * 400 + "px) translateY(" + Math.random() * 400 + "px)";
    noteElement.style.transform = transformCSSValue;

    noteElement.classList.add('note');
    barElement.classList.add('bar');

    noteElement.appendChild(barElement);
    noteElement.appendChild(textArea);
    document.body.appendChild(noteElement);
    
    noteElement.addEventListener('mousedown', onDragStart, false)
  };


  addNoteBtnEl = document.querySelector('.create');
  addNoteBtnEl.addEventListener('click', createNote);
  document.addEventListener('mousemove', onDrag, false);
  document.addEventListener('mouseup', onDragEnd, false);

})();
