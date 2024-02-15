const data = [];

fetch("https://fakestoreapi.com/products/")
.then(x => x.json())
.then(x => {
  //currData = JSON.parse(x)
  x.forEach(element => {
    data.push(element);
  });
  GenerateDataList(data);
  CompareCategory();
  GetCategories();
});


function GenerateCard(title, price, desc, cat, img, rating)
{
  return `
  <div class="card col-4">
    <div class="cardTitle">
      <h2>${title}</h2>
    <div class="cardDesc">
      <p>${cat}</p>
    </div>
    </div>
    <div class="cardPics">
      <img src="${img}" alt=""></img>
    </div>
    <div class="cardDesc">
      <p>${desc}</p>
    </div>
    <div class="cardRating">
      <p>${rating.rate}, értékelések száma: ${rating.count}</p>
    </div>
    <div class="cardPrice">
      <p>${price}$</p>
    </div>
  </div>`;
}
function GenerateDataList(dataList)
{
  document.getElementsByClassName("listContainer")[0].innerHTML = '';
  dataList.forEach(x => {
    document.getElementsByClassName("listContainer")[0].innerHTML += GenerateCard(x.title, x.price, x.description, x.category, x.image, x.rating );
  });
}

function FilterSearch(param)
{
  switch (param) {
    case 1:
      let newDatas = data.map(x => {return x.rating.rate});
      let bestItem = data.find(x => {return x.rating.rate == Math.max(...newDatas) });
      document.getElementsByClassName("listContainer")[0].innerHTML = GenerateCard(bestItem.title, bestItem.price, bestItem.description, bestItem.category, bestItem.image, bestItem.rating);
      break;
  
    default:
      let maxCost = document.getElementById("cost").value;
      let newDatalist = data.filter(x => x.price <= maxCost);
      if(newDatalist.length > 0)
      {
        GenerateDataList(newDatalist);
      }
      else
      {
        document.getElementsByClassName("listContainer")[0].innerHTML = "Nincs a feltételnek megfelelő termék!"
      }
      break;
  }
}

function CompareCategory()
{
  let maleCost = 0;
  let maleNum = 0;
  data.filter(x => x.category == "men's clothing").forEach(y => {
    maleCost += y.price;
    maleNum++;
  });
  let maleAvg = maleCost/maleNum;

  let womenCost = 0;
  let womenNum = 0;
  data.filter(x => x.category == "women's clothing").forEach(y => {
    womenCost += y.price;
    womenNum++;
  });
  let womenAvg = womenCost/womenNum;

  let costlier = '';

  switch (Math.max(womenAvg, maleAvg)) {
    case womenAvg:
      costlier = "Women's clothing"
      break;
  
    default:
      costlier = "Men's clothing"
      break;
  }


  document.getElementsByClassName("stats")[0].innerHTML = `<h3>Átlag női ruha árak: ${Math.round(womenAvg*100)/100}$, termékek száma: ${womenNum}.<br> Átlag férfi ruha árak: ${Math.round(maleAvg*100)/100}$, termékek száma: ${maleNum}.</h3> <h3>Drágább: ${costlier}</h3>`;
}


function GetCategories()
{
  let cats = [...new Set(data.map(x => x.category))];
  cats.forEach(x => {
    let num = data.filter(y => y.category === x).length;
    document.getElementsByClassName("categories")[0].innerHTML += `<h3>${x}: ${num}</h3><br>`
  });
  
}

