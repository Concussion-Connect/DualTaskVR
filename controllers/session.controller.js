const rootName = "trial";
const vrRootName = "trial_vr";

const session_info = {
    "clinical": [
        {
            id: 0,
            videoName: "trial0",
            showWordList: false
        },
        {
            id: 1,
            videoName: "trial1",
            showWordList: true

        },
        {
            id: 2,
            videoName: "trial2",
            showWordList: false
        },
        {
            id: 3,
            videoName: "trial3",
            showWordList: false
        },
        {
            id: 4,
            videoName: "trial4",
            showWordList: false
        }
    ],
    "research": [
        {
            id: 0,
            videoName: "trial0",
            showWordList: true
        },
        {
            id: 1,
            videoName: "trial1",
            showWordList: false

        },
        {
            id: 2,
            videoName: "trial2",
            showWordList: false
        },
        {
            id: 3,
            videoName: "trial3",
            showWordList: false
        },
        {
            id: 4,
            videoName: "trial4",
            showWordList: false
        }
    ]
};

function getSessionInfo(sessionType = "clinical", showVR = false) {
    let chosenTypeInfo = session_info[sessionType];
    let videoRoot = showVR ? rootName : vrRootName;
    for (let i = 0; i < chosenTypeInfo.length; i++) {
        chosenTypeInfo[i].videoName = videoRoot + i;
    }
    return chosenTypeInfo;
}

module.exports = {
    getSessionInfo
}