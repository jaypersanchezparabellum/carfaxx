document.getElementById("savenft").addEventListener("click", saveNFT)
document.getElementById("home").addEventListener("click", goHome)
document.addEventListener('deviceready', onDeviceReady, false);
document.addEventListener("DOMContentLoaded",setupDocument)

function onDeviceReady() {
    //ask user permission for app to use camera for QR Code scanning
    QRScanner.prepare(startScan); 
        
}

function setupDocument() {
    if( localStorage.getItem("insurance_finance") !== null ) {
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
    }


    //check for selected disclosure field inclusion
    if(localStorage.getItem("selectedinsfin") !== null) {
        //have to include these fields for selection
        let selectedflds = localStorage.getItem("selectedinsfin");
        let pselectedflds = JSON.parse(selectedflds);
        
        if(pselectedflds.violation !== true) {
            //disable no need to show actual value
            document.getElementById("violation").disabled = true;
        }
        else {
            //then look into insurance_finance and set the value for this field
            document.getElementById("violation").disabled = false;
            var data = localStorage.getItem("insurance_finance");
            var _data = localStorage.getItem("insurance_finance");
            var parsedData = JSON.parse(_data);
            if(parsedData.insurance[0].violation === true) {
                document.getElementById("violation").checked = true
            }
        }

        if(pselectedflds.history !== true) {
            //disable
            document.getElementById("maintenancehistory").disabled = true;
        }
        else {
            //then look into insurance_finance and set the value for this field
            document.getElementById("maintenancehistory").disabled = false;
            var data = localStorage.getItem("insurance_finance");
            var _data = localStorage.getItem("insurance_finance");
            var parsedData = JSON.parse(_data);
            if(parsedData.insurance[0].history === true) {
                document.getElementById("maintenancehistory").checked = true
            }
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

function startScan() {
    QRScanner.prepare(function(err, status) {
        if (error) {
            // here we can handle errors and clean up any loose ends.
            console.log(`OnDone :: ${error}`);
        }
        if (status.authorized) {
             //this will turn on the camera but the QRScanner.scan function doesn't seem to detect the qr code
             QRScanner.scan(displayContents)
             QRScanner.show()
             
             //qrScan();
             //this works
             /*QRScanner.getStatus(function(status) {
               QRScanner.openSettings()
             })*/
        } else if (status.denied) {
            //alert(`Denied ${status.denied}`)
        } else {
            //alert(`Not sure what happened`)
        }
    });
}

function saveNFT() {
    let validdl = document.getElementById("validdl").checked;
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

    //process through selected fields.  Not all are enabled so need to extract from fields that are enabled.
    let violation = document.getElementById("violation").checked;
    let history = document.getElementById("maintenancehistory").checked;
    if( document.getElementById("violation").disabled !== false) {
        violation = document.getElementById("violation").checked;
    }
    if( document.getElementById("maintenancehistory").disabled !== false) {
        history = document.getElementById("maintenancehistory").checked;
        //pull out any records from mro locaStorage or NFT
        getMRO();
    }

    var mro = 
        {
            "report_date":"mm/dd/yyyy",
            "mileage":11,
            "comments":"Title issued or updated Registration issued or renewed Loan or lien reported Vehicle color noted as silver"
        }
    

    var insurance_finance = 
    {
       "insurance" : [
            {
                "validdl":validdl,
                "validreg":validreg,
                "epa":epa,
                "violation":violation,
                "history":history
            }
       ],
       "finance" : [
            {
                "fininfo":fininfo,
                "title":title
            }
       ]
    }
    //this will eventually be forwarded to an NFT
    localStorage.setItem("insurance_finance", JSON.stringify(insurance_finance))
}

function getMRO() {
    if(localStorage.getItem("mro") !== null) {

    }
}

function goHome() {
    window.location.href = "index.html"
}