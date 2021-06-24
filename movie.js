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
    console.log(err);
  } finally {
    console.log("promise completed");
  }
}
let movieCont = document.getElementsByClassName("movieCont")[0];
function appendData(data) {
  if (data.Error == "Movie not found!") {
    alert("Please check movie name and try again");
  } else {
    movieCont.innerHTML = "";
    let movie = document.createElement("div");
    movie.classList.add("movie");
    movie.innerHTML = `
                <img src=${data.Poster} alt="">
                <div class="movieInfo">
                    <p class="title">${data.Title}</p>
                    <p class="releaseDate">Release Date : <span>${data.Released}</span></p>
                    <p class="rating"><i class="fas fa-star" style="color: rgb(255, 145, 0);"></i> ${data.imdbRating}</p>
                    <p class = 'story'> ${data.Plot}</p>
                </div>

            `;
    movieCont.append(movie);
    console.log(data);
  }
}
