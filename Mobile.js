var Mobile = {
  drawHomePage:function(MainContent,Page){
      Site.GlobalPage = Page;
      Mobile.drawNavBar(MainContent);
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

      var navInfo = Site.create({"Type": "div", "Class": "navInfoM","Id":"navInfo","Parent": frontHomeContentLeft });
      var mypic = Site.create({"Type": "img","Src":Data[Page][1], "Class": "mypicM","Id":"mypic", "Parent": navInfo });
      var name = Site.create({"Type": "div", "Class": "nameM","Id":"name","Content":Data[Page][2], "Parent": navInfo });
      var BottomInfo = Site.create({"Type": "div", "Class": "BottomInfoM","Id":"BottomInfo","Content":Data[Page][3], "Parent": navInfo });
      var ContentMain = Site.create({"Type": "div","Class": "ContentMainM","Id":"ContentMain","Content":Data[Page][4], "Parent": frontHomeContentLeft });
      var infoButtonOne = Site.create({"Type": "a", "Href":"", "Class": "infoButtonM bOneM","Id":"infoButtonOne","Content":"Request A Work Order", "Parent": frontHomeContentLeft });
      var infoButtonTwo = Site.create({"Type": "a", "Href":"", "Class": "infoButtonM bTwo","Id":"infoButtonTwo","Content":"View Prior Projects", "Parent": frontHomeContentLeft });
      if (MainContent.offsetWidth < 350){
        name.style.fontSize = "1.5em";
        BottomInfo.style.fontSize = "1.1em";
        infoButtonOne.style.marginTop = "10%";
        infoButtonOne.style.fontSize = "1.3em";
        infoButtonTwo.style.fontSize = "1.3em";
        ContentMain.style.fontSize = "1em";
      }else if (MainContent.offsetWidth < 400){
        infoButtonOne.style.marginTop = "10%";
        infoButtonOne.style.fontSize = "1.5em";
        infoButtonTwo.style.fontSize = "1.5em";
        ContentMain.style.fontSize = "1.1em";
      }else if (MainContent.offsetWidth < 1050 &&  MainContent.offsetWidth > 900){
        name.style.fontSize = "3.5em";
        navInfo.style.marginLeft = "25%";
        BottomInfo.style.fontSize = "2.1em";
        ContentMain.style.fontSize = "1.8em";
        infoButtonOne.style.marginTop = "10%";
      }
      var socials = Site.create({"Type": "div", "Class": "socialsM","Id":"socials","Parent": HomeBannerContent });
      var social1 = Site.create({"Type": "img","Src":"./img/stacklogo.png", "Class": "socialM","Id":"social1", "Parent": socials });
      var social2 = Site.create({"Type": "img","Src":"./img/linklogo.png", "Class": "socialM","Id":"social2", "Parent": socials });
      var social3 = Site.create({"Type": "img","Src":"./img/fb.png", "Class": "socialM","Id":"social3", "Parent": socials });
      var social4 = Site.create({"Type": "img","Src":"./img/github.png", "Class": "socialM","Id":"social4", "Parent": socials });
      if (Site.GlobalPage != "Home"){
        if (Site.GlobalPage == "Projects"){
          socials.style.display = "none";
          ContentMain.style.display = "none";
          infoButtonOne.style.display = "none";
          infoButtonTwo.style.display = "none";
          navInfo.style.marginTop = "14%";
          setTimeout(function () {
                HomeBanner.style.height = "30%";
          },300);
        }else{
          setTimeout(function () {
                HomeBanner.style.height = "40%";
          },300);
          name.style.display = "none";
          mypic.style.display = "none";
          BottomInfo.style.display = "none";
          ContentMain.style.display = "none";
          infoButtonOne.style.display = "none";
          infoButtonTwo.style.display = "none";
        }
      }

  },
  drawNavBar:function(MainContent){
      var nav = Site.create({"Type": "div","Class": "TopNavigation","Id":"TopNavigation","Parent": MainContent });
      nav.style.height = "5%";
      var logoContainer = Site.create({"Type": "a","Href": "./Home.html","Style":"margin-top:0.1%;width:3%;animation:fromTopSmall 1.3s;height:100%;width:14%;", "Class": "logoContainer","Id":"logoContainer2","Parent": TopNavigation });
      var MainJMLogo = Site.create({"Type": "img","Src":"./img/Logos/JMLogoNoBG.png", "Class": "MainJMLogo","Id":"MainJMLogo","Parent": logoContainer });
      MainJMLogo.onmouseover = function(){
        this.src = "./img/Logos/JMLogo.png";
      }
      MainJMLogo.onmouseout = function(){
        this.src = "./img/Logos/JMLogoNoBG.png";
      }
        var Filler = Site.create({"Type": "div","Class":"Filler", "Id":"homeLogo","Style":"height:100%;width:60%;","Parent": nav});
        var menu = Site.create({"Type": "img","Class":"right","Style":"animation:fromTopSmall 1.3s;margin-top:0.1%;margin-left:5.2%;width:10%;", "Src":"./img/menu.png", "Id":"right","Parent": nav});
        var bcMenu = Site.create({"Type": "div","Class":"canvas","Id":"bcMenu","Style":"display:none;", "Parent": MainContent});
       var menuNav = Site.create({ "Type": "div", "Id": "menuNav", "Class": "menuNav", "Parent": MainContent });
      Site.drawMenuNav(menuNav, "Y");
      right.onclick = function () {
        if (this.className == "right" ) {
            this.className = "rightClicked";
            document.getElementById('bcMenu').style.display = "block";
        } else {
            this.className = "right";
              document.getElementById('bcMenu').style.display = "none";
        }

        Site.sildeMenu(menuNav, "Y")
    }
  }
}