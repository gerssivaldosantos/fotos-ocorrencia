  /* Biblioteca Swiper */
  const swiper = new Swiper('.swiper', {
    // Parâmetros opcionais
    direction: 'horizontal',
    speed: 570,
    // Se precisar de paginação
    pagination: {
      el: '.swiper-pagination',
    },
  
    // Setas de navegação
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  
    effect: 'creative',
    creativeEffect: {
         prev: {
        //Vai setar translateZ(-400px) na seta de voltar slides
        translate: [0, 0, -400],
        },
        next: {
        //Vai setar translateZ(-400px) na seta avançar slides
        translate: ['100%', 0, 0],
        },
    },

    initialSlide: 0,
    preventClicks: true,
  });


const pictureImageTxt = `<i class="material-icons">wallpaper</i> Anexar Imagen`
/*Botão para trocar os slides das imagens */


  /*Inputs que recebem a imagem */
const firstInputFile = document.querySelector(".picture__input1");
const secondInputFile = document.querySelector(".picture__input2");
const thirdInputFileThree = document.querySelector(".picture__input3");

/*Container que recebem a imagem que aparecerá para usuário */
const containerFirstImg = document.querySelector(".containerFirstImg");
const containerSecondImg = document.querySelector(".containerSecondImg");
const containerThirdImg = document.querySelector(".containerThirdImg");

/*Botões que deletam a imagem e os valores dos inputs */
const isRemoveFirstImgHandleButton = document.querySelector(".isRemoveFirstImgHandleButton") 
const isRemoveSecondImgHandleButton = document.querySelector(".isRemoveSecondImgHandleButton")
const isRemoveThirdImgHandleButton =document.querySelector(".isRemoveThirdImgHandleButton")

/*Tags <img> criadas para cada input. Aparecerá para usuário*/
let firstUserImg = document.createElement("img");
let secondUserImg = document.createElement("img");
let thirdUserImg = document.createElement("img");

/* Variáveis para armazenar os valores do input[file] */
let firstImgFileInput
let secondImgFileInput
let thirdImgFileInput

const dialogFirst = document.querySelector('.dialogFirst')
const dialogSecond = document.querySelector('.dialogSecond')
const dialogThird = document.querySelector('.dialogThird')

const openDialogButtonFirst = document.querySelector('.openDialogButtonFirst')
const openDialogButtonSecond = document.querySelector('.openDialogButtonSecond')
const openDialogButtonThird = document.querySelector('.openDialogButtonThird')

let isEnableNavigationButton = document.querySelector('.swiper-button-next')
isEnableNavigationButton.classList.add('swiper-button-disabled')

swiper.allowSlideNext = false
swiper.allowTouchMove = false

firstInputFile.addEventListener("change", async function (e) {
    /* Previne que cheguem valores undefined */
    const preventDefault = e.target.value
    if(!preventDefault) {
        return false
    }

    let newInput = jQuery('<input>', {
        type: 'hidden',
        name: 'imagens_base64[]',
        class: 'image_blob1',
        value: ''
    }).appendTo('#containerInputsToBackend');
    
    firstImgFileInput = e.target.files[0];

    /*Biblioteca  browser-image-compression */
    
    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
      initialQuality: 0.7
    }

    try {
      const compressedFile = await imageCompression(firstImgFileInput, options); /* Comprime imagem */
      $(newInput).val(await imageCompression.getDataUrlFromFile(compressedFile))  /* transforma em formado base64 */
      
      if (compressedFile) {
        const reader = new FileReader();
        reader.addEventListener("load", function (e) {
          const readerTarget = e.target;
          firstUserImg.src = readerTarget.result;
          firstUserImg.classList.add("picture__img");
          containerFirstImg.innerHTML = "";
          dialogFirst.appendChild(firstUserImg);
        });
        reader.readAsDataURL(compressedFile);
      } else {
        containerFirstImg.innerHTML = pictureImageTxt;
      }
    } catch (error) {
      console.log(error);
    }

    if(firstImgFileInput) {
        dialogFirst.style.display = 'block'
      
        isRemoveFirstImgHandleButton.style.display = "block"
        openDialogButtonFirst.style.display = "block"
    }

    isEnableNavigationButton.classList.remove('swiper-button-disabled')
    swiper.allowSlideNext = true
    swiper.pagination.init()
    swiper.update()
  })   

  openDialogButtonFirst.onclick = function (e) {
      e.preventDefault()
      dialogFirst.showModal()
  }

    isRemoveFirstImgHandleButton.addEventListener('click', function(e) {
    e.preventDefault()
    firstImgFileInput = ''
    firstImageBlob = ''
    firstUserImg.remove()
    containerFirstImg.innerHTML = pictureImageTxt
  
    openDialogButtonFirst.style.display = 'none'
    dialogFirst.style.display = 'none'
    this.style.display = 'none'
    $('.image_blob1').remove()
    swiper.update()
 })


    dialogFirst.addEventListener('click', function (event) {
        const rect = dialogFirst.getBoundingClientRect();
        const isInDialog=(rect.top <= event.clientY && event.clientY <= rect.top + rect.height
            && rect.left <= event.clientX && event.clientX <= rect.left + rect.width);
        if (!isInDialog) {
            dialogFirst.close();
        }
    });
       
