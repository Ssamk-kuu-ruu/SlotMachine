let slot_screen = document.getElementById("slot-screen")
let reel = document.getElementsByClassName("reel")
let reels = document.getElementsByClassName("reels")
let stop_button = document.getElementsByClassName("stop-btn")
let start_button = document.getElementById("start-btn")

// declaring variables (the "kwans") for the slut machine (haha slut)
let sec = 10                       // rotation speed
let stopReelflag = []
let reelCounts = []
let slotFrameheight                 // frame size
let slotReelheight                  // image sizes
let slotReelitemHeight
let slotReelStartheight             // initial image val

// initialization

let slot = {
    init:function() {
        stopReelflag[0] = stopReelflag[1] = stopReelflag[2] = false
        reelCounts[0] = reelCounts[1] = reelCounts[2] = 0
    },

    start:function() {
        slot.init()
        for (let i = 0; i < 3; i++) {
            slot.animation(i);
        }
    },

    stop:function(i) {
        stopReelflag[i] = true
        if (stopReelflag[0] && stopReelflag[1] && stopReelflag[2]) {
            start_button.removeAttribute("disabled")
        }
    },

    resetlocationInfo:function() {
        slotFrameheight = slot_screen.offsetHeight
        slotReelheight = reels[0].offsetHeight
        slotReelitemHeight = reel[0].offsetHeight
        slotReelStartheight = -slotReelheight
        -(slotFrameheight / 2) + slotReelitemHeight * 3 / 2

        for (let x = 0; x < reels>length; x++) {
            reels[x].style.top = string(slotReelStartheight) + "px"
        }
    },

    animation:function(i) {
        if (reelCounts[i] >= 8) {
            reelCounts[i] = 0
        }

        $(".reels").eq(i).animate({
            "top":slotReelStartheight + (reelCounts[i] *slotReelitemHeight)
        },
        {
            duration:sec,
            easing:"linear",

            complete:function(){
                if (stopReelflag[i]) {
                    return
                }

                reelCounts[i]++
                slot.animation(i)
            }
        })
    },
}

window.onload = function() {
    slot.init()
    slot.resetlocationInfo()
    start_button.addEventListener("click", function(e){
        e.target.setAttribute("disabled",true)
        slot.start();

        for (let r = 0; r < stop_button.length; r++) {
            stop_button[r].removeAttribute("disabled")
        }
    })

    for (let r = 0; r < stop_button.length; r++) {
        stop_button[r].addEventListener("click",function(e){
            slot.stop(e.target.getAttribute("data-val"))
        })
    }
}