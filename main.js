var Site = {
  TotalNavs:[],
  ajaxReq: function (){
    var activexmodes=["Msxml2.XMLHTTP", "Microsoft.XMLHTTP"] // activeX versions to check for in IE
    if (window.ActiveXObject){ // Test for support for ActiveXObject in IE first (as XMLHttpRequest in IE7 is broken)
      for (var i=0; i<activexmodes.length; i++){
        try{
          return new ActiveXObject(activexmodes[i])
        }
        catch(e){}
      }
    }
    else if (window.XMLHttpRequest) // if Mozilla, Safari etc
      return new XMLHttpRequest();
    else
      return false;
  },
loadjscssfile:function(filename, filetype){
      if (filetype=="js"){ //if filename is a external JavaScript file
          var fileref=document.createElement('script')
          fileref.setAttribute("type","text/javascript")
          fileref.setAttribute("src", filename)
      }
      else if (filetype=="css"){ //if filename is an external CSS file
          var fileref=document.createElement("link")
          fileref.setAttribute("rel", "stylesheet")
          fileref.setAttribute("type", "text/css")
          fileref.setAttribute("href", filename)
      }
      if (typeof fileref!="undefined")
          document.getElementsByTagName("head")[0].appendChild(fileref)
  },
  create: function(p){
    var dom = (p.Parent && p.Parent.document) ? p.Parent.document : (p.Window && p.Window.document) ? p.Window.document : document;

    if (!dom.createElement)
      return null;

    var element = dom.createElement(p.Type || "div")

    if (p.Class)
      element.className = p.Class;

    if (p.Id)
      element.id = p.Id;

    if (p.Content) {
      if (typeof p.Content == "string"){
        if (p.Content.search(/<|&/ig) == -1) {
          if (typeof element.textContent != "undefined")
            element.textContent = p.Content;
          else
            element.innerText = p.Content;
        }
      } else {
        element.appendChild(p.Content);
      }
    }
    if (p.Src)
      element.setAttribute("src",  p.Src);

    switch (p.Type) {
      case "input":
        if (p.InputType)
          element.setAttribute("type", p.InputType);
        else
          element.setAttribute("type", "Text");
        if (p.Value)
          element.value = p.Value;
        if (p.Id)
          element.name = p.Id;
        break;
      case "a":
        if (p.Href)
          element.href = p.Href;
        else
          element.href = "javascript: void(0);";
        break;
      case "script":
        var firstElm = dom.documentElement.firstChild;
        for (var i = 0; i < firstElm.childNodes.length; i++) {
          if (firstElm.childNodes[i].src == p.Src) return firstElm.childNodes[i];
        }
        element.setAttribute("type", "text/javascript");
        firstElm.appendChild(element);
        break;
      // stylesheet
      case "link":
        if (p.Href)
          element.href = p.Href;
        else
          return;

        element.setAttribute("type", "text/css");
        element.setAttribute("rel", "stylesheet");

        var firstElm = dom.documentElement.firstChild;
        for (var i = 0; i < firstElm.childNodes.length; i++) {
          if (firstElm.childNodes[i].href == element.href) return firstElm.childNodes[i];
        }
        firstElm.appendChild(element);
        break;
      default:
        break;
    }

    if (p.Style)
      element.setAttribute("style", p.Style);

    if (p.Parent)
      p.Parent.appendChild(element);

    if (p.Title)
      element.setAttribute("title", p.Title);

    return element;
  },

  send: function(p){




    var ajax = new Site.ajaxReq();

    ajax.onreadystatechange = function(){
      if (ajax.readyState==4){
        if (ajax.status==200 || window.location.href.indexOf("http")==-1){
          var jsondata=eval("("+ajax.responseText+")");
          if (p.Callback){
            if (p.CallbackBindTo){
              return p.Callback.call(p.CallbackBindTo, jsondata, p.CallbackParams || { });
            } else {
              return p.Callback(jsondata, p.CallbackParams || { });
            }
          }
        }
      }
    }
    ajax.open(p.Method || "GET", p.URL, true);
    if (p.ContentType) {
      ajax.setRequestHeader('Content-Type', p.ContentType);
    }
    ajax.send(p.PostData ? p.PostData : null);
  },
  DrawHomePage:function(mobile){
    var mainElement = document.getElementById('Main');
    Site.DrawHeader(mainElement,"ss1.PNG", mobile);
    var header = document.getElementById('header');
    Site.drawBanner(header, "Home", mobile);
    if (!mobile){
      Site.drawAssetOverlay(bannerOverlay,0, mobile);
    }
    Site.DrawHomePageContent(mobile);
    Site.DrawHomeSubSection(mobile);
    Site.DrawHomeBottomContent(mobile);
    Site.DrawFooter(mobile);


  },
  DrawProjectsPage:function(mobile){
    var mainElement = document.getElementById('Main');
    Site.drawHomeBanner(mainElement,"Projects",mobile);
    //var crumbs = [{"label":"Home", "link":"/Home.html"},{"label":"Projects", "link":"/Projects.html"}];
    //Site.DrawBreadCrumbTrail(mainElement, crumbs, mobile);
    Site.DrawProjects(mainElement, mobile);
    Site.DrawFooter(mobile);


  },
  DrawAboutPage:function(mobile){
    var mainElement = document.getElementById('Main');
    	Site.drawHomeBanner(MainElement,"About",mobile);
    Site.DrawAboutSummary(mobile);
    var get = document.getElementById('mainContent');
    Site.DrawAboutBannerSection(get, "About", mobile);
    Site.DrawSkills(mainElement, mobile);
    Site.DrawWorkExperience(mainElement, mobile);
    Site.DrawFooter(mobile);
  },
  DrawContactPage:function(mobile){
    var mainElement = document.getElementById('Main');
    Site.drawHomeBanner(MainElement,"Contact",mobile);
    Site.DrawContactForm(mobile);
    Site.DrawFooter(mobile);

  },
  DrawContactForm:function(mobile){
      var mainElement = document.getElementById('Main');
      var SubSection = Site.create({"Type": "div","Class":"SubSection","Style":"padding-top:2%;height:auto", "Id":"SubSection","Parent": mainElement});

      var SummaryContainerImg = Site.create({ "Type": "img", "Src": "./img/Logos/JMLogo.png",  "Class": "SummaryContainerImg", "Parent": SubSection });
      var overViewHeader =Site.create({"Type": "div","Class":"overViewHeader","Id":"overViewHeader","Content":"Let's Get In Touch", "Parent": SubSection});
      var TextContentSubInvert = Site.create({"Type": "div","Class":"TextContentSubInvert","Style":"text-shadow: 0.1px 0.1px 1px black;padding-bottom:2%;","Id":"TextContentSubInvert","Content":"Contact", "Parent": SubSection});
      TextContentSubInvert.innerHTML = "Please reach out with any Questions or Concerns";
      var SubSection1 = Site.create({"Type": "div","Class":"SubSection","Style":"padding-top:2%;background-color:#5d7699;", "Id":"SubSection","Parent": mainElement});
      var email = Site.create({"Type": "input","Class":"inputField", "Id":"email","Style":"background-image:url(./img/mail.png);","Parent": SubSection1});
      email.setAttribute("placeholder", "Enter your email address...");
      var title = Site.create({"Type": "input","Class":"inputField", "Id":"title","Style":"background-image:url(./img/subject.png);","Parent": SubSection1});
      title.setAttribute("placeholder", "Enter your name...");
      var msg = Site.create({"Type": "textarea","Class":"inputField","Style":"height:250px;background-image:url(./img/message.png);", "Id":"msg","Parent": SubSection1});
      msg.setAttribute("placeholder", "Type your message...");
      var TextContentButtonInvert = Site.create({"Type": "div","Class":"TextContentButtonInvert","Style":"width:40%;margin-left:30%;padding-bottom:1%;margin-top:4%;", "Id":"TextContentButton","Content":"Send Message","Parent": SubSection1});
      if (mobile){
        SummaryContainerImg.style.width = "20%";
        SummaryContainerImg.style.marginLeft = "40%";
        overViewHeader.style.fontSize = "2.5em";
        SubSection.style.height = "auto";
        SubSection1.style.height = "auto";
        SubSection1.style.paddingBottom = "50px";
        email.style.width = "90%";
        email.style.marginLeft = "5%";
        email.style.marginTop = "10%";
        title.style.width = "90%";
        TextContentSubInvert.style.fontSize = "180%";
        title.style.marginTop = "10%";
        title.style.marginLeft = "5%";
        msg.style.width = "90%";
        msg.style.marginTop = "10%";
        msg.style.marginLeft = "5%";
        TextContentButtonInvert.style.width = "70%";
        TextContentButtonInvert.style.marginLeft = "15%";
      }
      TextContentButtonInvert.onclick = function(){
        Site.sendEmail();
      }
  },
  sendEmail:function (){
				 var emailbody;
				 var getEmail = document.getElementById("email").value;
				 var getName = document.getElementById("title").value;
				 var getMessage = document.getElementById("msg").value;
         var email = document.getElementById("email");
         var title = document.getElementById("title");
         var msg = document.getElementById("msg");
         var Elements = [title,email,msg];
          var isOkay = "";
          for (var i  = 0; i <Elements.length; i++){
            if (Elements[i].value == "" ){
              Elements[i].style.border = "2px solid red";
              isOkay = "N";
            }else{
              Elements[i].style.border = "1px solid transparent";
            }
          }
          if (isOkay != "N"){
           Site.send({ "URL": "./jlmMail.php?MSG=" + msg.value+ "&Name="+title.value + "&Email="+email.value ,"Callback": Site.ErrorOrRedrawPage, "CallbackParams": [] });
         }

 },
 ErrorOrRedrawPage:function(){
   window.location.href = window.location.href;
 },
  DrawHeader:function(mainElement, Img, mobile){
    window.onresize = function(){
      if (document.getElementById('Main') > 1100){
        if (window.location.href.indexOf("ontact") < 0){
          window.location.href = window.location.href;
        }
      }
    }
    if (mobile){
      var navHolder = Site.create({"Type": "div","Class":"navHolder","Id":"navHolder","Parent": mainElement});
      var nav = Site.create({"Type": "div","Class":"nav","Id":"nav","Style":"width:100%;margin-left:0%;","Parent": navHolder});
      var homeLogo = Site.create({"Type": "img","Class":"homeLogoSmall","Style":"height:80%;width:auto;margin-top:1%;","Src":"./img/me.jpg", "Id":"homeLogo","Parent": nav});
      homeLogo.onclick = function(){
        window.location.href = "/Home.html";
      }
      var Filler = Site.create({"Type": "div","Class":"Filler","Style":"width:70%;", "Id":"homeLogo","Parent": nav});
        var menu = Site.create({"Type": "img","Class":"right","Src":"./img/menu.png","Style":"height:94%;width:auto;margin-top:0.5%;margin-left:6%;", "Id":"right","Parent": nav});
        var bcMenu = Site.create({"Type": "div","Class":"canvas","Id":"bcMenu","Style":"display:none;", "Parent": mainElement});
       var menuNav = Site.create({ "Type": "div", "Id": "menuNav","Style":"", "Class": "menuNav", "Parent": mainElement });
      Site.drawMenuNav(menuNav, mobile);
      right.onclick = function () {
        if (this.className == "right" ) {
            this.className = "rightClicked";
            document.getElementById('bcMenu').style.display = "block";
        } else {
            this.className = "right";
            document.getElementById('bcMenu').style.display = "none";
        }

        Site.sildeMenu(menuNav, mobile)
      };
      var header = Site.create({"Type": "div","Class":"header","Id":"header","Style":"height:50%; background-size:contain;margin-top:11%;", "Parent": mainElement});
      if (mainElement.offsetWidth > 1000){
          header.style.marginTop = "46px";
      }
      if (Img){
        header.style.backgroundImage="url('./img/"+Img+"')";
        if (mobile){
          if (Img == "ss1.PNG" ){
            header.style.backgroundPosition = "center center";
            header.style.backgroundPositionY = "30%";
          }
        }
      }

    }else{
      var navHolder = Site.create({"Type": "div","Class":"navHolder","Id":"navHolder","Parent": mainElement});
      var nav = Site.create({"Type": "div","Class":"nav","Id":"nav","Parent": navHolder});
      var singleNav = Site.create({"Type": "a","Href":"/Home.html","Content":"Home","Class":"singleNav","Id":"singleNav","Parent": nav});
      var singleNav = Site.create({"Type": "a","Href":"/About.html","Content":"About","Class":"singleNav","Id":"singleNav","Parent": nav});
      var homeLogo = Site.create({"Type": "img","Class":"homeLogo","Src":"./img/me.jpg", "Id":"homeLogo","Parent": nav});
      homeLogo.onclick = function(){
        window.location.href = "/Home.html";
      }
      var singleNav = Site.create({"Type": "a","Href":"/Projects.html","Content":"Projects","Class":"singleNav","Id":"singleNav","Parent": nav});
      var singleNav = Site.create({"Type": "a","Href":"/Contact.html","Content":"Contact","Class":"singleNav","Id":"singleNav","Parent": nav});
      var header = Site.create({"Type": "div","Class":"header","Id":"header","Parent": mainElement});
      if (Img){
        header.style.backgroundImage="url('./img/"+Img+"')";
      }

    }
  },
  DrawProjectsV2:function(main, mobile){
      var data = Data.ProjectsData;

      var FilterBarNav = Site.create({"Type": "div","Class":"FilterBarNav","Id":"FilterBarNav","Parent": main});

      var SearchHolder = Site.create({"Type": "div","Class":"SearchHolder","Id":"SearchHolder","Parent": FilterBarNav});
      var SearchLabel = Site.create({"Type": "div","Class":"SearchLabel","Id":"SearchLabel","Content":"Search", "Parent": SearchHolder});
      var InputSearch = Site.create({"Type": "input","Class":"InputSearch","Id":"InputSearch","Parent": SearchHolder});

      var FilterOptionHolder1 = Site.create({"Type": "div","Class":"FilterOptionHolder","Id":"FilterOptionHolder","Parent": FilterBarNav});
      var FilterOptionLabel1 = Site.create({"Type": "div","Class":"SearchLabel","Id":"SearchLabel","Content":"Language", "Parent": FilterOptionHolder1});
      var Languages = Site.create({"Type": "select","Class":"DropDown","Id":"Languages","Parent": FilterOptionHolder1});
      Languages.setAttribute("value"," ");
      for (var i=0; i < Data.LanguageDrop.length; i++){
        var options = Site.create({"Type": "option","Class":"options","Id":"options","Parent": Languages});
        options.innerHTML = Data.LanguageDrop[i];
      }
      var FilterOptionHolder2 = Site.create({"Type": "div","Class":"FilterOptionHolder","Id":"FilterOptionHolder","Parent": FilterBarNav});
      var FilterOptionLabel2 = Site.create({"Type": "div","Class":"SearchLabel","Id":"SearchLabel","Content":"Platforms", "Parent": FilterOptionHolder2});
      var Platforms = Site.create({"Type": "select","Class":"DropDown","Id":"Platforms","Parent": FilterOptionHolder2});
      Platforms.setAttribute("value"," ");
      for (var i=0; i < Data.Platforms.length; i++){
        var options = Site.create({"Type": "option","Class":"options","Id":"options"+i,"Parent": Platforms});
        options.innerHTML = Data.Platforms[i];
      }
      var FilterOptionHolder3 = Site.create({"Type": "div","Class":"FilterOptionHolder","Id":"FilterOptionHolder","Parent": FilterBarNav});
      var FilterOptionLabel3 = Site.create({"Type": "div","Class":"SearchLabel","Id":"SearchLabel","Content":"Open Source", "Parent": FilterOptionHolder3});
      var OpenSource = Site.create({"Type": "select","Class":"DropDown","Id":"OpenSource","Parent": FilterOptionHolder3});
      OpenSource.setAttribute("value"," ");
      for (var i=0; i < Data.OpenSource.length; i++){
        var options = Site.create({"Type": "option","Class":"options","Id":"options","Parent": OpenSource});
        options.innerHTML = Data.OpenSource[i];
      }
      var SearchButton = Site.create({"Type": "div","Class":"SearchButton","Id":"SearchButton","Content":"Search", "Parent": FilterBarNav});
      SearchButton.onclick = function(){
        var getProjectHolder = document.getElementById('ProjectHolder');
        while(getProjectHolder.firstChild){
          getProjectHolder.removeChild(getProjectHolder.firstChild);
        }
        var ProjectHolder = document.getElementById('ProjectHolder');
        var OpenSource = document.getElementById('OpenSource').value;
        var Languages = document.getElementById('Languages').value;
        var Platforms = document.getElementById('Platforms').value;
        var InputSearch = document.getElementById('InputSearch').value;
        var EndDataHolder  = [];
        for (var j = 0 ; j < Data.ProjectsData.length; j++){
          var added = "N";
          if (InputSearch){
            if (Data.ProjectsData[j].Title.toLowerCase().indexOf(InputSearch.toLowerCase()) >= 0){
              EndDataHolder.push(Data.ProjectsData[j]);
            }
          }else{
            if(Languages){
              var check = "N";
              for (var k = 0; k < Data.ProjectsData[j].Languages.length; k++){
                if (Data.ProjectsData[j].Languages[k] == Languages){
                  check = "Y";
                }
              }
              if (check == "Y" && added == "N"){
                added = "Y";
                EndDataHolder.push(Data.ProjectsData[j]);
              }
            }
            if(Platforms){
              var check = "N";
              for (var k = 0; k < Data.ProjectsData[j].Platforms.length; k++){
                if (Data.ProjectsData[j].Platforms[k] == Platforms){
                  check = "Y";
                }
              }
              if (check == "Y" && added == "N"){
                added = "Y";
                EndDataHolder.push(Data.ProjectsData[j]);
              }
            }
            if (OpenSource){
              if (Data.ProjectsData[j].OpenSource == OpenSource){
                check = "Y";
              }
              if (check == "Y" && added == "N"){
                added = "Y";
                EndDataHolder.push(Data.ProjectsData[j]);
              }
            }
          }
        }
          var canvas = Site.create({"Type": "div","Class":"canvas","Id":"canvas","Parent": document.getElementById('Main')});
            var loader = Site.create({"Type": "img","Src":"./img/Logos/JMLogo.png", "Class":"loader","Id":"loader","Parent": canvas});
          setTimeout(function(){
            document.getElementById('Main').removeChild(canvas);
            Site.drawProjectData(ProjectHolder, EndDataHolder);
          },500);

      }
      var ClearSearchButton = Site.create({"Type": "div","Class":"SearchButton","Id":"ClearSearchButton","Content":"Clear", "Parent": FilterBarNav});
      ClearSearchButton.onclick = function(){
        var getProjectHolder = document.getElementById('ProjectHolder');
        while(getProjectHolder.firstChild){
          getProjectHolder.removeChild(getProjectHolder.firstChild);
        }
        let element = document.getElementById("options0");
        var OpenSource = document.getElementById('OpenSource').value = element;
        var Languages = document.getElementById('Languages').value = element;
        var Platforms = document.getElementById('Platforms').value = element;
        var InputSearch = document.getElementById('InputSearch').value = "";
        var ProjectHolder = document.getElementById('ProjectHolder');
        var canvas = Site.create({"Type": "div","Class":"canvas","Id":"canvas","Parent": document.getElementById('Main')});
          var loader = Site.create({"Type": "img","Src":"./img/Logos/JMLogo.png", "Class":"loader","Id":"loader","Parent": canvas});
        setTimeout(function(){
          document.getElementById('Main').removeChild(canvas);
          Site.drawProjectData(ProjectHolder, Data.ProjectsData);
        },500);
      }
      var ProjectHolder = Site.create({"Type": "div","Class":"ProjectHolder","Id":"ProjectHolder","Parent": main});
      Site.drawProjectData(ProjectHolder, Data.ProjectsData);
      if (mobile){
        SearchHolder.style.width = "98%";
        SearchHolder.style.height = "40%";
        FilterBarNav.style.height = "25%";
        FilterBarNav.style.paddingBottom = "1%";
        FilterOptionHolder1.style.width = "31.2%";
        FilterOptionLabel1.style.fontSize = "1em";
        FilterOptionHolder1.style.height = "40%";
        FilterOptionHolder2.style.width = "31.2%";
        FilterOptionLabel2.style.fontSize = "1em";
        FilterOptionHolder2.style.height = "40%";
        FilterOptionHolder3.style.width = "31.2%";
        FilterOptionLabel3.style.fontSize = "1em";
        FilterOptionHolder3.style.height = "40%";
        SearchButton.style.width = "48%";
        SearchButton.style.height = "10%";
        SearchButton.style.fontSize = "1em";
        ClearSearchButton.style.width = "48%";
        ClearSearchButton.style.height = "10%";
        ClearSearchButton.style.fontSize = "1em";
      }
    },
    CurrentProjectData:[],
    drawProjectData: function(ProjectHolder, projects, mobile){
      if (document.getElementById('Main').offsetWidth < 1200){
          mobile = "Y";
      }
      Site.CurrentProjectData = projects;
      for(var i =0; i < projects.length; i++){
          var ProjectCard = Site.create({"Type": "div","Class":"ProjectCard","Style":"background-image:url('"+Data.ProjectsData[i]["bg"]+"');", "Id":i+"Projects","Parent": ProjectHolder});
          if (mobile){
            ProjectCard.style.width = "46%";
            ProjectCard.style.height = "30%";
          }
          ProjectCard.onmouseover = function(event){
            if (event.target.id != "OverlayProjectExpandCard"){
              var getoverlay = this.querySelector(".OverlayProjectCard");
              var getoverlayButton = this.querySelectorAll(".PrjectButton");
              for (var j = 0; j < getoverlayButton.length; j++){
                getoverlayButton[j].style.display = "block";
              }
              getoverlay.style.height = "100%";
              getoverlay.style.width = "100%";
            }
          }
          ProjectCard.onmouseout = function () {
            if (event.target.id != "OverlayProjectExpandCard"){
            var getoverlay = this.querySelector(".OverlayProjectCard");
            var getoverlayButton = this.querySelectorAll(".PrjectButton");
            for (var j = 0; j < getoverlayButton.length; j++){
              getoverlayButton[j].style.display = "none";
            }
            getoverlay.style.height = "0%";
              getoverlay.style.width = "0%";
            }
          }
          var ProjectbannerFiller = Site.create({"Type": "div","Style":"","Class":"ProjectbannerFiller","Id":"ProjectbannerFiller","Parent": ProjectCard});

          var Projectbanner = Site.create({"Type": "div","Style":"","Class":"Projectbanner","Id":"Projectimg","Parent": ProjectCard});
          var ProjectTitle = Site.create({"Type": "div","Content":projects[i]["Title"],"Class":"ProjectTitle","Id":"ProjectTitle","Parent": Projectbanner});

          var OverlayProjectCard = Site.create({"Type": "div","Class":"OverlayProjectCard","Id":"mainContent","Parent": ProjectCard});
          var TextContentButton1 = Site.create({"Type": "div","Class":"PrjectButton","Id":"TextContentButton","Content":"View More","Parent": OverlayProjectCard});
          var TextContentButton2 = Site.create({"Type": "a","Href":projects[i]["Link"], "Class":"PrjectButton","Id":"TextContentButton","Content":"View Site","Style":"margin-top:-35%;", "Parent": OverlayProjectCard});
          if (mobile){
            ProjectTitle.style.width = "46%";
            ProjectCard.style.height = "30%";
            ProjectTitle.style.fontSize = "1em";
            ProjectTitle.style.width = "100%";
            TextContentButton2.style.fontSize = "1em";
            TextContentButton2.style.width = "80%";
            TextContentButton2.style.marginLeft = "10%";
            TextContentButton1.style.fontSize = "1em";
            TextContentButton1.style.width = "80%";
            TextContentButton1.style.marginLeft = "10%";
          }
          TextContentButton2.setAttribute("target","_blank");
          TextContentButton1.onclick = function(){
            var checkM = "";
            if (document.getElementById('Main').offsetWidth < 1200){
                checkM = "Y";
            }
            var getProject = this.parentElement.parentElement;
            var canvas = Site.create({"Type": "div","Class":"canvas","Id":"canvas","Parent": document.getElementById('Main')});
            var OverlayProjectExpandCard = Site.create({"Type": "div","Class":"OverlayProjectExpandCard","Id":"OverlayProjectExpandCard","Parent": canvas});
            var formatedId = getProject.id.replace("Projects","");

            OverlayProjectExpandCard.style.position = "absolute";
            OverlayProjectExpandCard.style.top = "2%";
            OverlayProjectExpandCard.style.left = "2.5%";
            OverlayProjectExpandCard.style.height = "95%";
            OverlayProjectExpandCard.style.width = "95%";
            OverlayProjectExpandCard.style.zIndex = "131";
            var projectData = Site.CurrentProjectData[formatedId];
            var PopUpTitle = Site.create({"Type": "div", "Class":"PopUpTitle","Content":projectData["Title"],"Id":"PopUpTitle","Parent": OverlayProjectExpandCard});
            var x = Site.create({"Type": "img","Src":"https://cdn0.iconfinder.com/data/icons/octicons/1024/x-512.png", "Class":"ProjectClose","Id":"X","Parent": OverlayProjectExpandCard});
            x.onclick = function (){
              document.getElementById('Main').removeChild(canvas);
            }
            var PopUpBanner = Site.create({"Type": "div", "Class":"PopUpBanner","Id":"PopUpTitle","Parent": OverlayProjectExpandCard});
            setTimeout(function(){
                var checkM2 = "";
                if (document.getElementById('Main').offsetWidth < 1200){
                    checkM2 = "Y";
                }
                Site.drawBanner(PopUpBanner, "", checkM2, projectData["Images"]);
            },400);
            var languageHolder = Site.create({"Type": "div", "Class":"languageHolder","Id":"languageHolder","Parent": OverlayProjectExpandCard});
            for (var j = 0; j < projectData["Languages"].length; j++ ){
              var SingleLanguage = Site.create({"Type": "div", "Class":"SingleLanguage","Content":projectData["Languages"][j], "Id":"SingleLanguage","Parent": languageHolder});
              if (checkM){
                SingleLanguage.style.fontSize = "1.1em";
              }
            }
            var PopUpContentHolder = Site.create({"Type": "div", "Class":"PopUpContentHolder","Id":"PopUpContentHolder","Content":projectData["Content"], "Parent": OverlayProjectExpandCard});
            var PopUpButton1 = Site.create({"Type": "a","Class":"PopUpButton","Id":"PopUpButton","Content":"View Code","Parent": OverlayProjectExpandCard});
            if (projectData["Code"]){
              PopUpButton1.href = projectData["Code"];
            }
            PopUpButton1.setAttribute("target","_blank");
            var PopUpButton2 = Site.create({"Type": "a","Href":projectData["Link"], "Class":"PopUpButton","Id":"PopUpButton","Content":"View Site","Style":"", "Parent": OverlayProjectExpandCard});
            PopUpButton2.setAttribute("target","_blank");
            if (checkM == "Y"){
              PopUpTitle.style.fontSize = "1.6em";
              PopUpTitle.style.width = "70%";
              PopUpTitle.style.paddingBottom = "5%";
              x.style.width = "8%";
              languageHolder.style.width = "95%";
              languageHolder.style.marginLeft = "2.5%";
              PopUpBanner.style.width = "100%";
              PopUpBanner.style.marginLeft = "0%";
              PopUpContentHolder.style.fontSize = "1.1em";
              PopUpContentHolder.style.width = "95%";
              PopUpContentHolder.style.marginLeft = "2.5%";
              PopUpButton1.style.width = "40%";
              PopUpButton1.style.marginLeft = "7.5%";
              PopUpButton2.style.fontSize = "1.1em";
              PopUpButton2.style.width = "40%";
              PopUpButton2.style.fontSize = "1.1em";
              PopUpButton2.style.marginLeft = "7.5%";
            }
            if (projectData["OpenSource"] == "No"){
              PopUpButton1.style.display="none";
              PopUpButton2.style.width = "80%";
              PopUpButton2.style.marginLeft = "10%";
            }
          }
      }

  },
  DrawProjects:function(main, mobile){
      Site.DrawProjectsV2(main, mobile);
    /*var data = Data.ProjectsData;
    for (var i = 0; i < data.length; i++){
    var SubSection = Site.create({"Type": "div","Class":"SubSection","Id":"SubSection","Parent": main});
    SubSection.style.backgroundColor = data[i].Color;
    SubSection.style.height = "95%";
    var ProjectContainer = Site.create({"Type": "div","Class":"ProjectContainer","Id":"ProjectContainer","Parent": SubSection});
    if (mobile){
      SubSection.style.height = "auto";
      SubSection.style.paddingBottom = "5%";
      ProjectContainer.style.width = "95%";
      ProjectContainer.style.height = "auto";
      ProjectContainer.style.paddingBottom = "5%";
      ProjectContainer.style.overflow = "auto";
      ProjectContainer.style.marginLeft = "2.5%";
    }else {

        SubSection.style.height = "auto";
        SubSection.style.paddingBottom = "5%";
        ProjectContainer.style.height = "auto";
        ProjectContainer.style.paddingBottom = "5%";
        ProjectContainer.style.overflow = "auto";

    }
    var ProjectImg = Site.create({"Type": "img","Class":"ProjectImg","Id":"ProjectImg","Parent": ProjectContainer});
    ProjectImg.src = data[i].Image;
    var ProjectTitle = Site.create({"Type": "div","Class":"ProjectTitle","Id":"ProjectTitle","Parent": ProjectContainer});
    ProjectTitle.innerHTML = data[i].Title;
    var ProjectContentSmall = Site.create({"Type": "div","Class":"ProjectContentSmall","Id":"ProjectContentSmall","Parent": ProjectContainer});

    ProjectContentSmall.innerHTML = data[i].ContentSmall;
    var ProjectContent = Site.create({"Type": "div","Class":"ProjectContent","Id":"ProjectContent","Parent": ProjectContainer});
    ProjectContent.innerHTML = data[i].Content;
    var TextContentButton1 = Site.create({"Type": "a","Class":"PrjectButton","Id":"TextContentButton","Content":"Visit Site","Parent": ProjectContainer});
    TextContentButton1.href = data[i].Link;
    if (data[i].Link == "https://garnethealth.org/"){
      TextContentButton1.innerHTML = "Coming Soon";
    }
    if (mobile){
      ProjectImg.style.maxWidth = "80%";
      ProjectContentSmall.style.width = "95%";
      ProjectContentSmall.style.marginLeft = "2.5%";
      ProjectContent.style.width = "95%";
      ProjectContent.style.fontSize = "115%";
      ProjectContent.style.marginLeft = "2.5%";
      TextContentButton1.style.width = "95%";
      TextContentButton1.style.marginLeft = "2.5%";
    }
  }*/

  },
  DrawAboutSummaryContainer:function(elm, header, body, mobile){
    var SummaryContainer = Site.create({"Type": "div","Class":"SummaryContainer","Id":"SummaryContainer","Parent": elm});
    var SummaryHeader = Site.create({"Type": "div","Class":"SummaryHeader","Id":"SummaryHeader","Parent": SummaryContainer});
    var SummaryHeaderContent = Site.create({"Type": "div","Class":"SummaryHeaderContent","Id":"SummaryHeaderContent","Content":header,"Parent": SummaryHeader});
    var Summary = Site.create({"Type": "div","Class":"Summary","Id":"Summary","Parent": SummaryContainer});
    for (var i = 0; i < body.length; i++){
        var SummaryListElement = Site.create({"Type": "li","Class":"SummaryListElement","Id":"SummaryListElement","Parent": Summary});
        SummaryListElement.innerHTML =body[i];
    }
     if (mobile){
       SummaryContainer.style.width = "86%";
       SummaryContainer.style.height = "auto";
       Summary.style.height = "auto";
       SummaryContainer.style.marginTop = "4%";
       Summary.style.fontSize = "120%";
       SummaryContainer.style.overflow = "auto";
       SummaryHeaderContent.style.fontSize = "150%";
     }
  },
  DrawWorkExperienceContainer:function(elm, header,Title, when, body ,id, mobile){
    var WorkExperienceContainer = Site.create({"Type": "div","Class":"WorkExperienceContainer","Id":"WorkExperienceContainer","Parent": elm});
    var WorkExperienceHeader = Site.create({"Type": "div","Class":"WorkExperienceHeader","Id":"WorkExperienceHeader","Parent": WorkExperienceContainer});
    var WorkExperienceContent = Site.create({"Type": "div","Class":"WorkExperienceContent","Id":"WorkExperienceContent","Content":header,"Parent": WorkExperienceHeader});
    var WorkExperienceContent2 = Site.create({"Type": "div","Class":"WorkExperienceLeftContent","Id":"WorkExperienceContent","Content":Title,"Parent": WorkExperienceHeader});

    var WorkExperience = Site.create({"Type": "div","Class":"WorkExperience","Id":"WorkExperience","Parent": WorkExperienceContainer});
    var WorkExperienceContent3 = Site.create({"Type": "div","Class":"WorkExperienceContent","Id":"WorkExperienceContent","Style":"color:#5d7699;width:80%;font-size:1.4em;margin-left:1%;margin-top:0.5%;margin-bottom:0.5%;height:auto;","Content":when,"Parent": WorkExperience});

    for (var i = 0; i < body.length; i++){
        var WorkExperienceListElement = Site.create({"Type": "li","Class":"WorkExperienceListElement","Id":"WorkExperienceListElement","Parent": WorkExperience});
        WorkExperienceListElement.innerHTML =body[i];

    }
    if (mobile){
      WorkExperienceContainer.style.width = "90%";
      WorkExperienceContainer.style.marginLeft = "5%";
      WorkExperienceContainer.style.marginTop = "2%";
      WorkExperience.style.height = "auto";
      WorkExperienceHeader.style.height = "10%";
      WorkExperienceContainer.style.height = "auto";
      WorkExperienceContent.style.fontSize = "90%";
      WorkExperienceContent2.style.fontSize = "90%";
      WorkExperienceContent3.style.fontSize = "90%";
      WorkExperienceContent3.style.width = "80%";
      WorkExperience.style.fontSize = "105%";
    }
  },
  DrawAboutBannerSection:function(Content, Page, mobile){
      var GalleryHolder = Site.create({"Type": "div","Class":"GalleryHolder","Id":"GalleryHolder","Parent": Content});
    var TextContentHeader2 = Site.create({"Type": "div","Class":"TextContentHeader","Content":"Gallery","Id":"TextContentHeader2","Parent": GalleryHolder});
    var TextContentSub = Site.create({"Type": "div","Class":"TextContentSub","Id":"TextContentSub","Content":"Snapshots of me and my life","Parent": GalleryHolder});
    Site.drawBanner(GalleryHolder, Page, mobile);
  },
  DrawAboutSummary:function(mobile){
    var mainElement = document.getElementById('Main');
    var crumbs = [{"label":"Home", "link":"/Home.html"},{"label":"About", "link":"/about.html"}];
    Site.DrawBreadCrumbTrail(mainElement, crumbs);
    var mainContent = Site.create({"Type": "div","Class":"mainContent","Id":"mainContent","Style":"padding-bottom:0px;", "Parent": mainElement});
    var SummaryContainerImg = Site.create({ "Type": "img", "Src": "./img/Logos/JMLogo.png",  "Class": "SummaryContainerImg", "Parent": mainContent });
    var overViewHeader =Site.create({"Type": "div","Class":"overViewHeader","Id":"overViewHeader","Content":"About Me", "Parent": mainContent});
    var overView = Site.create({"Type": "div","Class":"overView","Id":"overView","Parent": mainContent});
    overView.innerHTML = Data.AboutOverview;
    if (mobile){
      overView.style.fontSize = "1em";
      mainContent.style.height = "auto";
      overView.style.width = "95%";
      overView.style.marginLeft = "2.5%";
      overView.style.lineHeight = "1.6em";
      overViewHeader.style.fontSize = "3em";
      SummaryContainerImg.style.width = "20%";
      SummaryContainerImg.style.marginLeft = "40%";
    }
  },
  DrawSkills:function(mainContent, mobile){
    var skilsContainer = Site.create({"Type": "div","Class":"skilsContainer","Id":"skilsContainer", "Parent": mainContent});
    var Skills =Site.create({"Type": "div","Class":"overViewHeader","Id":"overViewHeader","Style":"width:40%; margin-top: 1%;margin-bottom:3%; margin-left: 30%; text-align:center;font-size:2.5em; color:white;background-color:#5d7699;box-shadow:1px 1px 3px grey;border:none;","Content":"Skills", "Parent": skilsContainer});
    if (mobile){
      skilsContainer.style.height = "auto";
      Skills.style.width = "90%";
      Skills.style.marginLeft = "5%";
      Skills.style.marginTop = "2%";
    }
    var skilsTable = Site.create({"Type": "div","Class":"skilsTable","Id":"skilsTable", "Parent": skilsContainer});
    var skills = Data.skills;
  for (var i = 0; i < skills.length; i++){
      Site.DrawAboutSummaryContainer(skilsContainer,skills[i].label, skills[i].data,mobile );
  }
},
DrawWorkExperience:function(mainContent, mobile){
  var WorkExperienceContainer = Site.create({"Type": "div","Class":"WorkContainer","Id":"WorkContainer", "Parent": mainContent});
  var WorkExperience =Site.create({"Type": "div","Class":"overViewHeader","Id":"overViewHeader","Style":"width:40%;font-size:2.5em; color:white; margin-top: 1%;margin-bottom:3%; margin-left: 30%; text-align:center;background-color:#405169;box-shadow:1px 1px 3px grey;border:none;","Content":"Work Experience:", "Parent": WorkExperienceContainer});
  if (mobile){
    WorkExperienceContainer.style.height = "auto";
    WorkExperience.style.width = "90%";
    WorkExperience.style.marginLeft = "5%";
    WorkExperience.style.marginTop = "2%";
  }
  var WorkExperienceTable = Site.create({"Type": "div","Class":"skilsTable","Id":"skilsTable", "Parent": WorkExperienceContainer});
  var WorkExperience = Data.WorkExperience;
  for (var i = 0; i < WorkExperience.length; i++){
      Site.DrawWorkExperienceContainer(WorkExperienceContainer,WorkExperience[i].label, WorkExperience[i].Title, WorkExperience[i].When, WorkExperience[i].data , i, mobile);
  }
},
  DrawBreadCrumbTrail:function(parent, crumbs){
    var BreadCrumbContainer = Site.create({"Type": "div","Class":"BreadCrumbContainer","Id":"BreadCrumbContainer","Parent": parent});
    for (var i = 0; i < crumbs.length; i++){
        var SingleCrumb = Site.create({"Type": "a","Class":"SingleCrumb","Id":"SingleCrumb","Parent": BreadCrumbContainer});
        SingleCrumb.innerHTML = crumbs[i].label ;
        SingleCrumb.href = crumbs[i].link;
        if (i  == 0){
          SingleCrumb.style.marginLeft = "5%";
        }
        if (i != crumbs.length-1){
          SingleCrumb.innerHTML += " > ";
        }
    }
  },
  DrawFooter:function(mobile){
    var mainElement = document.getElementById('Main');
    var Footer = Site.create({"Type": "div","Class":"Footer","Id":"Footer","Parent": mainElement});
    var FooterLeftContent = Site.create({"Type": "div","Class":"FooterLeftContent","Id":"FooterLeftContent","Parent": Footer});
    FooterLeftContent.innerHTML = Data.Bio;
    var FooterImg = Site.create({"Type": "img","Src":"./img/Logos/JMLogoNoBG.png","Class":"FooterImg","Id":"FooterImg","Parent": Footer});
    var FooterLeftContent2 = Site.create({"Type": "div","Class":"FooterLeftContent2","Id":"FooterLeftContent","Parent": Footer});
    FooterLeftContent2.innerHTML = "<span style='color:grey; font-weight:bold;'>Contact:</span><br><span style='color:grey; font-weight:bold;'>Phone</span> 1-(845)-544-4719<br>";
    FooterLeftContent2.innerHTML += "<span style='color:grey; font-weight:bold;'>Email</span> JakeLMuller1@gmail.com";
    var bottomFooter =  Site.create({"Type": "div","Class":"bottom","Id":"bottomFooter","Content":"JakelMuller.com","Parent": Footer});
    if (mobile){
      Footer.style.height = "25%";
      Footer.style.backgroundSize = "cover";
      bottomFooter.style.marginTop = "10%";
      FooterLeftContent.style.fontSize = "55%";
      FooterLeftContent.style.marginLeft = "5%";
      FooterLeftContent.style.width = "30%";
      FooterImg.style.marginRight = "5%";
      FooterLeftContent2.style.fontSize = "60%";
      FooterLeftContent2.style.width = "30%";
    }
  },
  DrawHomeBottomContent:function(mobile){
    var mainElement = document.getElementById('Main');
    var BottomSection = Site.create({"Type": "div","Class":"BottomSection","Id":"BottomSection","Parent": mainElement});
    if (!mobile){
      var hand = Site.create({"Type": "img","Class":"hand","Id":"hand","Src":"./img/handComplete.PNG","Parent": BottomSection});
      hand.style.height = BottomSection.offsetHeight+"px";

    }
      var mobileText = Data.mobileText;
      var TextContent = Site.create({"Type": "div","Class":"TextContentInvert","Id":"TextContent", "Style":"margin-left:0%;margin-top:1%;height:75%;", "Parent": BottomSection});
      if (document.getElementById('hand')){
        TextContent.style.position = "relative";
        TextContent.style.zIndex = "98";
      }
      var TextContentHeader = Site.create({"Type": "div","Class":"TextContentHeaderInvert","Content":mobileText[0],"Id":"TextContentHeader","Parent": TextContent});
      if (mobile){
        var hand = Site.create({"Type": "img","Class":"hand","Id":"hand","Src":"./img/handComplete.PNG","Parent": TextContent});
        hand.style.width = "100%";
        hand.style.height = "auto";
        hand.style.marginLeft = "0%";
        hand.style.marginBottom = "15%";
      }
      var TextContentSub = Site.create({"Type": "div","Class":"TextContentSubInvert","Id":"TextContentSub","Content":mobileText[1],"Parent": TextContent});

      var TextContentmain = Site.create({"Type": "div","Class":"TextContentmainInvert","Id":"TextContentmain","Content":mobileText[2],"Parent": TextContent});

      var TextContentButtonInvert = Site.create({"Type": "div","Class":"TextContentButtonInvert","Id":"TextContentButton","Content":"Contact","Parent": TextContent});
      TextContentButtonInvert.onclick = function(){
        window.location.href = "/Contact.html";
      }
      if (mobile){

        TextContent.style.height = "auto";
        TextContent.style.paddingBottom = "50px";
        BottomSection.style.height = "auto";
        TextContent.style.width = "100%";
        TextContent.style.marginLeft = "0%";
        TextContentHeader.style.fontSize = "250%";
        TextContentHeader.style.marginTop = "1%";
        TextContentHeader.style.marginBottom = "15%";
        TextContentSub.style.fontSize = "180%";
        TextContentSub.style.marginBottom = "5%";
        TextContentmain.style.fontSize = "140%";
        TextContentmain.style.marginBottom = "5%";
        TextContentmain.style.width = "90%";
        TextContentmain.style.marginLeft = "5%";
        TextContentButtonInvert.style.width = "80%";
        TextContentButtonInvert.style.marginLeft = "10%";
          TextContentButtonInvert.style.marginBottom = "15%";
      }
  },
  DrawHomeSubSection:function(mobile){
      var mainElement = document.getElementById('Main');
      var SubSection = Site.create({"Type": "div","Class":"SubSection","Id":"SubSection","Parent": mainElement});
      if (mobile){
        SubSection.style.height = "auto";
      }
      var TextPillars = Data.TextPillars;
      var PillarHolder = Site.create({"Type": "div","Class":"PillarHolder","Id":"PillarHolder","Parent": SubSection});
      for (var i=0; i < TextPillars.length; i++){
            var SinglePillar = Site.create({"Type": "div","Class":"SinglePillar","Id":"SinglePillar","Parent": PillarHolder});
            if (mobile){
              PillarHolder.style.height = "auto";
              SinglePillar.style.width = "90%";
              SinglePillar.style.height = "auto";
              SinglePillar.style.marginLeft = "5%";
              SinglePillar.style.paddingBottom = "100px";
              SinglePillar.style.paddingTop = "50px";

            }
            var TextContentHeader = Site.create({"Type": "div","Class":"TextContentHeader","Style":"width:90%;margin-left:3.5%;text-shadow: 0.1px 0.1px 1px black; margin-bottom: 5%;font-size:260%;","Id":"SinglePillar","Parent": SinglePillar});
            TextContentHeader.innerHTML = TextPillars[i].head;
            TextContentHeader.style.color = TextPillars[i].color;
              var headerImg = Site.create({"Type": "img","Class":"headerImg","Src":TextPillars[i].img,"Id":"headerImg","Parent": SinglePillar});
                var TextContentSub = Site.create({"Type": "div","Class":"TextContentSub","Id":"SinglePillar","Style":"margin-top:5%;","Content":TextPillars[i].Title,"Parent": SinglePillar});
                  var TextContentmain = Site.create({"Type": "div","Class":"TextContentmain","Id":"SinglePillar","Style":"margin-top:5%;","Content":TextPillars[i].Content,"Parent": SinglePillar});
      }


  },
  GlobalHomeTextContent: Data.GlobalHomeTextContent,
    DrawHomePageContent:function(mobile){
    var mainElement = document.getElementById('Main');
    var mainContent = Site.create({"Type": "div","Class":"mainContent","Id":"mainContent","Parent": mainElement});
    var TextContent = Site.create({"Type": "div","Class":"TextContent","Id":"TextContent", "Parent": mainContent});
    if (mobile){
      var headerImg = Site.create({"Type": "img","Class":"headerImg","Src":"./img/Logos/JMLogo.png","Style":"width:21%;","Id":"headerImg","Parent": TextContent});
    }
    var TextContentHeader = Site.create({"Type": "div","Class":"TextContentHeader","Content":Site.GlobalHomeTextContent[0],"Id":"TextContentHeader","Parent": TextContent});
    var TextContentSub = Site.create({"Type": "div","Class":"TextContentSub","Id":"TextContentSub","Content":Site.GlobalHomeTextContent[1],"Parent": TextContent});
    var TextContentmain = Site.create({"Type": "div","Class":"TextContentmain","Id":"TextContentmain","Content":Site.GlobalHomeTextContent[2],"Parent": TextContent});
    var TextContentButton = Site.create({"Type": "div","Class":"TextContentButton","Id":"TextContentButton","Content":"Contact","Parent": TextContent});
    TextContentButton.onclick = function(){
      window.location.href = "./Contact.html";
    }

      var imgHolder = Site.create({"Type": "div","Class":"imgHolder","Id":"imgHolder","Parent": mainContent});
      if (mobile) {
        var TextContentHeader2 = Site.create({"Type": "div","Class":"TextContentHeader","Content":"Gallery","Id":"TextContentHeader2","Parent": imgHolder});
        var TextContentSub = Site.create({"Type": "div","Class":"TextContentSub","Id":"TextContentSub","Content":"Click To See ScreenShots Of Projects","Parent": imgHolder});
        Site.drawBanner(imgHolder, "", mobile, Data.HomeBannerPicsM);
      }else{
        var pics = Data.HomeBannerPics;
        if (mobile){
          var pics = Data.HomeBannerPicsM;
        }
        for (var i = 0; i < pics.length; i++){

          if (i == 0 ||i == 4||i == 6){
            var Img = Site.create({"Type": "img","Class":"img1x2",  "Src": pics[i],"Id":"Img"+i,"Parent": imgHolder});
            if (mobile) {
              Img.style.width = "43%";
            }
          }else{
            var Img = Site.create({"Type": "img","Class":"img1x1",  "Src": pics[i],"Id":"Img"+i,"Parent": imgHolder});
            if (mobile) {
              Img.className = "img2x1";
            }
          }
          if (i == 6){
            Img.style.marginTop = "-"+document.getElementById('Img2').offsetHeight + "px";
          }else if (i == 5 || i == 8) {
            Img.style.marginTop = "-"+(document.getElementById('Img2').offsetHeight +4.5)+ "px";
          }
          if (mobile){
              if (i == 5){
                  Img.style.marginTop = "-"+(document.getElementById('Img2').offsetHeight +40) + "px";
              }
          }
          Img.onclick = function(){
            Site.DrawSlideUpImage(this.src, "Y");
          }
        }
      }
    if (mobile){
      imgHolder.style.width = "100%";
      imgHolder.style.backgroundColor = "ghostwhite";
      imgHolder.style.height = "auto";
      mainContent.style.height = "auto";
      mainContent.style.paddingBottom = "0px";
      TextContent.style.width = "100%";
      TextContent.style.height = "auto";
      TextContent.style.paddingBottom = "30%";
      TextContentHeader.style.fontSize = "220%";
      TextContentHeader.style.marginTop = "14%";
      TextContentHeader.style.marginBottom = "2%";
      TextContentHeader2.style.fontSize = "280%";
      TextContentHeader2.style.marginTop = "14%";
      TextContentHeader2.style.marginBottom = "2%";
      TextContentSub.style.fontSize = "180%";
      TextContentSub.style.marginBottom = "5%";
      TextContentmain.style.fontSize = "140%";
      TextContentmain.style.marginBottom = "5%";
      TextContentmain.style.width = "90%";
      TextContentmain.style.marginLeft = "5%";
      TextContentButton.style.width = "80%";
      TextContentButton.style.marginLeft = "10%";
      var TextContentButtonInvert = Site.create({"Type": "div","Class":"TextContentButton","Style":"margin-bottom:100px;margin-top:50px;width:80%;margin-left:10%;", "Id":"TextContentButton","Content":"View All Projects","Parent": imgHolder});
      TextContentButtonInvert.onclick = function(){
        window.location.href = "./Projects.html";
      }
    }
  },
  DrawSlideUpImage:function(src, IsImg){
    var mainElement = document.getElementById('Main');
    document.getElementById('mainContent').style.filter = "blur(2px)";
    document.getElementById('TopNavigation').style.filter = "blur(2px)";
    var canvas = Site.create({"Type": "div","Class":"canvas","Id":"canvas","Parent": mainElement});
    var x = Site.create({"Type": "img","Src":"./img/x.png", "Class":"X","Id":"X","Parent": canvas});
    if (mainElement.offsetWidth < 1200){
      if (IsImg){
          var imgSingle = Site.create({"Type": "div","Style":"", "Class":"imgSingleM","Id":"imgSingle","Parent": canvas});
            imgSingle.style.backgroundImage = "url('"+src+"')";
      }else {
        var imgSingle = Site.create({"Type": "iframe","Class":"imgSingleM","Id":"imgSingle","Parent": canvas});
          imgSingle.src = src;
      }
    }else{
      if (IsImg){
          var imgSingle = Site.create({"Type": "img","Style":"height:auto;top:5%;", "Class":"imgSingle","Id":"imgSingle","Parent": canvas});
      }else {
        var imgSingle = Site.create({"Type": "iframe","Class":"imgSingle","Id":"imgSingle","Parent": canvas});
      }
        imgSingle.src = src;
    }
    mainElement.style.overflow = "hidden";
    canvas.style.overflow = "auto";

    x.onclick = function(){
      mainElement.style.overflowY = "auto";
      mainElement.style.overflowX = "hidden";
      canvas.style.overflow = "hidden";
      document.getElementById('mainContent').style.filter = "blur(0px)";
      document.getElementById('TopNavigation').style.filter = "blur(0px)";
      mainElement.removeChild(canvas);
    }
  },
  HandleHomeScroll:function(Element){
    var nav = document.getElementById('TopNavigation');
    if (Element.scrollTop > 10){
      if (nav.firstChild.id == "logoContainer"){
        while (nav.firstChild){
          nav.removeChild(nav.firstChild);
        }
          nav.style.height = "5%";
          var logoContainer = Site.create({"Type": "a","Href": "./Home.html","Style":"margin-top:0.1%;width:3%;animation:fromTopSmall .3s;", "Class": "logoContainer","Id":"logoContainer2","Parent": TopNavigation });
          var MainJMLogo = Site.create({"Type": "img","Src":"./img/Logos/JMLogoNoBG.png","Style":"  fromTopSmall .3s;", "Class": "MainJMLogo","Id":"MainJMLogo","Parent": logoContainer });
          MainJMLogo.onmouseover = function(){
            this.src = "./img/Logos/JMLogo.png";
          }
          MainJMLogo.onmouseout = function(){
            this.src = "./img/Logos/JMLogoNoBG.png";
          }
          var Filler = Site.create({"Type": "div","Class":"Filler", "Id":"homeLogo","Parent": nav});
            var menu = Site.create({"Type": "img","Class":"right","Style":"animation:fromTopSmall .3s;margin-top:0.2%;margin-left:5.2%;", "Src":"./img/menu.png", "Id":"right","Parent": nav});
            var bcMenu = Site.create({"Type": "div","Class":"canvas","Id":"bcMenu","Style":"display:none;", "Parent": Element});
           var menuNav = Site.create({ "Type": "div", "Id": "menuNav", "Class": "menuNav", "Parent": Element });
          Site.drawMenuNav(menuNav);
          right.onclick = function () {
            if (this.className == "right" ) {
                this.className = "rightClicked";
                document.getElementById('bcMenu').style.display = "block";
            } else {
                this.className = "right";
                  document.getElementById('bcMenu').style.display = "none";
            }

            Site.sildeMenu(menuNav)
        };
      }
    }else{
      if (nav.firstChild.id != "logoContainer"){
        while (nav.firstChild){
          nav.removeChild(nav.firstChild);
        }
        nav.style.height = "10%";
        Site.drawDesktopMainTopNav(nav, Site.GlobalPage);
      }
    }
  },
  GlobalImageCount:0,
  timeoutSet:0,
  UpdateBannerImg:function(src, img,banner, arrow){
    var imgToUse= "";
    if (img[Site.GlobalImageCount]){
      imgToUse = img[Site.GlobalImageCount];
    }else {
      imgToUse = img[0];
      Site.GlobalImageCount = 0;
    }

    if (Site.timeoutSet == 0){
      Site.timeoutSet = 1;
      setTimeout(function(){
        var getElement = document.getElementById(Site.GlobalImageCount);
        getElement.click();
        if (Site.GlobalImageCount == 1 ){
          banner.style.backgroundPosition = "center center";
          banner.style.backgroundPositionY = "50%";
        }else if (Site.GlobalImageCount == 0 ){
          banner.style.backgroundPosition = "center center";
          banner.style.backgroundPositionY = "30%";
        }else{
          banner.style.backgroundPosition = "";
          banner.style.backgroundPositionY = "";
        }
          Site.GlobalImageCount +=1 ;
          Site.timeoutSet = 0;
        Site.UpdateBannerImg(Site.GlobalImageCount,img,banner);
      },5000);
    }
  },
  drawHomeBanner:function (MainContent, Page, mobile){
    if (mobile){

      Mobile.drawHomePage(MainContent, Page);
    }else{
     Site.GlobalPage = Page;
     var TopNavigation = Site.create({"Type": "div","Class": "TopNavigation","Id":"TopNavigation","Parent": MainContent });
      Site.drawDesktopMainTopNav(TopNavigation, Page);
      var HomeBanner = Site.create({"Type": "div","Class": "HomeBanner","Id":"HomeBanner","Parent": MainContent });

      var HomeBanner2 = Site.create({"Type": "div","Class": "HomeBanner","Id":"HomeBanner2","Style":"background-image:none;background-color:unset;", "Parent": HomeBanner });
      setTimeout(function(){
        HomeBanner.style.backgroundImage = "url('"+Data[Site.GlobalPage][0]+"')";
        HomeBanner.style.backgroundSize="cover";
        HomeBanner2.style.backgroundImage = "url('https://i.gifer.com/3BBK.gif')";
        HomeBanner2.style.backgroundSize="cover";
      }, 600);
      var Content = Data[Page];
      var HomeBannerContent = Site.create({"Type": "div","Class": "HomeBannerContent","Id":"HomeBannerContent","Parent": HomeBanner2 });
      var frontHomeContentLeft = Site.create({"Type": "div","Class": "frontHomeContentLeft","Id":"frontHomeContentLeft","Parent": HomeBannerContent });

      var navInfo = Site.create({"Type": "div", "Class": "navInfo","Id":"navInfo","Parent": frontHomeContentLeft });
      var mypic = Site.create({"Type": "img","Src":Data[Page][1], "Class": "mypic","Id":"mypic", "Parent": navInfo });
      var name = Site.create({"Type": "div", "Class": "name","Id":"name","Content":Data[Page][2], "Parent": navInfo });
      var BottomInfo = Site.create({"Type": "div", "Class": "BottomInfo","Id":"BottomInfo","Content":Data[Page][3], "Parent": navInfo });
      var ContentMain = Site.create({"Type": "div","Class": "ContentMain","Id":"ContentMain","Content":Data[Page][4], "Parent": frontHomeContentLeft });

      var infoButtonOne = Site.create({"Type": "a", "Href":"./Contact.html", "Class": "infoButton bOne","Id":"infoButtonOne","Content":"Request A Work Order", "Parent": frontHomeContentLeft });
      var infoButtonTwo = Site.create({"Type": "a", "Href":"./Projects.html", "Class": "infoButton bTwo","Id":"infoButtonTwo","Content":"View Prior Projects", "Parent": frontHomeContentLeft });

      var socials = Site.create({"Type": "div", "Class": "socials","Id":"socials","Parent": HomeBannerContent });

      var social1 = Site.create({"Type": "a","Href":"https://stackoverflow.com/users/16922206/jmuller70", "Class": "social","Id":"social1", "Parent": socials });
      var social1p = Site.create({"Type": "img","Src":"./img/stacklogo.png", "Class": "picSocails","Id":"social1", "Parent": social1 });

      var social2 = Site.create({"Type": "a","Href":"https://www.linkedin.com/in/jake-muller-7b1208176/", "Class": "social","Id":"social1", "Parent": socials });
      var social2p = Site.create({"Type": "img","Src":"./img/linklogo.png", "Class": "picSocails","Id":"social2", "Parent": social2 });

      var social3 = Site.create({"Type": "a","Href":"https://www.facebook.com/jake.muller.750", "Class": "social","Id":"social1", "Parent": socials });
      var social3p = Site.create({"Type": "img","Src":"./img/fb.png", "Class": "picSocails","Id":"social3", "Parent": social3 });

      var social4 = Site.create({"Type": "a","Href":"https://github.com/JakeLMuller", "Class": "social","Id":"social1", "Parent": socials });
      var social4p = Site.create({"Type": "img","Src":"./img/github.png", "Class": "picSocails","Id":"social4", "Parent": social4 });
      //var frontHomeContentRight = Site.create({"Type": "div","Class": "frontHomeContentRight","Id":"frontHomeContentRight","Parent": HomeBannerContent });
      if (MainContent.offsetWidth < 1500 ){
        name.style.fontSize = "3.5em";
        name.style.marginLeft = "1%";
        BottomInfo.style.marginLeft = "0.5%";
      }
      if (Site.GlobalPage != "Home"){
        if (Site.GlobalPage == "Projects" || Site.GlobalPage == "Contact"){
          socials.style.display = "none";
          ContentMain.style.display = "none";
          infoButtonOne.style.display = "none";
          infoButtonTwo.style.display = "none";
          setTimeout(function () {
                HomeBanner.style.height = "40%";
          },300);
          if (Site.GlobalPage == "Contact"){
            BottomInfo.style.fontSize = "1.8em";
            BottomInfo.style.marginLeft = "0%";
          }
        }else{
          setTimeout(function () {
                HomeBanner.style.height = "70%";
          },300);
          name.style.display = "none";
          mypic.style.display = "none";
          BottomInfo.style.display = "none";
          ContentMain.style.display = "none";
          infoButtonOne.style.display = "none";
          infoButtonTwo.style.display = "none";
        }

      }
    }
  },
  GlobalPage:"",
  drawDesktopMainTopNav:function(TopNavigation, Page){

    var logoContainer = Site.create({"Type": "a","Href": "./Home.html", "Class": "logoContainer","Style":"animation:fadein 3s", "Id":"logoContainer","Parent": TopNavigation });
    var MainJMLogo = Site.create({"Type": "img","Src":"./img/Logos/JMLogoNoBG.png", "Class": "MainJMLogo","Id":"MainJMLogo","Parent": logoContainer });
    MainJMLogo.onmouseover = function(){
      this.src = "./img/Logos/JMLogo.png";
    }
    MainJMLogo.onmouseout = function(){
      this.src = "./img/Logos/JMLogoNoBG.png";
    }


    var menuOptions = Site.create({"Type": "div", "Class": "menuOptions", "Id":"menuOptions", "Parent": TopNavigation });
    var op1 = Site.create({"Type": "a", "Content":"Home", "Href":"./Home.html", "Class": "opt", "Id":"Home", "Parent": menuOptions });
    var op2 = Site.create({"Type": "a", "Content":"About", "Href":"./About.html", "Class": "opt", "Id":"About", "Parent": menuOptions });
    var op3 = Site.create({"Type": "a", "Content":"Projects", "Href":"./Projects.html", "Class": "opt", "Id":"Projects", "Parent": menuOptions });
    var op4 = Site.create({"Type": "a", "Content":"Contact", "Href":"./Contact.html", "Class": "opt", "Id":"Contact", "Parent": menuOptions });
    document.getElementById(Site.GlobalPage).className = " opt optSelected";

  },
  globalImages:[],
  drawBanner:function(MainContent,Page, mobile, Images){
    var Banner = Site.create({"Type": "div","Class": "Banner","Id":"Banner", "Parent": MainContent });
    Banner.onclick = function (event) {
      if (event.target.id == "Banner"){
        Site.DrawSlideUpImage("./img/"+Site.globalImages[Site.GlobalImageCount], "Y");
      }
    }
    if(mobile){
      Banner.style.width = "95%";
      Banner.style.marginLeft = "2.5%";
      Banner.style.height = (Banner.offsetWidth * 0.85) +"px";
    }
    if (Images){
      imgs = Images;
    }else{
    if (Page=="About"){
       imgs = Data.AboutBannerPics;
     }else if (Page == "Home"){
        var imgs = Data.HomeBannerPics2;
      }else if (Page == "Projects"){
        var imgs = Data.ProjectsBannerPics;
      }
    }
      Site.globalImages = imgs;
        Banner.style.backgroundImage= "url(./img/"+imgs[0]+")";
        var arror1 = Site.create({"Type": "img","Src":"./img/white-arrow.png","Class": "arror1","Id":"arror1", "Parent": Banner });
        arror1.onclick = function(){
          var imgToUse= "";
          Site.GlobalImageCount -= 1;
          if (Site.globalImages[Site.GlobalImageCount]){
            imgToUse = Site.globalImages[Site.GlobalImageCount];
          }else {
            imgToUse = Site.globalImages[0];
            Site.GlobalImageCount = 0;
          }
            var getElement = document.getElementById(Site.GlobalImageCount);
            getElement.click();
            if (Site.GlobalImageCount == 1 ){
              Banner.style.backgroundPosition = "center center";
              Banner.style.backgroundPositionY = "50%";
            }else if (Site.GlobalImageCount == 0 ){
              Banner.style.backgroundPosition = "center center";
              Banner.style.backgroundPositionY = "30%";
            }else{
              Banner.style.backgroundPosition = "";
              Banner.style.backgroundPositionY = "";
            }
        }
        var arror2 = Site.create({"Type": "img","Src":"./img/white-arrow.png","Class": "arror2","Id":"arror2", "Parent": Banner });
        arror2.onclick = function(){
          var imgToUse= "";
          Site.GlobalImageCount += 1;
          if (Site.globalImages[Site.GlobalImageCount]){
            imgToUse = Site.globalImages[Site.GlobalImageCount];
          }else {
            imgToUse = Site.globalImages[0];
            Site.GlobalImageCount = 0;
          }
            var getElement = document.getElementById(Site.GlobalImageCount);
            getElement.click();
            if (Site.GlobalImageCount == 1 ){
              Banner.style.backgroundPosition = "center center";
              Banner.style.backgroundPositionY = "50%";
            }else if (Site.GlobalImageCount == 0 ){
              Banner.style.backgroundPosition = "center center";
              Banner.style.backgroundPositionY = "30%";
            }else{
              Banner.style.backgroundPosition = "";
              Banner.style.backgroundPositionY = "";
            }
        }
        if (mobile){
          arror1.style.width = "10%";
          arror2.style.width = "10%";
          arror2.style.marginLeft = "76%";
        }
      var bannerOverlay = Site.create({"Type": "div","Class": "bannerOverlay","Id":"bannerOverlay", "Parent": Banner });

    var bannerCircles = Site.create({"Type": "div","Class": "bannerCircles","Id":"bannerCircles", "Parent": bannerOverlay });

    setTimeout(function(){
      if (mobile){
        bannerCircles.style.marginTop = ((Banner.offsetHeight - bannerCircles.offsetHeight)*0.90) + "px";
      }else{
        bannerCircles.style.marginTop = ((Banner.offsetHeight - bannerCircles.offsetHeight)*0.95) + "px";
      }
    },500)
    for (var i = 0; i < Site.globalImages.length; i++){
        var circle = Site.create({"Type": "div","Class": "circle","Id":i+"", "Parent": bannerCircles });
        if (i == 0){
          circle.className = "circleSelceted";
        }
        if (document.getElementById('Main').offsetWidth < 1200){
          circle.style.width = "9%";
          circle.style.height = "40%";
        }
          circle.style.width = ((bannerCircles.offsetWidth / Site.globalImages.length) * 0.7) + "px";
          circle.style.height = ((bannerCircles.offsetWidth / Site.globalImages.length) * 0.7)  + "px";
        circle.onclick = function(){
          var getCircles = this.parentElement.querySelectorAll("div");
          for (var j=0; j<getCircles.length; j++){
            getCircles[j].className = "circle";
          }
          Site.GlobalImageCount = Number(this.id);
          Banner.style.backgroundImage= "url(./img/"+Site.globalImages[this.id]+")";
          if (this.id == 1){
              Banner.style.backgroundPosition = "center center";
              Banner.style.backgroundPositionY = "50%";
          }else{
            Banner.style.backgroundPosition = "";
            Banner.style.backgroundPositionY = "";
          }
          this.className = "circleSelceted";
          if(Page == "Home"){
            if (document.getElementById('Main').offsetWidth > 1200){
              Site.drawAssetOverlay(bannerOverlay,this.id);
            }
          }
        }
    }
    Site.GlobalImageCount = 1;
    Site.UpdateBannerImg(Site.GlobalImageCount,imgs,Banner);
  },
  drawAssetOverlay:function(parent, Index){
    var assets = Data.PopUpBannerAssets;
    var color =  Data.PopUpBannerColor;
    var contents = Data.PopUpBannerContents;
    if (document.getElementById('overlayAsset')){
      parent.removeChild(document.getElementById('overlayAsset'));
    }
    var overlayAsset = Site.create({"Type": "div","Class":"overlayAsset","Id":"overlayAsset","Parent": parent});
    overlayAsset.style.border = "5px solid "+color[Index];
    setTimeout(function(){
      overlayAsset.style.height = "60%";
    },20);
    var Asset = Site.create({"Type": "img","Class":"Asset","Src":"./img/"+assets[Index], "Id":"Asset","Parent": overlayAsset});
    var content = Site.create({"Type": "div","Class":"content","Id":"content","Content":contents[Index],"Parent": overlayAsset});
    var AssetButton = Site.create({"Type": "div","Class":"AssetButton","Id":"AssetButton","Content":"See More","Parent": overlayAsset});
    AssetButton.style.border = "3px solid "+color[Index];
    AssetButton.style.color = color[Index];
    AssetButton.onclick = function(){
      window.location.href = "/Projects.html";
    }
    if (Index == 0 || Index == 6){
      overlayAsset.style.backgroundColor = "rgba(0,0,0,0.65)";
      content.style.paddingTop = "15%";
      content.style.color = "#ffd300";
      content.style.paddingBottom = "15%";
    }else if (Index == 2){
      content.style.paddingTop = "15%";
      content.style.paddingBottom = "15%";
    }
    /*var getNavs = getMain.querySelectorAll(".singleNav");
    for (var i = 0; i < getNavs.length; i++){
      getNavs[i].style.color = color[Index];

    }*/

  },
  drawMenuNav: function (menuNav, mobile) {
     var colorbg = Site.create({ "Type": "div", "Class": "colorbg", "Parent": menuNav });
     var Filler = Site.create({ "Type": "div", "Class": "Filler", "Parent": colorbg });

     var menu2 = Site.create({ "Type": "div", "Class": "menu","Style":"height:5%;",  "Parent": colorbg });
     if (menuNav.parentElement.offsetWidth < 1100){
         menu2.style.width = "15%";

     }

     var right2 = Site.create({ "Type": "img", "Src": "./img/menu.png", "Style":"margin-top:1%; Width:8%;","Id": "right2", "Class": "right", "Parent": menu2 });
     if (mobile){
       Filler.style.width = "60%";
       menu2.style.float = "left";
          right2.style.width = "90%";
          right2.style.height = "5%";
          menuNav.style.width = "70%";
     }
     right2.style.height = (menu2.offsetHeight ) + "px";
     right2.onclick = function () {
         var getRight = document.getElementById("right");
         if (getRight.className == "right") {
             document.getElementById('bcMenu').style.display = "block";
             Site.sildeMenu(menuNav);
         } else {

             document.getElementById('bcMenu').style.display = "none";
             getRight.click();
         }
     };

     var linkHolder = Site.create({ "Type": "div", "Class": "linkHolder", "Parent": colorbg });
     var Links = ["Home","About","Projects","Contact"];
     for (var i = 0; i < Links.length; i++) {
        var link = Site.create({ "Type": "a", "Class": "link", "Parent": linkHolder });
        link.innerHTML = Links[i];
        link.href = "./"+Links[i]+".html";
        if (menuNav.parentElement.offsetWidth > 1100){
            link.style.fontSize = "260%";
            link.style.marginTop = "15%";
        }else{
          link.style.fontSize = "160%";
          link.style.marginTop = "15%";
        }
     }
    var menuLogo = Site.create({ "Type": "img", "Src": "./img/Logos/JMLogo.png", "Id": "menuLogo", "Class": "menuLogo", "Parent": colorbg });
     //var imgFooter = Site.create({ "Type": "img", "Src": "./img/me.jpg",  "Class": "imgFooter", "Parent": colorbg });
 },
LocalFile:"",

 sildeMenu: function (menuNav) {
     if (menuNav.style.left == "120%" || menuNav.style.left == "") {
         menuNav.style.left = "75%";
         if (menuNav.parentElement.offsetWidth < 1100){
             menuNav.style.left = "40%";
         }
     } else {
         var getRight = document.getElementById("right");
         if (getRight.className == "right") {
             menuNav.style.left = "120%";
         }else {
             getRight.click();
         }

     }

 },
};
