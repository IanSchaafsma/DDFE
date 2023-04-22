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
        // console.log(this.result);
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

    randomData;

    constructor(placeToRenderMain, getDataFromApi){
        this.placeToRenderMain = placeToRenderMain;
        this.mainElement = document.createElement("main");
        this.mainElement.classList = "main";

        this.randomData = getDataFromApi.randomizer.result;
        // console.log(this.randomData);
        this.LeftPanel = new LeftPanel(this.mainElement, this.randomData);
        this.RightPanel = new RightPanel(this.mainElement, this.LeftPanel, this.randomData);

    }

    render(){
        this.placeToRenderMain.appendChild(this.mainElement);
        this.LeftPanel.render();
        this.RightPanel.render();
    }
}

class LeftPanel{
    placeToRenderLeftPanel;
    mainElement;
    randomData;
    leftElement;
    wrapperElement;
    cardElement;
    imgElement;
    dateElement;
    titleElement;

    RandoNow;

    constructor(placeToRenderLeftPanel, randomData){
        this.placeToRenderLeftPanel = placeToRenderLeftPanel;

        this.leftElement = document.createElement("section");
        this.leftElement.classList = "leftSection";
        this.randomData = randomData;
        this.wrapperElement = document.createElement("div");

        for(let i = 0; i < 4; i++){
            let number = i;

            this.cardElement = document.createElement("figure");
            this.cardElement.classList = "leftSection__card";
    
            this.imgElement = document.createElement("img");
            this.imgElement.src = this.randomData[i]["img"];
            this.imgElement.classList = "leftSection__cardImg";
    
            this.dateElement = document.createElement("p");
            this.dateElement.innerText = this.randomData[i]["date (dd-mm-yyyy)"];
            this.dateElement.classList = "leftSection__cardDate";
    
            this.titleElement = document.createElement("h4");
            this.titleElement.innerText = this.randomData[i]["title"];
            this.titleElement.classList = "leftSection__cardTitle";

            this.wrapperElement.appendChild(this.cardElement);
            this.cardElement.appendChild(this.imgElement);
            this.cardElement.appendChild(this.dateElement);
            this.cardElement.appendChild(this.titleElement);

            this.onClick(number);
            
        }


    }

    onClick(i){
        if(this.RandoNow === undefined){
            this.RandoNow = 0;

            return;
        }
        else{
         this.cardElement.onclick = () =>{
            this.RandoNow = i;

            } 
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
    leftPanel;
    randomDataList;
    randoNumber;

    constructor(placeToRenderRightPanel, randoNumber, randomDataList){
        this.placeToRenderRightPanel = placeToRenderRightPanel;
        this.randomDataList = randomDataList;

        this.rightElement = document.createElement("section");
        this.rightElement.classList = "rightSection";

        
        this.randoNumber = randoNumber.RandoNow;

        this.detailCard = new DetailCard(this.rightElement, this.randoNumber, this.randomDataList);
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

    randomDataList
    randoNumber;
    combine;

    constructor(placeToRenderDetailCard, randoNumber, randomDataList){
        this.randoNumber = randoNumber;
        this.randomDataList = randomDataList;
        this.combine = []
        this.combine.push(this.randomDataList);        

        this.placeToRenderDetailCard = placeToRenderDetailCard;

        this.cardElement = document.createElement("figure");
        this.cardElement.classList = "rightSection__card";

        this.imgElement = document.createElement("img");
        this.imgElement.src = this.combine[0][this.randoNumber]["img"];
        this.imgElement.classList = "rightSection__cardImg";

        this.dateElement = document.createElement("p");
        this.dateElement.innerText = this.combine[0][this.randoNumber]["date (dd-mm-yyyy)"];
        this.dateElement.classList = "rightSection__cardDate";

        this.titleElement = document.createElement("h4");
        this.titleElement.innerText = this.combine[0][this.randoNumber]["title"];
        this.titleElement.classList = "rightSection__cardTitle"

        this.detailTextElement = document.createElement("p");
        this.detailTextElement.innerText = this.combine[0][this.randoNumber]["summary"];
        this.detailTextElement.classList = "rightSection__Text";

        this.buttonWrapperElement = document.createElement("article");
        this.buttonWrapperElement.classList = "rightSection__buttonWrapper";

        this.audioElement = document.createElement("audio");
        this.audioElement.controls = "true";
        this.audioElement.src = this.combine[0][this.randoNumber]["audio"];
        
        this.sourceElement = document.createElement("a");
        this.sourceElement.innerText = "Source >";
        this.sourceElement.href = this.combine[0][this.randoNumber]["url"];
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
