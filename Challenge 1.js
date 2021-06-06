function ageInDays(){
    var birthYear = prompt('what year you were born?: ')
    var ageInDays = (2021 - birthYear) * 365
    
    var h1 = document.createElement('h1')
    h1.setAttribute('class', 'age-in-days')
    var resultText = 'you are ' + ageInDays + ' days old'
    h1.append(resultText)

    document.querySelector('.answer').append(h1)

    
}

function reset(){

    document.querySelector('.age-in-days').remove()

}

function generate(){
    var img = document.createElement('img')
    var url = "http://thecatapi.com/api/images/get?format=src&type=gif"
    // img.setAttribute('src',"https://acegif.com/wp-content/gifs/happy-cat-9.gif")
    img.setAttribute('src',url)
    img.setAttribute('alt',"https://acegif.com/wp-content/gifs/happy-cat-9.gif")

    
    document.querySelector('.cat-list').append(img)
    
}



//challange 3 rock paper scissors

function rpsGame(yourChoice){

    console.log(yourChoice)

    var humanChoice, botChoice;

    humanChoice = yourChoice.id
    botChoice = numberToChoice(randToRpsInt())
    console.log('computer choice: ', botChoice)

    result = decideWinner(humanChoice, botChoice) // [1,0] win [0.5, 0.5] draw
    console.log(result)

    message = finalMessage(result) // choose you won and you lose maybe draw
    console.log(message)

    rpsFrontEnd(yourChoice.id, botChoice, message)
}

function randToRpsInt(){
    return Math.floor(Math.random() * 3)
}

function numberToChoice(number){
    return ['rock', 'paper', 'scissors'][number]
}

function decideWinner(yourChoice, computerChoice){
    var rpsDataBase = {
        'rock':{'scissors': 1, 'rock': 0.5, 'paper': 0},
        'paper': {'rock':1, 'paper':0.5, 'scissors':0},
        'scissors': {'paper': 1, 'scissors':0.5, 'rock': 0},

    }

    var yourScore = rpsDataBase[yourChoice][computerChoice]
    var computerScore = rpsDataBase[computerChoice][yourChoice]

    return [yourScore, computerScore]
}

function finalMessage([yourScore, computerScore]){
    if (yourScore === 0){
        return {'message': 'You lost!', 'color': 'red'}
    }else if( yourScore === 0.5){
        return {'message': 'You tied!', 'color':'yellow'}
    }else{
        return {'message':'You won!', 'color':'green'}
    }
}

function rpsFrontEnd(humanImageChoice, botImageChoice, finalMessage){

    var imagesDataBase = {
        'rock': document.getElementById('rock').src,
        'paper': document.getElementById('paper').src,
        'scissors' : document.getElementById('scissors').src,
    }


    // lets remove all the images 
    document.getElementById('rock').remove()
    document.getElementById('paper').remove()
    document.getElementById('scissors').remove()


    var humanDiv = document.createElement('div')
    var botDiv = document.createElement('div')
    var messageDiv = document.createElement('div')

    humanDiv.innerHTML = "<img src='" + imagesDataBase[humanImageChoice] + 
    "'height=150 width=150 style='box-shadow: 0px 10px 50px rgba(37, 50, 233, 1)'>"

    messageDiv.innerHTML = "<h1 style='color: "+ finalMessage['color'] + "; font-size: 60px; padding: 30px;'>" + finalMessage['message'] + "</h1>"

    botDiv.innerHTML = "<img src='" + imagesDataBase[botImageChoice] + 
    "'height=150 width=150 style='box-shadow: 0px 10px 50px rgba(243, 38, 24, 1)'>"


    document.getElementById("flex-box-rps-div").append(humanDiv)
    document.getElementById("flex-box-rps-div").append(messageDiv)
    document.getElementById("flex-box-rps-div").append(botDiv)

}

//challange 4: Chane the Color of All Buttons


//getElementsByTagName gadaecema Tagis dasaxeleba magalitad button
// gamoitans yvela buttons 
var all_buttons = document.getElementsByTagName('button')
//  

var copyAllButtons = []
for(let i = 0; i < all_buttons.length; i++){
    copyAllButtons.push(all_buttons[i].classList[1])
}


