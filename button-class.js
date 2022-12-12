class TriangleButton{
    constructor(x, y, x1, y1, x2, y2){
      this.x = x
      this.y = y
      this.x1 = x1
      this.y1 =y1
      this.x2 = x2
      this.y2 =y2
    }
  
    display(){
      // if(nextSongButton.contains(mouseX,mouseY)){
      //   fill(255)
      // }
      triangle(this.x, this.y, this.x1, this.y1, this.x2, this.y2)
    }
  
    contains(px, py){
      let d = dist(mouseX - windowWidth/2, mouseY - windowHeight/2, this.x, this.y);
      if(d < 20){
      return true
      }else{
        return false   
      }
    }
  }
  
  class CirButton{
    constructor(x, y, r){
      this.x = x
      this.y = y
      this.r = r
      // this.xspeed = +-mouseX
      // this.yspeed = +-mouseY
  }
  
  display(){
    ellipse(this.x, this.y, this.r)
  }
  
  contains(px, py){
    let d = dist(mouseX - windowWidth/2, mouseY - windowHeight/2, this.x, this.y);
    if(d < this.r){
      return true
    }else{
      return false
    }
  }
  }
  