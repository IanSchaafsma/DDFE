class Cookie{
    name = "";
    htmlElement = undefined;
    score = undefined;
    factor = 1;
    //Dit word 1x uitgevoerd wanner "new" word gebruikt.
    constructor(newName, newHTMLElement, newScore){
        this.name = newName;
        this.htmlElement = newHTMLElement;
        this.htmlElement.onclick = this.onCookieClicked;
        this.score = newScore;
    }

    onCookieClicked = () => {
        this.score.onCookieClicked(this.factor);
    }

    onStyleChange(){
        this.htmlElement.classList.remove("cookie--redval");
        this.htmlElement.classList.add("cookie--chocolate");
    }

    onStyleChangeTwo(){
        this.htmlElement.classList.remove("cookie--chocolate");
        this.htmlElement.classList.add("cookie--redval");
    }
}

class Score{
    score;
    name = "";
    htmlElement = undefined;
    
    constructor(newScore, newName, newHTMLElement){
        this.score = newScore;
        this.name = newName;
        this.htmlElement = newHTMLElement;
        this.htmlElement.innerText = this.score;
    }

    onCookieClicked(factorFromCookie){
        this.score = this.score + factorFromCookie;
        this.htmlElement.innerText = this.score;
    }

    subtractScore(){
        this.score = this.score - 100;
        this.htmlElement.innerText = this.score;
    }

    onAutoScoreClicked(){
        setInterval( () => {
            this.score = this.score + 500;
            this.htmlElement.innerText = this.score;
        }, 10000);
    }

    addPoints(){
        this.score = this.score + 10000;
        this.htmlElement.innerText = this.score;
    }

    scoreLoaded(newScore){
        this.score = newScore;
        this.htmlElement.innerText = this.score;[]
    }
}

class Multiplier{
    factor = 100;
    htmlElement = undefined;
    cookie = undefined;
    bought = false;

    constructor(htmlElement, cookie){
        this.htmlElement = htmlElement
        this.cookie = cookie;
        this.htmlElement.onclick = this.onMultiplierClicked;
    }

    onMultiplierClicked = () => {
            if(this.bought === false && window.localStorage.getItem("multiplier") !== "true"){
            window.localStorage.setItem("multiplier","true");
            this.bought = true;
            // remove 100 points from score
            this.cookie.score.subtractScore();
            this.cookie.factor = this.factor;
        }
        
    }
}

class autoScore{
    htmlElement = undefined;
    score = undefined;
    bought = false;

    constructor(htmlElement, score){
        this.htmlElement = htmlElement;
        this.score = score;
        this.htmlElement.onclick = this.onAutoScoreClicked;
        
        
    }

    onAutoScoreClicked = () => {
        if(this.bought === false){
            window.localStorage.setItem("autoscore","true");
            this.bought = true;
            this.score.subtractScore(); 
            score.onAutoScoreClicked();
        }
    }
}

class ChocolateCookie{
    htmlElement = undefined;
    bought = false;
    cookie = undefined;

    constructor(htmlElement, cookie){
        this.htmlElement = htmlElement;
        this.cookie = cookie;
        this.htmlElement.onclick = this.onChocolateCookieClicked;
    }

    onChocolateCookieClicked = () => {
        if(this.bought === false && window.localStorage.getItem("chocolateCookie") !== "true"){
            this.bought = true;
            window.localStorage.setItem("chocolateCookie", this.bought);
            this.cookie.score.addPoints();
        }
        
        this.cookie.onStyleChange();
    }
}

class RedValvetCookie{
    htmlElement = undefined;
    bought = false;
    cookie = undefined;

    constructor(htmlElement, cookie){
        this.htmlElement = htmlElement;
        this.cookie = cookie;
        this.htmlElement.onclick = this.onRedValvetCookieClicked;
    }

    onRedValvetCookieClicked = () => {
        if(this.bought === false && window.localStorage.getItem("redvalCookie") !== "true"){
            this.bought = true;
            window.localStorage.setItem("redvalCookie", this.bought);
            this.cookie.score.addPoints();
        }
        
        this.cookie.onStyleChangeTwo();
    }
}

class Save{
    htmlElement;

    constructor(newHTMLElement){
        this.htmlElement = newHTMLElement;
        this.htmlElement.onclick = this.onSaveButtonClicked;
    }

    onSaveButtonClicked = () => {
        window.localStorage.setItem("score", score.score);
    }
}

class Load{
    score;
    cookie;

    constructor(score, cookie){
        this.score = score;
        this.cookie = cookie;
        const fromLocalStorage = window.localStorage.getItem("autoscore");
        if(fromLocalStorage === "true"){
            this.bought = true;
            this.score.onAutoScoreClicked();
        }

        const fromLocalStorage2 = window.localStorage.getItem("multiplier");
        if(fromLocalStorage2 === "true"){
            this.bought = true;
            this.cookie.factor = 100;
        }
        this.onload();
    }

    onload = function(){
        const scoreFromLocalStorage = window.localStorage.getItem("score"); 
        if(scoreFromLocalStorage !== null){
            this.score.scoreLoaded(parseInt(scoreFromLocalStorage));
        }

    }
}


/* setup for score and cookie */
const score = new Score(0, "Default Score", document.getElementById("js--score"));
const cookie = new Cookie("Default Cookie", document.getElementById("js--cookie"), score);


/* setup desktop upgrade */
const multiplier = new Multiplier(document.getElementById("js--multiplier"), cookie);
const auto = new autoScore(document.getElementById("js--autoScore"),score);
const chocolate = new ChocolateCookie(document.getElementById("js--chocolate"),cookie);
const redval = new RedValvetCookie(document.getElementById("js--redvalvet"),cookie);
const save = new Save(document.getElementById("js--save"));
const load = new Load(score, cookie);

/* setup mobile upgrade */

const multiplierMobile = new Multiplier(document.getElementById("js--multiplier--mobile"), cookie);
const autoMobile = new autoScore(document.getElementById("js--autoScore--mobile"),score);
const chocolateMobile = new ChocolateCookie(document.getElementById("js--chocolate--mobile"),cookie);
const redvalMobile = new RedValvetCookie(document.getElementById("js--redvalvet--mobile"), cookie);
