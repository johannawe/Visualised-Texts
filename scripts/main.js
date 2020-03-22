var createPath = function(x, y, w, h, tlTor, trTob, blTor, trTob) {
    return "M" + (x + w) * tlTor + " " + y + "Q" + x + w + " " + y + " " + x + w + " " + (y + h) * trTob + " Q " + x + w + " " + y + h + " " + (x + w) * blTor + " " + y + h + " Q " + x + " " + y + h + " " + x + " " + (y + h) * trTob + " Q" + x + " " + y + " " + (x + w) * tlTor + " " + y
}
//M "Bx*0.5" "Ay" Q "Bx" "By" "Bx" "Cy*0.7" Q "Cx" "Cy" "Dx" "Cy*0.3" Q "Dx" "Dy" "Ax*0.8" "Ay" Q "Ax" "Ay" "Bx*0.5" "Ay"

var whichText = 4



colorsDamp = ["#EAC6BB", "#B2BCEC", "#EDF2B0", "#A0E9C9", "#f3f3f3"]
colorsIntense = ["#FF9879", "#8C9FFF", "#F0E800", "#3AF69C", "#C2C2C2"]

colorsDamp = ["#EAC6BB", "#B2BCEC", "#EDF2B0", "#A0E9C9", "#e2e2e2"]
// colorsIntense = ["#FF7859", "#6C7FFF", "#EfE300", "#1AF69C", "#C2C2C2"]
var colors = colorsDamp;


var paths = ["M15.0715655 4.46169795 12.8901865 8.1263716 12.8901865 14.3213542 7.53578274 12.0884577 1.45231278 12.5925726 0.624476107 8.1263716 0 4.46169795 3.98079201 2.29841943 7.53578274 0 12.243428 2.29841943", "M13.2110413 4.46169795 12.3088474 8.93005056 11.0296624 13.4516405 5.67525857 14.3213542 1.29623642 11.216657 1.13947583 8.93005056 0 5.23651161 3.0234237 3.14509777 5.67525857 0 9.20416264 3.14509777", "M15.0715655 3.82643324 12.8901865 7.50646382 12.8901865 12.8163758 7.53578274 13.6860895 3.91221636 9.91442931 0 8.29478586 0.713964895 3.82643324 4.88394787 2.50983307 7.53578274 0 11.4059296 2.50983307", "M15.0715655 4.46169795 12.1693716 8.93005056 12.8901865 13.4516405 7.53578274 14.3213542 3.15676059 11.216657 0 8.93005056 1.86052417 5.23651161 4.88394787 3.14509777 7.53578274 0 11.0646868 3.14509777"]

/*D3*/


// .style("max-width", function(){return songs[whichText].lyrics.length*1.2})




var setTime = function(score) {
    switch (score) {
        case 1:
            time = 600;
            break;
        case 2:
            time = 400;
            break;
        case 3:
            time = 200;
            break;
        case -1:
            time = 600;
            break;
        case -2:
            time = 400;
            break;
        case -3:
            time = 200;
            break;
        default:
            time = 600;
    }
    return time;
}

function changeShape(id, score) {
    // console.log(id);
    // d3.select("#" + id)
    //   .attr('fill', '#000')
    d3.selectAll("#" + id)
        .transition()
        .duration(setTime(score))
        .ease(d3.easePoly.exponent(1))
        .attr("d", function(d, i) {
            if (this.getAttribute("data-score") >= 0) {
                var rndm1 = Math.random() * 0.8 + 0.19;
                var rndm2 = Math.random() * 0.8 + 0.19;
                var rndm3 = Math.random() * 0.8 + 0.19;
                var rndm4 = Math.random() * 0.8 + 0.19;
                if (d.pos == ',' || d.pos == '.' || d.pos == ':' || d.pos == '(' || d.pos == ')' || d.pos == '"' || d.pos == '$' || d.pos == 'SYM') {
                    var path = createPath(0, 0, 4, 4, rndm1, rndm2, rndm3, rndm3)
                } else {
                    var path = createPath(0, 0, 14, 14, rndm1, rndm2, rndm3, rndm3)
                }
            } else {

                var path = paths[Math.floor(Math.random() * paths.length)]
            }
            return path

        })
        .style('left', 0)
        .style('top', 0)
}