secondInputFile.addEventListener("change", async function (e) {
    const preventDefault = e.target.value
    if(!preventDefault) {
        return false
    }

    let newInput = jQuery('<input>', {
        type: 'hidden',
        name: 'imagens_base64[]',
        class: 'image_blob2',
        value: ''
    }).appendTo('#containerInputsToBackend');
   
    secondImgFileInput = e.target.files[0];

    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
      initialQuality: 0.7
    }
    try {
        const compressedFile = await imageCompression(secondImgFileInput, options); /* Comprime imagem */
        $(newInput).val(await imageCompression.getDataUrlFromFile(compressedFile))  /* transforma em formado base64 */

      if (compressedFile) {
        const reader = new FileReader();
        reader.addEventListener("load", function (e) {
          const readerTarget = e.target;
          secondUserImg.src = readerTarget.result;
          secondUserImg.classList.add("picture__img");
          containerSecondImg.innerHTML = "";
          dialogSecond.appendChild(secondUserImg);
        });
        reader.readAsDataURL(compressedFile); 
      } else {
        containerSecondImg.innerHTML = pictureImageTxt;
      }
    } catch (error) {
      console.log(error);
    }

    if(secondImgFileInput) {
        dialogSecond.style.display = 'block'
        openDialogButtonSecond.style.display = "block"
        isRemoveSecondImgHandleButton.style.display = "block"
        swiper.allowSlideNext = true
    } 

    swiper.update()
      
  })

  openDialogButtonSecond.onclick = function (e) {
    e.preventDefault()
    dialogSecond.showModal()
}

  isRemoveSecondImgHandleButton.addEventListener('click', function(e) {
    e.preventDefault()
    secondImgFileInput = ''
    secondImageBlob = ''
    secondUserImg.remove()
    containerSecondImg.innerHTML = pictureImageTxt
    swiper.slideTo(0)
    this.style.display = 'none'
    openDialogButtonSecond.style.display = 'none'
    dialogSecond.style.display = 'none'
    $('.image_blob2').remove()
    swiper.update()
})

dialogSecond.addEventListener('click', function (event) {
    const rect = dialogSecond.getBoundingClientRect();
    const isInDialog=(rect.top <= event.clientY && event.clientY <= rect.top + rect.height
        && rect.left <= event.clientX && event.clientX <= rect.left + rect.width);
    if (!isInDialog) {
        dialogSecond.close();
    }
});


thirdInputFileThree.addEventListener("change", async function (e) {
    const preventDefault = e.target.value
    if(!preventDefault) {
        return false
    }

    let newInput = jQuery('<input>', {
        type: 'hidden',
        name: 'imagens_base64[]',
        class: 'image_blob3',
        value: ''
    }).appendTo('#containerInputsToBackend');
 
    thirdImgFileInput = e.target.files[0];

    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
      initialQuality: 0.7
    }

    try {
        const compressedFile = await imageCompression(thirdImgFileInput, options); /* Comprime imagem */
        $(newInput).val(await imageCompression.getDataUrlFromFile(compressedFile))  /* transforma em formado base64 */
      
      if (compressedFile) {
        const reader = new FileReader();
        reader.addEventListener("load", function (e) {
          const readerTarget = e.target;
          thirdUserImg.src = readerTarget.result;
          thirdUserImg.classList.add("picture__img");
          containerThirdImg.innerHTML = "";
          dialogThird.appendChild(thirdUserImg);
        });
        reader.readAsDataURL(compressedFile);
      } else {
        containerThirdImg.innerHTML = pictureImageTxt;
      }
    } catch (error) {
      console.log(error);
    }
    
    if(thirdImgFileInput ){
        dialogThird.style.display = 'block'
        openDialogButtonThird.style.display = "block"
        isRemoveThirdImgHandleButton.style.display = "block"   
    }
        
  })

  openDialogButtonThird.onclick = function (e) {
    e.preventDefault()
    dialogThird.showModal()
}

  isRemoveThirdImgHandleButton.addEventListener('click', function(e) {
    e.preventDefault()
    thirdImgFileInput = ''
    thirdImageBlob = ''
    thirdUserImg.remove()
    containerThirdImg.innerHTML = pictureImageTxt
    swiper.slideTo(1)
    this.style.display = 'none'
    openDialogButtonThird.style.display = 'none'
    dialogThird.style.display = 'none'
    $('.image_blob3').remove()
    swiper.update()
})

dialogThird.addEventListener('click', function (event) {
    const rect = dialogThird.getBoundingClientRect();
    const isInDialog=(rect.top <= event.clientY && event.clientY <= rect.top + rect.height
        && rect.left <= event.clientX && event.clientX <= rect.left + rect.width);
    if (!isInDialog) {
        dialogThird.close();
    }
});