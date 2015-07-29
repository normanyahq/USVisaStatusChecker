var appID = ''; // fill your application ID here
var intervalInSeconds = 60; // better lager than 20
window.count = 0;
window.statusText = "";
window.updateTime = "";
function queryStatus(applicationID)
{
    
    document.getElementById("ctl00_ContentPlaceHolder1_ddlApplications").selectedIndex=1;
    __doPostBack('ctl00$ContentPlaceHolder1$ddlApplications','');
    
    function queryCondition1(){
        if(!document.getElementById('ctl00_ContentPlaceHolder1_ddlLocation'))
            return;
        document.getElementById("ctl00_ContentPlaceHolder1_txbCase").value=(applicationID);
        document.getElementById("ctl00_ContentPlaceHolder1_btnSubmit").click();
        clearInterval(window.timer1);
        window.timer2 = setInterval(function(){queryCondition2();}, 1000)
    }
    
    function queryCondition2(){
        if (document.getElementById('ctl00_ContentPlaceHolder1_ucApplicationStatusView_pnlStatus').style.display == 'none')
                return;
        var status = document.getElementById("ctl00_ContentPlaceHolder1_ucApplicationStatusView_lblStatus").innerHTML;
        var alertInformation = "";
        if (status!=window.statusText)
        {
            alertInformation += "Status Changed! New status: " + status;
            window.statusText = status;
        }
        var updateTime = document.getElementById("ctl00_ContentPlaceHolder1_ucApplicationStatusView_lblStatusDate").innerHTML;
        if (updateTime!=window.updateTime)
        {
            alertInformation += "\nUpdated! New updated Time: " + updateTime;
            window.updateTime = updateTime;
        }
        if (alertInformation!='' && window.count!=0)
            alert(alertInformation);
        
        WebForm_DoPostBackWithOptions(new WebForm_PostBackOptions("ctl00$ContentPlaceHolder1$ucApplicationStatusView$lnkCloseInbox", "", true, "", "", false, true))
        window.count++;
        clearInterval(window.timer2);
        console.log('The No.' + window.count + ' Try:');
        console.log('Query Time: ' + Date(Date.now()));
        console.log('Status: ' + window.statusText);
        console.log('Updated Time: ' + window.updateTime);
    }
    
    window.timer1 = setInterval(function(){queryCondition1();}, 1000)
}
setInterval(queryStatus, intervalInSeconds * 1000, appID);