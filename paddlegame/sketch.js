let ball_x,ball_y,ball_dx,ball_dy,ball_radius;
let paddle_x,paddle_y,paddle_width,paddle_height,paddle_dx;
let brick_x,brick_y,brick_width,brick_height;
let lives,scores,b,v,x,y,w,h;
let matrix = [];

// setup function
function setup() {
  // create a box of size 400*400
  createCanvas(400, 400);
  
  paddle_x =paddle_ix=(width/2) - 40;
  paddle_y =paddle_iy= height -20;
  paddle_height =15;
  paddle_width =80;
  paddle_dx= 8;
  
  ball_x =ball_ix= width/2;
  ball_dx = 4;
  ball_dy = 1.7;
  ball_radius =15;
  ball_y = ball_iy=paddle_y-(ball_radius/2);
  
  brick_x =150;
  brick_y =150;
  brick_height=20;
  brick_width = 60;
  
  lives =3;
  scores = 0;
  
  for(var i=0;i<4;i++){
    let brick = [];
    for(let j=0;j<4;j++){
      brick.push({x:(i*95)+10,y:(j*45)+25,w:80,h:25,v:true})
    }
    matrix.push(brick);
  }
}

function draw () {
  background("black");
  
  ball_x+=ball_dx;
  ball_y-=ball_dy;
  
    fill('rgb(170,19,19)');
  circle(ball_x,ball_y,25);
   fill('rgb(32,173,228)');
  rect(paddle_x,paddle_y,paddle_width,paddle_height);
  
  
  
  if(keyIsDown(RIGHT_ARROW)){
    paddle_x+=paddle_dx;
  }
  if(keyIsDown(LEFT_ARROW)){
    paddle_x-=paddle_dx;
  }
  
// left right
  if(ball_x + (ball_radius/2)>width || ball_x - (ball_radius/2)<0){
    ball_dx = - ball_dx;  
  }
  
  
  
  //top  
  
   if(ball_y-ball_radius/2<0){
     ball_dy=-ball_dy;
  }
  //for bottom 
  
 if(ball_y + (ball_radius/2)>height){
    if(lives>0){
      lives=lives-1;
      ball_dx=-ball_dx;
      ball_dy=-ball_dy;
    }
    if(lives === 0){
      ball_dx=0;
      ball_dy=0;
      text("Game Over", (width/2)-60,(height/2));
     } 
}
  
  //bouncing of ball from paddle
  
  if( ball_x >paddle_x &&ball_y + (ball_radius/2)>paddle_y && ball_x < paddle_x + paddle_width){
     ball_dy=-ball_dy
     }
  
  //paddle moving right
  if(paddle_x + paddle_width >width){
    paddle_x = width - paddle_width;
  }
  
  if(paddle_x < 0){
    paddle_x=0;
  }
  
  
   for(var i=0;i<4;i++){
    for(var j=0;j<4;j++){
      rect(matrix[i][j].x, matrix[i][j].y, matrix[i][j].w, matrix[i][j].h);
      
      if(ball_x-(ball_radius/2) < matrix[i][j].x + matrix[i][j].w  &&
         ball_y >matrix[i][j].y  &&  ball_y < matrix[i][j].y + matrix[i][j].h && ball_x + (ball_radius/2) > matrix[i][j].x){
        ball_dx = -ball_dx;
        scores++;
        matrix[i][j].h=0;
        matrix[i][j].w=0
      }

      if(ball_y-(ball_radius/2) < matrix[i][j].y + matrix[i][j].h &&
         ball_x > matrix[i][j].x && ball_x<matrix[i][j].x + matrix[i][j].w && ball_y +(ball_radius/2) >matrix[i][j].y){
        ball_dy=-(ball_dy);
        scores++;
        matrix[i][j].h = 0;
        matrix[i][j].w = 0;
      }
  }
}
  
     fill("white")
   //add score and remainig chance
   text(`SCORES : ${scores}`, width-100, 20);
    text(`LIVES : ${lives}`, 30, 20);
  
 
  
  if(scores === 16){
    ball_dx=0;
    ball_dy=0;
    text("Congratulation! You've won", (width/2)-50,(height/2));
  }

}