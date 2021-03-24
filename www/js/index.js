//setup listeners
document.addEventListener('deviceready', onDeviceReady, false);
document.getElementById("scan").addEventListener("click",qrScan)
document.getElementById("ins").addEventListener("click",insuranceFinanceData)
document.getElementById("law").addEventListener("click", law_enforcement)
document.getElementById("fsbo").addEventListener("click", fsbo)
document.getElementById("scan").addEventListener("click", scanData)


function setupDocument() {
  //by default create an MRO data record for testing purposes.
  var cdt = new Date();
  //alert( cdt )
  var mro = 
    {
        "report_date": cdt,
        "mileage": Math.random() * 100,
        "comments":"Title issued or updated Registration issued or renewed Loan or lien reported Vehicle color noted as silver"
    }
  

  //this will eventually be forwarded to an NFT
  localStorage.setItem("mro", JSON.stringify(mro))
}

function scanData() {
  /*cordova.plugins.barcodeScanner.scan(function (result) {
    alert("Barcode/QR code data\n" + "Result: " + result.text + "\n" + "Format: " + result.format + "\n" + "Cancelled: " + result.cancelled)
  })*/

}

function insuranceFinanceData() {
    /*QRScanner.show(function(status) {
        //alert(status)
    });
    QRScanner.scan(displayContents)*/
    //alert("Insurance Finance Data")
    //var obj = JSON.parse(insurance_finance)
    //alert(`${insurance_finance.insurance[0].company} :: ${insurance_finance.insurance[0].coverage_date} :: ${insurance_finance.insurance[0].coverage_expire_date}`)
    //open insfin.html
    window.location.href = "selected_insfin.html"
}

function law_enforcement() {
    /*QRScanner.show(function(status) {
        //alert(status)
    });
    QRScanner.scan(displayContents)*/
    window.location.href = "selected_lawenforcement.html"
}

function fsbo() {
    /*QRScanner.show(function(status) {
        //alert(status)
    });
    QRScanner.scan(displayContents)*/
    window.location.href = "fsbo.html"
}

function onDone(error, status) {
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
}

//QRScanner.scan(displayContents)

function qrScan() {
  localStorage.setItem('vincode', document.getElementById("vin").value)
  window.location.href = "qrcodescreen.html"
}

function displayContents(err, text){
    if(err){
      // an error occurred, or the scan was canceled (error code `6`)
    } else {
      // The scan completed, display the contents of the QR code:
      alert(text);
    }
  }

function onDeviceReady() {
    // Cordova is now initialized. Have fun!
    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
    document.getElementById('deviceready').classList.add('ready');
    //ask user permission for app to use camera for QR Code scanning
    QRScanner.prepare(onDone); 
        
}