function buttonColorChange(buttonThingy){
    if(buttonThingy.value === 'red') {
        buttonRed();
    }else if(buttonThingy.value === 'green'){
        buttonGreen();
    }else if(buttonThingy.value === 'reset'){
        buttonColorReset();
    }else if(buttonThingy.value === 'random'){
        randomColors();
    }
    // ყოველ ბექდროპის გადასვლაზე აბრუნებს მის values
    // console.log(buttonThingy.value)  


}

function buttonRed(){
    for(let i=0; i< all_buttons.length; i++){
        all_buttons[i].classList.remove(all_buttons[i].classList[1])
        all_buttons[i].classList.add('btn-danger')
    }
}

function buttonGreen(){
    for(let i=0; i< all_buttons.length; i++){
        all_buttons[i].classList.remove(all_buttons[i].classList[1])
        all_buttons[i].classList.add('btn-success')
    }
}

function buttonColorReset(){
    for(let i=0; i< all_buttons.length; i++){
        all_buttons[i].classList.remove(all_buttons[i].classList[1])
        all_buttons[i].classList.add(copyAllButtons[i])
    }
}

function randomColors(){
    var choices = ['btn-primary', 'btn-danger', 'btn-success', 'btn-warning', ]

    for(let i=0; i < all_buttons.length; i++){
        let randomChoice = Math.floor(Math.random() * 4)
        all_buttons[i].classList.remove(all_buttons[i].classList[1])
        all_buttons[i].classList.add(choices[randomChoice])
    }
}

//challenge 5: Blackjack
let blackjackGame = {
    'you': {'scoreSpan':'#your-blackjack-result', 'div':'#your-box', 'score': 0},
    'dealer': {'scoreSpan':'#dealer-blackjack-result', 'div':'#dealer-box', 'score': 0},
    'cards':["2", "3" ,"4" ,"5" ,"6" ,"7" ,"8" ,"9" ,"10" ,"K" ,"J" ,"Q" ,"A"],
    'cardsMap':{'2':2, '3':3, '4':4, '5':5, '6':6, '7':7, '8':8, '9':9, '10':10, 'K':10, 'J':10, 'Q':10, 'A':[1, 11]},
    'wins': 0,
    'losses': 0,
    'draws': 0,
    'isStand': false,
    'turnsOver': false,

}

const YOU = blackjackGame['you']
const DEALER = blackjackGame['dealer']

const hitSound = new Audio('/sounds/swish.m4a')
const winSound = new Audio('/sounds/cash.mp3')
const lossSound = new Audio('/sounds/aww.mp3')



//როდესაც hit buttons დაეჭირება მაშინვე გააქტიურდბეა blackjackHit ფუნქცია
//სეტონკლიკ ლისენერი დაელოდება ღილაკზე დაჭერას და შემდეგ გააქტიურდება.

document.querySelector('#blackjack-hit-button').addEventListener('click', blackjackHit)
document.querySelector('#blackjack-stand-button').addEventListener('click', dealerLogic)
document.querySelector('#blackjack-deal-button').addEventListener('click', blackjackDeal)


function blackjackHit(){
    if (blackjackGame['isStand'] === false) {
        let card = randomCard()
        console.log(card)
        showCard(card, YOU)
        updateScore(card, YOU)
        showScore(YOU)
        console.log(YOU['score'])
    }
   

}


function randomCard(){

    let randomIndex = Math.floor(Math.random() * 13)
    return blackjackGame['cards'][randomIndex]
}


function showCard(card, activePlayer){
    if(activePlayer['score'] <= 21){
        let cardImage = document.createElement('img');
        cardImage.src = `/cards/${card}.png`
        document.querySelector(activePlayer['div']).appendChild(cardImage)
    
        hitSound.play();
    }
}


