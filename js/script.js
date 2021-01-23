let lineDrawing = anime({
  targets: '#titlecontainer .lines path',
  strokeDashoffset: [anime.setDashoffset, 0],
  easing: 'easeInOutSine',
  duration: 500,
  delay: function(el, i) { return i * 250 },
  direction: 'alternate',
  loop: false
});