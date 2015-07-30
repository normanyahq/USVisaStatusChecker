var appID = ''; // fill your application ID here
var intervalInSeconds = 60; // better lager than 20
window.count = 0;
window.statusText = "";
window.updateTime = "";
window.lock1 = 0;
window.lock2 = 0;
window.lock3 = 0;
function queryStatus(applicationID)
{
    
    document.getElementById("ctl00_ContentPlaceHolder1_ddlApplications").selectedIndex=1;
    __doPostBack('ctl00$ContentPlaceHolder1$ddlApplications','');
    
    function queryCondition1(){
        if(!document.getElementById('ctl00_ContentPlaceHolder1_ddlLocation') || window.lock1)
            return;
        window.lock1++;
        document.getElementById("ctl00_ContentPlaceHolder1_txbCase").value=(applicationID);
        document.getElementById("ctl00_ContentPlaceHolder1_btnSubmit").click();
        clearInterval(window.timer1);
        window.timer2 = setInterval(function(){queryCondition2();}, 1000)
        window.lock1--;
    }
    
    function queryCondition2(){
        if (document.getElementById('ctl00_ContentPlaceHolder1_ucApplicationStatusView_pnlStatus').style.display == 'none' || window.lock2)
                return;
        window.lock2++;
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
        clearInterval(window.timer2);
        WebForm_DoPostBackWithOptions(new WebForm_PostBackOptions("ctl00$ContentPlaceHolder1$ucApplicationStatusView$lnkCloseInbox", "", true, "", "", false, true))
        window.timer3 = setInterval(function(){queryCondition3();}, 1000)
        window.lock2--;
    }
    function queryCondition3() {
        
        if (document.getElementById('ctl00_ContentPlaceHolder1_ucApplicationStatusView_pnlStatus').style.display != 'none' || window.lock3)
                return;
        window.count++;
        window.lock3++;
        clearInterval(window.timer3);
        console.log('The No.' + window.count + ' Try:');
        console.log('Query Time: ' + Date(Date.now()));
        console.log('Status: ' + window.statusText);
        console.log('Updated Time: ' + window.updateTime);
        window.lock3--;
    }
    
    window.timer1 = setInterval(function(){queryCondition1();}, 20000)
}
setInterval(queryStatus, intervalInSeconds * 1000, appID);