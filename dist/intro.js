gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);


//gsap.registerPlugin(Physics2DPlugin);
var imgLogo = document.getElementById('logo'), 
textLogo = document.getElementById('text'),
introDiv = document.getElementsByClassName('intro')[0],
mainDiv = document.getElementById('main'),
downFlag = document.getElementById('down-flag'),
debugInfo = document.getElementById('debug-info');

gsap.set('#main',{'display':'none'});
gsap.set('#minilogo',{ opacity: 0});
gsap.set('.subtitulo',{ opacity: 0});
gsap.set('.titulo span',{ opacity: 0});
gsap.set('.titulo2 span',{ opacity: 0});
gsap.set(downFlag,{ opacity: 0});

//Get DOM elements to show screen data
var widthScreen = document.getElementById('width-screen'),
heightScreen = document.getElementById('height-screen');
//Get Width and height screen
let hScreen =  window.innerHeight;
let wScreen =  window.innerWidth;
//write values to DOM
widthScreen.innerHTML = wScreen;
heightScreen.innerHTML = hScreen;


//Get DOM elements to show logo data
var widthLogo = document.getElementById('width-logo'),
heightLogo = document.getElementById('height-logo');
//Get Width and height of logo image
let wLogo = gsap.getProperty("#logo", "width");
let hLogo = gsap.getProperty("#logo", "height");
//write values to DOM
widthLogo.innerHTML = wLogo;
heightLogo.innerHTML = hLogo;

let tlIntro = new TimelineMax();

//Entrada de Logo
tlIntro.fromTo( imgLogo, 1, {y: -hScreen, x: -wScreen/2, opacity: 0, }, { opacity: 1, delay: .6, ease: Power2.easeOut } );        
//Movimiento de cuadrado
// tlIntro.to( imgLogo, { y: -hScreen/3 , x: -wScreen/3 , opacity: 1 , duration: 0.2, ease: Power2.easeOut }  );
// tlIntro.to( imgLogo, { y: -hScreen/3 , x: wScreen/3 , opacity: 1 , duration: 0.2, ease: Power2.easeOut } );
// tlIntro.to( imgLogo, { y: hScreen/3 , x: wScreen/3 , opacity: 1 , duration: 0.2, ease: Power2.easeOut } );
// tlIntro.to( imgLogo, { y: hScreen/3 , x: -wScreen/3 , opacity: 1 , duration: 0.2, ease: Power2.easeOut } );
//Centrar logo
tlIntro.to( imgLogo, { y: 0 , x: 0, duration: 2, opacity: 1 , ease: Power2.easeOut } );
//Agrandar y desaparacer
tlIntro.to( imgLogo, { 
    scale: 4, 
    opacity: 0, 
    boxShadow:"0px 40px 70px 0px rgba(0, 0, 0, 0.22), 0px 27px 24px 0px rgba(0, 0, 0, 0.2)",
    borderRadius: '50px',
    duration: 2
},"finLogo" );


//Entrada de texto dese derecha
tlIntro.fromTo( textLogo, { x: '-40', opacity: 0, delay: .30, color: 'gray' }, { x: 0, opacity: 1, color: 'white', delay: .6, ease: Power2.easeOut }, 1 );
//Salida de texto hacia abajo
tlIntro.fromTo( textLogo, 3, { color: 'gray' }, { color:'black', opacity: 0.5, y: '+190',  ease: Power2.easeOut } ,'>');
//Agrandar y desaparecer
tlIntro.to( textLogo, { scale: 4, opacity: 0, duration: 1},">" );

//Cambiar fondo a blanco
tlIntro.to( introDiv, { backgroundColor : '#ffffff', opacity: 0.0, duration: 2, display: 'none'},"finLogo" );

//introDiv.style.display = 'none';



tlIntro.to(mainDiv,{ duration: 0.1, display:'initial', onComplete: animateSections});


