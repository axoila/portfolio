const ntfa_selected = "rgb(199, 136, 136)";
const games_selected = "rgb(156, 148, 236)";
const gd3_selected = "rgb(245, 229, 139)";

var old_thing = "summary";

function show(thing) {
    var element = document.getElementById(thing);
    var label = document.getElementById(thing + "-label");
    var items = document.getElementsByClassName("portfolio-item");

    console.log(thing + ": ");
    console.log(element);

    if (old_thing === thing) {
        document.getElementById("summary").style.display = "block";
        label.style.backgroundColor = "";
        element.style.display = "none";
        old_thing = "summary";
        return;
    } else {
        var old_element = document.getElementById(old_thing);
        old_element.style.display = "none";
        if (old_thing !== "summary"){
            var old_label = document.getElementById(old_thing + "-label");
            old_label.style.backgroundColor = "";
        }
  
        element.style.display = "block";
        switch (thing) {
            case "ntfa":
                label.style.backgroundColor = ntfa_selected;
                break;
            case "small-games":
                label.style.backgroundColor = games_selected;
                break;
            case "gd3":
                label.style.backgroundColor = gd3_selected;
                break;
            default:
                label.style.backgroundColor = "";
        }
    }
    
    old_thing = thing;
}