var createObjects = function() {


    var processedTexts = songs[whichText].lyrics
    var idCounter = 0;
    var time = 1000;
    var xOrigin = -26;
    var yOrigin = -26;
    var PlacementCounter = 0;
    var wrapperWidth;
   var wordCount = 0;


    // console.log(processedTexts[1])

    //calculate width
   var wrapperWidth;
d3.select("p").text(""+songs[whichText].name+" – "+songs[whichText].interpret+"");
d3.select(".wrapper")
  .style('max-width', function(){
   var result
    songs[whichText].lyrics.forEach(function(e){
        if (e != undefined){
            wordCount = wordCount + e.length
        }
    })
    console.log("WC: "+wordCount)

   if ((wordCount)>200){
    var result = ""+wordCount*1.35+"px"
    wrapperWidth = wordCount*1.35

   }else{
    var result  = "250px"
    wrapperWidth = 250

   }   
    return result
  })


    //add elements



    processedTexts.forEach(function(e, i) {
      // yOrigin += 26;
      // xOrigin = -26;
      // var referecenY = 0
      d3.select(".wrapper svg").append("g").attr("id", "line"+i+"").attr("class", "line")
      d3.select("g#line"+i+"")
        .selectAll("g.course")
        .data(e)
        .enter().append("g")
        .attr("class", "course")
        .attr("transform", function (){
        if ((PlacementCounter%Math.floor((wrapperWidth) / 26)) == 0 ){
          yOrigin += 26; 
          xOrigin = -26
            }
            PlacementCounter++;
            xOrigin += 26;

            return "translate("+xOrigin+","+yOrigin+")"
        })
        .each(function(d) {
            d3.select(this).append("path")
                .attr("id", function() {
                    idCounter++;
                    //---enables movement

                    // setInterval(function(id, score) {
                    //     changeShape("blob_" + id, score)
                    // }, setTime(d.score), idCounter, d.score)

                    //---------
                    setTimeout(function(id, score) {
                        changeShape("blob_" + id, score)
                    }, setTime(d.score), idCounter, d.score)
                    return "blob_" + idCounter
                })
                .attr("data-score", function(d) { return d.score })
                .attr("data-pos", function(d) { return d.pos })
                .attr("data-word", function(d) { return d.word })
                .attr("fill", function(d, i) {
                    if (d.score != 0) {
                        colors = colorsIntense;
                    } else {
                        colors = colorsDamp;
                    }
                    var col;
                    switch (d.pos) {
                        case "NN":
                            col = colors[0];
                            break;
                        case "NNP":
                            col = colors[0];
                            break;
                        case "NNPS":
                            col = colors[0];
                            break;
                        case "NNS":
                            col = colors[0];
                            break;

                            //Verbs
                        case "VB":
                            col = colors[1];
                            break;
                        case "VBD":
                            col = colors[1];
                            break;
                        case "VBG":
                            col = colors[1];
                            break;
                        case "VBG":
                            col = colors[1];
                            break;
                        case "VBN":
                            col = colors[1];
                            break;
                        case "VBP":
                            col = colors[1];
                            break;
                        case "VBZ":
                            col = colors[1];
                            break;
                        case "VBZ":
                            col = colors[1];
                            break;

                            //ADJECTIVE + ADVERB
                        case "JJ":
                            col = colors[2];
                            break;
                        case "JJR":
                            col = colors[2];
                            break;
                        case "JJS":
                            col = colors[2];
                            break;
                        case "RB":
                            col = colors[2];
                            break;
                        case "RBR":
                            col = colors[2];
                            break;
                        case "RBS":
                            col = colors[2];
                            break;

                            //PRONOUN
                        case "PRP":
                            col = colors[3];
                            break;
                        case "PP$":
                            col = colors[3];
                            break;
                        default:
                            col = colors[4];
                    }
                    // }(d.pos == "NN" || d.pos == "NNP" || d.pos == "NNPS" || d.pos == "NNS"){
                    //   col = colors[4]
                    // }else{
                    // col = colors[Math.floor(Math.random() * (3+1))]
                    // }
                    return col
                })
                .attr("class", "course")
                .style('width', '0')
                .style('height', '0')
                .style('left', 50)
                .style('top', 50)
                .style('opacity', function(d, i) {
                    if (d.score != 0) {
                        var op = 1;
                    } else {
                        var op = 0.5;
                    }
                    return op
                })

    })
    d3.select("g#line"+i+"").append("text").text("/")
        .attr("width", "26px")
        .attr("height", "26px")
        .attr("transform", function (){
        if ((PlacementCounter%Math.floor((wrapperWidth) / 26)) == 0 ){
          yOrigin += 26; 
          xOrigin = -26
            }
            PlacementCounter++;
            xOrigin += 26;

            return "translate("+xOrigin+","+(yOrigin+13)+")"
        })
        .attr("font-size", "16px")
        .attr("fill", "#e2e2e2")
        .attr("opacity", "0.5")
        // .attr("y", function(){
        //     // xOrigin += 13;
        //     return ""+(yOrigin+13)+"px";

        // })




            d3.selectAll("path").on("mouseover", function(e) {
                var mousePos = d3.mouse(this);
                d3.select(".wrapper").append("p")
                    .text(this.getAttribute("data-word"))
                    .attr("id", "overlayWord")
                    .style("top", event.clientY + 5 + "px")
                    .style("left", event.clientX + 14 + "px")
            })
            d3.selectAll("path").on("mouseout", function(e) {
                d3.select("#overlayWord").remove()
            })
        })

}


