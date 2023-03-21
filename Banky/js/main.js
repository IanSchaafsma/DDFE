class getDataFromApi{
    url = ""
    data = null;

    constructor(newURL){
        this.url = newURL;
    }

    async getData(){
        console.log("ik haal de data op");
            await fetch(this.url)
            .then(function (response) {
                return response.json();
            }).then((data) => {
                this.data = data;
            });
        return this.data;
    }
}

// const jeroen = new getDataFromApi("/data/transactions.json");
// jeroen.getData().then(function(data){ console.log(data)});

class Header{
    headerElement;
    figureElement;
    logoIconElement;
    logoTextElement;
    avatarWrapperElement;
    avatarFigureElement;
    avatarHeadDivElement;
    avatarBodyDivElement;
    placeToRenderHeader;

    constructor(placeToRenderHeader){
        this.placeToRenderHeader = document.getElementsByTagName(placeToRenderHeader)[0];

        this.headerElement = document.createElement("header");
        this.headerElement.classList = "header";

        this.figureElement = document.createElement("figure");
        this.figureElement.classList = "header__logo";

        this.logoIconElement = document.createElement("i");
        this.logoIconElement.classList = "header__logoIcon fa-solid fa-landmark";

        this.logoTextElement = document.createElement("h1");
        this.logoTextElement.classList = "header__banky";
        this.logoTextElement.innerText = "banky";

        this.avatarWrapperElement = document.createElement("div");
        this.avatarWrapperElement.classList = "header__avatarWrapper";

        this.avatarFigureElement = document.createElement("figure");
        this.avatarFigureElement.classList = "avatar";

        this.avatarHeadDivElement = document.createElement("div");
        this.avatarHeadDivElement.classList = "avatar__head";

        this.avatarBodyDivElement = document.createElement("div");
        this.avatarBodyDivElement.classList = "avatar__body";
    }

    render(){
        this.placeToRenderHeader.appendChild(this.headerElement);
        this.headerElement.appendChild(this.figureElement);
        this.figureElement.appendChild(this.logoIconElement);
        this.figureElement.appendChild(this.logoTextElement);
        this.headerElement.appendChild(this.avatarWrapperElement);
        this.avatarWrapperElement.appendChild(this.avatarFigureElement);
        this.avatarFigureElement.appendChild(this.avatarHeadDivElement);
        this.avatarFigureElement.appendChild(this.avatarBodyDivElement);
    }
}



class BankyMain{
    placeToRenderBankyMain;
    leftSection;
    rightSection;
    

    constructor(placeToRenderBankyMain){
        this.placeToRenderBankyMain = document.getElementsByTagName(placeToRenderBankyMain)[0];

        /* main */
        this.mainElement = document.createElement("main");
        this.mainElement.classList = "banky";

        this.leftSection = new BankyLeftSection(this.mainElement);
        this.rightSection = new BankyRightSection(this.mainElement, this.leftSection);
    }

    makeTransactionsFromData(data){
        this.leftSection.makeTransactionsFromData("ZZP-Rekening", data); 
    }

    makeButtonsFromData(data){
        this.rightSection.makeButtonsFromData(data);
    }

    render(){
        this.placeToRenderBankyMain.appendChild(this.mainElement);

        this.leftSection.render();
        this.rightSection.render();
    }
}


class BankyLeftSection{
    mainElement;
    constructor(mainElement){
        this.mainElement = mainElement;
        // left section
        this.leftSectionElement = document.createElement("section");
        this.leftSectionElement.classList = "banky__section banky__section--left"

        this.bankyHeaderElement = document.createElement("header");
        this.bankyHeaderElement.classList = "banky__header";

        this.bankyHeaderWrapElement = document.createElement("div");

        this.bankyLogoElement = document.createElement("figure");
        this.bankyLogoElement.classList = "banky__logo";

        this.bankyLogoIElement = document.createElement("i");
        this.bankyLogoIElement.classList = "fa-solid fa-house";

        this.bankyLogoTextElement = document.createElement("h1");
        this.bankyLogoTextElement.classList = "banky__money";
        this.bankyLogoTextElement.innerText = "Saldo €10"

        this.eyeButtonElement = document.createElement("button");
        this.eyeButtonElement.classList = "banky__eyeButton";

        this.eyeFigureElement = document.createElement("figure");
        this.eyeFigureElement.classList = "banky__eye";

        this.eyeIElement = document.createElement("i");
        this.eyeIElement.classList = "fa-solid fa-eye";

        this.transactionsElement = document.createElement("ul");
        this.transactionsElement.classList = "banky__transactions";

        this.transferButtonElement = document.createElement("button");
        this.transferButtonElement.classList = "banky__transferButton";
        this.transferButtonElement.innerText = "Overboeken"
    }

