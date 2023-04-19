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
    constructor(){
        this.render();
    }

    render(){
        const bodyToBeRendered = document.getElementsByTagName("body");

        const cardToBeRendered = document.createElement("card");
        cardToBeRendered.classList = "card";
        bodyToBeRendered.appendChild(cardToBeRendered);
        
        const headerToBeRendered = document.createElement("header");
        headerToBeRendered.classList = "header";
        cardToBeRendered.appendChild(headerLogoToBeRendered);

        const headerLogoToBeRendered = document.createElement("figure");
        headerLogoToBeRendered.classList = "header__logo";
        headerLogoToBeRendered.appendChild(headerLogoToBeRendered);

        const headerNameToBeRendered = document.createElement("h2");
        headerNameToBeRendered.classList = "header__brandName";
        headerLogoToBeRendered.appendChild(headerNameToBeRendered);

        
    }
}

class LeftPanel{
    constructor(){

    }

    render(){
        
    }
}

class RightPanel{
    constructor(){

    }

    render(){
        
    }
}

class DetailCard{
    constructor(){

    }

    render(){
        
    }
}

class Footer{
    constructor(){

    }

    render(){
        
    }
}

class App{
    getDataFromApi;
    header;

    constructor(){
        this.header = new Header();
        this.getDataFromApi = new getDataFromApi("../data/data.json");
        this.getDataFromApi.getData().then(() => {
            console.log(this.getDataFromApi);
        })
    }    
}

const app = new App();
