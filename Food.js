class Food{
    preload(){
    milkImg=loadImage("Milk.png");
   }
   constructor(){
       var foodStock, lastFed;
   }
   getFoodStock(){

   }
   updateFoodStock(){

   }
   deductFoodStock(){

   }
   display(){
       var x=80, y=100;

       imageMode(CENTER);
       image(this.image, 720, 220, 70, 70);

       if(this.foodStock !== 0){
           for(var i=0; i<this.foodStock; i++){
               if(i%10 === 0){
                   x=80;
                   y=y+50;
               }
               image(milkImg,x,y,50,50);
               x=x+30;
           }
       }
   }
}