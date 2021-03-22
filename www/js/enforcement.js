document.getElementById("savenft").addEventListener("click", saveNFT)
document.getElementById("home").addEventListener("click", goHome)

function setupDocument() {
    if( localStorage.getItem("law_enforcement") !== null ) {
            let _data = localStorage.getItem("law_enforcement");
            let parsedData = JSON.parse(_data);
            
            if( parsedData.validdl === true ) {
                document.getElementById("validdl").checked = true;
            }
            if( parsedData.validreg === true ) {
                document.getElementById("validreg").checked = true;
            }
            if( parsedData.validins === true ) {
                document.getElementById("validins").checked = true;
            }
            document.getElementById("currentstatus").value = parsedData.status
    }

    //check for selected disclosure field inclusion
    if(localStorage.getItem("selectedlawenforcement") !== null) {
        //have to include these fields for selection
        let selectedflds = localStorage.getItem("selectedlawenforcement");
        let pselectedflds = JSON.parse(selectedflds);
        if(pselectedflds.search !== true) {
            //disable no need to show actual value
            document.getElementById("search").disabled = true;
        }
        else {
            //then look into law_enforcement and set the value for this field
            document.getElementById("search").disabled = false;
            var data = localStorage.getItem("law_enforcement");
            var _data = localStorage.getItem("law_enforcement");
            var parsedData = JSON.parse(_data);
            if(parsedData.search === true) {
                document.getElementById("search").checked = true
            }
        }
    }
}

function saveNFT() {
    let validdl = document.getElementById("validdl").checked;
    let validreg = document.getElementById("validreg").checked;
    let validins = document.getElementById("validins").checked;
    let status = document.getElementById("currentstatus").value;
    //alert(`${validdl} :: ${validreg} :: ${validins} :: ${status}`)

    //process through selected fields.  Not all are enabled so need to extract from fields that are enabled.
    let search = document.getElementById("search").checked;
    if( document.getElementById("search").disabled !== false) {
        search = document.getElementById("search").checked;
    }


    var law_enforcement = 
        {
            "validdl" : validdl,
            "validreg" : validreg,
            "validins" : validins,
            "status": status,
            "search": search
        }
    
    localStorage.setItem("law_enforcement", JSON.stringify(law_enforcement))

    
    


}

function goHome() {
    window.location.href = "index.html"
}