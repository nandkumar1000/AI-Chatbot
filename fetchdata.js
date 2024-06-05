const key = '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';
const Search = document.querySelector(".Search");
const Btn = document.querySelector(".btn");
const C_question = document.querySelector(".maincontent");

Btn.addEventListener("click", async () => {
    let question = `<div class="que-value">${Search.value}</div>`;
    C_question.innerHTML += question;
    C_question.scrollTop = C_question.scrollHeight - C_question.clientHeight;

    const url = 'https://api.openai.com/v1/chat/completions';
    let option = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${key}`
        },
        body: JSON.stringify({
            "model": "gpt-3.5-turbo",
            "messages": [{ "role": "user", "content": Search.value }],
            "temperature": 0.7
        })
    };

    const fetchData = async (url, option, retries = 3) => {
        try {
            const response = await fetch(url, option);
            if (!response.ok) {
                if (response.status === 429 && retries > 0) {
                    const retryAfter = response.headers.get('Retry-After');
                    const waitTime = retryAfter ? parseInt(retryAfter, 10) * 1000 : (4 - retries) * 1000;
                    console.log(`Rate limited. Retrying in ${waitTime / 1000} seconds...`);
                    await new Promise(resolve => setTimeout(resolve, waitTime));
                    return fetchData(url, option, retries - 1);
                }
                throw new Error(`Something went wrong: ${response.status}`);
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching data:', error);
            return null;
        }
    };

    const data = await fetchData(url, option);
    if (data) {
        let answer = `<div class="ans">
            <div class="ans-value"><pre><p>${data.choices[0].message.content}</p></pre></div>
            <div class="icon">
                <div class="iconnext">
                    <button class="like-btn"><i class="fa-solid fa-thumbs-up"></i></button>
                    <button class="dis-btn"><i class="fa-solid fa-thumbs-down"></i></button>
                    <button class="reg-btn"><i class="fa fa-repeat"></i></button>
                </div>
                <button class="clipboard"><i class="fa-solid fa-clipboard-check"></i></button>
            </div>
        </div>`;
        C_question.innerHTML += answer;
        C_question.scrollTop = C_question.scrollHeight - C_question.clientHeight;
        Search.value = "";

        const latestAnswer = C_question.querySelector(".ans:last-child .ans-value p").textContent;
        const latestQuestion = C_question.querySelector(".que-value:last-child").textContent;

        const clipboardButtons = C_question.querySelectorAll(".clipboard");
        clipboardButtons[clipboardButtons.length - 1].addEventListener("click", () => {
            navigator.clipboard.writeText(latestAnswer)
                .then(() => {
                    console.log("Answer is copied");
                    alert("Answer is copied");
                })
                .catch(err => {
                    alert("Something went wrong: " + err);
                });
        });
// getting response
        const queElements = C_question.querySelectorAll(".que-value");
        queElements[queElements.length - 1].addEventListener("click", () => {
            navigator.clipboard.writeText(latestQuestion)
                .then(() => {
                    console.log("Question is copied");
                    alert("Your question is copied");
                })
                .catch(err => {
                    alert("Something went wrong: " + err);
                });
        });
// for like and dislike
        const likeButtons = C_question.querySelectorAll(".like-btn");
        const dislikeButtons = C_question.querySelectorAll(".dis-btn");
        const regenerateButtons = C_question.querySelectorAll(".reg-btn");

        likeButtons[likeButtons.length - 1].addEventListener("click", () => {
            likeButtons[likeButtons.length - 1].innerHTML = '<i class="fa fa-heart"></i>';
        });

        dislikeButtons[dislikeButtons.length - 1].addEventListener("click", () => {
            dislikeButtons[dislikeButtons.length - 1].innerHTML = '<i class="fa fa-heart-broken"></i>';
        });

        // for regenerating
        regenerateButtons[regenerateButtons.length - 1].addEventListener("click", () => {
            
        });
    }
});