createObjects()




var path = "M7.32166443 2.79543179 9.92946986 0.014952727 10.4213007 3.58185545 13.520937 5.14603297 11.0814703 6.76764796 10.4213007 10.8540166 7.32166443 8.95099413 2.04644866 9.784018 2.04644866 6.3543872 -0.0119078024 3.92720273 0.97087643 3.83902425 3.83712487 3.58185545 4.95805855 0.014952727 6.75451462 1.31578488"

var growTransition = d3.transition()
    .duration(1000)
    .ease(d3.easeLinear)


var time = 300;
var hi = 0.1;
var hi2 = 0.2;
var hi3 = 0.4;
var hi4 = 0.5;



d3.select(".previous").on("click", function() {
    d3.select("svg").selectAll("*").remove();
    if (whichText >= 0) {
        whichText--;
    } else {
        whichText = songs.length;
    }
    createObjects()
})
d3.select(".next").on("click", function() {
    d3.select("svg").selectAll("*").remove();
    if (whichText < songs.length) {
        whichText++;
    } else {
        whichText = 0;
    }
    createObjects()
})

// var paths=["M15.0715655 4.46169795 12.8901865 8.1263716 12.8901865 14.3213542 7.53578274 12.0884577 1.45231278 12.5925726 0.624476107 8.1263716 0 4.46169795 3.98079201 2.29841943 7.53578274 0 12.243428 2.29841943" ,"M13.2110413 4.46169795 12.3088474 8.93005056 11.0296624 13.4516405 5.67525857 14.3213542 1.29623642 11.216657 1.13947583 8.93005056 0 5.23651161 3.0234237 3.14509777 5.67525857 0 9.20416264 3.14509777" ,"M15.0715655 3.82643324 12.8901865 7.50646382 12.8901865 12.8163758 7.53578274 13.6860895 3.91221636 9.91442931 0 8.29478586 0.713964895 3.82643324 4.88394787 2.50983307 7.53578274 0 11.4059296 2.50983307","M15.0715655 4.46169795 12.1693716 8.93005056 12.8901865 13.4516405 7.53578274 14.3213542 3.15676059 11.216657 0 8.93005056 1.86052417 5.23651161 4.88394787 3.14509777 7.53578274 0 11.0646868 3.14509777"]



// setInterval(function(){ 

//   d3.selectAll('path')
//     .transition()
//     .duration(function(){
//       var score = this.getAttribute("data-score")
//       var time = 1000;
//       switch (score) {
//         case 1:
//           time = 600;
//           break;
//         case 2:
//           time = 400;
//           break;
//         case 3:
//           time = 200;
//           break;
//         case -1:
//           time = 600;
//           break;
//         case -2:
//           time = 400;
//           break; 
//         case -3:
//           time = 200;
//           break; 
//         default: 
//           time = 600;
//       }
//       return time;
//     })
//     .ease(d3.easePoly.exponent(1))
//       .attr("d", function(d, i) { 
//         if(this.getAttribute("data-score") >= 0){
//           var rndm1 = Math.random() * 0.8 + 0.19;
//           var rndm2 = Math.random() * 0.8 + 0.19;
//           var rndm3 = Math.random() * 0.8 + 0.19;
//           var rndm4 = Math.random() * 0.8 + 0.19;
//           if(d.pos == ',' || d.pos == '.' || d.pos == ':' || d.pos == '(' || d.pos == ')' || d.pos == '"' || d.pos == '$' || d.pos == 'SYM'){
//             var path = createPath(0,0,4,4, rndm1, rndm2, rndm3, rndm3)
//           }else{
//             var path = createPath(0,0,14,14, rndm1, rndm2, rndm3, rndm3)
//           }
//         }else{

//           var path = paths[Math.floor(Math.random()*paths.length)]
//         }
//         return path

//       })
//       .style('left', 0)
//       .style('top', 0)

// }, time);