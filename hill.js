export class Hill{
    constructor(color, speed, total){
        this.color = color;
        this.speed = speed;
        this.total = total;
    }
    resize(stageWidth, stageHeight){
        this.stageWidth = stageWidth;
        this.stageHeight = stageHeight;

        this.points = [];
        this.gap = Math.ceil(this.stageWidth /(this.total-2)); 

        for (let i = 0 ;i < this.total; i++){
            this.points[i] = {
                x : i*this.gap,
                y : this.getY()
            };
        }
    }    

    draw(ctx){
        ctx.fillStyle = this.color;
        ctx.beginPath();

        let cur = this.points[0];
        let prev = cur;

        let dots = [];
        cur.x += this.speed;

        if (cur.x > -this.gap){
            this.points.unshift({
                x: -(this.gap *2),
                y: this.getY()
            });
        } else if (cur.x>this.stageWidth+this.gap){
            this.points.splice(-1);
        }

        ctx.moveTo(cur.x,cur.y);

        let prevCx =cur.x;
        let prevCy =cur.y;

        for (let i = 0 ;i<this.points.length;i++){
            cur = this.points[i];
            cur.x += this.speed;
            const cx = (prev.x + cur.x)/2;
            const cy = (prev.y + cur.y)/2;
            ctx.quadraticCurveTo(prev.x,prev.y,cx,cy); //곡선그리기

            dots.push({
                x1:prevCx,
                y1:prevCy,
                x2:prev.x,
                y2:prev.y,
                x3:cx,
                y3:cy,
            }); // 양은 안거릴거니 노니드

            prev = cur ; 
            prevCx = cx;
            prevCy = cy;
        }

        ctx.lineTo(prev.x, prev.y);
        ctx.lineTo(this.stageWidth,this.stageHeight);
        ctx.lineTo(this.points[0].x , this.stageHeight);
        ctx.fill(); // 2:53

        return dots;
    }

    getY(){
        const min = this.stageHeight/4;
        const max = this.stageHeight - min;
        return min + Math.random()*max;
    }
}