    makeTransactionsFromData(accountToShow, data){
        let totalMoney = 0;
        for(let i = 0; i < data[accountToShow].length; i++){
            totalMoney += data[accountToShow][i]["amount"];
        }

        this.bankyLogoTextElement.innerText = "Saldo " +  " €" + totalMoney;

        // empty ul before adding li
        this.transactionsElement.innerHTML = "";

        for(let i = 0; i < data[accountToShow].length; i++){
            this.transactionElement = document.createElement("li");
            this.transactionElement.classList = "banky__transaction";
    
            this.transactionFromElement = document.createElement("h3");
            this.transactionFromElement.classList = "banky__name";
            this.transactionFromElement.innerText = data[accountToShow][i]["from/to"];
    
            this.transactionAmountElement = document.createElement("h3");
            this.transactionAmountElement.classList = "banky__amount";
            this.transactionAmountElement.innerText = "€" + data[accountToShow][i]["amount"];

            this.leftSectionElement.appendChild(this.transactionsElement);
            this.transactionsElement.appendChild(this.transactionElement);
            this.transactionElement.appendChild(this.transactionFromElement);
            this.transactionElement.appendChild(this.transactionAmountElement);
        }
        this.leftSectionElement.appendChild(this.transferButtonElement);

    }
    
    render(){
        // left section
        this.mainElement.appendChild(this.leftSectionElement);
        this.leftSectionElement.appendChild(this.bankyHeaderElement);
        this.bankyHeaderElement.appendChild(this.bankyHeaderWrapElement);
        this.bankyHeaderWrapElement.appendChild(this.bankyLogoElement);
        this.bankyLogoElement.appendChild(this.bankyLogoIElement);
        this.bankyHeaderWrapElement.appendChild(this.bankyLogoTextElement);
        this.bankyHeaderWrapElement.appendChild(this.eyeButtonElement);
        this.eyeButtonElement.appendChild(this.eyeFigureElement);
        this.eyeFigureElement.appendChild(this.eyeIElement);
        
    }
}

class BankyRightSection{
    mainElement;
    leftSection;
    constructor(mainElement, leftSection){
        this.mainElement = mainElement;
        this.leftSection = leftSection;
        // right section
        this.rightSectionElement = document.createElement("section");
        this.rightSectionElement.classList = "banky__section banky__section--right";

        this.accountsElement = document.createElement("ul");
        this.accountsElement.classList = "banky__accounts";
    }

    makeButtonsFromData(data){
        Object.entries(data).forEach((entry) => {

        this.accountElement = document.createElement("li");
        this.accountElement.classList = "banky__account";
        this.accountElement.onclick = () => {
            this.leftSection.makeTransactionsFromData(entry[0], data);
        }

        this.switchAccountElement = document.createElement("button");
        this.switchAccountElement.classList = "banky__switchAccount";

        this.switchAccountFigureElement = document.createElement("figure");
        this.switchAccountFigureElement.classList = "banky__logo";

        this.switchAccountLogoElement = document.createElement("i");
        this.switchAccountLogoElement.classList = "fa-solid fa-coins";

        this.switchZZPAccountElement = document.createElement("i");
        this.switchZZPAccountElement.classList = "fa-solid fa-briefcase";

        this.accountNameElement = document.createElement("h4");
        this.accountNameElement.classList = "banky__nameOfAccount";
        this.accountNameElement.innerText = entry[0];

        this.accountsElement.appendChild(this.accountElement);
        this.accountElement.appendChild(this.switchAccountElement);
        this.switchAccountElement.appendChild(this.switchAccountFigureElement);
        this.switchAccountFigureElement.appendChild(this.switchAccountLogoElement);
        this.accountElement.appendChild(this.accountNameElement);
        this.accountsElement.appendChild(this.accountElement);
        });
    }

    render(){
        // right section
        this.mainElement.appendChild(this.rightSectionElement);
        this.rightSectionElement.appendChild(this.accountsElement);
    }
}

class App{
    bankyHeader;
    bankyMain;
    getDataFromApi;

    constructor(){
        this.header = new Header("body")
        this.bankyMain = new BankyMain("body");

        this.getDataFromApi = new getDataFromApi("./data/transactions.json");
            this.getDataFromApi
            .getData().then( (data) =>{
                this.bankyMain.makeTransactionsFromData(data);
                this.bankyMain.makeButtonsFromData(data);
            });

        this.header.render();
        this.bankyMain.render();


    }
}

const app = new App();