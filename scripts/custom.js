$(document).ready(function () {
  
  // Scrollspy initiation
  $('body').scrollspy({
    target: '#myNavbar'
  })

  // Prevents users from unintended page translation via right click
  // $(function () {
  //   $(this).bind("contextmenu", function (e) {
  //     e.preventDefault();
  //   });
  // });

  // On render, adjust body padding to ensure last Scroll target can reach top of screen
  var lastIdHeight = $('#languages').innerHeight();
  var footerHeight = $('.container-footer').innerHeight();
  var windowHeight = $(window).height();
  var navHeight = $('nav.navbar').innerHeight();
  var windowIsTooSmall = Boolean(lastIdHeight < windowHeight);
  if (windowIsTooSmall) {
    $('.container-scroll').css("height", windowHeight - lastIdHeight - footerHeight + "px");
  }


  // On window resize, adjust body padding to ensure last Scroll target can reach top of screen
  $(window).resize(function (event) {
    var lastIdHeight = $('#languages').innerHeight();
    var footerHeight = $('.container-footer').innerHeight();
    var windowHeight = $(window).height();
    var navHeight = $('nav.navbar').innerHeight();
    var windowIsTooSmall = Boolean(lastIdHeight < windowHeight);
    if (windowIsTooSmall) {
      $('.container-scroll').css("height", windowHeight - lastIdHeight - footerHeight + "px");
    }
  });


  // Collapses active dropdown menu on max-width: 1200px and any link clicked upon
  // $(document).click(function (event) {
  //   var click = $(event.target);
  //   var _open = $(".navbar-collapse").hasClass("show");
  //   var _dropdown = window.matchMedia('(max-width: 1200px)').matches;
  //   if (_open === true && _dropdown === true && !click.hasClass("navbar-toggler")) {
  //     $(".navbar-toggler").click();
  //   }
  // });

    // Collapses active dropdown
  $(document).click(function (event) {
    var click = $(event.target);
    var _open = $(".navbar-collapse").hasClass("show");
    // var _dropdown = window.matchMedia('(max-width: 1200px)').matches;
    if (_open === true && !click.hasClass("navbar-toggler")) {
      $(".navbar-toggler").click();
    }
  });


  // Toggle class="on" on div with id #toggle
  $(".navbar-toggler").click(function() {
    $("#toggle").toggleClass("on");
  });

  
  // Smooth scrolling
  const duration = 800;

  const scrollToTarget = function (target) {
    const top = target.getBoundingClientRect().top;
    const startPos = window.pageYOffset;
    const diff = top;

    let startTime = null;
    let requestId;

    const loop = function (currentTime) {
      if (!startTime) {
        startTime = currentTime;
      }

      // Elapsed time in miliseconds
      const time = currentTime - startTime;

      const percent = Math.min(time / duration, 1);
      const easeInQuad = function (t) {
        return t * t;
      };
      window.scrollTo(0, startPos + diff * percent);

      if (time < duration) {
        // Continue moving
        requestId = window.requestAnimationFrame(loop);
      } else {
        window.cancelAnimationFrame(requestId);
      }
    };
    requestId = window.requestAnimationFrame(loop);
  };

  // const triggers = [].slice.call(document.querySelectorAll('.trigger'));
  const triggers = [...document.querySelectorAll('.trigger')];
  // let activeTriggerEle = triggers.length === 0 ? null : triggers[0];

  const clickHandler = function (e) {

    // Prevent the default action
    e.preventDefault();

    // Get the `href` attribute
    const href = e.target.getAttribute('href');
    const id = href.substr(1);
    const target = document.getElementById(id);

    // activeTriggerEle && activeTriggerEle.classList.remove('bg-gray-400');
    // activeTriggerEle = e.target;
    // activeTriggerEle.classList.add('bg-gray-400');

    scrollToTarget(target);
    
  };

  triggers.forEach(function (ele) {
    ele.addEventListener('click', clickHandler);

    // Remove the # from the hash, as different browsers may or may not include it
    var hash = location.hash.replace('#', '');

    if (hash != '') {
      lastPos = $(window).scrollTop();
      // Clear the hash along with the # symbol in the URL
      location.hash = '';
      history.replaceState("", "", location.pathname);
      // Stay on lastPos when hash is cleared
      $(window).scrollTop(lastPos);
    }

  });

});
