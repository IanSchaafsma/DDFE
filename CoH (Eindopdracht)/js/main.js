class getDataFromApi{
    url = ""
    data = null;
    randomizer;
    
    constructor(newURL){
        this.url = newURL;
    }

    async getData(){
            await fetch(this.url)
            .then(function (response) {
                return response.json();
            }).then((data) => {
                this.data = data.episodes;
                this.randomizer = new Randomizer(this.data);
                
            });
        return this.data, this.randomizer;
    }
}

class Randomizer{
    result = [1, 2, 3 ,4];
    data;
    randomData;

    constructor(data){
        this.data = data;
        this.result;
        this.getRando();
    }

    getRando(){
        this.result.forEach(int => {
            this.randomData = Math.floor(Math.random() * this.data.length);
            this.randomData1 = Math.floor(Math.random() * this.data.length);
            this.randomData2 = Math.floor(Math.random() * this.data.length);
            this.randomData3 = Math.floor(Math.random() * this.data.length);
            this.result = [];
            this.result.push((this.data[this.randomData]));
            this.result.push((this.data[this.randomData1]));
            this.result.push((this.data[this.randomData2]));
            this.result.push((this.data[this.randomData3]));
        }); 
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
    arrayOfDataList;

    constructor(placeToRenderMain, getDataFromApi){
        this.placeToRenderMain = placeToRenderMain;
        this.mainElement = document.createElement("main");
        this.mainElement.classList = "main";

        this.arrayOfDataList = getDataFromApi.randomizer.result;
        this.LeftPanel = new LeftPanel(this.mainElement, this.arrayOfDataList, this);
        this.RightPanel = new RightPanel(this.mainElement, this.LeftPanel, this.arrayOfDataList);

    }

    render(){
        this.placeToRenderMain.appendChild(this.mainElement);
        this.LeftPanel.render();
        this.RightPanel.render();
    }

    changeRightSection(number){
        this.RightPanel.detailCard.changeRightSectionCard(number);
    };
}

class LeftPanel{
    placeToRenderLeftPanel;
    mainElement;
    leftElement;
    wrapperElement;
    cardElement;
    imgElement;
    dateElement;
    titleElement;
    main;
    arrayOfDataList;
    cardClickedNumber;
    

    constructor(placeToRenderLeftPanel, arrayOfDataList, main){
        this.placeToRenderLeftPanel = placeToRenderLeftPanel;

        this.leftElement = document.createElement("section");
        this.leftElement.classList = "leftSection";
        this.arrayOfDataList = arrayOfDataList;
        this.wrapperElement = document.createElement("div");

        this.main = main;

        for(let i = 0; i < 4; i++){
            let number = i;

            this.cardElement = document.createElement("figure");
            this.cardElement.classList = "leftSection__card";
            this.cardElement.onclick = () =>{
                this.main.changeRightSection(number);
            }
    
            this.imgElement = document.createElement("img");
            this.imgElement.src = this.arrayOfDataList[i]["img"];
            this.imgElement.classList = "leftSection__cardImg";
    
            this.dateElement = document.createElement("p");
            this.dateElement.innerText = this.arrayOfDataList[i]["date (dd-mm-yyyy)"];
            this.dateElement.classList = "leftSection__cardDate";
    
            this.titleElement = document.createElement("h4");
            this.titleElement.innerText = this.arrayOfDataList[i]["title"];
            this.titleElement.classList = "leftSection__cardTitle";

            this.wrapperElement.appendChild(this.cardElement);
            this.cardElement.appendChild(this.imgElement);
            this.cardElement.appendChild(this.dateElement);
            this.cardElement.appendChild(this.titleElement);

            this.onClick(number);
            
        }


    }

    onClick(i){
        if(this.cardClickedNumber === undefined){
            this.cardClickedNumber = 0;

            return;
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
    arrayOfDataList;
    cardClickedNumber;

    constructor(placeToRenderRightPanel, leftPanel, arrayOfDataList){
        this.placeToRenderRightPanel = placeToRenderRightPanel;
        this.arrayOfDataList = arrayOfDataList;

        this.rightElement = document.createElement("section");
        this.rightElement.classList = "rightSection";


        
        this.cardClickedNumber = leftPanel.cardClickedNumber; // takes the card thats clicked from the left panel

        this.detailCard = new DetailCard(this.rightElement, this.cardClickedNumber, this.arrayOfDataList);
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
    arrayOfDataList
    cardClickedNumber;

    constructor(placeToRenderDetailCard, cardClickedNumber, arrayOfDataList){
        this.cardClickedNumber = cardClickedNumber;
        this.arrayOfDataList = arrayOfDataList;

        this.placeToRenderDetailCard = placeToRenderDetailCard;

        this.cardElement = document.createElement("figure");
        this.cardElement.classList = "rightSection__card";

        this.imgElement = document.createElement("img");
        this.imgElement.src = this.arrayOfDataList[this.cardClickedNumber]["img"];
        this.imgElement.classList = "rightSection__cardImg";

        this.dateElement = document.createElement("p");
        this.dateElement.innerText = this.arrayOfDataList[this.cardClickedNumber]["date (dd-mm-yyyy)"];
        this.dateElement.classList = "rightSection__cardDate";

        this.titleElement = document.createElement("h4");
        this.titleElement.innerText = this.arrayOfDataList[this.cardClickedNumber]["title"];
        this.titleElement.classList = "rightSection__cardTitle"

        this.detailTextElement = document.createElement("p");
        this.detailTextElement.innerText = this.arrayOfDataList[this.cardClickedNumber]["summary"];
        this.detailTextElement.classList = "rightSection__Text";

        this.buttonWrapperElement = document.createElement("div");
        this.buttonWrapperElement.classList = "rightSection__buttonWrapper";

        this.audioElement = document.createElement("audio");
        this.audioElement.controls = "true";
        this.audioElement.src = this.arrayOfDataList[this.cardClickedNumber]["audio"];
        
        this.sourceElement = document.createElement("a");
        this.sourceElement.innerText = "Source >";
        this.sourceElement.href = this.arrayOfDataList[this.cardClickedNumber]["url"];
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

    changeRightSectionCard(number) {
        this.imgElement.src = this.arrayOfDataList[number]["img"];
        this.dateElement.innerText = this.arrayOfDataList[number]["date (dd-mm-yyyy)"];
        this.titleElement.innerText = this.arrayOfDataList[number]["title"];
        this.detailTextElement.innerText = this.arrayOfDataList[number]["summary"];
        this.audioElement.src = this.arrayOfDataList[number]["audio"];
        this.sourceElement.href = this.arrayOfDataList[number]["url"];
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
    cardDetail;

    constructor(){
        this.body = document.getElementsByTagName("body")[0]

        this.placeToRender = document.createElement("section");
        this.placeToRender.classList = "card";
        this.cardDetail = document.createElement("i");
        this.cardDetail.classList = "fa-solid fa-sun card__detail";
        this.body.appendChild(this.placeToRender);
        this.placeToRender.appendChild(this.cardDetail);
        

        


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
