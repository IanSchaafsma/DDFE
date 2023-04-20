class getDataFromApi{
    url = ""
    data = null;

    constructor(newURL){
        this.url = newURL;
    }

    async getData(){
            await fetch(this.url)
            .then(function (response) {
                return response.json();
            }).then((data) => {
                this.data = data.episodes;
            });
        return this.data;
    }
}

class Header{
    headerElement;
    headerLogoWrapperElement;
    headerLogoElement;
    headerTextElement;
    placeToRenderHeader;
    constructor(placeToRenderHeader){
        this.placeToRenderHeader = placeToRenderHeader;

        this.headerElement = document.createElement("header");
        this.headerElement.classList = "header";

        this.headerLogoWrapperElement = document.createElement("figure");
        this.headerLogoWrapperElement.classList = "header__logo";

        this.headerLogoElement = document.createElement("i");
        this.headerLogoElement.classList = "fa-solid fa-sun";

        this.headerTextElement = document.createElement("h2");
        this.headerTextElement.innerText = "Collection of Happiness";
        this.headerTextElement.classList = "header__brandName";
        
    }

    render(){
        this.placeToRenderHeader.appendChild(this.headerElement);
        this.headerElement.appendChild(this.headerLogoWrapperElement);        
        this.headerLogoWrapperElement.appendChild(this.headerLogoElement);
        this.headerElement.appendChild(this.headerTextElement);        
    }
}

class Main{
    mainElement
    placeToRenderMain
    LeftPanel;
    RightPanel;
    data;
    constructor(placeToRenderMain, data){
        this.placeToRenderMain = placeToRenderMain;
        this.mainElement = document.createElement("main");
        this.mainElement.classList = "main";

        this.data = data.data;
        // console.log(this.data);

        this.LeftPanel = new LeftPanel(this.mainElement, this);
        this.RightPanel = new RightPanel(this.mainElement, this);

    }

    render(){
        this.placeToRenderMain.appendChild(this.mainElement);
        this.LeftPanel.render();
        this.RightPanel.render();

    }

    randomizedData(){
        let dataRando = [];
        let randomData = Math.floor(Math.random() * this.data.length);
        dataRando = this.data[randomData];
        return this.data[randomData];
        
    }
}

class LeftPanel{
    placeToRenderLeftPanel;
    mainElement;
    main;
    randomizedData;

    leftElement;
    wrapperElement;
    cardElement;
    imgElement;
    dateElement;
    titleElement;
    constructor(placeToRenderLeftPanel, main){
        this.placeToRenderLeftPanel = placeToRenderLeftPanel;

        this.leftElement = document.createElement("section");
        this.leftElement.classList = "leftSection";

        this.wrapperElement = document.createElement("div");

        this.main = main;

        for(let i = 0; i < 4; i++){
            this.randomizedData = this.main.randomizedData();

            this.cardElement = document.createElement("figure");
            this.cardElement.classList = "leftSection__card";
    
            this.imgElement = document.createElement("img");
            this.imgElement.src = this.randomizedData["img"];
            this.imgElement.classList = "leftSection__cardImg";
    
            this.dateElement = document.createElement("p");
            this.dateElement.innerText = this.randomizedData["date (dd-mm-yyyy)"];
            this.dateElement.classList = "leftSection__cardDate";
    
            this.titleElement = document.createElement("h4");
            this.titleElement.innerText = this.randomizedData["title"];
            this.titleElement.classList = "leftSection__cardTitle";

            this.wrapperElement.appendChild(this.cardElement);
            this.cardElement.appendChild(this.imgElement);
            this.cardElement.appendChild(this.dateElement);
            this.cardElement.appendChild(this.titleElement);

            this.onClick();
            
        }

    }

    onClick(){
        this.cardElement.onclick = () =>{
            console.table(this.randomizedData);
        }
        
    }
   

    render(){
        this.placeToRenderLeftPanel.appendChild(this.leftElement);
        this.leftElement.appendChild(this.wrapperElement);
    }

    
}

class RightPanel{
    placeToRenderRightPanel;
    rightElement;
    detailCard;
    main;

