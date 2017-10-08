(function swing(target) {
  let props = {
    origin: 'top center',   // transformOrigin
    perspective: 600,       // transformPerspective
    ease: Power1.easeInOut, // an easeInOut should really be used here...
    power: 1,               // multiplier for the effect that is reduced to 0 over the duration
    duration: 5,            // total length of the effect (well, it can be up to props.speed longer than this)
    rotation: -90,          // start rotation, also stores target rotations during tween
    maxrotation: 10,        // * max rotation after starting
    speed: 0.5,             // minimum duration for each swing
    maxspeed: 0.2           // * extra duration to add to the larger swings
  }
  props.target = target

  // starting position
  TweenMax.set(props.target, { rotationX: props.rotation, transformOrigin: props.origin, transformPerspective: props.perspective })

  TweenMax.to(props, props.duration, { power: 0, delay: 1, onStart: nextSwing, onStartParams: [props] })
})("#currentView")
function nextSwing(props) {
  if (props.power > 0) {
    props.rotation = (props.rotation > 0 ? -1 : 1) * props.maxrotation * props.power
    TweenMax.to(props.target, props.speed + props.maxspeed * props.power, { rotationX: props.rotation, ease: props.ease, onComplete: nextSwing, onCompleteParams: [props] })
  } else {
    TweenMax.to(props.target, props.speed, { rotationX: 0, ease: props.ease, clearProps: 'all' })
  }
}
document.getElementById("currentView").addEventListener("click",function(ele){
  let props = {
    origin: 'top',
    perspective: 600,
    ease: Power1.easeInOut,
    power: 1,
    duration: 5,
    rotation: -90,
    maxrotation: 20,
    speed: 0.5,
    maxspeed: 0.2,
    target: ele.target
  }
  TweenMax.to(props, props.duration, { power: 0, delay: 0, onStart: nextSwing, onStartParams: [props] })
})

function directSomewhere(ele) {
  console.log("=====ele======", ele)
  let contentOne = document.getElementById("contents-1"),
  contentTwo = document.getElementById("contents-2"),
  contentThree = document.getElementById("contents-3"),
  currentEle = ele
  if(!currentEle.className.includes("vanishOut")){
    currentEle.style.animationDelay = "0s"
    if(currentEle.className.includes("vanishIn")){
      let initialStyle = currentEle.className.indexOf(" vanishIn")
      let newStyle = currentEle.className.slice(0, initialStyle)
      currentEle.className = newStyle.trim() + " vanishOut"
    }
    currentEle.className += " vanishOut"
    setTimeout(function(){
      let initialStyle = currentEle.className.indexOf("vanishOut")
      let newStyle = currentEle.className.slice(0, initialStyle)
      currentEle.className = newStyle + " vanishIn"
      if(ele.id === "first"){
        animateTransition(contentOne)
        contentTwo.style.display = "none"
        contentThree.style.display = "none"
      }
      if(ele.id === "second"){
        animateTransition(contentTwo)
        contentOne.style.display = "none"
        contentThree.style.display = "none"
      }
      if(ele.id === "third"){
        animateTransition(contentThree)
        contentOne.style.display = "none"
        contentTwo.style.display = "none"
      }
    }, 500)
  }
}

function animateTransition(ele) {
  let currentEle = ele
  currentEle.style.display = "flex"
  currentEle.className = "magictime spaceInUp"
  console.log("=====currentEle======", currentEle)
}
