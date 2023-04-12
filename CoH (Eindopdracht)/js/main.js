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
                this.data = data;
            });
        return this.data;
    }
}

class Header{
    constructor(){

    }

    render(){

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
    constructor(){

    }    
}