    constructor(placeToRenderRightPanel, main){
        this.placeToRenderRightPanel = placeToRenderRightPanel;

        this.rightElement = document.createElement("section");
        this.rightElement.classList = "rightSection";

        this.main = main;

        this.detailCard = new DetailCard(this.rightElement, this.main);
    }

    render(){
        this.placeToRenderRightPanel.appendChild(this.rightElement);
        this.detailCard.render();
    }
}

class DetailCard{
    placeToRenderDetailCard;
    cardElement;
    imgElement;
    dateElement;
    titleElement;
    detailTextElement;
    buttonWrapperElement;
    audioElement;
    sourceElement;

    main;
    constructor(placeToRenderDetailCard, main){
        this.main = main;
        // console.log(this.main.randomizedData[0]);    

        this.placeToRenderDetailCard = placeToRenderDetailCard;

        this.cardElement = document.createElement("figure");
        this.cardElement.classList = "rightSection__card";

        this.imgElement = document.createElement("img");
        this.imgElement.src = this.main.randomizedData()["img"];
        this.imgElement.classList = "rightSection__cardImg";

        this.dateElement = document.createElement("p");
        this.dateElement.innerText = this.main.randomizedData()["date (dd-mm-yyyy)"];
        this.dateElement.classList = "rightSection__cardDate";

        this.titleElement = document.createElement("h4");
        this.titleElement.innerText = this.main.randomizedData()["title"];
        this.titleElement.classList = "rightSection__cardTitle"

        this.detailTextElement = document.createElement("p");
        this.detailTextElement.innerText = this.main.randomizedData()["summary"];
        this.detailTextElement.classList = "rightSection__Text";

        this.buttonWrapperElement = document.createElement("article");
        this.buttonWrapperElement.classList = "rightSection__buttonWrapper";

        this.audioElement = document.createElement("audio");
        this.audioElement.controls = "true";
        this.audioElement.src = this.main.randomizedData()["audio"];
        
        this.sourceElement = document.createElement("a");
        this.sourceElement.innerText = "Source >";
        this.sourceElement.href = this.main.randomizedData()["url"];
        this.sourceElement.classList = "rightSection__sourceButton";
    }

    render(){
        this.placeToRenderDetailCard.appendChild(this.cardElement);
        this.cardElement.appendChild(this.imgElement);
        this.cardElement.appendChild(this.dateElement);
        this.cardElement.appendChild(this.titleElement);
        this.placeToRenderDetailCard.appendChild(this.detailTextElement);
        this.placeToRenderDetailCard.appendChild(this.buttonWrapperElement);
        this.buttonWrapperElement.appendChild(this.audioElement);
        this.buttonWrapperElement.appendChild(this.sourceElement);
    }
}

class Footer{
    footerElement;
    footerNameElement;
    placeToRenderFooter
    constructor(placeToRenderFooter){
        this.placeToRenderFooter = placeToRenderFooter;
        this.footerElement = document.createElement("footer");
        this.footerElement.classList = "footer";

        this.footerNameElement = document.createElement("p");
        this.footerNameElement.innerText = "Gemaakt door - Ian SD2D MediaCollege";
        this.footerNameElement.classList = "footer__name";

    }

    render(){
        this.placeToRenderFooter.appendChild(this.footerElement);
        this.footerElement.appendChild(this.footerNameElement);
    }
}

class App{
    getDataFromApi;
    header;
    main;
    footer;
    body;
    placeToRender;

    constructor(){
        this.body = document.getElementsByTagName("body")[0]

        this.placeToRender = document.createElement("section");
        this.placeToRender.classList = "card";
        this.body.appendChild(this.placeToRender);
        

        


        this.getDataFromApi = new getDataFromApi("../data/data.json");
        this.getDataFromApi.getData().then(() => {
            // console.log(this.getDataFromApi);
            this.header = new Header(this.placeToRender);
            this.main = new Main(this.placeToRender, this.getDataFromApi);
            this.footer = new Footer(this.placeToRender);

            this.header.render();
            this.main.render();
            this.footer.render();

        })

        
    }    

}

const app = new App();
