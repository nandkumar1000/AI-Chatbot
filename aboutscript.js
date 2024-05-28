gsap.registerPlugin(ScrollTrigger);

// heading animations
gsap.to(".about", {
  y: 0,
  duration: 0.2,
  delay: 0.3,
  stagger: 0.2
});

gsap.from(".nav", {
  y: -800,
  duration: 0.3,
  stagger: 0.2
});

gsap.from(".navbar a", {
  y: -800,
  duration: 0.4,
  opacity: 0,
  stagger: 0.2
});

gsap.from(".content", {
  y: 800,
  duration: 0.5,
  opacity: 0.3,
  stagger: 0.2
});

gsap.from(".mincontent .submin h2", {
  x: 500,
  y: -500,
  duration: 0.5,
  opacity: 0,
  stagger: 0.2
});

gsap.from(".mincontent .submin p", {
  x: 500,
  duration: 0.5,
  opacity: 0,
  stagger: 0.2
});

gsap.from(".mincontent .submin .btn", {
  x: -700,
  duration: 0.6,
  opacity: 0,
  stagger: 0.8
});

// Scroll-triggered animations
gsap.from(".imp h3", {
  scrollTrigger: {
    trigger: ".imp h3",
    start: "top 80%",
    end: "top 60%",
    scrub: true,
    // markers: true
  },
  y: -100,
  opacity: 0,
  duration: 0.5
});

gsap.from(".reason1", {
  scrollTrigger: {
    trigger: ".reason1",
    start: "top 50%",
    end: "top 20%",
    scrub: true,
    // markers: true,
  },
  x: 500,
  opacity: 0,
  duration: 0.6,
  stagger: 0.3
});

var tl=gsap.timeline();
tl.from(".footer",{
  y:-800,
  duration:3,
  delay:3,
  opacity:0,
  stagger:0.2
})
tl.from(".footer p",{
  x:500,
  y:-500,
  duration:2,
  opacity:0,
  stagger:0.3

})
tl.from(".copyright",{
  y:-800,
  duration:2,
  opacity:0,
  stagger:0.3
})
tl.from(".copyright p",{
  y:-800,
  x:800,
  duration:3,
  opacity:0,
  stagger:0.3
})