function blackjackDeal(){
    if (blackjackGame['turnsOver'] === true) {

        blackjackGame['isStand'] = false

        let yourImages = document.querySelector('#your-box').querySelectorAll('img')
        let dealerImages = document.querySelector('#dealer-box').querySelectorAll('img')

        for(let i=0; i < yourImages.length; i++){

            yourImages[i].remove()
        }

        for(let i=0; i < dealerImages.length; i++){

            dealerImages[i].remove()
        }

        YOU['score'] = 0
        DEALER['score'] = 0

        document.querySelector('#your-blackjack-result').textContent = 0
        document.querySelector('#your-blackjack-result').style.color = '#ffffff'

        document.querySelector('#dealer-blackjack-result').textContent = 0
        document.querySelector('#dealer-blackjack-result').style.color = '#ffffff'

        document.querySelector('#blackjack-result').textContent = "Let's play"
        document.querySelector('#blackjack-result').style.color = 'black'

        
    }

    

}

function updateScore(card, activePlayer){
    //  ტუზი იწერებე 11 იმ შემთხვევაში თუ მე დავრჩები 21 ქვემოთ ხოლო თუ გადავცდები უბრალოდ 1
    if(card === 'A'){
        if(activePlayer['score'] + blackjackGame['cardsMap'][card][1] <= 21){
            activePlayer['score'] += blackjackGame['cardsMap'][card][1]
        }else{
            activePlayer['score'] += blackjackGame['cardsMap'][card][0]
        }
    }else{
        activePlayer['score'] += blackjackGame['cardsMap'][card]
    }
        
   

}

function showScore(activePlayer){
    if(activePlayer['score'] > 21){
        document.querySelector(activePlayer['scoreSpan']).textContent = 'BUST!'
        document.querySelector(activePlayer['scoreSpan']).style.color = 'red'
    }else{
        document.querySelector(activePlayer['scoreSpan']).textContent = activePlayer['score']
    }
    
}
function dealerLogic(){
    blackjackGame['isStand'] = true
    let card = randomCard()
    showCard(card, DEALER)
    updateScore(card, DEALER)
    showScore(DEALER)

    if (DEALER['score'] > 15) {
        blackjackGame['turnsOver'] = true
        let winner = computeWinner()
        showResult(winner)
        // console.log(blackjackGame['turnsOver'])
    }
    
}

// გამოვთვალოთ მოგებული და დავაბრუნოთ თუ ვინ მოიგო

function computeWinner(){
    let winner;

    // ვიგებთ ვინარის მოგებული იმ შემთხვევაში თუ შენ მოაგროვე 21 ნაკლები ქულა გადაამოწმებს დილერს
    // ხომ არ აქვს შენზე მეტი და 21 ნაკლები
    //updates the wins, draws and losses
    if(YOU['score'] <= 21){
        if(YOU['score'] > DEALER['score'] || (DEALER['score'] > 21)){
            blackjackGame['wins']++
            winner = YOU

        }else if(YOU['score'] < DEALER['score']){
            blackjackGame['losses']++
            winner = DEALER

        }else if(YOU['score'] === DEALER['score']){
            blackjackGame['draws']++
        }

        // ვამოწმებთ იმ ვარიანტებს როდესაც შენ აიღე 21 ეტი მაგრამ დილერმა 21 ნაკლები
    }else if(YOU['score'] > 21 && DEALER['score'] <= 21){
        blackjackGame['losses']++
        winner = DEALER

        // ვამოწმებთ იმ კონდიციას სადაც მოთამაშემაც და დილერმაც აიღო 21 მეტი ქულა
    }else if(YOU['score'] > 21 && DEALER['score'] > 21){

        blackjackGame['draws']++
    }

    console.log(blackjackGame)
    return winner
}

function showResult(winner){
    let message, messageColor

    if (blackjackGame['turnsOver'] === true) {
        
        if (winner === YOU) {
            document.querySelector('#wins').textContent = blackjackGame['wins']
            message = 'You won!'
            messageColor = 'green'
            winSound.play()

        }else if(winner === DEALER){
            document.querySelector('#losses').textContent = blackjackGame['losses']
            message = 'You lost!'
            messageColor = 'red'
            lossSound.play()

        }else{
            document.querySelector('#draws').textContent = blackjackGame['draws']
            message = 'You drew!'
            messageColor = 'black'
        }

        document.querySelector('#blackjack-result').textContent = message
        document.querySelector('#blackjack-result').style.color = messageColor
    }
}


