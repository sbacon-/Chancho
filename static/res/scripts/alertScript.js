var intervalID;
var angel = false;
var refresh = true;
var delta = 10000;

var addr = "http://chancho.dev/res/mp3/";
var sound_url = "";
var sounds = ["","DeskBell","VineBoom","Spam"];
var soundIndex = 0;

var ul,li,h3,subUL,subLI,subLII,subLIII,subLIV;
var subLI_label, subLII_label, subLIII_label, subLIV_label;


function autorefresh(){
	//Check for the existense of a refresh button
   var home = $('button[data-id="incident|NoRelationship|HomePageGrid|Mscrm.HomepageGrid.incident.RefreshModernButton"]'); 
   var home_alt = $('button[data-id="RefreshDashboard"]');
   if(home.length > 0)home[0].click();
   if(home_alt.length > 0)home_alt[0].click();

   //Check for Cases assigned to 'Accoutning Core'
   var acCase = $('button[aria-label="Accounting Core"]');
   if(!angel && acCase.size()>0){
      playSound();
      angel = true;   
      subLI_label.innerHTML = "Notify: OFF";//Stop notifying until reactivated
   }
}

function playSound(){
   window.open(sound_url,"_blank","height=200,width=200");
}

function changeSound(){
   soundIndex++;
   if(soundIndex>=sounds.length)soundIndex=0;
   switch(soundIndex){
      case 0:
         subLII_label.innerHTML = "Alarm: NONE";
         sound_url = "";
         return;
      case 1:
         subLII_label.innerHTML = "Alarm: Bell";
         break;
      case 2:
         subLII_label.innerHTML = "Alarm: Vine";
         break;
      case 3:
         subLII_label.innerHTML = "Alarm: Spam";
         break;
   }
   sound_url = addr + sounds[soundIndex] + ".mp3";
}

function repeater(){
   if(intervalID == null){
      intervalID = setInterval(autorefresh,delta);	
      subLIII_label.innerHTML = "REFRESH: On";
      refresh = true;
   }else{
      clearInterval(intervalID);
      intervalID = null;
      subLIII_label.innerHTML = "REFRESH: Off";
      refresh = false;
   }
}

function changeDelay(){
   delta *= 2;
   if(delta>=50000) delta = 5000;
   subLIV_label.innerHTML = "DELAY: " + (delta/1000) + "s";

   repeater();
   repeater();
}

function resetNotify(){
   if(angel){
      angel=false;
      subLI_label.innerHTML = "Notify: ON";
   }else{
      angel=true;
      subLI_label.innerHTML = "Notify: OFF";
   }
}

function createAngelGUI(){
   ul = document.getElementById("id-5");
   var lastLI = ul.lastElementChild
   lastLI.setAttribute("class","pa-cr pa-gv pa-fd");

   li = document.createElement("LI");
   h3 = document.createElement("H3");
   subUL = document.createElement("UL");
   subLI = document.createElement("LI");
   subLII = document.createElement("LI");
   subLIII = document.createElement("LI");
   subLIV = document.createElement("LI");

   li.setAttribute("class","pa-cr");

   h3.setAttribute("class","pa-dx pa-bg pa-a pa-dy pa-dz pa-bl pa-ea pa-eb pa-ec pa-o pa-y pa-cm pa-ed ");
   h3.innerHTML = "Static M3sh";

   var fullLI = [subLI,subLII,subLIII,subLIV];
   for (var i = 0; i<fullLI.length; i++){
      var divI = document.createElement("DIV");
      divI.setAttribute("class","pa-a pa-am pa-bk pa-bl pa-bg pa-w pa-bm pa-bn pa-bo pa-bp pa-bq pa-fl pa-fm flexbox");
      divI.setAttribute("role","presentation");
      var divII = document.createElement("DIV");
      divII.setAttribute("class","pa-a pa-br pa-bs pa-w pa-f pa-o pa-bc pa-bt flexbox");
      divII.setAttribute("role","presentation");
      var divIII = document.createElement("DIV");
      divIII.setAttribute("class","pa-bu pa-bv pa-bw pa-bx pa-by pa-bz pa-ca pa-cb pa-cc pa-cd ");
      divIII.setAttribute("role","presentation");
      var divIV = document.createElement("DIV");
      divIV.setAttribute("class","pa-bd pa-e pa-o pa-ce flexbox");
      divIV.setAttribute("role","presentation");
      var spanI = document.createElement("SPAN");
      spanI.setAttribute("class","pa-cf pa-cg pa-ch pa-ci pa-ba pa-a pa-o pa-ax pa-fn pa-fo svgIcon ");
      var img = document.createElement("IMG");
      img.setAttribute("class","pa-cf pa-cj pa-ck ");
      var spanII = document.createElement("SPAN");
      spanII.setAttribute("class","pa-bu pa-o pa-cl pa-cm pa-cn pa-co pa-cp pa-bc pa-cq ");
      spanII.setAttribute("id","chancho-"+i);
      spanII.innerHTML = "TEMP";

      spanI.appendChild(img);
      divIV.appendChild(spanI);
      divIV.appendChild(spanII);
      divII.appendChild(divIII);
      divII.appendChild(divIV);
      divI.appendChild(divII);
      fullLI[i].appendChild(divI);
      fullLI[i].setAttribute("class","pa-am pa-a pa-o pa-ao pa-bg pa-ap pa-b pa-bh pa-bi pa-bj ");
   }

   subUL.appendChild(subLI);
   subUL.appendChild(subLII);
   subUL.appendChild(subLIII);
   subUL.appendChild(subLIV);

   li.appendChild(h3);
   li.appendChild(subUL);

   ul.appendChild(li);
}

function buttonFunctions(){
   subLI.setAttribute("onClick","resetNotify()");
   subLI_label=document.getElementById("chancho-0");
   subLI_label.innerHTML = "Notify: ON";

   subLII.setAttribute("onClick","changeSound()");
   subLII_label = document.getElementById("chancho-1");
   subLII_label.innerHTML = "Alarm: NONE";
   
   subLIII.setAttribute("onClick","repeater()");
   subLIII_label = document.getElementById("chancho-2");
   subLIII_label.innerHTML = "REFRESH: ON";
   
   subLIV.setAttribute("onClick","changeDelay()");
   subLIV_label = document.getElementById("chancho-3");
   subLIV_label.innerHTML = "DELAY: "+delta/1000+"s";
}

createAngelGUI();
buttonFunctions();
repeater();

document.addEventListener('visibilitychange',function(){
   if(!refresh)return;
   if(document.hidden){
      clearInterval(intervalID)
      intervalID = null;
   }else{
      repeater();
   }
});
