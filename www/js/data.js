/*
*   @valid_registration - this will be true or false.  Insurance person processing this will manually validate this registration
*   @epa - This value to true or false if an EPA and/or Smog test certificate was provided and validated
*   @title_type - This is either clean, water damage, hail or salvage
*/
var insurance_finance = 
    {
       "insurance" : [
            {
                "company":"AAA",
                "coverage_date":"March 17, 2021",
                "coverage_expire_date":"March 17, 2030"
            },
            {
                "driver_license":"55FF883",
                "valid_registration":"true",
            },
            {
                "epa":"pass",
                "title_type":"clean"
            }
       ],
       "finance" : [
            {
                "institution":"Golden1 Credit Union",
                "lease_finance":"finance"
            }
       ]
    }


/*
*   @valide_driver_license, @valid_registration, @valid_insurance values are true or falxe
*   @alert - this will have values loss, stolen, ambert alert
*/
var law_enforcement = [
    {
        "valid_driver_license" : "55FF883",
        "valid_registration" : "true",
        "valid_insurance" : "true",
        "alert": "none"
    }
]

/*
*   For Sale By Owner = FSBO
*   @valid_vehicle_registration - true/false
*   @epa - pass or fail
*   @title_type - clean,water damage,salvage
*   @alert - stolen
*   @mro_history - maintenance record history
*   @financing - does it have a lien on it
*/
var fsbo = [
    {
        "valid_vehicle_registration" : "true",
        "epa":"pass",
        "title_type":"clean",
        "alert":"none",
        "mro_history": [
            ""
        ],
        "financing":"none"
    }
]