function animateSections() {
    
    gsap.to('progress', {
        value: 100,
        ease: 'none',
        scrollTrigger: { scrub: 0.1 }
      });

    var tlHeader = gsap.timeline({
        yoyo: true,
        scrollTrigger: '.header'
    });
    
    tlHeader.fromTo('#minilogo',{x: -wScreen/3, scale: 2 }, {x:0, opacity:1, scale: 1, duration: 1.5});
    
    tlHeader.fromTo('.titulo span',{color:'green'},{duration: 1, opacity:1, y: "random(-200, 200)", stagger: 0.1, color:'black'});

    tlHeader.fromTo('.titulo2 span',{color:'green'},{duration: 1, opacity:1, y: "random(-200, 200)", stagger: 0.05, color:'black'});
    
    tlHeader.to('.subtitulo',{ opacity:1, duration: 1 })
    
    tlHeader.fromTo(downFlag,
        {opacity: 0.2}, 
        { 
            y: (hScreen/3)+30, 
            opacity:1, 
            duration: 2,
            ease: "elastic.out(1, 0.3)",
            onComplete: animateDownFlag 
        },
        '<'
    );

    function animateDownFlag(){
        console.log('finish intro');
    }

    
    var tlNosotros = gsap.timeline({
        yoyo: true,
        scrollTrigger: {
            trigger: '.nosotros',
            pin:false,
            start:'top bottom',
            markers: true,
            id: 'tlNosotros',
            //start: 'top top+=100',
            //events: onEnter onLeave onEnterBack OnLeaveBack
            //options: play pause, resume, reset, restart, complete, reverse, none
            toggleActions: 'play pause restart reset',
        }
    });

    tlNosotros.fromTo('#img-heart',
        {
            scale:0.7, 
            ease: "elastic.out(1, 0.3)",
        },{
            duration: 2,
            scale:1, 
            ease: "elastic.out(1, 0.3)",
        });
    
    tlNosotros.fromTo('.nosotros-p', 
        { x: -100, y: 0, autoAlpha: 0},
        {
            duration: 1.25, 
            delay: 0.2,
            x: 0,
            y: 0, 
            autoAlpha: 1, 
            stagger: 1,
            ease: "expo", 
            overwrite: "auto"
        },
        '<');

    tlNosotros.fromTo('.nosotros-h4', 
        {
            scale:3, autoAlpha: 0
        },{
            duration: 1.25, 
            delay: 0.5,
            scale: 1,
            autoAlpha: 1, 
            ease: "expo", 
            overwrite: "auto"
        },
        '<');

    // gsap.to('.nosotros-p1',{
    //     transformX: -25,
    //     scrollTrigger: '.nosotros'
    // });

    // gsap.utils.toArray(".nosotros-p, .nosotros-h4").forEach(function(elem) {
    //     hide(elem); 
    //     ScrollTrigger.create({
    //         trigger: '.nosotros',
    //         start: 'top center',
    //         onEnter: function() { animateFrom(elem) }, 
    //         onEnterBack: function() { animateFrom(elem, -1) },
    //         onLeave: function() { hide(elem) } // assure that the element is hidden when scrolled into view
    //     });
    // });

    // gsap.utils.toArray("#panel-1 img").forEach(function(elem, index) {
    //     hide(elem); 
    //     ScrollTrigger.create({
    //         trigger: '#panel-1',
    //         start: 'top center',
    //         onEnter: function() { animateFrom(elem) }, 
    //         onEnterBack: function() { animateFrom(elem, -1) },
    //         onLeave: function() { hide(elem) } // assure that the element is hidden when scrolled into view
    //     });
    // });

    function hide(elem) {
        gsap.set(elem, {autoAlpha: 0});
    }

    function animateFrom(elem, direction) {
        direction = direction || 1;
        var x = 0,
            y = direction * 100;
        if(elem.classList.contains("gs_reveal_fromLeft")) {
          x = -100;
          y = 0;
        } else if (elem.classList.contains("gs_reveal_fromRight")) {
          x = 100;
          y = 0;
        }
        elem.style.transform = "translate(" + x + "px, " + y + "px)";
        elem.style.opacity = "0";
        gsap.fromTo(elem, {x: x, y: y, autoAlpha: 0}, {
          duration: 1.25, 
          delay: 0.2,
          x: 0,
          y: 0, 
          autoAlpha: 1, 
          ease: "expo", 
          overwrite: "auto"
        });
      }

    /* Main navigation */
    document.querySelectorAll(".anchor").forEach(anchor => {
    anchor.addEventListener("click", function(e) {
        e.preventDefault();
        let targetElem = document.querySelector(e.target.getAttribute("href")),
            y = targetElem;
        if (targetElem && panelsContainer.isSameNode(targetElem.parentElement)) {
            let totalScroll = tween.scrollTrigger.end - tween.scrollTrigger.start,
                totalMovement = (panels.length - 1) * targetElem.offsetWidth;
            y = Math.round(tween.scrollTrigger.start + (targetElem.offsetLeft / totalMovement) * totalScroll);
        }
        gsap.to(window, {
            scrollTo: {
                y: y,
                autoKill: false
            },
            duration: 1
        });
    });
    });

    let panelsSection = document.querySelector("#panels"),
	panelsContainer = document.querySelector("#panels-container"),
	tween;

    /* Panels */
    const panels = gsap.utils.toArray("#panels-container .panel");
    tween = gsap.to(panels, {
        xPercent: -100 * ( panels.length - 1 ),
        ease: "none",
        scrollTrigger: {
            trigger: "#panels-container",
            pin: true,
            start: "top top",
            scrub: 1,
            snap: {
                snapTo: 1 / (panels.length - 1),
                inertia: false,
                duration: {min: 0.1, max: 0.1}
            },
            end: () =>  "+=" + (panelsContainer.offsetWidth - innerWidth)
        }
    });

    // Nosotros
    // gsap.to('#nosotros', { autoAlpha: 1, 
    //     scrollTrigger: {
    //     id: 'header',
    //     trigger: '.scrollTriggerLogo',
    //     start: 'top top+=100',
    //     end: '+=200',
    //     scrub: true,
    //     markers: true
    //     } 
    // });

    const sections = document.querySelectorAll('.section');
     
    sections.forEach((section, index) => {
        // your code for each section goes here
        gsap.to(section, {
            autoAlpha: 1,
            scrollTrigger: {
                trigger: section,
                start: 'top bottom-=100',
                toggleActions: 'play none none reverse',
                //markers: true
            }
        });
        console.log(section.clientHeight);
        
        ScrollTrigger.create({
            trigger: section,
            id: index+1,
            start: 'top center',
            end: () => `+=${section.clientHeight + 30}`,
            toggleActions: 'play reverse none reverse',
            toggleClass: {targets: section, className: "is-active"},
             markers: true
          })
    });
}

