class GetData{
    data = null;
    async getData(){
        await fetch("../data/games.json").then(response => {
            return response.json();
        }).then(newData => {
            this.data = newData.games;
        });
    }
}

class Filter{
    filter(platform){
        console.log(platform);
    }
}

class App{
    GetData;
    Filter;

    constructor(){
        this.getData = new GetData();
        this.filter = new Filter()

        this.getData.getData().then(() => {console.log(this.getData)});
        this.filter.filter("PS4");
    }
}

const app = new App();