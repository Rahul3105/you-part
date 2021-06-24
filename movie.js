let movieCont = document.getElementsByClassName("movieCont")[0];
async function getData() {
  let movieName = document.getElementById("name").value;
  movieName = movieName.trim().replace(/ /g, "+");
  try {
    let res = await fetch(
      `http://www.omdbapi.com/?apikey=a7c69e72&t=${movieName}&plot=full`
    );
    let data = await res.json();
    appendData(data);
  } catch (err) {
    console.log("error found");
    movieCont.innerHTML = `<div style="width:20%;height:0;padding-bottom:10%;position:relative;" class="not_found">
                <img src="https://media.giphy.com/media/8L0Pky6C83SzkzU55a/giphy.gif" style="width: 100%;" alt="">
                Internet not working
                </div>`;
  } finally {
    console.log("promise completed");
  }
}

function appendData(data) {
  if (data.Error == "Movie not found!") {
    movieCont.innerHTML = `<div style="width:20%;height:0;padding-bottom:10%;position:relative;" class="not_found">
                <img src="https://media.giphy.com/media/Q7cTwUgxNorSg23xS3/giphy.gif" style="width: 100%;" alt="">
            </div>`;
  } else {
    movieCont.innerHTML = "";
    let movie = document.createElement("div");
    movie.classList.add("movie");
    movie.innerHTML = `
                <img src=${data.Poster} alt="">
                <div class="movieInfo">
                    <p class="title">${data.Title}</p>
                    <hr>
                    <p class="releaseDate">Release Date : <span>${data.Released}</span></p>
                    <hr>
                    <p class="rating"><i class="fas fa-star" style="color: rgb(255, 145, 0);"></i> ${data.imdbRating}</p>
                    <hr>
                    <p class= 'genre'>${data.Genre}</p>
                    <hr>
                    <p class = 'story'> ${data.Plot}</p>
                </div>

            `;
    movieCont.append(movie);
    console.log(data);
  }
}
