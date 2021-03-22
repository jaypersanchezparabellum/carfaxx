document.getElementById("home").addEventListener("click", goHome)


function setupDocument() {
    /*if( localStorage.getItem("insurance_finance") !== null ) {
            let _data = localStorage.getItem("insurance_finance");
            let parsedData = JSON.parse(_data);
            //alert(`${parsedData.insurance[0].validdl}`)
            if( parsedData.insurance[0].validdl === true ) {
                document.getElementById("validdl").checked = true;
            }
            if( parsedData.insurance[0].validreg === true ) {
                document.getElementById("validreg").checked = true;
            }
            if( parsedData.insurance[0].epa === true ) {
                document.getElementById("smog1").checked = true;
                document.getElementById("smog2").checked = false;
            }
            else {
                document.getElementById("smog1").checked = false;
                document.getElementById("smog2").checked = true;
            }
            document.getElementById("financeinfo").value = parsedData.finance[0].fininfo
            document.getElementById("vehicletitle").value = parsedData.finance[0].title
    }*/
}

function saveNFT() {
    /*let validdl = document.getElementById("validdl").checked;
    let validreg = document.getElementById("validreg").checked;
    let fininfo = document.getElementById("financeinfo").value;
    let epapass = document.getElementById("smog1").checked;
    let epafail = document.getElementById("smog2").checked
    let epa = false
    if(epapass) {
        epa =  true
    }
    
    let title = document.getElementById("vehicletitle").value;
    //alert(`${validdl} :: ${validreg} :: ${fininfo} :: ${epa} :: ${title}`)

    var insurance_finance = 
    {
       "insurance" : [
            {
                "validdl":validdl,
                "validreg":validreg,
                "epa":epa
            }
       ],
       "finance" : [
            {
                "fininfo":fininfo,
                "title":title
            }
       ]
    }*/
    //this will eventually be forwarded to an NFT
    //localStorage.setItem("insurance_finance", JSON.stringify(insurance_finance))
}



function goHome() {
    //save selected fields into localStorage
    let violation = document.getElementById("violation").checked;
    let history = document.getElementById("maintenancehistory").checked;
    var selected = { 
        "violation":violation, 
        "history":history 
    }
    localStorage.setItem('selectedinsfin', JSON.stringify(selected))

    //redirect home
    window.location.href = "insfin.html"
}