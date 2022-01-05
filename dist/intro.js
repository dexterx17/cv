gsap.registerPlugin(ScrollTrigger);

let tl = new TimelineMax();
let tlTexto = new TimelineMax();
let tlLogo = new TimelineMax();

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


//Entrada de Logo
tl.fromTo( imgLogo, 1, {y: -hScreen, x: -wScreen/2, opacity: 0, }, { opacity: 1, delay: .6, ease: Power2.easeOut } );        
//Movimiento de cuadrado
// tl.to( imgLogo, { y: -hScreen/3 , x: -wScreen/3 , opacity: 1 , duration: 0.2, ease: Power2.easeOut }  );
// tl.to( imgLogo, { y: -hScreen/3 , x: wScreen/3 , opacity: 1 , duration: 0.2, ease: Power2.easeOut } );
// tl.to( imgLogo, { y: hScreen/3 , x: wScreen/3 , opacity: 1 , duration: 0.2, ease: Power2.easeOut } );
// tl.to( imgLogo, { y: hScreen/3 , x: -wScreen/3 , opacity: 1 , duration: 0.2, ease: Power2.easeOut } );
//Centrar logo
tl.to( imgLogo, { y: 0 , x: 0, duration: 2, opacity: 1 , ease: Power2.easeOut } );
//Agrandar y desaparacer
tl.to( imgLogo, { scale: 4, opacity: 0, duration: 2},"finLogo" );


//Entrada de texto dese derecha
tl.fromTo( textLogo, { x: '-40', opacity: 0, delay: .30, color: 'gray' }, { x: 0, opacity: 1, color: 'white', delay: .6, ease: Power2.easeOut }, 1 );
//Salida de texto hacia abajo
tl.fromTo( textLogo, 3, { color: 'gray' }, { color:'black', opacity: 0.5, y: '+190',  ease: Power2.easeOut } ,'>');
//Agrandar y desaparecer
tl.to( textLogo, { scale: 4, opacity: 0, duration: 1},">" );

//Cambiar fondo a blanco
tl.to( introDiv, { backgroundColor : '#ffffff', opacity: 0.0, duration: 2, display: 'none'},"finLogo" );

//introDiv.style.display = 'none';



tl.to(mainDiv,{ duration: 0.1, display:'initial', onComplete: animateSections});



function animateSections() {
    
    var tl1 = gsap.timeline({  yoyo: true });
    
    tl1.fromTo('#minilogo',{x: -wScreen/3, scale: 2 }, {x:0, opacity:1, scale: 1, duration: 1.5});
    
    tl1.fromTo('.titulo span',{color:'green'},{duration: 1.5, opacity:1, y: "random(-200, 200)", stagger: 0.2, color:'black'});
    
    tl1.to('.subtitulo',{ opacity:1, duration: 1 })
    
    tl1.fromTo(downFlag,
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

    
    var imgHeart = document.getElementById('img-heart');
    
    gsap.fromTo(imgHeart,{scale:0.8},{
        duration: 2,
        scale:1.2, 
        ease: "elastic.out(1, 0.3)",
        scrollTrigger: {
            trigger: '.nosotros',
            markers: true,
            //start: 'top top+=100',
            //events: onEnter onLeave onEnterBack OnLeaveBack
            //options: play pause, resume, reset, restart, complete, reverse, none
            toggleActions: 'play pause reverse reset',
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

    const sections = document.querySelectorAll('section');
     
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

