// initialize variables
const textElement = document.getElementById("text")
const buttonOptionsElement = document.getElementById("button-options")
const landingElement = document.getElementById("landing")
const scenarioElement = document.getElementById("scenario")
const endingElement = document.getElementById("ending")
const articleElement = document.getElementById("article")
const startButton = document.getElementById("startbutton")
const learnMoreButton = document.getElementById("learnmore-button")
const playAgainButton = document.getElementById("playagain-button")
const giveUpButton = document.getElementById("giveup-button")

let state = {}

// button functionality
startButton.addEventListener("click", startGame)
learnMoreButton.addEventListener("click", showArticle)
playAgainButton.addEventListener("click", playAgain)
giveUpButton.addEventListener("click", giveUp)

// div (scene) managers
function startGame() {
    landingElement.style.display = "none"
    articleElement.style.display = "none"
    scenarioElement.style.display = "inline"
    state = {}
    showTextNode(1)
}

function reset() {
    scenarioElement.style.display = "none"
    landingElement.style.display = "inline"
}

function showArticle() {
    endingElement.style.display = "none";
    articleElement.style.display = "inline";
}

function giveUp() {
    scenarioElement.style.display = "none";
    endingElement.style.display = "inline"; 
}

function playAgain() {
    articleElement.style.display = "none";
    landingElement.style.display = "inline";
}

function showTextNode(textNodeIndex) {
    const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)
    textElement.innerText = textNode.text

    // Remove any previously displayed image
    const existingImage = document.getElementById("scene-image");
    if (existingImage) {
        existingImage.remove();
    }
    
    // Add the new image if it exists
    if (textNode.image) {
        const img = document.createElement("img");
        img.id = "scene-image";
        img.src = textNode.image;
        img.alt = "Scene Image";
        img.style.width = "100%"; // Adjust size as needed
        img.style.marginTop = "30px"; // Adds space between text and image
        textElement.appendChild(img); // Append image BELOW the text
    }

    while (buttonOptionsElement.firstChild) {
        buttonOptionsElement.removeChild(buttonOptionsElement.firstChild)
    }

    buttonOptionsElement.style.gridTemplateColumns = textNode.options.length === 1 ? "1fr" : "repeat(2, 1fr)";

    textNode.options.forEach(option => {
        if (showOption(option)) {
            const button = document.createElement("button")
            button.innerText = option.text
            button.classList.add("button")
            button.addEventListener("click", () => selectOption(option))
            buttonOptionsElement.appendChild(button)
        }
    })
}

function showOption(option) {
    return option.requiredState == null || option.requiredState(state)
}

function selectOption(option) {
    const nextTextNodeId = option.nextText

    // animation
    if ([7, 13, 19].includes(nextTextNodeId)) {
        // Trigger the red pulse animation when "Restart" is selected
        document.body.classList.add('pulse-animation');

        // Wait for the animation to complete, then reset the game
        setTimeout(() => {
            document.body.classList.remove('pulse-animation');
        }, 500); // Matches the duration of the animation (500ms)
    }

    if (nextTextNodeId <= 0) {
        return reset()
    }

    // check if it's the last option
    if (nextTextNodeId === 27) {
        scenarioElement.style.display = "none";
        endingElement.style.display = "inline";
        return;
    }
    state = Object.assign(state, option.setState)
    showTextNode(nextTextNodeId)
}

