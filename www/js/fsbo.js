document.getElementById("savenft").addEventListener("click", saveNFT)
document.getElementById("home").addEventListener("click", goHome)

function setupDocument() {
    
    if( localStorage.getItem("fsbo") !== null ) {
        let _data = localStorage.getItem("fsbo");
        let parsedData = JSON.parse(_data);
        if( parsedData.valid_vehicle_registration === true ) {
            document.getElementById("validreg").checked = true;
        }
        if( parsedData.epa === true ) {
            document.getElementById("smog1").checked = true;
            document.getElementById("smog2").checked = false;
        }
        else {
            document.getElementById("smog1").checked = false;
            document.getElementById("smog2").checked = true;
        }
        document.getElementById("vehicletitle").value = parsedData.title_type
        document.getElementById("currentstatus").value = parsedData.alert
        if( parsedData.financing === true) {
            document.getElementById("lien").checked = true
        }
    }

    //now search for MRO data
    if( localStorage.getItem("mro") !== null ) {
        document.getElementById("reportdate").disabled = true;
        document.getElementById("mileage").disabled = true;
        document.getElementById("comments").disabled = true;
        var _data = localStorage.getItem("mro");
        var parsedData = JSON.parse(_data);
       document.getElementById('reportdate').value = parsedData.report_date;
        document.getElementById('mileage').value = parsedData.mileage;
        document.getElementById('comments').value = parsedData.comments;
    }
}

function saveNFT() {
    let validreg = document.getElementById("validreg").checked;
    let title = document.getElementById("vehicletitle").value;
    let status = document.getElementById("currentstatus").value;
    let lien = document.getElementById("lien").checked;
    //alert(`${validreg} :: ${epa} :: ${title} :: ${status} :: ${lien}`)
    let epapass = document.getElementById("smog1").checked;
    let epafail = document.getElementById("smog2").checked
    let epa = false
    if(epapass) {
        epa =  true
    }
    var fsbo = 
        {
            "valid_vehicle_registration" : validreg,
            "epa":epa,
            "title_type":title,
            "alert":status,
            "financing":lien
        }
    
    localStorage.setItem("fsbo", JSON.stringify(fsbo))
}

function goHome() {
    window.location.href = "index.html"
}