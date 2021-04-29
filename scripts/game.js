//fonction asyn qui permet de récupérer le contenu du l'histoire
async function getStory() {
    const response = await fetch('assets/story.json');
     return await response.json();
    
}


/*
 Créer l'interface de l'application en HTML. Prenez en compte les éléments suivants :
 - Un gros bloc pour afficher le contenu du chapitre
 - Un espace au dessus du contenu pour afficher le titre
 - Plusieurs blocs pour afficher les choix possibles

  Si vous êtes chauds : Injecter le contenu du premier chapitre et les choix disponibles dans l'interface
 */
const containerElement =document.querySelector(".container");
const previousButton = document.getElementById("previousChapter");

//search for the choosed chapter
function foundChapter(chapters,target){
    let selectedChapter = chapters.find(chapter => chapter.id == target);
    if(selectedChapter){
        displayStoryChapter(selectedChapter ); 
        saveChapters(selectedChapter) 
    }else{
         showEndOfTheStory();
         saveChapters({}); 

     } ;
    }
  

 //create container for the chapter
 function createStoryContainer(idChapter,chapterTitle,chapterContent,nextChapters){
     
    if(idChapter != 1){
        previousButton.classList.replace("hidden","visible") ;
    }
    else{previousButton.classList.replace("visible","hidden") ; 
    }
     containerElement.innerHTML = '';
     const title = document.createElement("h1");
     title.innerHTML= chapterTitle;
     //create content's paragraph
     const contenu = document.createElement("p");
     contenu.innerHTML = chapterContent;
     const choiceConteneur = document.createElement("div");
     //create buttons
     choiceConteneur.classList.add("choiceConteneur");
     for(const {content,target} of nextChapters){
     const button = document.createElement("button");
     button.textContent = content;
     button.id =`${target}`;
     button.classList.add("btn","mx-2");
     button.addEventListener("click" ,displayUserchoice);
     choiceConteneur.append(button);
     }
    
     containerElement.append(title,contenu,choiceConteneur);
 }
 //display chapter on the screen
 function displayStoryChapter(data){
     //saveChapters(data);
     const{id,title,content,choices} = data;
     createStoryContainer(id,title,content,choices);

 }
 let previousChaptersId=[];
 function saveChapters(data){
    
   previousChaptersId.push(data);
   console.log(previousChaptersId);
 }

 
  //onload of the page
window.onload= function (){
    getStory().then(datas =>foundChapter(datas,1));
         
     }
 //when we click on a button to choose a chapter
 function displayUserchoice(event){
     //actualId = id;
      //previousChaptersId.push(actualId);
      //console.log(previousChaptersId);
     const userChoice = event.target.id;
     getStory().then(datas =>foundChapter(datas,userChoice));
      
 }


 /*
    objectifs joli :
        -Rendre l'appli moins moche
    objectifs :
        - Trouver un moyen de dire que le livre est fini
        - Good et bad ending
        - Restart de l'histoire
        - RollBack vers le chapitre précédent
 */

 //click the restate img 
  const restateElement = document.getElementById("restate");
  restateElement.onclick =function (){
    getStory().then(datas =>foundChapter(datas,1))
  }
  //end of the story 
  function showEndOfTheStory(){
    containerElement.innerHTML = `<h1> Le livre est fini </h1>`;
    //previousButton.classList.replace("visible","hidden") ;

  }
  //let actualId=1;
  //const previousChaptersId=[1];
  //configurate the previous Button
 /* function configPreviousButton(idTarget,count){
    if(idTarget != 1){
        previousButton.classList.replace("hidden","visible") ;
        previousChaptersId.push(actualId);
    }
    else{
        previousButton.classList.replace("visible","hidden") 
    }
   
    actualId = idTarget;
    //console.log(`Button ${previousChaptersId} and prevId ${actualId}`);
    console.log(previousChaptersId);
    previousButton.addEventListener("click",function()
                        { getStory().then(datas =>foundChapter(datas,previousChaptersId.pop()))});

  }*/
  previousButton.addEventListener("click",function()
                        { 
                            console.log(previousChaptersId);
                            previousChaptersId.pop();
                            console.log(previousChaptersId);
                            displayStoryChapter(previousChaptersId[previousChaptersId.length-1]);
                            
                            
                        }
                            );
  

