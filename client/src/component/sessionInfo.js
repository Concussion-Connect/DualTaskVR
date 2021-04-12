const rootName = "trial";
const vrRootName = "trial_vr";

const session_info = {
    "dual": [
        {
            id: 0,
            videoName: "",
            showWordList: false
        },
        {
            id: 1,
            videoName: "",
            showWordList: true

        },
        {
            id: 2,
            videoName: "",
            showWordList: false
        },
        {
            id: 3,
            videoName: "",
            showWordList: false
        },
        {
            id: 4,
            videoName: "",
            showWordList: false
        }
    ],
    "bess": [
        {
            id: 0,
            videoName: "",
            showWordList: false
        },
        {
            id: 1,
            videoName: "",
            showWordList: false

        },
        {
            id: 2,
            videoName: "",
            showWordList: false
        },
        {
            id: 3,
            videoName: "",
            showWordList: false
        },
    ],
    "scat": [
        {
            id: 0,
            videoName: "",
            showWordList: false
        },
        {
            id: 1,
            videoName: "",
            showWordList: false

        },
        {
            id: 2,
            videoName: "",
            showWordList: false
        },
        {
            id: 3,
            videoName: "",
            showWordList: false
        },
        {
            id: 4,
            videoName: "",
            showWordList: false
        }
    ]
};

function getSessionInfo(testType = "dual", showVR = false) {
    let chosenTypeInfo = session_info[testType];
    let videoRoot = showVR ? vrRootName : rootName;
    for (let i = 0; i < chosenTypeInfo.length; i++) {
        chosenTypeInfo[i].videoName = videoRoot + i;
    }
    return chosenTypeInfo;
}

export default getSessionInfo;