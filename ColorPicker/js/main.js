class ColorCard{   // Blauwdruk van ColorCard
    id;            // een id var
    color;         // een color var
    addToList;     // een addToList var
    htmlElement;   // een htmlElement var
    circle;        // een circle var  
    text;          // een text var

    constructor(newId, newColor, addToList){      // een constructor waar je 3 vars meegeeft
        // setting properties 
        this.id = newId;                          // je zet de waarde van newId in de id van colorcard
        this.color = newColor;                    // je zet de waarde van color van newColor in de color van colorcard
        this.addToList = addToList;               // je zet de waarde van addToList van addToList van colorcard
        
        // make htmlElement to render
        this.htmlElement = document.createElement("li");   // je maakt een li element aan
        this.htmlElement.classList = "colors__color";      // je voegt aan de li een class toe

        this.circle = document.createElement("figure");    // je maakt een figure aan
        this.circle.classList = "colors__circle";          // je voegt aan de figure een class
        this.circle.style.background = this.color;         // je voegt de kleur var toe aan de figure

        this.text = document.createElement("p");           // je maakt een p element aan
        this.text.innerText = "Copied!";                   // je zet in de p text neer
        this.text.classList = "colors__text";              // je geeft de p element een class

        this.htmlElement.onclick = this.onHTMLElementClicked;   // je geeft de li een onclick functie mee

        // final render
        this.render();                                           // je voert de render functies uit
    }

    onHTMLElementClicked = () => {                               // je maakt een arrow function 
        this.circle.classList.add("colors__circle--selected");   // je voegt een class toe
        document.title = this.color;                             // je zet de tab title naar de kleur code
        window.navigator.clipboard.writeText(this.color);        // je kopieert de kleur code naar het clipboard
    } 

    render(){                                                    // je maakt een render functie
        this.htmlElement.appendChild(this.circle);               // je voegt de figure toe aand de li
        this.htmlElement.appendChild(this.text);                 // je voegt de text toe aan de li
        this.addToList.appendChild(this.htmlElement);            // je voegt de li toe aan de ul
    }
}

class ColorList {                                                 // je maakt een blauwdruk genaamt ColorList
    id;                                                           // een id var
    htmlElement;                                                  // een htmlElement var
    constructor(newId){                                           // de constructor waar je een newId vraagt
        this.id = newId;                                          // je stop in de id de newId
        this.htmlElement = document.createElement("ul");          // je maakt een ul aan
        this.htmlElement.id = this.id;                            // je zet de htmlelement id naar het id van colorlist
        this.htmlElement.classList.add("colors");                 // je voegt aan htmlelement een class toe
        this.render();                                            // je voert de render function uit
    }

    render(){                                                     // je maakt een render functie aan
        document.querySelector("body").appendChild(this.htmlElement);   //je pakt de body en gooit daar de htmlElement aan
    }
}

class HSLGenerator{          // je maakt een blauwdruk HSLGenerator
    randomHue;                // je maakt een randomhue var
    randomSaturation;          // je maakt een randomsaturation var
    randomLightness;           // je maakt een random lightness var
    hsl;                       // je maat een hsl var

    constructor(){            // je maakt een constructor aan
        this.generateHSL();   // je voert de generatehsl functie uit
    }

    generateHue = function(){             // je maakt een functie genaamt generathue
        this.randomHue = Math.floor(Math.random() * (360 - 1) + 1);       // je genereert een een nummer wat uiteindelijk de hue word
    }

    generateSaturation = function(){         // je maakt een functie genaamt generatesaturation
        this.randomSaturation = Math.floor(Math.random() * (79 - 11) + 11) + "%";    // je genereert een nummer wat uiteindelijk de saturation word
    }

    generateLightness = function(){        // je maakt een functie genaamd generateligthness 
        this.randomLightness = Math.floor(Math.random()  * (100 -11) + 11) + "%";   // je genereert een nummer wat uiteindelijk de lightness word
    }

    generateHSL = function(){        // je maakt een funcite genaamt generatehsl
        this.generateHue();            // je roept de generatehue functie aan
        this.generateSaturation();     // je roept de generatesaturation functie aan
        this.generateLightness();      // je roept de generatelightness functie aan
        this.hsl = `hsl(${this.randomHue} ${this.randomSaturation} ${this.randomLightness})`;  // je combineert alle generate functies en stopt het in een hsl var
    }
}

class App{    // je maakt een app blauwdruk aan
    colorList;        // je maakt een colorlist var
    hslGenerator;     // je maakt een hslgenerator var

    constructor(newId){    // je maakt een constructor aan waar je om een newId vraagt
        this.id = newId;     // je stopt de newId in de id van app
        this.colorList = new ColorList(this.id);    // je maakt een colorlist van de blauwdruk aan en geeft het de app zijn id mee
        this.hslGenerator = new HSLGenerator();     // je maakt een hslgenerator aan
        this.generateColorCards();           // je roept de generatecolorcards functie aan
    }

    generateColorCards = function(){        // je maakt een funcite generatecolorcards aan
        for(let i = 1; i <= 100; i++){        // je loopt door 100 heen
           this.hslGenerator.generateHSL();   // je roept de generatehsl functie aan
           new ColorCard(i, this.hslGenerator.hsl, document.getElementById(this.colorList.id)); // je maakt een colorcard aan en je geeft het de waarde van waar je bent in de loop mee ook de gegenereerde code van de hsl en de id van de colorlist
        }

    }
}

const app = new App("js--app"); // je maakt de app aan
   

    

