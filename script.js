var imageContainer = $("#image_div");
var inputSol = $("#inp_sol");
var inputPage = $("inp_page");
var getImages = $("#btn_get_images");
var selectedSol,selectedPage;

getImages.click(function (event) { //all the processes happen when the button is clicked
    event.preventDefault();          // only then we'll be able to store the values in the active state.
    selectedSol = inputSol.val(); 
    selectedPage = inputPage.val();
    if(selectedSol === '' || selectedPage ===''){
      alert('Please fill the empty sol/page fields.');
      return;
    }
    if(selectedSol >1000 || selectedSol<0){
      alert("SOL Value is invalid. Please select from 0 to 1000.");
      return;
    }    
    
    var urlToHit = "https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?api_key=DEMO_KEY&sol="+selectedSol+"&page="+selectedPage;    
//    var urlToHit = "https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=DEMO_KEY&earth_date="+selectedDate;
        
    $.ajax({
      url:urlToHit,
      method:'GET',
      success: function(data) {
            var allPhotos = data.photos;
            // console.log(allPhotos);
            if(allPhotos.length === 0 ) {
              alert("No photos available for this date");
              return;
          }
          $("#image_div img").remove();
          for (let pickedPhoto of allPhotos){
            imageContainer.append('<img src="'+pickedPhoto.img_src+'"alt="'+pickedPhoto.id+'">');
          }
        }
    });
});
