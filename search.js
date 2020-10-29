var resul;
var check =0;
function buscar(){

    var barra = document.getElementById("buscar").value;
    var tipo = document.getElementById("tipobuscar").value;
    var tipo2 = document.getElementById("tipobuscar2").value;
    let search;
    console.log("check"+check);
    /*
    console.log("check"+check);
    console.log("Barra="+barra);
    console.log("Tipo1:"+tipo);
    console.log("Tipo2:"+tipo2);
    */
    if(check==1 || check ==0){
        search = 'q='+barra;
    }
    if(check==2){
        console.log("Pais:"+tipo2);
        search = 'country='+tipo2;
       }
    if(check==3){
        search = "category="+tipo2;
    }
    if(check==4){
        search = "sources="+barra;
    }
    console.log("Busqueda="+search);
    $( document ).ready(function() {
        console.log("holaaaaa");
        let endpoint = 'https://newsapi.org/v2/top-headlines?';
        let apiKey = 'b510c88a3e8b4ec7bf1def5804e60bf6';
        var final = endpoint + search + "&apiKey=" + apiKey;
        console.log("Endpoint="+endpoint);
        console.log(final);
        $.ajax({
              url: final,
              type: 'GET',
              dataType:"json",
              success: function(status){
                  //console.log(status);
                  resul=status;
                  post(1);
              },
              error: function(e) {
                console.log(e);
             }
          });
        });
      
}

var current_page=1;
var postperpage=4;

//Postea el json y recibe la pagina
function post(page){
    /*
    */
    console.log("Dentro de Post")
    console.log(resul);
    
    console.log("Page-->"+page)
    console.log("NumPages-->"+numPages());
    console.log("Resul.length-->"+resul.totalResults)
    
    var paginas = document.getElementById("pagina");
    if(page<1){page=1} //Validacion de la pagina 1 para que no este en 0
    if(page>numPages()){page=numPages()}//Si se excede del numero de paginas puestas, este es el maximo

    var j=1;
    for (var i = (page-1) * postperpage; i < (page * postperpage); i++) {

        var seccion = document.getElementById("post"+j)//seccion
        seccion.innerHTML=""; //Limpieza anterior

        //URL
        var plink = document.createElement("A");
        plink.href=resul.articles[i].url
        seccion.appendChild(plink);

        //TITULO
        var ptitulo = document.createElement("H2");
        ptitulo.className = "post-title";
        var t = resul.articles[i].title;
        if(t.length>50){t=t.substring(0,100)+"...";}//Recortar el titulo
        ptitulo.innerHTML = t;
        plink.appendChild(ptitulo);

        //DESCRIPCION
        var pdesc = document.createElement("H3");
        pdesc.className="post-subtitle";
        var d = resul.articles[i].description;
        if(d.length>100){t=t.substring(0,80)+"...";}//Recortar el titulo
        pdesc.innerHTML=d;
        plink.appendChild(pdesc);

        //IMAGEN
        var pimg = document.createElement("IMG");
        pimg.className = "post-image";
        pimg.width = 500;
        pimg.height = 300;
        var m = resul.articles[i].urlToImage;
        if(m == null){m="https://www.thermaxglobal.com/wp-content/uploads/2020/05/image-not-found.jpg"} //Si imagen es nula
        pimg.src = m;
        seccion.appendChild(pimg);

        //AUTHOR Y FECHA
        var a = resul.articles[i].author;
        var f = resul.articles[i].publishedAt;
        if (a == null) {a="N/A"} //Si author es nulo
        if (f == null) {a="N/A"} //Si fecha es nulo
        var paut = document.createElement("P");
        paut.className="post-meta";
        paut.innerHTML = "Author(s): "+a+" Date: "+f;
        seccion.appendChild(paut);
        //HR
        seccion.appendChild(document.createElement("HR"));

        j++;
        //seccion.innerHTML += resul.articles[i].title + "<br>";
    }
    document.getElementById("sigPagina").style.display = "none";
    paginas.innerHTML = "Pagina "+page;

}

//Pagina Anterior
function prevPage()
{
    if (current_page > 1) {
        current_page--;
        post(current_page);
    }
}

//Siguiente Pagina
function nextPage()
{
    console.log("Entro a next");
    if (current_page < numPages()) {
        current_page++;
        post(current_page);
    }
}
//Maxima paginas por consulta
function numPages()
{
    return Math.ceil(resul.totalResults / postperpage);
}
//Funcionalidad de Select o Scrollbars
function cambioBusqueda(){
    console.log("CambiooooooS");
    var x = document.getElementById("tipobuscar").value;

    console.log("x="+x);
    //Keyword
    if(x == "Keyword"){
        check=1;
        document.getElementById("buscar").disabled = false;
        var $el = $("#tipobuscar2");
        $el.empty(); // remove old options
        document.getElementById("tipobuscar2").disabled = true;
    }
    //Pais
    if(x == "Pais"){
        check=2;
        document.getElementById("buscar").value = "";
        document.getElementById("buscar").disabled = true;
        document.getElementById("tipobuscar2").disabled = false;
        
        var newOptions = {
        "United Arab Emirates": "ae","Argentina": "ar",
        "Austria": "at","Australia": "au","Belgica": "be","Bulgaria": "bg",
        "Canada": "ca","Switzerland": "ch",
        "China": "cn","Colombia": "co","Cuba": "cu",
        "Czech Republic": "cz","Germany": "de","Egypt": "eg",
        "France": "fr","United Kingdom": "gb",
        "France": "fr","Hong Kong": "hk",
        "Hungary": "hu","Indonesia": "id",
        "Ireland": "ie","Israel": "il",
        "India": "in","Italy": "it",
        "Japan": "jp","South Korea": "kr","Lithuania": "lt","Latvia": "lv",
        "Morocco": "ma","Mexico": "mx",
        "Malaysia": "my","Nigeria": "ng",
        "Netherlands": "nl","Norway": "no",
        "New Zeland": "nz","Philippines": "ph",
        "Poland": "pl","Portugal": "pt",
        "Romania": "ro","Serbia": "rs",
        "Russia": "ru","Saudi Arabia": "sa",
        "Sweden": "se","Singapore": "sg",
        "Slovenia": "si","Slovakia": "sk",
        "Thailand": "th","Turkey": "tr",
        "Taiwan": "tw","Ukraine": "ua",
        "United States": "us","Venezuela": "ve","South Africa": "za"
        };

        var $el = $("#tipobuscar2");
        $el.empty(); // remove old options
        $.each(newOptions, function(key,value) {
        $el.append($("<option></option>")
            .attr("value", value).text(key));
        });
    }
    //Categoria
    if(x == "Categoria"){
        check = 3;
        document.getElementById("buscar").value = "";
        document.getElementById("buscar").disabled = true;
        document.getElementById("tipobuscar2").disabled = false;
        
        var newOptions = {
        "Business": "business","Entretainment": "entertainment"
        ,"General": "general","Health": "health"
        ,"Science": "science","Sports": "sports"
        ,"Technology": "technology"
        };

        var $el = $("#tipobuscar2");
        $el.empty(); // remove old options
        $.each(newOptions, function(key,value) {
        $el.append($("<option></option>")
            .attr("value", value).text(key));
        });
    }
    //Fuentes
    if(x == "Fuentes"){
        check = 4;
        document.getElementById("buscar").disabled = false;
        var $el = $("#tipobuscar2");
        $el.empty(); // remove old options
        document.getElementById("tipobuscar2").disabled = true;
    }
}