var sOutput="<table><tr><td>Name<td><Email/td></td></tr></table>";

function addRecord()
	{
		
		// Array |JSON Format
		var entry={};
		//Primary Key
		entry.id=localStorage.length+1;
		//value
		entry.firstName=document.frmLocalStorage.txtFirstName.value;
        entry.email=document.frmLocalStorage.email.value;
        var duplicate;
        for (iCounter=0;iCounter<localStorage.length;iCounter++)
		{   duplicate=false;
            if(JSON.parse(localStorage.getItem(localStorage.key(iCounter))).email==document.frmLocalStorage.email.value)
            {duplicate=true;alert("Email Already Exists !!!");break;}}

        //Store
		if(!duplicate){localStorage.setItem(entry.id,JSON.stringify(entry));alert("Done you are in !!!");}
	}
	function showRecords()
	{
        var sOutput="No record to display";
	//console.log(JSON.parse(localStorage.getItem(localStorage.key(2))).firstName);
	if(localStorage.length>0)
	{
    //sOutput="<ul>";
    sOutput="<th style='padding-right:200px;border: 1px solid #ddd;background:#4CAF50'>Name</th>";
    sOutput+="<th style='marigin-right:200px;border: 1px solid #ddd;background:#4CAF50'>Email</th>";
	for (iCounter=0;iCounter<localStorage.length;iCounter++)
		{
		key=localStorage.key(iCounter);
		var jsonElemen=JSON.parse(localStorage.getItem(key));
		sOutput+="<tr><td style='padding-right:200px;border: 1px solid #ddd;background:'>"+jsonElemen.firstName+"</td>";
		sOutput+="<td style='padding-right:200px;border: 1px solid #ddd;'>"+jsonElemen.email+"</td></tr>";
		}	
	}
	else
	{
	    var sOutput="No record to display";
	}
	document.getElementById("recordList").innerHTML=sOutput;

	}