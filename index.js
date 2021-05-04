const got = require('got');
const tough = require('tough-cookie');
const jar = new tough.CookieJar();
const readline = require("readline");

async function start() {
    for (var i = 1; i < 11; i++) {
        await getQuestion(i)
    }
    await sendText(phoneNumber)
}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
let phoneNumber;
rl.question("Enter phone number: ", function(number) {
    phoneNumber = number
    start()
    rl.close()
});
async function getQuestion(questionNumber) {
    try {
        let response = await got({
            method: 'get',
            url: 'https://chipotleiq.com/quiz?question=' + questionNumber.toString(),
            timeout: 6000,
            cookieJar: jar,
            headers: {
                'authority': 'www.google-analytics.com',
                'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="90", "Google Chrome";v="90"',
                'sec-ch-ua-mobile': '?0',
                'upgrade-insecure-requests': '1',
                'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.93 Safari/537.36',
                'accept': '*/*',
                'sec-fetch-site': 'cross-site',
                'sec-fetch-mode': 'no-cors',
                'sec-fetch-user': '?1',
                'sec-fetch-dest': 'empty',
                'referer': 'https://chipotleiq.com/',
                'accept-language': 'en-US,en;q=0.9',
            }
        })
        const HTMLParser = require('node-html-parser');
        let root = HTMLParser.parse(response.body);
        let question = root.querySelector('[class="labelContainer"]').firstChild.rawText
        if (question.includes("How we grow our"))
            await answer("e")
        else if (question.includes("Chipotle’s mission to Cultivate"))
            await answer("e")
        else if (question.includes("Which protein would you add"))
            await answer("b")
        else if (question.includes("How many states in the US have"))
            await answer("b")
        else if (question.includes("People have strong feelings about cilantro"))
            await answer("a")
        else if (question.includes("A popular option in many"))
            await answer("c")
        else if (question.includes("Able to leap tall appetites"))
            await answer("c")
        else if (question.includes("Which grilled Chipotle"))
            await answer("a")
        else if (question.includes("What&rsquo;s the fastest way"))
            await answer("b")
        else if (question.includes("What does Chipotle do with some"))
            await answer("d")
    } catch (error) {
        console.log(error)
    }
}

async function answer(answerChoice) {
    try {
        let response = await got({
            method: 'post',
            url: 'https://chipotleiq.com/answer',
            timeout: 6000,
            cookieJar: jar,
            headers: {
                'authority': 'www.google-analytics.com',
                'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="90", "Google Chrome";v="90"',
                'sec-ch-ua-mobile': '?0',
                'upgrade-insecure-requests': '1',
                'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.93 Safari/537.36',
                'accept': '*/*',
                'sec-fetch-site': 'cross-site',
                'sec-fetch-mode': 'no-cors',
                'sec-fetch-user': '?1',
                'sec-fetch-dest': 'empty',
                'referer': 'https://chipotleiq.com/',
                'accept-language': 'en-US,en;q=0.9',
            },
            json: {
                answer: answerChoice
            }
        })
        console.log("Answered correctly")
    } catch (error) {
        console.log(error)
    }
}

async function sendText(number) {
    try {
        let response = await got({
            method: 'post',
            url: 'https://chipotleiq.com/bogo-winner',
            timeout: 6000,
            cookieJar: jar,
            headers: {
                'authority': 'www.google-analytics.com',
                'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="90", "Google Chrome";v="90"',
                'sec-ch-ua-mobile': '?0',
                'upgrade-insecure-requests': '1',
                'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.93 Safari/537.36',
                'accept': '*/*',
                'sec-fetch-site': 'cross-site',
                'sec-fetch-mode': 'no-cors',
                'sec-fetch-user': '?1',
                'sec-fetch-dest': 'empty',
                'referer': 'https://chipotleiq.com/',
                'accept-language': 'en-US,en;q=0.9',
            },
            json: {
                phoneNumber: number
            }
        })
        console.log(response.body)
    } catch (error) {
        console.log(error)
    }
}