const textNodes = [
    {
        //setState: { someState: false, anotherState: true }
        //requiredState: (currentState) => currentState.anotherState

        id:1,
        text: "You’ve just arrived in Acandí, Colombia, after a long ferry ride, joining a group of fellow migrants preparing to cross the Darién Gap. Ahead of you lies a 97-kilometer stretch of jungle notorious for its dangers—treacherous rivers, venomous snakes, and threats from both nature and humans.",
        options: [
            {
                text: "Continue",
                nextText: 2
            }
        ]
    },
    {
        id:2,
        text: "Your group reaches a swollen river with a strong current. There’s no bridge, and the only way across is stepping on slippery rocks. Some in the group want to risk crossing, while others suggest searching for a safer route.",
        image: "scenario-1.jpeg",
        options: [
            {
                text: "Cross the river directly.",
                nextText: 3
            },
            {
                text: "Look for a safer route to cross.",
                nextText: 4
            }
        ]
    },
    {
        id:3,
        text: "You attempt to cross the river without checking the current. The water is stronger than you expected, and you’re swept away for a moment, leaving you wet and exhausted.",
        options: [
            {
                text: "Continue",
                nextText: 5
            }
        ]
    },
    {
        id:4,
        text: "You wisely choose to walk upstream and find a shallower part of the river. You manage to cross safely, with no harm done.",
        options: [
            {
                text: "Continue",
                nextText: 5
            }
        ]
    },
    {
        id:5,
        text: "You hear a rustling in the bushes. You spot a snake nearby. It’s dangerous and could strike if you make any sudden moves.",
        image: "scenario-2.jpeg",
        options: [
            {
                text: "Stay still and back away slowly.",
                nextText: 6
            },
            {
                text: "Move quickly to scare it away.",
                nextText: 7
            },
        ]
    },
    {
        id:6,
        text: "You step back slowly, carefully avoiding the snake. It hisses but doesn’t strike. You find another route, eventually catching up to your group, unharmed.",
        options: [
            {
                text: "Continue",
                nextText: 8
            }
        ]
    },
    {
        id:7,
        text: "You step too close to the snake. It strikes quickly, and you feel a sharp pain. Eventually, you feel the venom starting to spread. Without immediate medical help, survival becomes unlikely.",
        options: [
            {
                text: "Restart",
                nextText: -1
            }
        ]
    },
    {
        id:8,
        text: "A sudden storm hits, making the trail muddy and dangerous. Some in your group want to push forward, while others argue for finding shelter until it passes.",
        image: "scenario-3.jpeg",
        options: [
            {
                text: "Take shelter and wait out the storm.",
                nextText: 9
            },
            {
                text: "Keep moving carefully through the rain.",
                nextText: 10
            },
        ]
    },
    {
        id:9,
        text: "The rain eventually slows, and the group continues the journey without being drenched or exhausted from walking in the storm.",
        options: [
            {
                text: "Continue",
                nextText: 11
            }
        ]
    },
    {
        id:10,
        text: "The rain drenches you, and the slippery ground makes it hard to stay steady. Your energy is drained.",
        options: [
            {
                text: "Continue",
                nextText: 11
            }
        ]
    },
    {
        id:11,
        text: "You notice a group of strangers slowly approaching towards you in the jungle. They seem friendly but could be dangerous. You need to decide how to respond.",
        image: "scenario-4.jpeg",
        options: [
            {
                text: "Tell the group to keep distance and avoid interaction.",
                nextText: 12
            },
            {
                text: "Approach them cautiously and ask for help.",
                nextText: 13
            },
        ]
    },
    {
        id:12,
        text: "You stay alert, exchanging a quick glance with your group before moving in another direction, avoiding unnecessary risks.",
        options: [
            {
                text: "Continue",
                nextText: 14
            }
        ]
    },
    {
        id:13,
        text: "They separate you from your group, taking your belongings and leaving you with no way out. You’ve fallen into the hands of traffickers, and escape is no longer in your control.",
        options: [
            {
                text: "Restart",
                nextText: -1
            }
        ]
    },
    {
        id:14,
        text: "One of the group members is struggling to keep up due to exhaustion and blistered feet. Some want to stop and rest, while others insist on pressing forward.",
        image: "scenario-5.jpeg",
        options: [
            {
                text: "Stop and rest, even if it slows the group down.",
                nextText: 15
            },
            {
                text: "Keep going, encouraging them to push through.",
                nextText: 16
            },
        ]
    },
    {
        id:15,
        text: "The group takes a break, allowing the exhausted member to recover. Though it costs time, everyone regains some strength before continuing.",
        options: [
            {
                text: "Continue",
                nextText: 17
            }
        ]
    },
    {
        id:16,
        text: "Some members fall behind, never to be seen again. You keep moving, guilt weighing on you with every step.",
        options: [
            {
                text: "Continue",
                nextText: 17
            }
        ]
    },
    {
        id:17,
        text: "Armed men approach and demand valuables. The group tenses, uncertain of how to respond. The threat is real, and any hesitation could have consequences.",
        image: "scenario-6.jpeg",
        options: [
            {
                text: "Hand over valuables to avoid conflict.",
                nextText: 18
            },
            {
                text: "Try to negotiate or hide some belongings.",
                nextText: 19
            },
        ]
    },
    {
        id:18,
        text: "You hand over your belongings without resistance. The group takes what they want and leaves, sparing you from harm.",
        options: [
            {
                text: "Continue",
                nextText: 20
            }
        ]
    },
    {
        id:19,
        text: "You try to fight back, but they overpower you quickly. You’re beaten and left to die in the jungle.",
        options: [
            {
                text: "Restart",
                nextText: -1
            }
        ]
    },
    {
        id:20,
        text: "Your group realizes the path marked by footsteps dissapeared. Some suggest splitting up to find another route, while others think it's safer to stay together and retrace steps.",
        image: "scenario-7.jpeg",
        options: [
            {
                text: "Stick together and backtrack to find the trail.",
                nextText: 21
            },
            {
                text: "Recommend some people to scout ahead for a clear path.",
                nextText: 22
            },
        ]
    },
    {
        id:21,
        text: "The group retraced their steps carefully, managing to find the path again. You are relieved to be back on track.",
        options: [
            {
                text: "Continue",
                nextText: 23
            }
        ]
    },
    {
        id:22,
        text: "The scouts never return. The group waits, but as time passes, it becomes clear that they're gone. With no choice but to press on, you continue through the jungle.",
        options: [
            {
                text: "Continue",
                nextText: 23
            }
        ]
    },
    {
        id:23,
        text: "Some in the group, including you, haven’t had water for days, and you’re beginning to feel the effects of dehydration.",
        image: "scenario-8.jpeg",
        options: [
            {
                text: "Search off-path for a stream or river before continuing.",
                nextText: 24
            },
            {
                text: "Continue along the journey, disregarding your condition.",
                nextText: 25
            },
        ]
    },
    {
        id:24,
        text: "After searching off-path, you find a small stream. You rejoin the group, who had separated in search of water, and continue your journey together.",
        options: [
            {
                text: "Continue",
                nextText: 26
            }
        ]
    },
    {
        id:25,
        text: "Despite your worsening condition, you push forward.",
        options: [
            {
                text: "Continue",
                nextText: 26
            }
        ]
    },
    {
        id:26,
        text: "At last, you arrive in Bajo Chiquito, Panama, the first village beyond the Darién Gap. Panamanian officials guide you to the migrant camp. While relief washes over you, new challenges lie ahead.",
        options: [
            {
                text: "Continue",
                nextText: 27
            }
        ]
    }
]