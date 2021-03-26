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

    //setup for NFT - "validlicense:S|true,validregistration:S|true,epasmog:S|pass,vehiclefinancestatus:S|owned,vehicletitlestatus:S|clean"
    let mutableTraits = `validregistration:S|${validreg},epasmog:S|${epa},vehicletitlestatus:S|${title},vehiclecurrentstatus:S|${status},existinglien:S|${lien}`
    let immutableTraits = `mro:S|true,style:S|Blue,type:S|asset`
    /**************************************************************************/
    const NFTAssetPostData = {
        "type": "/xprt/assets/define/request",
        "value": {
            "baseReq": {
                "from": "cosmos14x0dhyrlfn2zxnh6dsk6wzfl4jzd6n8s3ml57f",
                "chain_id": "test",
                "memo": ""
            },
            "fromID": "test.5hQadaCB5nLp8gM3K5jeaHxlf7A=",
            "mutableTraits": "validregistration:S|true,epasmog:S|pass,vehicletitlestatus:S|clean,vehiclecurrentstatus:S|true,existinglien:S|true",
            "immutableTraits": "mro:S|true,style:S|Blue,type:S|asset",
            "mutableMetaTraits": "burn:H|,lock:H|,URI:S|",
            "immutableMetaTraits": "classifier:S|fsbo,identifier:S|fsbo,description:S|for sale by owner"
        }
    }
    /************************************************************************/

    var fsbo = 
        {
            "valid_vehicle_registration" : validreg,
            "epa":epa,
            "title_type":title,
            "alert":status,
            "financing":lien
        }
    
    localStorage.setItem("fsbo", JSON.stringify(fsbo))
    //connect to assetMantle
    createNFTAsset(NFTAssetPostData);
}

function goHome() {
    window.location.href = "index.html"
}

function createNFTAsset(_NFTAssetPostData) {
    const URL = `http://143.110.183.203:1317/xprt/assets/define`
    var xhr = new XMLHttpRequest();
    xhr.open('POST', URL, true);

    //set headers
    xhr.setRequestHeader('Content-Type', 'application/json')
    //xhr.setRequestHeader("Transfer-Encoding", "chunked")
    
    //set response time

    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
            console.log(xhr.response);
        }
    }
    xhr.send(JSON.stringify(_NFTAssetPostData));
}