// let split = document.getElementsByClassName(".headerText")[0];
// tl.from(split, {
//         scrollTrigger:{
//         trigger:".masthead",
//         start:"top 50%",
//         end:"bottom top",
//         toggleActions:"restart none none reset"
//     },
//  duration:0.3, ease:"back"})
// .from(split, {opacity:0, stagger:0.05, duration:0.2}, 0);




// let tl2 = gsap.timeline({scrollTrigger:{
//     trigger:".masthead",
//     start:"top 50%",
//     end:"bottom top",
//     toggleActions:"restart none none reset"
// }})
// .from(split, {yPercent:-100,  stagger:0.05, duration:0.3, ease:"back"})
// .from(split, {opacity:0, stagger:0.05, duration:0.2}, 0)


function animateIn(){
    tl.to( imgLogo, .5, { rotation: 360, duration: 2, delay: .6, ease: Power2.easeOut } );
    
  //  loaderTL.to( imgLogo, {  physics2D: {velocity: 300, angle: -60, gravity: 400}} );
}

imgLogo.onclick = function() {
    animateIn();
    //setTimeout(animateOut_2, 2000);
};

//overlayTL.fromTo( overlay, .6, { top: '100%', bottom: 0 }, { top: 0, ease: Power4.easeInOut } );

//             loaderTL = new TimelineMax();

//   var animateOut = function() {
//     overlayTL.to( overlay, .6, { bottom: '100%', ease: Power4.easeInOut, delay: .25 } );
//     loaderTL.to( loader, .5, { y: '-40', opacity: 0 } );
//   };

//   var animateOut_2 = function() {
//     overlayTL.to( overlay, .6, { top: '100%', ease: Power4.easeInOut, delay: .25 } );
//     loaderTL.to( loader, .5, { y: '40', opacity: 0 } );
//   }

//   var animateIn = function() {
//     overlayTL.fromTo( overlay, .6, { top: '100%', bottom: 0 }, { top: 0, ease: Power4.easeInOut } );
//     loaderTL.fromTo( loader, .5, { y: '40', opacity: 0, delay: .30 }, { y: 0, opacity: 1, delay: .6, ease: Power2.easeOut } );
//   };

//   animateOut_2();

